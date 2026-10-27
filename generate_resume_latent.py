"""Latent - Product Manager (clinical AI / pharmacy intelligence platform).

Tailored from existing portfolio case studies and metrics. Does not claim pharmacy,
medication-access, or health-system-sales experience. Referral Radar is described as a
validated 0-to-1 prototype, not a shipped product.
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
add_hyperlink(p_contact, "GitHub", GITHUB_URL)
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
    "Clinical AI Agents  •  EHR & API Integrations  •  Eligibility & Access Workflows  •  0-to-1 Ownership"
)
set_run_font(rp, 9, MID)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# SUMMARY
# ══════════════════════════════════════════════════════════════════════════════
body(
    doc,
    "Product Manager with 5+ years owning healthcare workflow products from discovery with clinicians and "
    "clinic admins through launch and measured outcomes. Led a 0-to-1 LLM agent prototype that identifies who "
    "qualifies for a program from 20-75 unstructured clinical documents per case, with evidence traces and a "
    "defined human/AI boundary (2nd of 36, InnoFest 2025). Led a 0-to-1 EMR integration so providers act in "
    "the chart, not a side portal. Turned ambiguous problems into funded roadmaps: invalid submissions down 40%, "
    "paper 56% to 19%, $580K, $300K, and $80K approved. Works with engineering on APIs and system design; "
    "writes SQL and Python; prototypes in Cursor. Master of Business Analytics.",
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
    "Product Manager — Provider Platform, Clinical Workflows & AI",
    "WorkSafeBC",
    "Apr 2024 – Present",
)

sublabel(doc, "Clinical AI and 0-to-1  ·  identifying who qualifies for care")
bullet(
    doc,
    "Led Referral Radar from zero: LLM retrieval across 20-75 unstructured claim documents per case to surface "
    "which claimants qualify for a program, each recommendation tied to an evidence trace. Defined the human/AI "
    "boundary: the case manager keeps the decision and the AI never auto-routes. 2nd of 36 at InnoFest 2025; "
    "production plan in place.",
)
bullet(
    doc,
    "Chose explainability over raw accuracy because reviewer trust was the adoption constraint. When production "
    "data was blocked, built a synthetic-data path validated by an experienced case manager so data science kept moving.",
)
bullet(
    doc,
    "Prototype daily with AI coding assistants (Cursor, GitHub Copilot, Lovable) and n8n agent workflows, so "
    "engineers and customers react to something real before we commit build capacity.",
)

sublabel(doc, "EHR and API integrations  ·  customer discovery with clinicians")
bullet(
    doc,
    "Led OSCAR EMR submission from zero after discovery showed physicians would not leave their chart for a side "
    "application. POC validated Mar 2025; $80K funded; roadmap covers ~70% of the provider ecosystem; aligned "
    "50 EMR vendors, TELUS, ForgeRock, and government.",
)
bullet(
    doc,
    "Worked through architecture trade-offs with engineering: JSON for POC speed with FHIR as the upgrade path, "
    "Azure API Management as a reusable gateway instead of point-to-point integrations, OAuth 2.0 and mTLS "
    "for the data channel.",
)
bullet(
    doc,
    "Run discovery directly with physiotherapists, clinic admins, and EMR vendors; turn it into requirements, "
    "acceptance criteria, and sprint-ready specs across multiple dev pods in Azure DevOps.",
)

sublabel(doc, "Access, authorization, and capture at scale  ·  measurable outcomes")
bullet(
    doc,
    "Owned digital treatment-extension (continued-care authorization) requests on an $80M program. Analyzed 139K "
    "requests: 79% approved, 27% same day. Rejected a push to auto-approve; shipped structured treatment "
    "rationale, request tracking, and error validation so clinics see outcomes without calling. $300K approved.",
)
bullet(
    doc,
    "Analyzed 3.7M invoice line items; 25 of 3,795 orgs drove half of remaining paper. Rebuilt an 11-screen, "
    "32-line-cap flow into 5 screens with no cap, unlocking ~280K blocked lines. Paper 56% to 19%, portal "
    "39% to 55%, ~$50K lower cost-to-process, $580K funded.",
)
bullet(
    doc,
    "Shipped in-product validation against fee schedules, rates, and service codes so invalid claims fail at "
    "submit: invalid submissions down 40%. Instrumented PostHog and ran dark, soft, and hard launches so a "
    "high-volume segment activated without disrupting existing throughput.",
)
bullet(
    doc,
    "Migrated 5,600 healthcare professionals across 500 organizations to a new identity platform on a portal "
    "with 62K+ annual referrals: zero downtime, 100% of active accounts transitioned.",
)

subheading(doc, "Product Manager", "Technical Safety BC", "Oct 2021 – Apr 2024")
bullet(
    doc,
    "Led discovery for a mobile inspections platform with field staff (interviews, workflow mapping, usability "
    "tests, prototypes) and used the evidence to decide whether to fund the build.",
)
bullet(
    doc,
    "Defined requirements for NLP classification that routes inbound requests in a live workflow, removing manual "
    "inbox triage. Built churn and engagement analytics: 11.7% annual churn; RFM model retained 78% of high-risk customers.",
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
    "Strategy & roadmap  •  0-to-1  •  Customer discovery  •  Specs & acceptance criteria  •  Trade-off decisions  •  "
    "Phased rollouts  •  Success metrics & experiments",
)
skills_row(
    doc,
    "Healthcare",
    "EMR/EHR integrations  •  Clinical review & authorization workflows  •  Eligibility identification  •  "
    "Provider billing & claims rules  •  Healthcare operations",
)
skills_row(
    doc,
    "AI",
    "LLM agents & retrieval  •  Human-in-the-loop design  •  Evidence traces & explainability  •  "
    "NLP classification  •  Multi-agent workflows (n8n)",
)
skills_row(
    doc,
    "Technical",
    "SQL  •  Python  •  REST APIs  •  JSON/FHIR design  •  Azure API Management  •  OAuth 2.0  •  "
    "Cursor  •  GitHub Copilot  •  Lovable  •  Figma  •  PostHog  •  Jira  •  Azure DevOps",
)

out_path = r"c:\Users\khush\Desktop\kdodani-portfolio\Khushboo_Dodani_Resume_Latent.docx"
doc.save(out_path)
print(f"Saved: {out_path}")
