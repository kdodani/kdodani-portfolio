"""Parachute Health - Senior Product Manager, Provider Experience.

Tailored from the portfolio case studies and the metrics on the base resume.
Does not claim DME / home-medical-equipment experience, a startup employer, or 7+ years
of PM tenure. Referral Radar is described as a validated 0-to-1 prototype, not shipped.
FHIR is described as the documented upgrade path, not as shipped. Omits the unvalidated
~$20M / ~40% figures. Same visual template as the other tailored resumes.
"""
from docx import Document
from docx.shared import Pt, RGBColor, Inches, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

doc = Document()

for section in doc.sections:
    section.page_width = Inches(8.5)
    section.page_height = Inches(11)
    section.top_margin = Cm(1.25)
    section.bottom_margin = Cm(1.15)
    section.left_margin = Cm(1.7)
    section.right_margin = Cm(1.7)

DARK = RGBColor(0x1C, 0x19, 0x17)
MID = RGBColor(0x5B, 0x21, 0xB6)
ACCENT = RGBColor(0x6D, 0x28, 0xD9)
BODY = RGBColor(0x44, 0x40, 0x3C)
LIGHT = RGBColor(0x78, 0x71, 0x6C)
INDIGO = RGBColor(0x4F, 0x46, 0xE5)
BG_HEX = "FAF9F6"

LINKEDIN_URL = "https://www.linkedin.com/in/khushdodani"
GITHUB_URL = "https://github.com/kdodani"
PORTFOLIO_URL = "https://kdodani-portfolio.vercel.app"


def set_page_background(document, hex_color):
    body_elem = document.element.body
    doc_elem = body_elem.getparent()
    bg = OxmlElement("w:background")
    bg.set(qn("w:color"), hex_color)
    doc_elem.insert(0, bg)
    settings = document.settings.element
    disp = OxmlElement("w:displayBackgroundShape")
    settings.insert(0, disp)


set_page_background(doc, BG_HEX)


def set_run_font(run, size, color, bold=False, italic=False):
    run.bold = bold
    run.italic = italic
    run.font.size = Pt(size)
    run.font.color.rgb = color
    run.font.name = "Calibri"
    rPr = run._element.get_or_add_rPr()
    rFonts = rPr.find(qn("w:rFonts"))
    if rFonts is None:
        rFonts = OxmlElement("w:rFonts")
        rPr.append(rFonts)
    rFonts.set(qn("w:ascii"), "Calibri")
    rFonts.set(qn("w:hAnsi"), "Calibri")
    rFonts.set(qn("w:cs"), "Calibri")


def clear_paragraph_space(p, before=0, after=0):
    pf = p.paragraph_format
    pf.space_before = Pt(before)
    pf.space_after = Pt(after)
    pf.line_spacing_rule = WD_LINE_SPACING.SINGLE
    pf.line_spacing = 1.0


def add_horizontal_rule(document, color=ACCENT, thickness=6, keep_with_next=False):
    p = document.add_paragraph()
    clear_paragraph_space(p, before=1, after=1)
    p.paragraph_format.keep_with_next = keep_with_next
    pPr = p._p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), str(thickness))
    bottom.set(qn("w:space"), "1")
    bottom.set(qn("w:color"), f"{color[0]:02X}{color[1]:02X}{color[2]:02X}")
    pBdr.append(bottom)
    pPr.append(pBdr)
    return p


def heading(document, text, size=10.5, space_before=6, space_after=1):
    p = document.add_paragraph()
    clear_paragraph_space(p, before=space_before, after=space_after)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text.upper())
    set_run_font(run, size, ACCENT, bold=True)
    return p


def subheading(document, role, org, period, size=10.5, keep_with_next=True):
    p = document.add_paragraph()
    clear_paragraph_space(p, before=3, after=0)
    p.paragraph_format.keep_with_next = keep_with_next
    r1 = p.add_run(f"{role}  |  {org}")
    set_run_font(r1, size, DARK, bold=True)
    r2 = p.add_run(f"    {period}")
    set_run_font(r2, 9, LIGHT)
    return p


