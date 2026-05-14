import { HomeHashLink } from "@/components/layout/HomeHashLink";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-scene px-page-x pb-16 pt-8 sm:pt-10 lg:pb-20">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
        Case study · {project.year}
      </p>
      <h1 className="font-display mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl">
        {project.title}
      </h1>
      <p className="mt-2 text-[15px] font-medium leading-snug text-accent/90 sm:text-base">
        {project.tagline}
      </p>
      <p className="mt-8 max-w-editorial text-[15px] leading-[1.72] text-stone-600 sm:text-base sm:leading-[1.7]">
        {project.summary}
      </p>
      <p className="mt-10 text-sm text-stone-500">
        Full write-up coming soon.{" "}
        <HomeHashLink
          sectionId="experience"
          className="font-medium text-accent underline-offset-4 hover:text-accent-strong hover:underline"
        >
          Back to experience
        </HomeHashLink>
      </p>
    </article>
  );
}
