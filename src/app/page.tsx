import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceCareerSection } from "@/components/sections/ExperienceCareerSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ExperienceCareerSection />
      <FeaturedProjects />
      <ContactSection />
    </>
  );
}
