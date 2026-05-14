export type ExperienceEntry = {
  period: string;
  organization: string;
  role: string;
  summary: string;
  listLabel: "Focused on" | "Projects included";
  bullets: string[];
};

export const experienceEntries: ExperienceEntry[] = [
  {
    period: "April 2024 – Present",
    organization: "WorkSafeBC",
    role: "Product Manager — Provider Experience",
    summary:
      "Leading growth, platform modernization, and AI innovation initiatives for healthcare provider systems supporting referrals, invoicing, and claims workflows.",
    listLabel: "Focused on",
    bullets: [
      "Driving digital adoption and reducing operational friction",
      "Modernizing identity and API infrastructure",
      "Exploring AI-assisted decision support systems",
    ],
  },
  {
    period: "October 2021 – April 2024",
    organization: "Technical Safety BC",
    role: "Product Manager",
    summary:
      "Led growth, retention, and innovation initiatives focused on customer engagement, experimentation, and operational scalability.",
    listLabel: "Focused on",
    bullets: [
      "Churn and retention analytics",
      "Segmentation-driven engagement strategies",
      "Product-market fit experimentation",
    ],
  },
  {
    period: "September 2020 – October 2021",
    organization: "University of British Columbia",
    role: "Strategy Consultant (180 Degrees Consulting)",
    summary:
      "Worked with mission-driven organizations on growth strategy, market research, and policy analysis projects.",
    listLabel: "Projects included",
    bullets: [
      "Conversion funnel optimization",
      "Market expansion strategy",
      "Policy and economic analysis",
    ],
  },
  {
    period: "May 2018 – July 2019",
    organization: "Convertus",
    role: "SEO Consultant",
    summary:
      "Developed organic growth strategies across 75+ websites and launched an SEO forecasting tool to support performance planning and experimentation.",
    listLabel: "Focused on",
    bullets: [
      "Search growth strategy",
      "Performance analytics",
      "Experimentation and forecasting",
    ],
  },
];
