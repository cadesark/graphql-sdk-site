import type React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PIPELINE_STAGES, type PipelineStage } from "../data/content.ts";
import { CodeBlock } from "./CodeBlock.tsx";
import { Section } from "./Section.tsx";

const ACCENT: Record<PipelineStage["accent"], { text: string; ring: string; dot: string; glow: string }> = {
    fern: { text: "text-fern", ring: "ring-fern/40", dot: "bg-fern", glow: "shadow-[0_0_30px_-10px_rgba(45,212,167,0.6)]" },
    cyan: { text: "text-cyan", ring: "ring-cyan/40", dot: "bg-cyan", glow: "shadow-[0_0_30px_-10px_rgba(56,189,248,0.6)]" },
    violet: { text: "text-violet", ring: "ring-violet/40", dot: "bg-violet", glow: "shadow-[0_0_30px_-10px_rgba(167,139,250,0.6)]" },
    amber: { text: "text-amber", ring: "ring-amber/40", dot: "bg-amber", glow: "shadow-[0_0_30px_-10px_rgba(251,191,36,0.6)]" }
};

export function Pipeline(): React.JSX.Element {
    const [active, setActive] = useState<string>(PIPELINE_STAGES[0].id);
    const activeStage = PIPELINE_STAGES.find((stage) => stage.id === active) ?? PIPELINE_STAGES[0];

    return (
        <Section
            id="pipeline"
            eyebrow="The pipeline"
            title="Four stages, one of them language-specific"
            description="Stages 1–3 are entirely language-agnostic — they end at the IR. Only stage 4 knows it's emitting TypeScript. Click a stage to expand it."
        >
            {/* Stage rail */}
            <div className="relative grid gap-4 md:grid-cols-4">
                {/* connector line */}
                <div className="pointer-events-none absolute left-0 right-0 top-[2.05rem] hidden h-px bg-line md:block" />
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute top-[1.85rem] hidden h-2.5 w-2.5 rounded-full bg-fern md:block"
                    initial={{ left: "4%" }}
                    animate={{ left: ["2%", "32%", "62%", "92%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    style={{ boxShadow: "0 0 14px 3px rgba(45,212,167,0.7)" }}
                />

                {PIPELINE_STAGES.map((stage) => {
                    const accent = ACCENT[stage.accent];
                    const isActive = stage.id === active;
                    return (
                        <button
                            key={stage.id}
                            onClick={() => setActive(stage.id)}
                            className={`relative z-10 rounded-2xl border bg-panel/70 p-5 text-left backdrop-blur transition ${
                                isActive
                                    ? `border-transparent ring-2 ${accent.ring} ${accent.glow}`
                                    : "border-line hover:border-slate-600"
                            }`}
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className={`grid h-9 w-9 place-items-center rounded-full bg-ink font-mono text-sm font-bold ring-1 ${accent.ring} ${accent.text}`}>
                                    {stage.index}
                                </span>
                                <span className={`h-2 w-2 rounded-full ${isActive ? accent.dot : "bg-line"}`} />
                            </div>
                            <h3 className="text-base font-semibold text-white">{stage.title}</h3>
                            <p className="mt-1 text-sm text-slate-400">{stage.summary}</p>
                            <p className={`mt-3 font-mono text-[11px] ${accent.text}`}>{stage.tag}</p>
                        </button>
                    );
                })}
            </div>

            {/* Expanded detail */}
            <div className="mt-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStage.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="grid gap-6 rounded-2xl border border-line bg-panel/40 p-6 lg:grid-cols-2 lg:p-8"
                    >
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <span className={`font-mono text-xs ${ACCENT[activeStage.accent].text}`}>
                                    stage {activeStage.index}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white">{activeStage.title}</h3>
                            <p className="mt-3 text-pretty leading-relaxed text-slate-400">{activeStage.detail}</p>
                            <ul className="mt-5 space-y-2">
                                {activeStage.bullets.map((bullet) => (
                                    <li key={bullet} className="flex items-start gap-2.5 text-sm text-slate-300">
                                        <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${ACCENT[activeStage.accent].dot}`} />
                                        <span className="font-mono text-[13px]">{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="self-center">
                            <CodeBlock lang={activeStage.snippet.lang} code={activeStage.snippet.code} />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </Section>
    );
}
