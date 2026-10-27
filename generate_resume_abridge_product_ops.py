from docx import Document
from docx.shared import Pt, RGBColor, Inches, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

doc = Document()

# ── Page margins ──────────────────────────────────────────────────────────────
for section in doc.sections:
    section.top_margin    = Cm(1.5)
    section.bottom_margin = Cm(1.5)
    section.left_margin   = Cm(1.8)
    section.right_margin  = Cm(1.8)

# ── Portfolio color system (matches globals.css + design-system.md) ───────────
# Background: #faf9f6  (warm off-white — body bg)
# Headings:   #1c1917  (stone-900 — near-black warm)
# Body text:  #44403c  (stone-700)
# Muted:      #78716c  (stone-500)
# Accent:     #6D28D9  (--accent-hero-1 purple)
# Mid-accent: #5B21B6  (--accent-strong)
# Sub-accent: #4F46E5  (--accent-hero-2 indigo)
DARK    = RGBColor(0x1c, 0x19, 0x17)   # stone-900 — headings
MID     = RGBColor(0x5B, 0x21, 0xB6)   # accent-strong purple — section labels
ACCENT  = RGBColor(0x6D, 0x28, 0xD9)   # accent-hero-1 purple — rules / name accent
BODY    = RGBColor(0x44, 0x40, 0x3c)   # stone-700 — body text
LIGHT   = RGBColor(0x78, 0x71, 0x6c)   # stone-500 — muted / metadata
BG_HEX  = "FAF9F6"                     # warm off-white page background

LINKEDIN_URL  = "https://www.linkedin.com/in/khushdodani"
GITHUB_URL    = "https://github.com/kdodani"
PORTFOLIO_URL = "https://kdodani-portfolio.vercel.app"


def set_page_background(doc, hex_color):
    """Set the document page background color."""
    body_elem = doc.element.body
    doc_elem  = body_elem.getparent()
    bg = OxmlElement('w:background')
    bg.set(qn('w:color'), hex_color)
    doc_elem.insert(0, bg)
    settings = doc.settings.element
    disp = OxmlElement('w:displayBackgroundShape')
    settings.insert(0, disp)

set_page_background(doc, BG_HEX)

def clear_paragraph_space(p, before=0, after=0):
    p.paragraph_format.space_before = Pt(before)
    p.paragraph_format.space_after  = Pt(after)

def add_horizontal_rule(doc, color=RGBColor(0x6D, 0x28, 0xD9), thickness=6):
    """Insert a thin colored paragraph border as a visual divider."""
    p = doc.add_paragraph()
    clear_paragraph_space(p, before=2, after=2)
    pPr = p._p.get_or_add_pPr()
    pBdr = OxmlElement('w:pBdr')
    bottom = OxmlElement('w:bottom')
    bottom.set(qn('w:val'), 'single')
    bottom.set(qn('w:sz'), str(thickness))
    bottom.set(qn('w:space'), '1')
    bottom.set(qn('w:color'), f'{color[0]:02X}{color[1]:02X}{color[2]:02X}')
    pBdr.append(bottom)
    pPr.append(pBdr)
    return p

def heading(doc, text, size=10.5, bold=True, color=RGBColor(0x6D, 0x28, 0xD9), space_before=8, space_after=2, caps=True):
    p = doc.add_paragraph()
    clear_paragraph_space(p, before=space_before, after=space_after)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text.upper() if caps else text)
    run.bold = bold
    run.font.size = Pt(size)
    run.font.color.rgb = color
    return p

def subheading(doc, role, org, period, size=10):
    """Role | Org   ·   Period  — two runs on one line."""
    p = doc.add_paragraph()
    clear_paragraph_space(p, before=5, after=1)
    p.paragraph_format.keep_with_next = True
    r1 = p.add_run(f"{role}  |  {org}")
    r1.bold = True
    r1.font.size = Pt(size)
    r1.font.color.rgb = DARK
    r2 = p.add_run(f"    {period}")
    r2.bold = False
    r2.font.size = Pt(9)
    r2.font.color.rgb = LIGHT
    return p