def sublabel(document, text, size=9, space_before=2, space_after=0):
    p = document.add_paragraph()
    clear_paragraph_space(p, before=space_before, after=space_after)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    set_run_font(run, size, INDIGO, italic=True)
    return p


def bullet(document, text, size=9.5):
    p = document.add_paragraph(style="List Bullet")
    clear_paragraph_space(p, before=0, after=0)
    p.paragraph_format.left_indent = Inches(0.35)
    p.paragraph_format.first_line_indent = Inches(-0.15)
    run = p.add_run(text)
    set_run_font(run, size, BODY)
    return p


def body(document, text, size=9.5, color=BODY, space_before=2, space_after=2, italic=False, keep_with_next=False):
    p = document.add_paragraph()
    clear_paragraph_space(p, before=space_before, after=space_after)
    p.paragraph_format.keep_with_next = keep_with_next
    run = p.add_run(text)
    set_run_font(run, size, color, italic=italic)
    return p


def add_hyperlink(paragraph, text, url, font_size=Pt(9), color=LIGHT):
    part = paragraph.part
    r_id = part.relate_to(
        url,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        is_external=True,
    )
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), r_id)

    new_run = OxmlElement("w:r")
    rPr = OxmlElement("w:rPr")

    rFonts = OxmlElement("w:rFonts")
    rFonts.set(qn("w:ascii"), "Calibri")
    rFonts.set(qn("w:hAnsi"), "Calibri")
    rFonts.set(qn("w:cs"), "Calibri")
    rPr.append(rFonts)

    color_elem = OxmlElement("w:color")
    color_elem.set(qn("w:val"), f"{color[0]:02X}{color[1]:02X}{color[2]:02X}")
    rPr.append(color_elem)

    sz_val = str(int(font_size.pt * 2))
    sz = OxmlElement("w:sz")
    sz.set(qn("w:val"), sz_val)
    rPr.append(sz)
    szCs = OxmlElement("w:szCs")
    szCs.set(qn("w:val"), sz_val)
    rPr.append(szCs)

    underline = OxmlElement("w:u")
    underline.set(qn("w:val"), "single")
    rPr.append(underline)

    new_run.append(rPr)
    text_elem = OxmlElement("w:t")
    text_elem.set(qn("xml:space"), "preserve")
    text_elem.text = text
    new_run.append(text_elem)
    hyperlink.append(new_run)
    paragraph._p.append(hyperlink)
    return hyperlink


def contact_run(paragraph, text, font_size=9):
    run = paragraph.add_run(text)
    set_run_font(run, font_size, LIGHT)
    return run


def skills_row(document, label, skills):
    p = document.add_paragraph()
    clear_paragraph_space(p, before=1, after=0)
    rl = p.add_run(f"{label}:  ")
    set_run_font(rl, 9, MID, bold=True)
    rs = p.add_run(skills)
    set_run_font(rs, 9, BODY)
    return p



# ══════════════════════════════════════════════════════════════════════════════
# HEADER
# ══════════════════════════════════════════════════════════════════════════════
p_name = doc.add_paragraph()
clear_paragraph_space(p_name, before=0, after=0)
p_name.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p_name.add_run("KHUSHBOO DODANI")
set_run_font(r, 18, DARK, bold=True)

p_contact = doc.add_paragraph()
clear_paragraph_space(p_contact, before=1, after=0)
p_contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
contact_run(p_contact, "San Francisco Bay Area  |  khushdodani@gmail.com  |  ")
add_hyperlink(p_contact, "LinkedIn", LINKEDIN_URL)
contact_run(p_contact, "  |  ")
add_hyperlink(p_contact, "GitHub", GITHUB_URL)
contact_run(p_contact, "  |  ")
add_hyperlink(p_contact, "Portfolio", PORTFOLIO_URL)

