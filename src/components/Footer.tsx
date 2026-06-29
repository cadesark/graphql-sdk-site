import type React from "react";
export function Footer(): React.JSX.Element {
    return (
        <footer className="border-t border-line/60 bg-ink-soft/50">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-12 text-center">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-fern/15 font-mono text-base font-bold text-fern ring-1 ring-fern/30">
                    ƒ
                </span>
                <p className="text-sm text-slate-400">
                    An interactive explainer for Fern&apos;s GraphQL → TypeScript SDK generation pipeline.
                </p>
                <p className="font-mono text-xs text-slate-600">
                    Built with React · Vite · Tailwind · Framer Motion · Shiki
                </p>
            </div>
        </footer>
    );
}