def sublabel(doc, text, size=9, italic=True, color=RGBColor(0x4F, 0x46, 0xE5), space_before=0, space_after=1):
    p = doc.add_paragraph()
    clear_paragraph_space(p, before=space_before, after=space_after)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.italic = italic
    run.bold = not italic
    run.font.size = Pt(size)
    run.font.color.rgb = color
    return p

def bullet(doc, text, size=9.5, indent=Inches(0.2), hanging=Inches(0.2)):
    p = doc.add_paragraph(style='List Bullet')
    clear_paragraph_space(p, before=1, after=1)
    p.paragraph_format.left_indent   = indent + hanging
    p.paragraph_format.first_line_indent = -hanging
    run = p.add_run(text)
    run.font.size = Pt(size)
    run.font.color.rgb = BODY
    return p

def body(doc, text, size=9.5, color=BODY, space_before=2, space_after=2, italic=False):
    p = doc.add_paragraph()
    clear_paragraph_space(p, before=space_before, after=space_after)
    run = p.add_run(text)
    run.font.size = Pt(size)
    run.font.color.rgb = color
    run.italic = italic
    return p

def add_hyperlink(paragraph, text, url, font_size=Pt(9), color=LIGHT):
    """Append a clickable hyperlink run that matches surrounding muted contact styling."""
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

def contact_run(paragraph, text, font_size=Pt(9)):
    run = paragraph.add_run(text)
    run.font.size = font_size
    run.font.color.rgb = LIGHT
    return run

# ══════════════════════════════════════════════════════════════════════════════
# HEADER
# ══════════════════════════════════════════════════════════════════════════════
p_name = doc.add_paragraph()
clear_paragraph_space(p_name, before=0, after=2)
p_name.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p_name.add_run("KHUSHBOO DODANI")
r.bold = True
r.font.size = Pt(18)
r.font.color.rgb = DARK

p_contact = doc.add_paragraph()
clear_paragraph_space(p_contact, before=0, after=2)
p_contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
contact_run(p_contact, "San Francisco Bay Area  |  khushdodani@gmail.com  |  ")
add_hyperlink(p_contact, "LinkedIn", LINKEDIN_URL)
contact_run(p_contact, "  |  ")
add_hyperlink(p_contact, "GitHub", GITHUB_URL)
contact_run(p_contact, "  |  ")
add_hyperlink(p_contact, "Portfolio", PORTFOLIO_URL)

p_title = doc.add_paragraph()
clear_paragraph_space(p_title, before=2, after=2)
p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
rt = p_title.add_run("PRODUCT MANAGER — OPERATIONS & STRATEGY")
rt.bold = True
rt.font.size = Pt(12)
rt.font.color.rgb = RGBColor(0x6D, 0x28, 0xD9)   # accent-hero-1 purple

p_pills = doc.add_paragraph()
clear_paragraph_space(p_pills, before=1, after=4)
p_pills.alignment = WD_ALIGN_PARAGRAPH.CENTER
rp = p_pills.add_run(
    "Product Consulting  •  Operating Systems & Process Design  •  AI Enablement  •  Analytics & Strategy"
)
rp.font.size = Pt(9)
rp.font.color.rgb = RGBColor(0x5B, 0x21, 0xB6)   # accent-strong purple

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# SUMMARY
# ══════════════════════════════════════════════════════════════════════════════
body(
    doc,
    "Consultant and product operator with 4+ years of client-facing consulting across an independent product "
    "consultancy, strategy consulting, and agency engagements — currently retained through an independent "
    "practice to run product for a healthcare organization managing $500M in annual spend. Builds the operating "
    "systems a product org runs on — planning cadence, discovery, escalation, onboarding, and hiring — and ties "
    "them to measurable product and business outcomes. Numerate by training (Master of Business Analytics) and "
    "AI-native by default — builds n8n multi-agent workflows, document automation, and working prototypes "
    "personally rather than specifying them. BBA in Marketing.",
    size=9.5,
    space_before=4,
    space_after=4,
)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# EXPERIENCE
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Experience")

# ── WorkSafeBC ────────────────────────────────────────────────────────────────
subheading(doc, "Product Manager — Independent Consulting Engagement", "WorkSafeBC", "Apr 2024 – Present")

