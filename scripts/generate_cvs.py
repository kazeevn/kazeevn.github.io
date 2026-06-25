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
    
    return text

def to_latex(val):
    if isinstance(val, dict):
        return {k: to_latex(v) for k, v in val.items()}
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
        return f"LINKTOKEN{token_id}"
        
    text = re.sub(r'\[([^\]]+?)\]\(([^)]+?)\)', repl_link, val)
    text = to_latex_inner(text)
    
    # Restore link tokens
    for i, token in enumerate(tokens):
        text = text.replace(f"LINKTOKEN{i}", token)
        
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
    
    # Publications
    filtered["publications"] = [p for p in data["publications"] if target_tag in p.get("tags", [])]
    
    # Service and Also/Other
    filtered["service"] = [s for s in data.get("service", []) if target_tag in s.get("tags", ["generic", target_tag])]
    filtered["otherItems"] = [o for o in data.get("otherItems", []) if target_tag in o.get("tags", ["generic", target_tag])]
    
    return filtered

def main():
    # Make sure we run in the workspace root
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    
    print("Loading CV data...")
    with open("src/data/cv_data.json", "r", encoding="utf-8") as f:
        raw_data = json.load(f)
        
    os.makedirs("cv-variants", exist_ok=True)
    
    # Set up Jinja2 environment
    env = Environment(loader=FileSystemLoader("scripts/templates"))
    template = env.get_template("cv_template.tex")
    
    for name, tag in VARIANTS.items():
        print(f"Generating variant: {name}...")
        
        # Filter
        filtered_data = filter_cv_data(raw_data, tag)
        
        # Escape for LaTeX
        latex_data = to_latex(filtered_data)
        
        # Render
        rendered_tex = template.render(
            personal=latex_data["personal"],
            education=latex_data["education"],
            workExperience=latex_data["workExperience"],
            publications=latex_data["publications"],
            mentorship=latex_data["mentorship"],
            teachingAndOutreach=latex_data["teachingAndOutreach"],
            service=latex_data["service"],
            skills=latex_data["skills"],
            otherItems=latex_data["otherItems"]
        )
        
        tex_path = f"cv-variants/cv_{name}.tex"
        with open(tex_path, "w", encoding="utf-8") as f:
            f.write(rendered_tex)
            
        # Compile to PDF
        print(f"Compiling {name} variant to PDF...")
        try:
            result = subprocess.run(
                ["xelatex", "-interaction=nonstopmode", "-output-directory=cv-variants", tex_path],
                check=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
        except subprocess.CalledProcessError as e:
            print(f"Error compiling {name} variant:")
            print(e.stdout)
            print(e.stderr)
            raise e
            
    # Clean up LaTeX auxiliary files
    print("Cleaning up auxiliary compilation files...")
    for file in os.listdir("cv-variants"):
        if any(file.endswith(ext) for ext in [".aux", ".log", ".out"]):
            os.remove(os.path.join("cv-variants", file))
            
    # Copy generic PDF to public/ for website download
    shutil.copyfile("cv-variants/cv_generic.pdf", "public/Nikita_Kazeev_CV.pdf")
    print("Generic PDF copied to public/Nikita_Kazeev_CV.pdf")
    print("CV Generation completed successfully!")

if __name__ == "__main__":
    main()
