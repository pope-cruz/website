"use client";

import { isValidElement, type ReactNode, useState } from "react";

function textFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textFromChildren).join("");
  if (isValidElement<{ children?: ReactNode }>(children)) return textFromChildren(children.props.children);
  return "";
}

export function CopyCodeBlock({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(textFromChildren(children).trimEnd());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="code-block">
      <button type="button" onClick={copy} aria-label="Copy code to clipboard">
        {copied ? "copied" : "copy"}
      </button>
      <pre {...props}>{children}</pre>
    </div>
  );
}
