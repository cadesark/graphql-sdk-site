import type React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FEATURES, type Feature } from "../data/content.ts";
import { CodeBlock } from "./CodeBlock.tsx";
import { Section } from "./Section.tsx";

function FeatureCard({ feature, index }: { feature: Feature; index: number }): React.JSX.Element {
    const [flipped, setFlipped] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
            className="min-h-[15rem]"
            style={{ perspective: "1200px" }}
        >
            <motion.div
                className="relative h-full w-full cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
                onClick={() => setFlipped((value) => !value)}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 flex flex-col rounded-2xl border border-line bg-panel/60 p-6 transition hover:border-fern/30"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-fern/10 font-mono text-sm font-bold text-fern ring-1 ring-fern/25">
                        {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{feature.blurb}</p>
                    <span className="mt-4 font-mono text-[11px] text-slate-500">tap for code →</span>
                </div>
                {/* Back */}
                <div
                    className="absolute inset-0 flex flex-col rounded-2xl border border-fern/30 bg-ink-soft p-4"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <p className="mb-2 px-1 font-mono text-[11px] uppercase tracking-widest text-fern">
                        {feature.title}
                    </p>
                    <div className="flex-1 overflow-hidden">
                        <CodeBlock lang={feature.snippet.lang} code={feature.snippet.code} />
                    </div>
                    <span className="mt-2 px-1 font-mono text-[11px] text-slate-500">← tap to flip back</span>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function FeatureGallery(): React.JSX.Element {
    return (
        <Section
            id="features"
            eyebrow="Feature gallery"
            title="Everything a GraphQL consumer expects — generated"
            description="Each capability is emitted only when the schema actually supports it. Tap a card to see the generated code."
        >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {FEATURES.map((feature, index) => (
                    <FeatureCard key={feature.title} feature={feature} index={index} />
                ))}
            </div>
        </Section>
    );
}
