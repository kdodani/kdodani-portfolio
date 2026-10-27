import type { CaseStudy } from "./types";

export const CASE_STUDY_SLUGS = [
  "oscar-emr-api-integration",
  "referral-radar",
  "treatment-extension-requests",
  "provider-invoice-submission",
] as const;

export type { CaseStudySlug } from "./types";

export { oscarEmrCaseStudy } from "./oscar-emr";
export { referralRadarCaseStudy } from "./referral-radar";
export { treatmentExtensionCaseStudy } from "./treatment-extension";
export { providerInvoiceCaseStudy } from "./provider-invoice";

import { oscarEmrCaseStudy } from "./oscar-emr";
import { referralRadarCaseStudy } from "./referral-radar";
import { treatmentExtensionCaseStudy } from "./treatment-extension";
import { providerInvoiceCaseStudy } from "./provider-invoice";

const studies: Record<string, CaseStudy> = {
  "oscar-emr-api-integration": oscarEmrCaseStudy,
  "referral-radar": referralRadarCaseStudy,
  "treatment-extension-requests": treatmentExtensionCaseStudy,
  "provider-invoice-submission": providerInvoiceCaseStudy,
};

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return studies[slug];
}
