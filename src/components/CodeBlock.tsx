import type React from "react";
import { useState } from "react";
import { type CodeLang, useHighlighted } from "../hooks/useShiki.ts";

interface CodeBlockProps {
    code: string;
    lang: CodeLang;
    /** Optional label shown in the title bar (e.g. a filename). */
    title?: string;
    className?: string;
}

export function CodeBlock({ code, lang, title, className }: CodeBlockProps): React.JSX.Element {
    const html = useHighlighted(code, lang);
    const [copied, setCopied] = useState(false);

    const onCopy = (): void => {
        void navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1400);
        });
    };

    return (
        <div
            className={`group relative overflow-hidden rounded-xl border border-line bg-ink-soft/80 backdrop-blur ${className ?? ""}`}
        >
            <div className="flex items-center justify-between border-b border-line/80 px-4 py-2">
                <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/70" />
                    {title != null && (
                        <span className="ml-3 font-mono text-xs text-slate-400">{title}</span>
                    )}
                </div>
                <button
                    onClick={onCopy}
                    className="rounded-md px-2 py-1 font-mono text-[11px] text-slate-400 opacity-0 transition hover:bg-line hover:text-fern group-hover:opacity-100"
                >
                    {copied ? "copied ✓" : "copy"}
                </button>
            </div>
            <div className="px-4 py-3.5">
                {html != null ? (
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                ) : (
                    <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-slate-300">
                        <code>{code}</code>
                    </pre>
                )}
            </div>
        </div>
    );
}
