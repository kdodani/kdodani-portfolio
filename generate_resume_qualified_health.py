"""Qualified Health — Product Manager, Denials & Appeals (Medical Necessity).

Tailored from the portfolio case studies and metrics used on prior resumes.
Does not claim denials/appeals or US prior-auth experience, does not describe
Referral Radar as shipped (it is a validated 0-to-1 prototype), and omits the
unvalidated ~$20M / ~40% figures.
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
contact_run(p_contact, "San Francisco Bay Area  |  US work authorization  |  khushdodani@gmail.com  |  ")
add_hyperlink(p_contact, "LinkedIn", LINKEDIN_URL)
contact_run(p_contact, "  |  ")
add_hyperlink(p_contact, "Portfolio", PORTFOLIO_URL)

p_title = doc.add_paragraph()
clear_paragraph_space(p_title, before=1, after=0)
p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
rt = p_title.add_run("PRODUCT MANAGER")
set_run_font(rt, 12, ACCENT, bold=True)

p_pills = doc.add_paragraph()
clear_paragraph_space(p_pills, before=0, after=1)
p_pills.alignment = WD_ALIGN_PARAGRAPH.CENTER
rp = p_pills.add_run(
    "Authorization & Medical Necessity Workflows  •  Claims Accuracy  •  AI With Human-in-the-Loop  •  Customer Requirements"
)
set_run_font(rp, 9, MID)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# SUMMARY
# ══════════════════════════════════════════════════════════════════════════════
body(
    doc,
    "Product Manager with 5+ years in regulated claims and treatment-authorization workflows. Owns requirements "
    "directly with external providers, turns them into acceptance criteria and sprint-ready backlogs with "
    "engineering and design (Jira, Azure DevOps), and measures by outcomes: invalid submissions down 40%, paper "
    "56% to 19%. Has shipped NLP routing into a live operational workflow and led a 0-to-1 LLM concept with explicit "
    "human-review points and evidence traces. Curious about how care is authorized, denied, and appealed, and "
    "fast to learn a new clinical domain.",
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
    "Product Manager — Provider Intake, Authorization & Claims",
    "WorkSafeBC",
    "Apr 2024 – Present",
)

sublabel(doc, "Authorization and review workflows  ·  human judgment on $80M of spend")
bullet(
    doc,
    "Owned digital treatment-extension requests (authorization to continue physiotherapy) on an $80M program. "
    "Analyzed 139K historical requests: 79% were approved and 27% the same day, which suggested reviewers were skimming.",
)
bullet(
    doc,
    "Pushed back on senior stakeholders who wanted auto-approve. Defined the decision for the reviewer instead: "
    "structured treatment rationale at intake so case managers keep approve, deny, or revise, with separate physio "
    "and hydro decisions.",
)
bullet(
    doc,
    "Specified decision-rationale display, request tracking, and error validation with the claims, CMS, and "
    "architecture teams so clinics see outcomes without calling. Prioritized this over new request types; $300K approved.",
)
bullet(
    doc,
    "Cut scope on evidence, not opinion: dropped a body-map field providers said added no clinical value, and "
    "deprioritized a stuck-request alert after aging data showed most requests resolve within 3 days.",
)

sublabel(doc, "Claims accuracy, customer discovery, and rollout")
bullet(
    doc,
    "Led direct interviews and feedback sessions with physiotherapists, clinic admins, and EMR vendors to write "
    "requirements and acceptance criteria. Ran the backlog and sprints with multiple dev pods in Azure DevOps.",
)
bullet(
    doc,
    "Shipped in-product validation against fee schedules, rates, and service codes so invalid services, claims, "
    "and line items fail at submit. Invalid submissions fell 40% (the same discipline that prevents downstream denials).",
)
bullet(
    doc,
    "Analyzed 3.7M invoice line items; 25 of 3,795 organizations drove half of remaining paper. Rebuilt an "
    "11-screen, 32-line flow into 5 screens with no line cap. Paper 56% to 19%, portal 39% to 55%, $580K funded.",
)
bullet(
    doc,
    "Ran dark, soft, and hard launches with Healthcare Operations, instrumented in PostHog (submit, error, "
    "drop-off), so a high-volume segment activated without disrupting existing throughput.",
)

sublabel(doc, "AI and zero-to-one")
bullet(
    doc,
    "Led Referral Radar (0-to-1 LLM prototype): retrieval over 20-75 claim documents per case, recommendations "
    "with evidence traces, and a defined human/AI boundary. The case manager keeps the decision; the AI never "
    "auto-routes. 2nd of 36 at InnoFest 2025; a production plan is in place.",
)
bullet(
    doc,
    "When production claim data was blocked, built a synthetic-data path validated by an experienced case "
    "manager, so the data science work continued. Chose explainability over raw accuracy because trust was the constraint.",
)
bullet(
    doc,
    "Led OSCAR EMR submission from zero so physicians submit in the chart instead of a side portal. $80K funded; "
    "roadmap covers ~70% of providers; aligned 50 EMR vendors, TELUS, and government.",
)

subheading(doc, "Product Manager", "Technical Safety BC", "Oct 2021 – Apr 2024")
bullet(
    doc,
    "Owned the backlog, sprints, and acceptance criteria in Jira. Defined requirements for NLP classification "
    "that automatically routes inbound requests in a live workflow, removing manual inbox triage.",
)
bullet(
    doc,
    "Led discovery for a mobile inspections platform with field staff (interviews, workflow mapping, usability "
    "tests) and used the evidence to decide whether to fund the build.",
)
bullet(
    doc,
    "Built the retention metrics leadership prioritized against: 11.7% average annual churn and an RFM model "
    "whose campaigns retained 78% of high-risk customers.",
)

body(
    doc,
    "Earlier: Strategy Consultant, 180 Degrees Consulting (nonprofit acquisition strategy, bounce rate down 37%, "
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
    "Requirements & acceptance criteria  •  Backlog & sprint delivery  •  Prioritization  •  Customer discovery  •  "
    "0-to-1  •  Phased rollouts  •  Usage analytics",
)
skills_row(
    doc,
    "Healthcare",
    "Treatment authorization  •  Clinical review workflows  •  Claims rules & validation  •  "
    "Provider billing  •  Health-system integrations (EMR)",
)
skills_row(
    doc,
    "AI",
    "LLM decision support  •  Retrieval over clinical documents  •  Human-in-the-loop design  •  "
    "NLP classification  •  AI-assisted prototyping (Lovable, Copilot)",
)
skills_row(
    doc,
    "Tools",
    "Jira  •  Azure DevOps  •  PostHog  •  SQL  •  Python  •  Figma  •  REST APIs",
)

out_path = r"c:\Users\khush\Desktop\kdodani-portfolio\Khushboo_Dodani_Resume_Qualified_Health.docx"
doc.save(out_path)
print(f"Saved: {out_path}")