sublabel(doc, "Strategy & Executive Decision Support")
bullet(doc,
    "Drove measurable product outcomes through targeted operational and product intervention: submission cut "
    "from 11 screens to 5, paper reduced from 56% to 19% of line items, and digital adoption grown from 39% to "
    "55%.")
bullet(doc,
    "Ran the segmentation that reframed a stalled adoption problem: 25 of 3,795 organizations were generating "
    "50% of all remaining paper volume (~280K blocked line items), converting a broad change-management effort "
    "into a targeted campaign against 25 named accounts.")
bullet(doc,
    "Built the analysis and business cases that unlocked $80K, $300K, and $580K in executive funding across "
    "three separate initiatives, each defended in front of an investment committee.")
bullet(doc,
    "Analyzed 139K historical treatment requests and reversed a proposed automation: 79% were always approved, "
    "which made the aggregate an argument against auto-approving an $80M spend rather than for it.")
bullet(doc,
    "Engaged through an independent consultancy to own product strategy across provider-facing platforms — "
    "scoping the engagement, setting the roadmap, and reporting outcomes directly to executive sponsors.")
bullet(doc,
    "Translated regulatory and legacy-system constraints into roadmap sequencing — a 2001 billing specification "
    "had frozen clinical form content since 2015, which made the case for building a separate data channel "
    "rather than negotiating the existing one.")

sublabel(doc, "Operating Systems & Process Design")
bullet(doc,
    "Established decision-making frameworks and prioritization criteria across product and operations, reducing "
    "ambiguity and aligning stakeholders on roadmap tradeoffs.")
bullet(doc,
    "Designed the roadmap visibility and cross-team planning cadence, enabling cross-team alignment and reducing "
    "execution drift across concurrent initiatives — with no formal reporting line to any of the teams "
    "involved.")
bullet(doc,
    "Built incident handling and support escalation tiers so production issues routed by severity instead of by "
    "whoever was asked first, cutting the volume reaching product directly.")
bullet(doc,
    "Rebuilt the discovery process to get the team in front of users routinely rather than occasionally, "
    "shifting research ahead of build investment and cutting rework from requirements written on assumption.")
bullet(doc,
    "Redesigned onboarding and hiring processes for product roles, sharpening interview structure and shortening "
    "the ramp to first meaningful contribution.")
bullet(doc,
    "Fixed design-to-development handoff after repeated rework: established shared definition-of-ready and "
    "review checkpoints, reducing churn between design and engineering.")

sublabel(doc, "AI Enablement & Builder Velocity")
bullet(doc,
    "Build AI systems personally, not just specs — n8n multi-agent workflows, document generation automation, "
    "and working application prototypes in Lovable, Cursor, and GitHub Copilot, compressing "
    "concept-to-validation timelines before engineering investment.")
bullet(doc,
    "Built Referral Radar in a two-week hackathon sprint — an LLM/RAG prototype reading 20–75 documents per case "
    "to surface recommendations with evidence traces — placing 2nd of 36 entries at InnoFest 2025.")
bullet(doc,
    "Unblocked that sprint when production data was unavailable by generating synthetic case data and "
    "validating it with subject-matter experts, shipping the demo rather than escalating the blocker.")
bullet(doc,
    "Made the internal case for AI adoption to skeptical stakeholders by drawing a hard human-in-the-loop "
    "boundary up front — AI retrieves and synthesizes, humans decide — which is what made the pilot approvable.")

sublabel(doc, "Analytics & Measurement")
bullet(doc,
    "Instrumented PostHog funnels before launch and ran named-cohort dark, soft, and hard launches so adoption "
    "and drop-off were measurable within days rather than after a big-bang cutover.")
bullet(doc,
    "Built the segmentation, funnel, and cohort analysis behind roadmap decisions, so prioritization arguments "
    "were settled with data rather than seniority.")

# ── Technical Safety BC ───────────────────────────────────────────────────────
subheading(doc, "Product Manager", "Technical Safety BC", "Oct 2021 – Apr 2024")
bullet(doc,
    "Built internal data products — membership, churn, and engagement dashboards plus an RFM segmentation model "
    "— that identified an 11.7% average annual churn rate and drove campaigns retaining 78% of high-risk "
    "customers.")
