import json
import os
import re
import shutil
import subprocess
from jinja2 import Environment, FileSystemLoader

# Define variants and their target tags
VARIANTS = {
    "generic": "generic",
    "atomistic": "atomistic",
    "agents": "agents",
    "finance": "finance",
    "industry": "industry"
}

BIB_PATH = "src/data/publications.bib"
WEBSITE_PUBS_PATH = "src/data/publications.json"

# Month names for rendering BibLaTeX `date` fields on the website.
MONTHS = ["", "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"]


def parse_bib(text):
    """Minimal brace-aware BibLaTeX parser for our own publications.bib.

    Returns a list of {"type", "key", "fields"} dicts preserving file order.
    Handles nested braces inside values (e.g. {Castro Neto}); good enough for
    the controlled, hand-maintained file it reads — not a general parser.
    """
    entries = []
    i, n = 0, len(text)
    while True:
        at = text.find("@", i)
        if at < 0:
            break
        brace = text.find("{", at)
        etype = text[at + 1:brace].strip().lower()
        comma = text.find(",", brace)
        key = text[brace + 1:comma].strip()
        pos = comma + 1
        fields = {}
        while pos < n:
            while pos < n and text[pos] in " \t\r\n,":
                pos += 1
            if pos < n and text[pos] == "}":
                pos += 1
                break
            eq = text.find("=", pos)
            fname = text[pos:eq].strip().lower()
            v = eq + 1
            while v < n and text[v] in " \t\r\n":
                v += 1
            if v < n and text[v] == "{":
                depth, v = 1, v + 1
                start = v
                while v < n and depth > 0:
                    if text[v] == "{":
                        depth += 1
                    elif text[v] == "}":
                        depth -= 1
                    if depth > 0:
                        v += 1
                val = text[start:v]
                v += 1
            else:
                start = v
                while v < n and text[v] not in ",}":
                    v += 1
                val = text[start:v].strip()
            # Collapse internal whitespace/newlines and unescape LaTeX bits the
            # website renders as plain text.
            val = re.sub(r"\s+", " ", val).strip()
            val = val.replace("\\&", "&").replace("{", "").replace("}", "")
            fields[fname] = val
            pos = v
        entries.append({"type": etype, "key": key, "fields": fields})
        i = pos
    return entries


def keywords(entry):
    return [k.strip() for k in entry["fields"].get("keywords", "").split(",") if k.strip()]


def _render_author(name, first, is_user):
    """Render a single "Family, Given" name. The first author keeps the
    academic "Family, Given" order; later authors use "Given Family"."""
    if ", " in name:
        family, given = name.split(", ", 1)
    else:
        family, given = name, ""  # single-token (corporate-style) name
    display = "{}, {}".format(family, given) if first else (
        "{} {}".format(given, family).strip())
    if is_user:
        display = "**{}**".format(display)
    return display


def format_authors(author_field, equal=frozenset()):
    parts = [p.strip() for p in author_field.split(" and ")]
    rendered = []
    etal = False
    for idx, part in enumerate(parts):
        if part == "others":
            etal = True
            break
        family = part.split(", ", 1)[0]
        given = part.split(", ", 1)[1] if ", " in part else ""
        is_user = family == "Kazeev" and given.startswith("Nikita")
        name = _render_author(part, idx == 0, is_user)
        if family in equal:
            name += "*"  # equal-contribution marker
        rendered.append(name)
    if etal:
        # No trailing period; format_citation supplies the separator.
        return ", ".join(rendered) + ", et al"
    if len(rendered) == 1:
        return rendered[0]
    return ", ".join(rendered[:-1]) + ", and " + rendered[-1]


def _year(fields):
    """Year from either the `date` (YYYY-...) or a plain `year` field."""
    return fields.get("date", "")[:4] or fields.get("year", "")


def _venue(fields):
    if "booktitle" in fields:
        venue = fields["booktitle"]
        # Conference papers (no ICML session link) get a trailing month/year;
        # ICML workshop posters show their session time instead.
        if "sessionurl" not in fields:
            if fields.get("date", "")[5:7]:
                m = int(fields["date"][5:7])
                venue += ", {} {}".format(MONTHS[m], fields["date"][:4])
            elif _year(fields):
                venue += ", {}".format(_year(fields))
        return venue
    venue = fields.get("journaltitle", "")
    if fields.get("volume"):
        venue += " " + fields["volume"]
    if fields.get("number"):
        venue += "." + fields["number"]
    if fields.get("pages"):
        venue += ", " + fields["pages"]
    if _year(fields):
        venue += " ({})".format(_year(fields))
    return venue


