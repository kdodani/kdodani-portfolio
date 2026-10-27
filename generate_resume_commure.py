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
    "Clinician Documentation  •  Point-of-Care EHR Writeback  •  LLM / Agents / Evals  •  Provider Adoption"
)
rp.font.size = Pt(9)
rp.font.color.rgb = RGBColor(0x5B, 0x21, 0xB6)   # accent-strong purple

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# SUMMARY
# ══════════════════════════════════════════════════════════════════════════════
body(
    doc,
    "Product Manager with 5 years owning clinician-facing products end to end in regulated healthcare — cutting "
    "documentation burden at the point of care, shipping structured clinical data back into the EMR over APIs, and "
    "building an LLM/RAG multi-agent prototype evaluated on traceability with a human-in-the-loop boundary. Turns "
    "physician research into shipped product and defensible metrics: documentation completeness, clinician "
    "drop-off, support load, adoption. Master of Business Analytics; BBA in Marketing.",
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

sublabel(doc, "AI Clinical Context, Agents & Evals")
bullet(doc,
    "Built Referral Radar, an LLM/RAG prototype (InnoFest 2nd place of 36 org-wide ideas, 2025) that synthesizes "
    "clinical context across 20–75 unstructured documents per case and surfaces referral opportunities with cited "
    "evidence — cutting ~90+ minutes of manual cross-referencing (SME-estimated) to minutes.")
bullet(doc,
    "Set the eval bar with engineering and data science: multi-agent retrieval with evidence traces, scored on "
    "explainability and traceability rather than automation rate, behind a hard human-in-the-loop boundary "
    "(AI retrieves and reasons; clinicians decide).")
bullet(doc,
    "Killed auto-approve on treatment extensions after 139K historical requests showed 79% were always approved — "
    "automating for throughput alone would have rubber-stamped an $80M annual spend, so clinical review stayed in "
    "the product.")
bullet(doc,
    "Unblocked the AI sprint when production claim data was unavailable by designing a synthetic-data path "
    "validated with case managers; prototyped with Lovable and GitHub Copilot to pressure-test concepts with "
    "clinicians before engineering investment.")

sublabel(doc, "Documentation Burden & Point-of-Care Workflows")
bullet(doc,
    "Own the clinician-facing surfaces providers use to submit clinical documentation, treatment requests, "
    "referrals, and invoices end to end — vision through discovery, spec, launch, adoption, and iteration — with "
    "engineering, design, clinical operations, and program leadership.")
bullet(doc,
    "Ran structured research with physicians (including ER clinicians billing hospital and emergency encounters) "
    "and mapped documentation under time pressure: GPs will not leave the EMR, and ER workflows still pull "
    "clinicians into administrative work. Every product after that sat inside the clinical workflow, not a side "
    "portal.")
bullet(doc,
    "Rebuilt high-volume clinician submission after Pareto analysis showed 25 of 3,795 organizations drove 50% of "
    "remaining paper volume (~280K blocked line items): cut the flow from 11 screens to 5, moved paper from 56% to "
    "19% of line items, grew portal share from 39% to 55%, and secured $580K in executive funding.")
bullet(doc,
    "Treated documentation completeness as a quality problem, not a training problem: Form 8/11 notes were truncated "
    "and diagnosis codes guessed under a 2001 billing spec (52,000 faxes/year, ~28M keystrokes). Validation and "
    "simpler workflows improved data quality, cut support calls 30%, and lifted satisfaction (NPS +25).")
bullet(doc,
    "Digitized physiotherapy treatment-extension requests (replacing fax and phone) with request tracking, error "
    "validation, and phased rollout — partnering with case-management platform owners on an $80M spend workflow so "
    "treatment continuity never stalled while clinical review stayed in the loop.")

sublabel(doc, "EHR Integration & Structured Data Writeback")
bullet(doc,
    "Led 0-to-1 discovery and delivery for point-of-care submission so physicians could send structured clinical "
    "data directly from OSCAR (community GP EMR) instead of re-entering it in a portal — after 15 physician "
    "interviews showed GPs will not use software other than their EMR.")
bullet(doc,
    "Held substantive architecture tradeoffs with engineers: JSON for POC speed with FHIR as the documented upgrade "
    "path, Azure API Management as a reusable facade over point-to-point integrations, and OAuth2.0/mTLS for the "
    "clinical data channel — decoupling clinical reporting from a billing spec that had frozen form content since "
    "2015.")
bullet(doc,
    "Secured $80K Innovation Council funding and an EMR vendor roadmap covering ~70% of the provider ecosystem "
    "(~1,200 physicians on the OSCAR beachhead; top 5 EMRs ≈ 80% of the market), coordinating 50 EMR vendors plus "
    "TELUS, ForgeRock, and government partners from requirements through go-live.")

sublabel(doc, "Provider Adoption, Ops Playbooks & Executive Relationships")
bullet(doc,
    "Defined the metrics and instrumented PostHog funnels before launch, then ran named-cohort dark, soft, and hard "
    "launches with Healthcare Operations — adoption and clinician drop-off visible within days instead of after a "
    "big-bang cutover, with no disruption to existing digital volume.")
bullet(doc,
    "Led a CIAM migration of 5,600 healthcare professionals across 500 organizations on a platform carrying 62,000+ "
    "annual referrals: segmented outreach, administrator-led versus self-serve rollout, helpdesk enablement — 0 "
    "service disruptions, 100% of active accounts transitioned on deadline.")
bullet(doc,
    "Drove adoption across a multi-persona committee — physicians, ER and hospital billing teams, office admins, "
    "case managers, medical advisors, operations leaders, executives, EMR vendors — translating outcomes into "
    "sequenced roadmaps and written specs that aligned engineering, clinical, ops, and sales.")

# ── Technical Safety BC ───────────────────────────────────────────────────────
subheading(doc, "Product Manager", "Technical Safety BC", "Oct 2021 – Apr 2024")
bullet(doc,
    "Shipped NLP-powered email classification into a live operational workflow to automate routing and triage of "
    "incoming requests, reducing manual inbox processing — the production ML predecessor to later LLM work.")
bullet(doc,
    "Led discovery for a mobile field-inspection platform through contextual research, workflow mapping, usability "
    "testing, and prototyping before development investment — the same workflow-native pattern later applied to "
    "clinician documentation products, partnering with engineering, inspectors, design, and operations leaders.")
bullet(doc,
    "Built operational analytics identifying an 11.7% average annual churn rate and an RFM segmentation model "
    "that drove targeted engagement campaigns retaining 78% of high-risk customers.")

# ── 180 Degrees ───────────────────────────────────────────────────────────────
subheading(doc, "Strategy Consultant", "180 Degrees Consulting — University of British Columbia", "Sep 2020 – Oct 2021")
bullet(doc,
    "Designed a data-driven acquisition strategy for Open Primaries that cut bounce rate 37% and doubled subscriptions.")

# ── Convertus ─────────────────────────────────────────────────────────────────
subheading(doc, "SEO Consultant", "Convertus", "May 2018 – Jul 2019")
bullet(doc,
    "Built analytics-driven growth strategies for 75+ client websites, lifting organic performance ~150%.")

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# EDUCATION
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Education")

subheading(doc, "Master of Business Analytics", "University of British Columbia", "")
subheading(doc, "Bachelor of Business Administration (Marketing)", "British Columbia Institute of Technology", "")

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# LEADERSHIP
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Leadership")

def leadership_row(doc, label, detail, italic_detail=False):
    """Bold role label and its description on a single line."""
    p = doc.add_paragraph()
    clear_paragraph_space(p, before=2, after=2)
    rl = p.add_run(f"{label}:  ")
    rl.bold = True
    rl.font.size = Pt(9.5)
    rl.font.color.rgb = DARK
    rd = p.add_run(detail)
    rd.italic = italic_detail
    rd.font.size = Pt(9.5)
    rd.font.color.rgb = BODY
    return p

leadership_row(doc, "Speaker — ProductCamp BC (2025)",
    '"How Legacy Industries Can Adopt a Product Mindset to Improve Service Delivery."',
    italic_detail=True)
leadership_row(doc, "Mentor — ProductBC",
    "Mentor aspiring Product Managers in product discovery, strategy, and career development.")

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
    "Product Strategy  •  End-to-End Ownership  •  0-to-1  •  OKRs & Success Metrics  •  GTM & Ops Playbooks  •  "
    "Enterprise Adoption  •  PRDs  •  Executive Influence")
skills_row(doc, "Clinical Workflows",
    "Documentation Burden  •  Point-of-Care Workflows  •  EHR/EMR Integration & Writeback  •  "
    "Structured Clinical Data Quality  •  Clinician Experience  •  Regulated Healthcare")
skills_row(doc, "AI / ML",
    "LLM Applications  •  RAG  •  Multi-Agent Workflows  •  Evals  •  Human-in-the-Loop Design  •  "
    "Unstructured Document Synthesis  •  NLP  •  Synthetic Data")
skills_row(doc, "Technical",
    "REST APIs  •  EMR/EHR Integrations  •  Azure APIM  •  OAuth2.0 / mTLS  •  JSON vs FHIR  •  SQL  •  Python  •  "
    "PostHog  •  GitHub Copilot  •  Lovable")
skills_row(doc, "Research",
    "User Research  •  Physician & ER Interviews  •  Journey Mapping  •  Usability Testing  •  Prototyping  •  Figma")

# ── Save ──────────────────────────────────────────────────────────────────────
out_path = r"c:\Users\khush\Desktop\kdodani-portfolio\Khushboo_Dodani_Resume_Commure_Ambient.docx"
doc.save(out_path)
print(f"Saved: {out_path}")
