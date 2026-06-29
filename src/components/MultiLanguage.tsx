import type React from "react";
import { motion } from "framer-motion";
import { LANGUAGES } from "../data/content.ts";
import { Section } from "./Section.tsx";

export function MultiLanguage(): React.JSX.Element {
    return (
        <Section
            id="languages"
            eyebrow="Multi-language outlook"
            title="One schema. One IR. Many languages."
            description="Stages 1–3 are language-agnostic — the merged IR already carries the GraphQL transport, the variableDefinitions/arguments needed to rebuild queries, field-argument metadata for pagination, custom-scalar mappings, and deprecations. A new language re-implements only stage 4."
        >
            <div className="rounded-2xl border border-line bg-panel/40 p-8">
                <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr]">
                    {/* schema → IR node */}
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl border border-cyan/30 bg-cyan/5 px-4 py-3 text-center">
                            <p className="font-mono text-xs text-cyan">schema</p>
                            <p className="mt-1 text-[11px] text-slate-500">SDL / JSON</p>
                        </div>
                        <span className="text-fern/60">→</span>
                        <div className="rounded-xl border border-fern/40 bg-fern/10 px-5 py-3 text-center glow-fern">
                            <p className="font-mono text-xs font-semibold text-fern">Fern IR</p>
                            <p className="mt-1 text-[11px] text-slate-500">language-agnostic</p>
                        </div>
                        <span className="hidden text-fern/60 lg:inline">→</span>
                    </div>

                    {/* language emitters */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                        {LANGUAGES.map((language, index) => (
                            <motion.div
                                key={language.name}
                                initial={{ opacity: 0, scale: 0.92 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: index * 0.07 }}
                                className={`rounded-xl border p-4 text-center ${
                                    language.status === "done"
                                        ? "border-fern/40 bg-fern/10"
                                        : "border-line bg-ink-soft/50"
                                }`}
                            >
                                <p
                                    className={`text-sm font-semibold ${
                                        language.status === "done" ? "text-white" : "text-slate-400"
                                    }`}
                                >
                                    {language.name}
                                </p>
                                <p
                                    className={`mt-1.5 font-mono text-[10px] uppercase tracking-wider ${
                                        language.status === "done" ? "text-fern" : "text-slate-600"
                                    }`}
                                >
                                    {language.status === "done" ? "● shipped" : "○ next"}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <p className="mt-8 border-t border-line pt-6 text-pretty text-sm leading-relaxed text-slate-400">
                    A second emitter (Python is the natural next target) re-implements only the selection types, the
                    grouped client surface, and the small <span className="font-mono text-fern">core/graphql</span>{" "}
                    runtime — proving the design is language-agnostic rather than TypeScript-specific.
                </p>
            </div>
        </Section>
    );
}
