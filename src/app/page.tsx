import { AboutSection } from "@/components/sections/AboutSection";
import { BuildsSection } from "@/components/sections/BuildsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceCareerSection } from "@/components/sections/ExperienceCareerSection";
import { Hero } from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ExperienceCareerSection />
      <BuildsSection />
      <ContactSection />
    </>
  );
}
