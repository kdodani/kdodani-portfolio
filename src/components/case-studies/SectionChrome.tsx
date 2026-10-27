import { SECTION_HEADING, SECTION_LABEL } from "./styles";

export function GradientBar() {
  return (
    <span
      aria-hidden
      className="inline-block h-px w-4 rounded-full bg-gradient-to-r from-[#6D5EF5] to-[#4F8CFF]"
    />
  );
}

export function SectionLabel({ children }: { children: string }) {
  return <p className={SECTION_LABEL}>{children}</p>;
}

export function SectionHeading({ children }: { children: string }) {
  return <h2 className={SECTION_HEADING}>{children}</h2>;
}

export function SectionBlock({
  id,
  label,
  heading,
  children,
}: {
  id: string;
  label: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="print:break-inside-avoid">
      <SectionLabel>{label}</SectionLabel>
      <SectionHeading>{heading}</SectionHeading>
      {children}
    </section>
  );
}
