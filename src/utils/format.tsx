import Link from "next/link";
import { ReactNode } from "react";

/**
 * Parses basic inline markdown formatting (**bold** and [link](url)) and returns ReactNode elements.
 */
export function renderFormattedText(text: string): ReactNode {
  if (!text) return null;

  // Split by markdown link pattern [text](url) or bold pattern **text**
  const regex = /(\*\*.*?\*\*|\[[^\]]+?\]\([^)]+?\))/g;
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("[") && part.includes("](")) {
          const closeBracketIndex = part.indexOf("](");
          const label = part.slice(1, closeBracketIndex);
          const url = part.slice(closeBracketIndex + 2, -1);
          const isExternal = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:");
          if (isExternal) {
            return (
              <a key={index} href={url} target="_blank" rel="noreferrer">
                {label}
              </a>
            );
          } else {
            return (
              <Link key={index} href={url}>
                {label}
              </Link>
            );
          }
        }
        return part;
      })}
    </>
  );
}
