import { useEffect, useState } from "react";
import { type HighlighterCore, createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";
import githubDark from "shiki/themes/github-dark-default.mjs";
import bash from "shiki/langs/bash.mjs";
import graphql from "shiki/langs/graphql.mjs";
import json from "shiki/langs/json.mjs";
import python from "shiki/langs/python.mjs";
import typescript from "shiki/langs/typescript.mjs";

export type CodeLang = "typescript" | "graphql" | "json" | "bash" | "python";

let highlighterPromise: Promise<HighlighterCore> | undefined;

// Fine-grained Shiki: bundle only the four languages and one theme this site uses,
// rather than the full bundle (which ships every grammar as a separate chunk).
function getHighlighter(): Promise<HighlighterCore> {
    if (highlighterPromise == null) {
        highlighterPromise = createHighlighterCore({
            themes: [githubDark],
            langs: [typescript, graphql, json, bash, python],
            engine: createOnigurumaEngine(import("shiki/wasm"))
        });
    }
    return highlighterPromise;
}

/**
 * Highlights `code` to an HTML string with Shiki. Returns `undefined` until the
 * (singleton, lazily-created) highlighter has loaded, so callers can render a plain
 * fallback in the meantime.
 */
export function useHighlighted(code: string, lang: CodeLang): string | undefined {
    const [html, setHtml] = useState<string | undefined>(undefined);

    useEffect(() => {
        let cancelled = false;
        void getHighlighter().then((highlighter) => {
            if (cancelled) {
                return;
            }
            setHtml(
                highlighter.codeToHtml(code, {
                    lang,
                    theme: "github-dark-default"
                })
            );
        });
        return () => {
            cancelled = true;
        };
    }, [code, lang]);

    return html;
}
