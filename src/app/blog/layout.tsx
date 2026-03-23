import React from "react";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none mt-8 mb-16">
      {children}
    </article>
  );
}
