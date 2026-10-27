"""Cohere Health — Product Manager, Review Intake.

Tailored from the portfolio case studies and the metrics used on prior resumes.
Does not claim US prior authorization, a production ML model, or the unvalidated
~$20M Referral Radar cost figure.
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
    "Provider Portal Intake  •  Clinical Review Workflows  •  Provider Experience  •  AI-Assisted Care Decisions"
)
set_run_font(rp, 9, MID)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# SUMMARY
# ══════════════════════════════════════════════════════════════════════════════
body(
    doc,
    "Product Manager with 5+ years in regulated operations and 2+ years on the provider portal for a "
    "workers’ compensation payer. Owns treatment-authorization intake — the front door of clinical review — "
    "and the work that gets submissions off fax. Turns provider research and usage data into requirements, "
    "rollouts, and gains in provider experience and operational efficiency. Uses AI as decision support "
    "and leaves the call with the reviewer.",
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
    "Product Manager — Provider Intake & Clinical Review",
    "WorkSafeBC",
    "Apr 2024 – Present",
)

sublabel(doc, "Clinical review intake  ·  provider portal")
bullet(
    doc,
    "Owned portal intake for physiotherapy treatment extensions — authorization to continue care — on an "
    "$80M program. Fax, phone, and mail carried the volume; 139K records set what the reviewer needed to see.",
)
bullet(
    doc,
    "Did not auto-approve. 79% were approved and 27% the same day — reviewers were skimming. "
    "The form captured treatment rationale so the case manager kept the decision.",
)
bullet(
    doc,
    "Shipped digital submission, tracking, and error validation in phases. Specified decision rationale "
    "with the claims team so clinics could see the outcome without calling. $300K approved to fix this path first.",
)
bullet(
    doc,
    "Provider interviews removed a body-map field that added scope and no clinical value, and captured the "
    "patient once across request types. Office staff submit; the clinician does not.",
)

sublabel(doc, "Provider experience, operational efficiency, and rollout")
bullet(
    doc,
    "25 of 3,795 organizations drove half of remaining paper. Rebuilt an 11-screen, 32-line flow into "
    "5 screens with no line cap. Invalid submissions failed at intake and fell 40%.",
)
bullet(
    doc,
    "Portal share 39% → 55%; paper 56% → 19%; 60% digital in six months; about $200K saved a year. "
    "Secured $580K to scale. PostHog funnels, and dark, soft, and hard launches with operations.",
)
bullet(
    doc,
    "Physicians would not leave the chart for another portal. Led an OSCAR EMR proof of concept for "
    "in-chart submission, secured $80K, and set a roadmap covering about 70% of providers.",
)

sublabel(doc, "AI applied to healthcare review")
bullet(
    doc,
    "Led Referral Radar, an LLM prototype that recommends care-program referrals and shows the claim "
    "evidence. The reviewer kept the decision. 2nd at InnoFest 2025. Synthetic cases, checked by a "
    "case manager, replaced production records.",
)

subheading(doc, "Product Manager", "Technical Safety BC", "Oct 2021 – Apr 2024")
bullet(
    doc,
    "Shipped NLP classification into a live operational workflow, automatically routing inbound requests "
    "and taking that triage off a manual inbox.",
)
bullet(
    doc,
    "Led discovery for a mobile inspections platform with field staff — interviews, workflow mapping, and "
    "usability tests — and used that evidence to decide whether to fund the build.",
)
bullet(
    doc,
    "Built the retention metrics leadership prioritized against: 11.7% average annual churn, and an RFM "
    "model whose campaigns retained 78% of high-risk customers.",
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
    "Roadmaps  •  Requirements & release criteria  •  Rollout planning  •  Executive updates  •  "
    "Provider research  •  Usage analytics",
)
skills_row(
    doc,
    "Healthcare",
    "Provider portal  •  Treatment-authorization intake  •  Clinical review  •  "
    "Provider experience  •  Claims operations",
)
skills_row(
    doc,
    "AI",
    "LLM decision support  •  Retrieval over clinical documents  •  Human-in-the-loop review  •  "
    "NLP classification",
)
skills_row(
    doc,
    "Tools",
    "SQL  •  Python  •  PostHog  •  Figma  •  Prototyping  •  REST APIs  •  EMR integration discovery",
)

out_path = r"c:\Users\khush\Desktop\kdodani-portfolio\Khushboo_Dodani_Resume_Cohere_Health.docx"
doc.save(out_path)
print(f"Saved: {out_path}")
