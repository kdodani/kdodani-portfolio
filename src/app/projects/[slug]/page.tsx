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
    <article className="mx-auto max-w-3xl px-6 pb-16 pt-8 sm:px-8 sm:pt-10 lg:px-10 lg:pb-20">
      <p className="text-xs font-medium uppercase tracking-widest text-stone-500">
        Case study · {project.year}
      </p>
      <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
        {project.title}
      </h1>
      <p className="mt-2 text-lg text-violet-700/90">{project.tagline}</p>
      <p className="mt-8 text-stone-600">{project.summary}</p>
      <p className="mt-10 text-sm text-stone-500">
        Full write-up coming soon.{" "}
        <HomeHashLink
          sectionId="experience"
          className="font-medium text-violet-700 underline-offset-4 hover:text-violet-800 hover:underline"
        >
          Back to experience
        </HomeHashLink>
      </p>
    </article>
  );
}
