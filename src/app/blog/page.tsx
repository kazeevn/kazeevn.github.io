import fs from "fs";
import path from "path";
import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";

export const metadata = {
  title: "Blog",
};

export default function BlogList() {
  const blogDir = path.join(process.cwd(), "src/app/blog");
  const entries = fs.readdirSync(blogDir, { withFileTypes: true });
  
  const posts = entries
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      const slug = dirent.name;
      const mdPath = path.join(blogDir, slug, "page.md");
      if (!fs.existsSync(mdPath)) return null;
      
      const content = fs.readFileSync(mdPath, "utf-8");
      
      // Extract title from first `# `
      const titleMatch = content.match(/^#\s+(.*)$/m);
      const title = titleMatch ? titleMatch[1] : slug;
      
      // Extract date
      const dateMatch = content.match(/^\*(.*20\d{2})\*/m);
      const date = dateMatch ? dateMatch[1] : "";
      
      // Extract cover image
      const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
      const coverImage = imageMatch ? imageMatch[1] : null;

      return { slug, title, date, coverImage };
    })
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-2xl py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h1 className="text-4xl font-semibold mb-8 tracking-tight text-neutral-900 dark:text-neutral-100">
        Blog
      </h1>
      <div className="flex flex-col gap-12 mt-12">
        {posts.map((post) => (
          <Link 
            key={post!.slug} 
            href={`/blog/${post!.slug}`} 
            className="group flex flex-col gap-4"
          >
            {post!.coverImage && (
              <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
                <ExportedImage 
                  src={post!.coverImage} 
                  alt={post!.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
                {post!.date}
              </p>
              <h2 className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:underline decoration-2 underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700">
                {post!.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