p_title = doc.add_paragraph()
clear_paragraph_space(p_title, before=1, after=0)
p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
rt = p_title.add_run("SENIOR PRODUCT MANAGER — CLINICIAN & OPERATIONS WORKFLOWS")
set_run_font(rt, 12, ACCENT, bold=True)

p_pills = doc.add_paragraph()
clear_paragraph_space(p_pills, before=0, after=1)
p_pills.alignment = WD_ALIGN_PARAGRAPH.CENTER
rp = p_pills.add_run(
    "Frontline User Workflows  •  Data-Driven Prioritization  •  0-to-1 AI Prototyping  •  Integrations & APIs"
)
set_run_font(rp, 9, MID)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# SUMMARY
# ══════════════════════════════════════════════════════════════════════════════
body(
    doc,
    "Senior Product Manager with 5+ years building workflow software for frontline operators and clinicians in "
    "regulated healthcare. Owns the provider-facing portal where 3,795 provider organizations submit referrals, "
    "treatment-extension requests, and invoices to a payer. Finds the friction through direct user research and "
    "workflow data, holds the experience bar through launch, then measures it: paper 56% to 19%, digital share "
    "39% to 55%, support calls down 30%, clinician NPS +25, $580K funded. Earlier, led field-inspector discovery "
    "for a mobile platform, including ride-alongs. Moves fast with limited resources: an $80K-funded EMR API "
    "proof of concept, daily AI prototyping with Cursor and Lovable, and an LLM matching prototype that placed "
    "2nd of 36. Works hands-on with engineers on scope, architecture trade-offs, and acceptance criteria. "
    "Master of Business Analytics.",
    size=9.5,
    space_before=2,
    space_after=2,
)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# EXPERIENCE
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Experience", space_before=4)

subheading(
    doc,
    "Product Manager — Provider Experience, Clinical Workflows & Integrations",
    "WorkSafeBC",
    "Apr 2024 – Present",
)

sublabel(doc, "Workflow redesign for high-volume users  ·  diagnose with data, hold the UX bar, measure adoption")
bullet(
    doc,
    "Owned invoice submission for 3,795 provider organizations. Analyzed 3.7M line items: 25 organizations drove "
    "half of remaining paper. Rebuilt an 11-screen, 32-line-cap flow into 5 screens with no cap, unlocking ~280K "
    "blocked lines. Paper 56% to 19%, portal 39% to 55%, support calls down 30%, NPS +25, $580K funded.",
)
bullet(
    doc,
    "Shipped in-product validation against fee schedules, rates, and service codes so errors surface at submit, "
    "not after rejection: invalid submissions down 40%. Ran focus groups with physiotherapists and clinic admins; "
    "caught that surveys were answered by clinicians while admins use the tool, and corrected before prioritizing.",
)
bullet(
    doc,
    "Staged a named-cohort dark launch to 10 providers, then soft and hard launch, with the old flow live "
    "throughout. Wrote the PostHog spec first so drop-off was visible within days. When first-month adoption was "
    "near zero, funnel data showed users missed a key control; moved the next bet from new features to onboarding.",
)
bullet(
    doc,
    "Owned digital treatment-extension requests on an $80M program. Analyzed 139K requests (79% approved, 27% "
    "same day). Rejected a push to auto-approve; shipped structured rationale, request tracking, and error "
    "validation so providers see decisions without calling. $300K approved.",
)

sublabel(doc, "Integrations and external APIs  ·  0-to-1, limited resources")
bullet(
    doc,
    "Led OSCAR EMR submission from zero after 15 physician interviews showed clinicians would not leave their "
    "chart for a side portal. POC validated Mar 2025 on $80K; roadmap covers ~70% of the provider ecosystem. "
    "Engaged 50 EMR vendors; four signaled willingness to integrate.",
)
bullet(
    doc,
    "Worked through architecture trade-offs with engineering: JSON for POC speed with HL7 FHIR as the upgrade "
    "path, Azure API Management as a reusable gateway instead of point-to-point builds, OAuth 2.0 and mTLS. "
    "Wrote sprint-ready specs with acceptance criteria across multiple dev pods in Azure DevOps.",
)

