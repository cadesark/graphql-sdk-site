import type React from "react";
import { motion } from "framer-motion";
import { PYTHON_FEATURES, TS_VS_PYTHON } from "../data/content.ts";
import { CodeBlock } from "./CodeBlock.tsx";
import { Section } from "./Section.tsx";

export function PythonShowcase(): React.JSX.Element {
    return (
        <Section
            id="python"
            eyebrow="Second language · shipped"
            title={
                <>
                    Now in <span className="text-fern">Python</span> — the same IR, an idiomatic emitter
                </>
            }
            description="Python is the second emitter on the same GraphQL→IR pipeline, proving it's language-agnostic — not a TypeScript-only trick. The API is idiomatic per language (fluent builders + Pydantic), not identical."
        >
            {/* feature grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {PYTHON_FEATURES.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                        className="flex flex-col rounded-2xl border border-line bg-panel/60 p-5"
                    >
                        <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                        <p className="mt-2 mb-4 flex-1 text-sm leading-relaxed text-slate-400">{feature.blurb}</p>
                        <CodeBlock lang={feature.snippet.lang} code={feature.snippet.code} />
                    </motion.div>
                ))}
            </div>

            {/* TS vs Python: same op, different idiom */}
            <h3 className="mb-5 mt-14 text-xl font-semibold text-white">Same operation, per-language idiom</h3>
            <div className="grid gap-4 lg:grid-cols-2">
                <div>
                    <p className="mb-2 flex items-center gap-2 font-mono text-xs text-cyan">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan" /> TypeScript — compile-time inference
                    </p>
                    <CodeBlock
                        lang="typescript"
                        code={`const { data } = await client.query.product(
  { id: "p-42" },
  { name: true, price: true,
    reviews: { __args: { first: 5 }, rating: true } },
);
// data narrowed to exactly the selected fields`}
                    />
                </div>
                <div>
                    <p className="mb-2 flex items-center gap-2 font-mono text-xs text-fern">
                        <span className="h-1.5 w-1.5 rounded-full bg-fern" /> Python — fluent builder
                    </p>
                    <CodeBlock
                        lang="python"
                        code={`product = client.query.product(
    id="p-42",
    selection=lambda p: p.name().price().reviews(
        lambda r: r.rating(), args={"first": 5}
    ),
)
# typed Pydantic model; runtime-validated`}
                    />
                </div>
            </div>

            {/* diff table */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-panel/40">
                <div className="grid grid-cols-[1fr_1.3fr_1.3fr] gap-px bg-line text-sm">
                    <div className="bg-panel px-5 py-3 font-mono text-xs uppercase tracking-widest text-slate-500">
                        Aspect
                    </div>
                    <div className="bg-panel px-5 py-3 font-semibold text-cyan">TypeScript</div>
                    <div className="bg-panel px-5 py-3 font-semibold text-fern">Python</div>
                    {TS_VS_PYTHON.map((row) => (
                        <Row key={row.aspect} aspect={row.aspect} ts={row.typescript} py={row.python} />
                    ))}
                </div>
            </div>

            <p className="mx-auto mt-10 max-w-3xl text-pretty text-center text-sm leading-relaxed text-slate-500">
                The honest boundary (per the design): schema <span className="text-slate-300">analysis</span> collapses
                to one shared IR, but the <span className="text-slate-300">selection-materialization engine</span> is
                genuinely per-language — TypeScript inference vs. Python builder classes. Each is precise; neither is
                identical. That's the cost of idiomatic, multi-language SDKs from one definition.
            </p>
        </Section>
    );
}

function Row({ aspect, ts, py }: { aspect: string; ts: string; py: string }): React.JSX.Element {
    return (
        <>
            <div className="bg-ink-soft/40 px-5 py-3.5 font-mono text-xs text-slate-500">{aspect}</div>
            <div className="bg-ink-soft/40 px-5 py-3.5 text-slate-300">{ts}</div>
            <div className="bg-ink-soft/40 px-5 py-3.5 text-slate-300">{py}</div>
        </>
    );
}
