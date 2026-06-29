import type React from "react";
import { motion } from "framer-motion";

interface SectionProps {
    id: string;
    eyebrow: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    children: React.ReactNode;
}

export function Section({ id, eyebrow, title, description, children }: SectionProps): React.JSX.Element {
    return (
        <section id={id} className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 sm:py-28">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
            >
                <div className="mb-3 flex items-center gap-3">
                    <span className="h-px w-8 bg-fern/60" />
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-fern">{eyebrow}</span>
                </div>
                <h2 className="max-w-3xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {title}
                </h2>
                {description != null && (
                    <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-400">
                        {description}
                    </p>
                )}
            </motion.div>
            <div className="mt-12">{children}</div>
        </section>
    );
}