sublabel(doc, "AI prototyping  ·  matching and routing, with the human keeping the decision")
bullet(
    doc,
    "Led Referral Radar, a 0-to-1 LLM agent prototype that matches claims to the right healthcare program from "
    "20-75 unstructured documents and routes the task, with the human keeping the decision (2nd of 36, InnoFest "
    "2025). Prototype daily with Cursor and Lovable so engineers and users react to a working flow before build.",
)

sublabel(doc, "Change management at scale")
bullet(
    doc,
    "Migrated 5,600 healthcare professionals across 500 organizations to a new identity platform on a portal "
    "with 62K+ annual referrals: zero downtime, 100% of active accounts transitioned. Coordinated Engineering, "
    "Operations, Communications, and two vendors.",
)

subheading(doc, "Product Manager (promoted from Business Analyst)", "Technical Safety BC", "Oct 2021 – Apr 2024")
bullet(
    doc,
    "Led discovery for a mobile remote-inspections platform with field inspectors: ride-alongs, contextual "
    "research, workflow mapping, usability tests, and prototypes. Used the evidence to decide whether to fund the "
    "build and to translate field pain points into requirements and roadmap priorities.",
)
bullet(
    doc,
    "Shipped NLP email classification into a live routing workflow, removing manual inbox triage. Built "
    "churn and engagement analytics: 11.7% annual churn; RFM campaigns retained 78% of high-risk customers.",
)

body(
    doc,
    "Earlier: Strategy Consultant, 180 Degrees Consulting (acquisition strategy, bounce rate down 37%, "
    "subscriptions doubled)  •  SEO Consultant, Convertus (75+ client sites, organic performance up ~150%)",
    size=9,
    color=LIGHT,
    space_before=3,
    space_after=1,
)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# EDUCATION
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Education", space_before=4)

subheading(doc, "Master of Business Analytics", "University of British Columbia", "")
body(
    doc,
    "Python  •  SQL  •  Machine Learning  •  Optimization  •  Product Analytics",
    size=9,
    color=LIGHT,
    space_before=0,
    space_after=1,
    keep_with_next=True,
)

subheading(
    doc,
    "Bachelor of Business Administration (Marketing)",
    "British Columbia Institute of Technology",
    "",
    keep_with_next=False,
)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# LEADERSHIP
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Leadership", space_before=4)

body(
    doc,
    "Speaker, ProductCamp BC (2025) — “How Legacy Industries Can Adopt a Product Mindset to Improve Service Delivery.”  "
    "Mentor, ProductBC — discovery, roadmap judgment, and stakeholder communication.",
    size=9.5,
    space_before=1,
    space_after=1,
)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# SKILLS
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Skills", space_before=4)

skills_row(
    doc,
    "Product",
    "Strategy & roadmaps  •  Customer discovery & ride-alongs  •  UX & experience quality  •  Specs & acceptance "
    "criteria  •  Trade-off decisions  •  Phased launches & onboarding",
)
skills_row(
    doc,
    "Ops & Data",
    "SQL  •  Funnel & cohort analysis  •  PostHog  •  Workflow analysis  •  Segmentation  •  Task routing & matching",
)
skills_row(
    doc,
    "Healthcare",
    "EMR/EHR integrations  •  HL7 FHIR (design)  •  Clinician & provider workflows  •  Referral, authorization & "
    "claims workflows  •  Regulated healthcare operations",
)
skills_row(
    doc,
    "Technical",
    "REST APIs  •  Azure API Management  •  OAuth 2.0  •  Python  •  Cursor  •  Lovable  •  Figma  •  Jira  •  "
    "Azure DevOps",
)

out_path = r"c:\Users\khush\Desktop\kdodani-portfolio\Khushboo_Dodani_Resume_Axle_Health.docx"
doc.save(out_path)
print(f"Saved: {out_path}")
