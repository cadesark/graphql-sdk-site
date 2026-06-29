import type React from "react";
import { motion } from "framer-motion";
import { VS_OPENAPI, VS_TOOLS } from "../data/content.ts";
import { Section } from "./Section.tsx";

export function Comparison(): React.JSX.Element {
    return (
        <Section
            id="compare"
            eyebrow="How it compares"
            title="Same engine as REST. Different shape on top."
            description="The GraphQL SDK is the same generator, IR, and runtime as the OpenAPI SDK — it inherits auth, retries, base-URL resolution, docs, and publishing. Only a thin GraphQL-shaped layer differs."
        >
            {/* vs OpenAPI */}
            <div className="overflow-hidden rounded-2xl border border-line bg-panel/40">
                <div className="grid grid-cols-[1.1fr_1.4fr_1.6fr] gap-px bg-line text-sm">
                    <div className="bg-panel px-5 py-3 font-mono text-xs uppercase tracking-widest text-slate-500">
                        Aspect
                    </div>
                    <div className="bg-panel px-5 py-3 font-semibold text-slate-300">OpenAPI SDK</div>
                    <div className="bg-panel px-5 py-3 font-semibold text-fern">GraphQL SDK</div>
                    {VS_OPENAPI.map((row) => (
                        <Row key={row.aspect} aspect={row.aspect} rest={row.rest} graphql={row.graphql} />
                    ))}
                </div>
            </div>

            {/* vs tools */}
            <h3 className="mb-5 mt-14 text-xl font-semibold text-white">vs. GraphQL codegen tools</h3>
            <div className="grid gap-4 md:grid-cols-2">
                {VS_TOOLS.map((tool, index) => (
                    <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, delay: (index % 2) * 0.08 }}
                        className="rounded-2xl border border-line bg-panel/50 p-6"
                    >
                        <div className="flex items-baseline justify-between gap-3">
                            <h4 className="font-mono text-base font-semibold text-white">{tool.name}</h4>
                            <span className="shrink-0 rounded-full border border-line bg-ink px-2.5 py-1 text-[11px] text-slate-400">
                                {tool.kind}
                            </span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-slate-400">{tool.note}</p>
                        <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-fern/20 bg-fern/5 px-3.5 py-2.5">
                            <span className="mt-0.5 text-fern">→</span>
                            <p className="text-sm leading-relaxed text-slate-200">{tool.fernEdge}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <p className="mx-auto mt-12 max-w-3xl text-pretty text-center text-sm leading-relaxed text-slate-500">
                <span className="text-slate-300">Where Fern wins:</span> the platform play — one schema → typed
                clients in multiple languages, plus hosted docs, an API reference, and publishing, with GraphQL and
                REST unified in one client and one auth story.{" "}
                <span className="text-slate-300">Where dedicated tools still lead:</span> depth of GraphQL-native
                ergonomics (fragments-as-files, directives, @defer/@stream, persisted-query tooling) and — for now —
                breadth of language emitters.
            </p>
        </Section>
    );
}

function Row({ aspect, rest, graphql }: { aspect: string; rest: string; graphql: string }): React.JSX.Element {
    return (
        <>
            <div className="bg-ink-soft/40 px-5 py-3.5 font-mono text-xs text-slate-500">{aspect}</div>
            <div className="bg-ink-soft/40 px-5 py-3.5 text-slate-400">{rest}</div>
            <div className="bg-ink-soft/40 px-5 py-3.5 text-slate-200">{graphql}</div>
        </>
    );
}
