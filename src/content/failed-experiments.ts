export type FailedExperiment = {
  id: string;
  title: string;
  originalAssumption: string;
  reality: string;
  whyItHappened: string;
  learning: string;
};

export const failedExperiments: FailedExperiment[] = [
  {
    id: "shipped-better-adoption-zero",
    title: "We Shipped a Better Product. Adoption Stayed at Zero.",
    originalAssumption:
      "We believed the redesigned invoicing experience would naturally increase adoption because it reduced the workflow from 11 screens to 5 and introduced features like multi-claim submission and duplicate line items.",
    reality:
      "The first month after launch saw almost no adoption. Many providers either continued using paper or used the new tool exactly like the old one. We later discovered users didn't recognize the duplicate-line icon, so they manually re-entered patient information instead of using one of the biggest time-saving features.",
    whyItHappened:
      "We assumed shipping better features was enough. We underestimated discoverability, onboarding, and observing real user behavior after launch.",
    learning:
      "Launching is the beginning of learning, not the finish line. Great features only create value if users can discover, understand, and confidently use them.",
  },
  {
    id: "segmentation-beyond-roadmap",
    title: "Segmentation Doesn't End With The Roadmap.",
    originalAssumption:
      "We segmented providers to prioritize which workflows to build first, assuming the same launch messaging would work for everyone.",
    reality:
      "Different provider groups had completely different reasons for not adopting. Hearing aid providers, for example, still had to leave their EMR to use our portal, so the release solved little of their actual problem.",
    whyItHappened:
      "We segmented product development but not product marketing. A single value proposition couldn't support workflows at different stages of maturity.",
    learning:
      "Customer segmentation shouldn't stop at prioritization. Every segment needs its own messaging, launch strategy, and value proposition.",
  },
  {
    id: "scaling-is-performance",
    title: "Scaling Isn't Just Capacity. It's Performance.",
    originalAssumption:
      "Success meant allowing providers to submit significantly more invoice line items in a single session.",
    reality:
      "Although the system supported much larger workloads, performance degraded as usage increased. Larger sessions became noticeably slower, creating a worse experience after launch.",
    whyItHappened:
      "We optimized for capacity but didn't give equal attention to responsiveness. Scaling the workload without scaling performance still feels broken to users.",
    learning:
      "Scalability and performance should be treated as one problem. A product isn't truly scalable if the experience degrades as customers grow.",
  },
  {
    id: "prototype-desirability-not-feasibility",
    title: "A Prototype Validates Desirability, Not Feasibility.",
    originalAssumption:
      "To reduce the workflow from 11 screens to 5, I consolidated information onto a single invoice entry screen. AI-assisted prototypes validated the interaction and it appeared significantly simpler.",
    reality:
      "During implementation we discovered the legacy Kendo Grid couldn't support the design as cleanly as expected. Adding more columns created usability, accessibility, and layout challenges that weren't obvious during prototyping.",
    whyItHappened:
      "We invested more time validating the future experience than understanding the limitations of the existing technology.",
    learning:
      "Prototypes validate whether users want a solution—not whether it can be implemented cleanly. Technical discovery should happen alongside UX exploration, especially when working with legacy systems.",
  },
];
