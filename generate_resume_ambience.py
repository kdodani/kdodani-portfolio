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
contact_run(p_contact, "South San Francisco, Bay Area  |  khushdodani@gmail.com  |  ")
add_hyperlink(p_contact, "LinkedIn", LINKEDIN_URL)
contact_run(p_contact, "  |  ")
add_hyperlink(p_contact, "GitHub", GITHUB_URL)
contact_run(p_contact, "  |  ")
add_hyperlink(p_contact, "Portfolio", PORTFOLIO_URL)

p_title = doc.add_paragraph()
clear_paragraph_space(p_title, before=2, after=2)
p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
rt = p_title.add_run("PRODUCT MANAGER")
rt.bold = True
rt.font.size = Pt(12)
rt.font.color.rgb = RGBColor(0x6D, 0x28, 0xD9)   # accent-hero-1 purple

p_pills = doc.add_paragraph()
clear_paragraph_space(p_pills, before=1, after=4)
p_pills.alignment = WD_ALIGN_PARAGRAPH.CENTER
rp = p_pills.add_run(
    "Clinician Documentation  •  Ambulatory Point-of-Care EHR  •  AI Chart Intelligence  •  Enterprise Adoption"
)
rp.font.size = Pt(9)
rp.font.color.rgb = RGBColor(0x5B, 0x21, 0xB6)   # accent-strong purple

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# SUMMARY
# ══════════════════════════════════════════════════════════════════════════════
body(
    doc,
    "Product Manager with 5 years shipping clinician-facing products in regulated healthcare, including "
    "ambulatory point-of-care documentation embedded in the EHR and a production-minded LLM/RAG prototype that extracts, "
    "synthesizes, and structures clinical context from unstructured records. Partners with clinicians, engineering, "
    "and data science to cut documentation burden and prove adoption with quality metrics — completeness, drop-off, "
    "support load, and workflow completion — designing AI so humans retain judgment. Master of Business Analytics; "
    "BBA in Marketing.",
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
subheading(doc, "Product Manager — Clinician Experience & Clinical Documentation", "WorkSafeBC", "Apr 2024 – Present")

sublabel(doc, "AI Chart Intelligence & Clinical Safety")
bullet(doc,
    "Built Referral Radar, an LLM/RAG prototype (InnoFest 2nd place, 2025) over 20–75 claim documents per case "
    "(intake notes, medical reports, counselling plans) to generate summaries, surface evidence, and support "
    "referral decisions — designed to cut case-manager review from ~90+ minutes of manual cross-referencing "
    "(SME-estimated) to minutes.")
bullet(doc,
    "Designed the prototype for a production path: product architecture with engineering (LLM/RAG, multi-agent, "
    "evidence traces), evaluation on explainability and traceability rather than automation rate, and a hard "
    "human-in-the-loop boundary (AI retrieves; humans decide).")
bullet(doc,
    "Refused auto-approve on treatment extensions after analysis of 139K historical requests showed 79% were "
    "always approved — optimizing for speed alone would have rubber-stamped an $80M spend. Kept clinical review "
    "in the product so judgment stayed with case managers.")
bullet(doc,
    "Unblocked the AI sprint when production claim data was unavailable by building a synthetic-data path "
    "validated with case managers; used Lovable and GitHub Copilot to prototype workflows and compress "
    "discovery-to-engineering timelines before development investment.")

sublabel(doc, "Clinician Documentation Workflows & Quality")
bullet(doc,
    "Own the clinician-facing systems healthcare providers use to submit clinical documentation, treatment "
    "requests, referrals, and invoices — partnering with physicians, ER and hospital-adjacent billing teams, "
    "clinical operations, engineering, and program leadership.")
bullet(doc,
    "Interviewed physicians (including ER clinicians whose teams bill for hospital and emergency encounters) "
    "to map documentation under time pressure: GPs will not leave the EMR, and ER workflows still pull clinicians "
    "into administrative invoicing. Designed products to sit inside existing clinical workflow rather than a side portal.")
bullet(doc,
    "Rebuilt high-volume clinician submission after 25 of 3,795 organizations generated 50% of remaining paper "
    "volume (~280K blocked line items): cut the journey from 11 screens to 5, shifted paper from 56% to 19% of "
    "line items (cutting clinician drop-off to fax/mail by more than half), and grew portal share from 39% to 55% (workflow completion "
    "on the digital path) — reducing documentation/admin time and securing $580K in executive funding.")
bullet(doc,
    "Treated documentation completeness as a product quality problem, not a training problem: Form 8/11 clinical "
    "notes were truncated by a 2001 billing spec (52,000 faxes/year, ~28M keystrokes). Front-end validation and "
    "simplified workflows improved data quality, decreased support calls by 30%, and increased clinician "
    "satisfaction (NPS +25).")
bullet(doc,
    "Digitized physio treatment-extension requests (replacing fax/phone) with tracking, error validation, and "
    "phased rollout — partnering with CMS product owners on an $80M physiotherapy spend workflow so treatment "
    "continuity did not stall while case-manager review stayed in the loop.")

sublabel(doc, "EHR Integration at Point of Care")
bullet(doc,
    "Led 0-to-1 product discovery for ambulatory point-of-care submission so physicians could send clinical "
    "documentation from OSCAR (community GP EMR) rather than a separate portal — after 15 physician interviews "
    "showed GPs will not use any software other than their EMR.")
bullet(doc,
    "Secured $80K Innovation Council funding and a commercial EMR vendor roadmap covering ~70% of the provider "
    "ecosystem (~1,200 BC physicians as OSCAR beachhead; top 5 EMRs ≈ 80% of the market). Coordinated 50 EMR "
    "vendors plus TELUS, ForgeRock, and government partners from requirements through go-live.")
bullet(doc,
    "Made explicit technical tradeoffs with architects: JSON payload for POC speed vs. FHIR as the documented "
    "upgrade path; Azure APIM as a reusable facade vs. point-to-point integrations; OAuth2.0/mTLS for the "
    "clinical data channel — decoupling clinical reporting from the billing spec that had frozen form content since 2015.")

sublabel(doc, "Enterprise Adoption in Complex Healthcare Environments")
bullet(doc,
    "Led a CIAM migration of 5,600 healthcare professionals across 500 organizations on a portal carrying "
    "62,000+ annual referrals: multi-channel outreach, administrator-led vs self-serve rollout, and helpdesk "
    "enablement — 0 service disruptions; 100% of active accounts transitioned on deadline.")
bullet(doc,
    "Instrumented PostHog funnels before launch and ran named-cohort dark / soft / hard launches with "
    "Healthcare Operations so existing digital volume was not disrupted while a new high-volume segment "
    "activated — adoption and clinician drop-off were visible within days, not after a big-bang cutover.")
bullet(doc,
    "Drove adoption across a multi-persona buying committee — physicians, ER/hospital billing teams, office "
    "admins, case managers, medical advisors, operations, executives, and EMR vendors — translating outcomes "
    "into sequenced roadmaps rather than one-size-fits-all rollouts.")

# ── Technical Safety BC ───────────────────────────────────────────────────────
subheading(doc, "Product Manager", "Technical Safety BC", "Oct 2021 – Apr 2024")
bullet(doc,
    "Built healthcare-adjacent domain expertise from a non-healthcare seat: led discovery for a mobile remote "
    "inspections platform through contextual research, workflow mapping, usability testing, and prototyping "
    "before development investment — a pattern later applied to clinician documentation products.")
bullet(doc,
    "Partnered with engineering, field inspectors, designers, and operations leaders to translate operational "
    "pain points into product requirements, roadmap priorities, and implementation plans.")
bullet(doc,
    "Shipped NLP-powered email classification into a live operational workflow to automate routing and triage "
    "of incoming requests, reducing manual inbox processing — the production NLP predecessor to later LLM prototypes.")
bullet(doc,
    "Built operational analytics identifying an 11.7% average annual churn rate and an RFM segmentation model "
    "that drove targeted engagement campaigns retaining 78% of high-risk customers.")

# ── 180 Degrees ───────────────────────────────────────────────────────────────
subheading(doc, "Strategy Consultant", "180 Degrees Consulting — University of British Columbia", "Sep 2020 – Oct 2021")
bullet(doc,
    "Developed product and market strategies for nonprofit and clean energy organizations through customer "
    "research, market analysis, and strategic planning; designed a data-driven acquisition strategy for Open "
    "Primaries that reduced website bounce rate by 37% while doubling subscriptions.")

# ── Convertus ─────────────────────────────────────────────────────────────────
subheading(doc, "SEO Consultant", "Convertus", "May 2018 – Jul 2019")
bullet(doc,
    "Built analytics-driven growth strategies for 75+ client websites, increasing organic performance by "
    "approximately 150%, and a forecasting tool predicting SEO performance with approximately 85% accuracy.")

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

skills_row(doc, "Product",
    "Product Strategy  •  Product Roadmaps  •  Clinician-facing Products  •  0-to-1 Products  •  "
    "Enterprise Adoption  •  Change Management  •  Quality Metrics  •  Executive Influence")
skills_row(doc, "Clinical Workflows",
    "Clinical Documentation Workflows  •  Documentation Completeness  •  Provider Workflow Automation  •  "
    "EHR/EMR Integration  •  Point-of-Care Workflows  •  Provider Experience  •  Physician Interviews  •  "
    "Regulated Healthcare")
skills_row(doc, "AI / ML",
    "LLM Applications  •  RAG  •  Unstructured Data Processing  •  Claim / Chart Summarization  •  "
    "Natural-Language Search  •  Human-in-the-Loop Evaluation  •  NLP (clinical documents)  •  "
    "Evidence Traceability  •  Generative AI")
skills_row(doc, "Technical",
    "REST APIs  •  EMR/EHR Integrations  •  Azure APIM  •  OAuth2.0 / mTLS  •  JSON vs FHIR Tradeoffs  •  "
    "SQL  •  Python  •  PostHog  •  GitHub Copilot  •  Lovable")
skills_row(doc, "Research",
    "Journey Mapping  •  Workflow Analysis  •  Usability Testing  •  A/B Testing  •  Prototyping  •  Figma")

# ── Save ──────────────────────────────────────────────────────────────────────
out_path = r"c:\Users\khush\Desktop\kdodani-portfolio\Khushboo_Dodani_Resume_Ambience_Healthcare.docx"
doc.save(out_path)
print(f"Saved: {out_path}")
