import type React from "react";
import { motion } from "framer-motion";
import { CodeBlock } from "./CodeBlock.tsx";

const HERO_SNIPPET = `import { CommerceStorefrontClient } from "@acme/sdk";

const client = new CommerceStorefrontClient({ token });

// pick fields → get back exactly those fields, typed
const { data } = await client.query.product(
  { id: "p-42" },
  { name: true, price: true, reviews: { __args: { first: 5 }, rating: true } },
);`;

const FLOW = ["schema", "IR", "merge", "TypeScript SDK"];

export function Hero(): React.JSX.Element {
    return (
        <div id="top" className="relative mx-auto max-w-6xl px-6 pt-36 pb-12 sm:pt-44">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]"
            >
                <div>
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-3.5 py-1.5 text-xs font-medium text-slate-300">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fern" />
                        Fern · GraphQL → TypeScript SDK generation
                    </div>
                    <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
                        A GraphQL schema in,
                        <br />
                        <span className="bg-gradient-to-r from-fern via-cyan to-violet bg-clip-text text-transparent">
                            a fully-typed SDK
                        </span>{" "}
                        out.
                    </h1>
                    <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate-400">
                        Fern routes a GraphQL schema through the same intermediate representation as REST,
                        then emits a TypeScript client with typed field selection, selection-inferred results,
                        auto-pagination, subscriptions, and more — riding the runtime, docs, and publishing you
                        already get from Fern.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <a
                            href="#pipeline"
                            className="rounded-xl bg-fern px-5 py-3 text-sm font-semibold text-ink transition hover:bg-fern/90 glow-fern"
                        >
                            See how it works
                        </a>
                        <a
                            href="#playground"
                            className="rounded-xl border border-line bg-panel px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-fern/40 hover:text-fern"
                        >
                            Try the playground
                        </a>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-xs text-slate-500">
                        {FLOW.map((step, index) => (
                            <span key={step} className="flex items-center gap-2">
                                <motion.span
                                    initial={{ opacity: 0.3 }}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.5 }}
                                    className="rounded-md border border-line bg-panel px-2.5 py-1 text-slate-300"
                                >
                                    {step}
                                </motion.span>
                                {index < FLOW.length - 1 && <span className="text-fern/60">→</span>}
                            </span>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                >
                    <CodeBlock title="example.ts" lang="typescript" code={HERO_SNIPPET} className="glow-fern" />
                </motion.div>
            </motion.div>
        </div>
    );
}