def format_citation(entry):
    """Reconstruct the rich markdown citation the website renders."""
    f = entry["fields"]
    equal = frozenset(x.strip() for x in f.get("eqcontrib", "").split(",") if x.strip())
    url = f.get("url")
    title = "[{}]({})".format(f["title"], url) if url else f["title"]
    body = "{}. {}. {}.".format(format_authors(f["author"], equal), title, _venue(f))
    if f.get("note") and f.get("sessionurl"):
        # Lead with the (clickable) ICML session time so readers see when to attend.
        citation = "[{}]({}) — {}".format(f["note"], f["sessionurl"], body)
    elif "note" in f:
        citation = body + " {}".format(f["note"])
    else:
        citation = body
    if "addendum" in f:
        citation += " **{}**".format(f["addendum"])
    return citation


def generate_website_publications(entries):
    """Write src/data/publications.json that the React site consumes."""
    pubs = []
    for entry in entries:
        pub = {"citation": format_citation(entry)}
        if "icml2026" in keywords(entry):
            pub["category"] = "icml2026"
        pubs.append(pub)
    with open(WEBSITE_PUBS_PATH, "w", encoding="utf-8") as f:
        json.dump(pubs, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print("Wrote {} ({} publications)".format(WEBSITE_PUBS_PATH, len(pubs)))

def to_latex_inner(text):
    if not text:
        return ""
    # Escape LaTeX special characters
    # Standard: \, {, }, &, %, $, _, #, ~, ^
    # Note: We replace backslash first so we don't escape our own introduced backslashes later
    text = text.replace('\\', '\\textbackslash ')
    text = text.replace('{', '\\{').replace('}', '\\}')
    text = text.replace('&', '\\&')
    text = text.replace('%', '\\%')
    text = text.replace('_', '\\_')
    text = text.replace('#', '\\#')
    text = text.replace('$', '\\$')
    
    # Mathematical and common unicode symbols
    text = text.replace('≥', '$\\ge$')
    text = text.replace('→', '$\\rightarrow$')
    text = text.replace('–', '--')  # en-dash
    text = text.replace('—', '---') # em-dash
    
    # Restore math-mode for 10^5
    text = text.replace('10\\textbackslash \\^5', '$10^5$')
    text = text.replace('10^5', '$10^5$')
    
    # Translate bold **text** to \textbf{text}
    text = re.sub(r'\*\*(.*?)\*\*', r'\\textbf{\1}', text)
    # Translate italic *text* to \textit{text}
    text = re.sub(r'\*(.*?)\*', r'\\textit{\1}', text)
    
    # Translate literal bullet points to indented LaTeX bullets
    text = text.replace('• ', '\\hspace{1.3em}\\textbullet\\ ')
    
    return text

def escape_url(url):
    # Escape the characters hyperref treats as special inside \href URLs.
    # Mirrors the URL escaping used for inline markdown links below.
    return url.replace('%', '\\%').replace('#', '\\#').replace('_', '\\_')

def to_latex(val):
    if isinstance(val, dict):
        # Reference entries carry a raw URL in "href"; escape it as a URL
        # rather than running it through the generic text escaper, which
        # would mangle it (e.g. turning "_" into "\_textbackslash ...").
        result = {}
        for k, v in val.items():
            if k == "href" and isinstance(v, str):
                result[k] = escape_url(v)
            else:
                result[k] = to_latex(v)
        return result
    if isinstance(val, list):
        return [to_latex(item) for item in val]
    if not isinstance(val, str):
        return val

    # Tokenize and protect markdown links [label](url)
    tokens = []
    
    def repl_link(match):
        label = match.group(1)
        url = match.group(2)
        # Escape any special characters in the URL that hyperref demands
        # In LaTeX href, % must be written as \% and # as \#
        escaped_url = url.replace('%', '\\%').replace('#', '\\#').replace('_', '\\_')
        token_id = len(tokens)
        tokens.append(f"\\href{{{escaped_url}}}{{{to_latex_inner(label)}}}")
        # Delimit the placeholder so e.g. token 1 is not a prefix of token 10.
        return f"@@LINKTOKEN{token_id}@@"
        
    text = re.sub(r'\[([^\]]+?)\]\(([^)]+?)\)', repl_link, val)
    text = to_latex_inner(text)
    
    # Restore link tokens
    for i, token in enumerate(tokens):
        text = text.replace(f"@@LINKTOKEN{i}@@", token)
        
    return text

def filter_cv_data(data, target_tag):
    if target_tag == "generic":
        # Keep everything for generic
        return data

    filtered = {}
    filtered["personal"] = data["personal"]
    filtered["stats"] = data["stats"]
    
    # Filter skills
    filtered["skills"] = [s for s in data["skills"] if target_tag in s.get("tags", [])]
    
    # Filter experience
    filtered_exp = []
    for entry in data["workExperience"]:
        highlights = entry.get("highlights", [])
        filtered_highlights = [h for h in highlights if target_tag in h.get("tags", [])]
        # Keep an entry if it has matching highlights, or if it has no highlights
        # at all but its own tags match the variant.
        if filtered_highlights or (not highlights and target_tag in entry.get("tags", [])):
            entry_copy = entry.copy()
            entry_copy["highlights"] = filtered_highlights
            filtered_exp.append(entry_copy)
    filtered["workExperience"] = filtered_exp
    
    # Education
    filtered["education"] = data["education"]
    
    # Mentorship
    filtered["mentorship"] = [m for m in data["mentorship"] if target_tag in m.get("tags", [])]
    
    # Teaching & Outreach
    filtered["teachingAndOutreach"] = [t for t in data["teachingAndOutreach"] if target_tag in t.get("tags", [])]

    # Publications now live in publications.bib and are filtered by biblatex
    # via keyword; nothing to do here.

    # Service
    filtered["service"] = [s for s in data.get("service", []) if target_tag in s.get("tags", ["generic", target_tag])]

    return filtered

def main():
    # Make sure we run in the workspace root
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    
    print("Loading CV data...")
    with open("src/data/cv_data.json", "r", encoding="utf-8") as f:
        raw_data = json.load(f)

    print("Loading publications...")
    with open(BIB_PATH, "r", encoding="utf-8") as f:
        bib_entries = parse_bib(f.read())

    # Regenerate the website's publication list from the BibLaTeX source.
    generate_website_publications(bib_entries)

    os.makedirs("cv-variants", exist_ok=True)

    # biber resolves publications.bib via BIBINPUTS; lualatex finds the .bbl
    # biber writes into the output directory. TEXINPUTS lets lualatex locate the
    # custom data model (cvdm.dbx) that lives alongside the template.
    compile_env = os.environ.copy()
    compile_env["BIBINPUTS"] = (
        os.path.abspath("src/data") + os.pathsep + compile_env.get("BIBINPUTS", "")
    )
    compile_env["TEXINPUTS"] = (
        os.path.abspath("scripts/templates") + os.pathsep + compile_env.get("TEXINPUTS", "")
    )

    def run(cmd):
        try:
            subprocess.run(cmd, check=True, stdout=subprocess.PIPE,
                           stderr=subprocess.PIPE, text=True, env=compile_env)
        except subprocess.CalledProcessError as e:
            print("Error running: {}".format(" ".join(cmd)))
            print(e.stdout)
            print(e.stderr)
            raise

    # Set up Jinja2 environment
    env = Environment(loader=FileSystemLoader("scripts/templates"))
    template = env.get_template("cv_template.tex")

    for name, tag in VARIANTS.items():
        print(f"Generating variant: {name}...")

        # Filter
        filtered_data = filter_cv_data(raw_data, tag)

        # Escape for LaTeX
        latex_data = to_latex(filtered_data)

        # The generic CV prints every publication (empty variant tag); the
        # others filter by keyword. has_icml controls the ICML 2026 section.
        variant_tag = "" if tag == "generic" else tag
        has_icml = any(
            "icml2026" in keywords(e) and (not variant_tag or variant_tag in keywords(e))
            for e in bib_entries
        )

        # Render
        rendered_tex = template.render(
            personal=latex_data["personal"],
            education=latex_data["education"],
            workExperience=latex_data["workExperience"],
            mentorship=latex_data["mentorship"],
            teachingAndOutreach=latex_data["teachingAndOutreach"],
            service=latex_data["service"],
            skills=latex_data["skills"],
            variant_tag=variant_tag,
            has_icml=has_icml
        )

        tex_path = f"cv-variants/cv_{name}.tex"
        with open(tex_path, "w", encoding="utf-8") as f:
            f.write(rendered_tex)

        # Drop stale aux from a previous run so the first lualatex pass does not
        # read an outdated .bbl before biber regenerates it.
        for ext in (".bcf", ".bbl", ".blg", ".aux", ".run.xml"):
            stale = f"cv-variants/cv_{name}{ext}"
            if os.path.exists(stale):
                os.remove(stale)

        # Compile to PDF: lualatex -> biber -> lualatex x2 resolves the
        # bibliography and the section/page references around it.
        print(f"Compiling {name} variant to PDF...")
        run(["lualatex", "-interaction=nonstopmode", "-output-directory=cv-variants", tex_path])
        run(["biber", "--input-directory=cv-variants", "--output-directory=cv-variants", f"cv_{name}"])
        run(["lualatex", "-interaction=nonstopmode", "-output-directory=cv-variants", tex_path])
        run(["lualatex", "-interaction=nonstopmode", "-output-directory=cv-variants", tex_path])

    # Clean up LaTeX auxiliary files
    print("Cleaning up auxiliary compilation files...")
    aux_exts = [".aux", ".log", ".out", ".bcf", ".bbl", ".blg", ".run.xml"]
    for file in os.listdir("cv-variants"):
        if any(file.endswith(ext) for ext in aux_exts):
            os.remove(os.path.join("cv-variants", file))
            
    # Copy generic PDF to public/ for website download
    shutil.copyfile("cv-variants/cv_generic.pdf", "public/Nikita_Kazeev_CV.pdf")
    print("Generic PDF copied to public/Nikita_Kazeev_CV.pdf")
    print("CV Generation completed successfully!")

if __name__ == "__main__":
    main()
