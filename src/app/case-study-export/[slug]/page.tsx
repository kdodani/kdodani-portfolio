import { CaseStudyDocument } from "@/components/case-studies/CaseStudyDocument";
import { CASE_STUDY_SLUGS, getCaseStudyBySlug } from "@/content/case-studies";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  return {
    title: `${study.title} — Case Study`,
    description: study.oneLiner,
  };
}

export default async function CaseStudyExportPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  return <CaseStudyDocument study={study} />;
}
