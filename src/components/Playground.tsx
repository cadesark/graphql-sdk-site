import type React from "react";
import { useMemo, useState } from "react";
import { CodeBlock } from "./CodeBlock.tsx";
import { Section } from "./Section.tsx";

interface FieldDef {
    name: string;
    tsType: string;
    gqlType: string;
}

const POST_SCALARS: FieldDef[] = [
    { name: "id", tsType: "string", gqlType: "ID!" },
    { name: "title", tsType: "string", gqlType: "String!" },
    { name: "body", tsType: "string", gqlType: "String!" },
    { name: "publishedAt", tsType: "string | null", gqlType: "DateTime" },
    { name: "viewCount", tsType: "number", gqlType: "Int!" },
    { name: "tags", tsType: "string[]", gqlType: "[String!]!" }
];

const AUTHOR_FIELDS: FieldDef[] = [
    { name: "id", tsType: "string", gqlType: "ID!" },
    { name: "name", tsType: "string", gqlType: "String!" },
    { name: "email", tsType: "string", gqlType: "String!" }
];

const SCHEMA = `type Query {
  post(id: ID!): Post
}

type Post {
  id: ID!
  title: String!
  body: String!
  publishedAt: DateTime
  viewCount: Int!
  tags: [String!]!
  author: User!
}

type User {
  id: ID!
  name: String!
  email: String!
}`;

type Selection = Record<string, boolean>;

function buildQuery(post: Selection, author: Selection): string {
    const postLines = POST_SCALARS.filter((field) => post[field.name]).map((field) => `    ${field.name}`);
    const authorSelected = AUTHOR_FIELDS.filter((field) => author[field.name]);
    if (authorSelected.length > 0) {
        postLines.push("    author {");
        for (const field of authorSelected) {
            postLines.push(`      ${field.name}`);
        }
        postLines.push("    }");
    }
    if (postLines.length === 0) {
        postLines.push("    # select a field →");
    }
    return `query Post($id: ID!) {\n  post(id: $id) {\n${postLines.join("\n")}\n  }\n}`;
}

function buildType(post: Selection, author: Selection): string {
    const lines = POST_SCALARS.filter((field) => post[field.name]).map(
        (field) => `    ${field.name}: ${field.tsType};`
    );
    const authorSelected = AUTHOR_FIELDS.filter((field) => author[field.name]);
    if (authorSelected.length > 0) {
        lines.push("    author: {");
        for (const field of authorSelected) {
            lines.push(`      ${field.name}: ${field.tsType};`);
        }
        lines.push("    };");
    }
    if (lines.length === 0) {
        return `{\n  post: {} | null;\n}`;
    }
    return `{\n  post: {\n${lines.join("\n")}\n  } | null;\n}`;
}

function Toggle({ label, sub, on, onClick }: { label: string; sub: string; on: boolean; onClick: () => void }): React.JSX.Element {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left font-mono text-xs transition ${
                on
                    ? "border-fern/50 bg-fern/10 text-fern"
                    : "border-line bg-ink-soft/60 text-slate-400 hover:border-slate-600 hover:text-slate-200"
            }`}
        >
            <span>{label}</span>
            <span className={`ml-2 text-[10px] ${on ? "text-fern/70" : "text-slate-600"}`}>{sub}</span>
        </button>
    );
}

export function Playground(): React.JSX.Element {
    const [post, setPost] = useState<Selection>({ id: true, title: true });
    const [author, setAuthor] = useState<Selection>({ name: true });

    const query = useMemo(() => buildQuery(post, author), [post, author]);
    const type = useMemo(() => buildType(post, author), [post, author]);

    const togglePost = (name: string): void => setPost((prev) => ({ ...prev, [name]: !prev[name] }));
    const toggleAuthor = (name: string): void => setAuthor((prev) => ({ ...prev, [name]: !prev[name] }));

    return (
        <Section
            id="playground"
            eyebrow="Playground"
            title="Toggle a selection, watch the type narrow"
            description="This runs entirely in your browser — flip fields on the left and both the generated GraphQL document and the inferred TypeScript result type update live. That's exactly what the SDK does at call time and at compile time."
        >
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                {/* Controls */}
                <div className="space-y-5">
                    <div className="rounded-2xl border border-line bg-panel/50 p-5">
                        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-slate-500">
                            client.query.post — select
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {POST_SCALARS.map((field) => (
                                <Toggle
                                    key={field.name}
                                    label={field.name}
                                    sub={field.gqlType}
                                    on={Boolean(post[field.name])}
                                    onClick={() => togglePost(field.name)}
                                />
                            ))}
                        </div>
                        <p className="mb-2 mt-5 font-mono text-xs uppercase tracking-widest text-slate-500">
                            author &#123; … &#125;
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {AUTHOR_FIELDS.map((field) => (
                                <Toggle
                                    key={field.name}
                                    label={field.name}
                                    sub={field.gqlType}
                                    on={Boolean(author[field.name])}
                                    onClick={() => toggleAuthor(field.name)}
                                />
                            ))}
                        </div>
                    </div>
                    <details className="group rounded-2xl border border-line bg-panel/30 p-5">
                        <summary className="cursor-pointer font-mono text-xs uppercase tracking-widest text-slate-500 transition group-open:text-fern">
                            schema.graphql
                        </summary>
                        <div className="mt-3">
                            <CodeBlock lang="graphql" code={SCHEMA} />
                        </div>
                    </details>
                </div>

                {/* Outputs */}
                <div className="space-y-4">
                    <div>
                        <p className="mb-2 flex items-center gap-2 font-mono text-xs text-cyan">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan" /> generated GraphQL document
                        </p>
                        <CodeBlock lang="graphql" code={query} />
                    </div>
                    <div>
                        <p className="mb-2 flex items-center gap-2 font-mono text-xs text-fern">
                            <span className="h-1.5 w-1.5 rounded-full bg-fern" /> inferred result type — Result&lt;Post, S&gt;
                        </p>
                        <CodeBlock lang="typescript" code={`// data is typed to exactly what you selected\ntype Data = ${type}`} />
                    </div>
                </div>
            </div>
        </Section>
    );
}
