import type React from "react";
const LINKS: { href: string; label: string }[] = [
    { href: "#pipeline", label: "Pipeline" },
    { href: "#playground", label: "Playground" },
    { href: "#features", label: "Features" },
    { href: "#compare", label: "Compare" },
    { href: "#languages", label: "Languages" },
    { href: "#python", label: "Python" }
];

export function Nav(): React.JSX.Element {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-ink/70 backdrop-blur-xl">
            <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                <a href="#top" className="flex items-center gap-2.5">
                    <span className="grid h-7 w-7 place-items-center rounded-md bg-fern/15 font-mono text-sm font-bold text-fern ring-1 ring-fern/30">
                        ƒ
                    </span>
                    <span className="text-sm font-semibold tracking-tight text-white">
                        GraphQL SDK Pipeline
                    </span>
                </a>
                <div className="hidden items-center gap-1 md:flex">
                    {LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="rounded-md px-3 py-1.5 text-sm text-slate-400 transition hover:bg-panel hover:text-white"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
                <a
                    href="https://github.com/cadesark/graphql-sdk-site"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-line bg-panel px-3.5 py-1.5 text-sm font-medium text-slate-200 transition hover:border-fern/40 hover:text-fern"
                >
                    Source
                </a>
            </nav>
        </header>
    );
}