bullet(doc,
    "Shipped NLP-powered email classification into a live operational workflow to automate routing and triage, "
    "removing manual inbox processing from the operations team's day.")
bullet(doc,
    "Led discovery for a mobile remote inspections platform through contextual research with field inspectors, "
    "workflow mapping, and usability testing before development investment.")

# ── 180 Degrees ───────────────────────────────────────────────────────────────
subheading(doc, "Strategy Consultant", "180 Degrees Consulting — University of British Columbia", "Sep 2020 – Oct 2021")
bullet(doc,
    "Delivered scoped consulting engagements for nonprofit and clean energy clients over a year — market and "
    "customer research, strategic recommendations, and final presentations to client leadership.")
bullet(doc,
    "Designed a data-driven acquisition strategy for Open Primaries that cut bounce rate 37% while doubling "
    "subscriptions.")

# ── Convertus ─────────────────────────────────────────────────────────────────
subheading(doc, "SEO Consultant", "Convertus", "May 2018 – Jul 2019")
bullet(doc,
    "Advised 75+ client websites on analytics-driven growth, increasing organic performance ~150%, and built a "
    "forecasting tool predicting SEO performance with ~85% accuracy.")

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# EDUCATION
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Education")

subheading(doc, "Master of Business Analytics", "University of British Columbia", "")
body(doc, "Python  •  SQL  •  Machine Learning  •  Optimization  •  Product Analytics", size=9, color=LIGHT)

subheading(doc, "Bachelor of Business Administration (Marketing)", "British Columbia Institute of Technology", "")

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# LEADERSHIP
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Leadership")

sublabel(doc, "Speaker — ProductCamp BC (2025)", italic=False, size=9.5, color=DARK)
body(doc,
    '"How Legacy Industries Can Adopt a Product Mindset to Improve Service Delivery."',
    size=9.5, italic=True, space_before=0)

sublabel(doc, "Mentor — ProductBC", italic=False, size=9.5, color=DARK, space_before=4)
body(doc,
    "Mentor aspiring Product Managers in product discovery, strategy, and career development.",
    size=9.5, space_before=0)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# SKILLS
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Skills")

def skills_row(doc, label, skills):
    p = doc.add_paragraph()
    clear_paragraph_space(p, before=2, after=2)
    rl = p.add_run(f"{label}:  ")
    rl.bold = True
    rl.font.size = Pt(9)
    rl.font.color.rgb = RGBColor(0x5B, 0x21, 0xB6)
    rs = p.add_run(skills)
    rs.font.size = Pt(9)
    rs.font.color.rgb = BODY

skills_row(doc, "Strategy & Ops",
    "Process Design  •  Operating Cadence  •  Roadmap Visibility  •  Regulatory & Constraint Analysis  •  "
    "Business Cases  •  Influence Without Authority  •  Onboarding & Hiring Design")
skills_row(doc, "AI & Automation",
    "n8n Multi-Agent Workflows  •  LLM Applications  •  RAG  •  Document Automation  •  Rapid Prototyping  •  "
    "AI Adoption Programs  •  Synthetic Data")
skills_row(doc, "Analytics",
    "SQL  •  Python  •  PostHog  •  Funnel & Cohort Analysis  •  Segmentation  •  RFM Modeling  •  "
    "Business Case Modeling  •  Excel")
skills_row(doc, "Product",
    "Product Strategy  •  0-to-1 Delivery  •  Discovery & User Research  •  Roadmapping  •  "
    "Change Management  •  Executive Communication")
skills_row(doc, "Tools",
    "Cursor  •  GitHub Copilot  •  Lovable  •  n8n  •  PostHog  •  Figma")

# ── Save ──────────────────────────────────────────────────────────────────────
out_path = r"c:\Users\khush\Desktop\kdodani-portfolio\Khushboo_Dodani_Resume_Abridge_Product_Ops.docx"
doc.save(out_path)
print(f"Saved: {out_path}")
