import { AboutSection } from "@/components/sections/AboutSection";
import { BuildsSection } from "@/components/sections/BuildsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceCareerSection } from "@/components/sections/ExperienceCareerSection";
import { FailedExperimentsSection } from "@/components/sections/FailedExperimentsSection";
import { Hero } from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ExperienceCareerSection />
      <FailedExperimentsSection />
      <BuildsSection />
      <ContactSection />
    </>
  );
}
