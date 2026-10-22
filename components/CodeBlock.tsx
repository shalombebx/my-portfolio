"use client";

import { useState } from "react";

export default function CodeBlock({
  title,
  comment,
  commands,
}: {
  title: string;
  comment?: string;
  commands: string[];
}) {
  const [copyResult, setCopyResult] = useState<"idle" | "copied" | "failed">("idle");

  // copy only real commands, not comment lines
  const text = commands.filter((c) => !c.trim().startsWith("#")).join("\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopyResult("copied");
    } catch {
      setCopyResult("failed");
    }
    setTimeout(() => setCopyResult("idle"), 1500);
  }

  return (
    <div className="term">
      <div className="term-head">
        <span>{title}</span>
        <button
          onClick={copy}
          className="text-zinc-400 hover:text-zinc-100"
          aria-label={`Copy commands: ${title}`}
          aria-live="polite"
        >
          {copyResult === "copied" ? "copied" : copyResult === "failed" ? "copy failed" : "copy"}
        </button>
      </div>
      <pre>
        <code>
          {comment && (
            <>
              <span className="comment"># {comment}</span>
              <br />
            </>
          )}
          {commands.map((c, i) => (
            <span key={i} className={c.trim().startsWith("#") ? "comment" : undefined}>
              {c.trim().startsWith("#") ? (
                c
              ) : (
                <>
                  <span className="prompt">$ </span>
                  {c}
                </>
              )}
              {i < commands.length - 1 && <br />}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
