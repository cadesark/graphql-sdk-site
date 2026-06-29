import type React from "react";
import { Comparison } from "./components/Comparison.tsx";
import { FeatureGallery } from "./components/FeatureGallery.tsx";
import { Footer } from "./components/Footer.tsx";
import { Hero } from "./components/Hero.tsx";
import { MultiLanguage } from "./components/MultiLanguage.tsx";
import { Nav } from "./components/Nav.tsx";
import { Pipeline } from "./components/Pipeline.tsx";
import { Playground } from "./components/Playground.tsx";
import { PythonShowcase } from "./components/PythonShowcase.tsx";

export function App(): React.JSX.Element {
    return (
        <>
            <Nav />
            <main>
                <Hero />
                <Pipeline />
                <Playground />
                <FeatureGallery />
                <Comparison />
                <MultiLanguage />
                <PythonShowcase />
            </main>
            <Footer />
        </>
    );
}
