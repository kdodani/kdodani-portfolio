from docx import Document
from docx.shared import Pt, RGBColor, Inches, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

doc = Document()

# ── Page margins ──────────────────────────────────────────────────────────────
for section in doc.sections:
    section.top_margin    = Cm(1.4)
    section.bottom_margin = Cm(1.3)
    section.left_margin   = Cm(1.7)
    section.right_margin  = Cm(1.7)

DARK    = RGBColor(0x1c, 0x19, 0x17)
MID     = RGBColor(0x5B, 0x21, 0xB6)
ACCENT  = RGBColor(0x6D, 0x28, 0xD9)
BODY    = RGBColor(0x44, 0x40, 0x3c)
LIGHT   = RGBColor(0x78, 0x71, 0x6c)
BG_HEX  = "FAF9F6"

LINKEDIN_URL  = "https://www.linkedin.com/in/khushdodani"
GITHUB_URL    = "https://github.com/kdodani"
PORTFOLIO_URL = "https://kdodani-portfolio.vercel.app"


def set_page_background(doc, hex_color):
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
    p = doc.add_paragraph()
    clear_paragraph_space(p, before=1, after=1)
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


def heading(doc, text, size=10.5, bold=True, color=RGBColor(0x6D, 0x28, 0xD9), space_before=6, space_after=2, caps=True):
    p = doc.add_paragraph()
    clear_paragraph_space(p, before=space_before, after=space_after)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text.upper() if caps else text)
    run.bold = bold
    run.font.size = Pt(size)
    run.font.color.rgb = color
    return p


def subheading(doc, role, org, period, size=10):
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


def sublabel(doc, text, size=9, italic=True, color=RGBColor(0x4F, 0x46, 0xE5), space_before=2, space_after=1):
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
    clear_paragraph_space(p, before=1, after=1.5)
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
rt = p_title.add_run("PRODUCT MANAGER, PRODUCT EXPERIENCE")
rt.bold = True
rt.font.size = Pt(12)
rt.font.color.rgb = RGBColor(0x6D, 0x28, 0xD9)

p_pills = doc.add_paragraph()
clear_paragraph_space(p_pills, before=1, after=3)
p_pills.alignment = WD_ALIGN_PARAGRAPH.CENTER
rp = p_pills.add_run(
    "User Research  •  Experimentation  •  Launch & Metrics  •  Healthcare Partnerships  •  AI Prototyping"
)
rp.font.size = Pt(9)
rp.font.color.rgb = RGBColor(0x5B, 0x21, 0xB6)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# SUMMARY
# ══════════════════════════════════════════════════════════════════════════════
body(
    doc,
    "Product Manager with 4+ years owning healthcare products from discovery to launch, in regulated environments "
    "where trust, data quality, and clinical judgment are non-negotiable. I run discovery the unbiased way "
    "(interviews, workflow observation, usability testing, and PostHog analytics before and after every release) "
    "and let evidence, not the loudest voice, set the roadmap. I prototype in Figma, Lovable, and Cursor, evaluate "
    "vendor and integration partners, and tell the story that gets executives to fund the work ($580K and $80K "
    "secured). Master of Business Analytics (SQL, Python).",
    size=9.5,
    space_before=3,
    space_after=3,
)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# EXPERIENCE
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Experience")

subheading(doc, "Product Manager, Provider & Clinician Experience", "WorkSafeBC", "Apr 2024 – Present")
body(
    doc,
    "Own the digital products healthcare providers use to submit treatment requests, referrals, and invoices: "
    "5,600 providers across 500+ organizations.",
    size=9, color=LIGHT, space_before=0, space_after=2,
)

sublabel(doc, "Discovery and UX research")
bullet(doc,
    "Led a redesign of the clinician submission workflow after interviews, workflow observation, usability studies, "
    "and journey mapping exposed the friction. Cut the journey from 11 steps to 5 and lifted digital adoption to "
    "60% in six months (~$200K in annual operational savings).")
bullet(doc,
    "Interviewed 15 physicians and found GPs will not leave their EMR to file clinical documentation. That "
    "finding moved the strategy from a side portal to in-workflow API integration.")
bullet(doc,
    "Caught a feedback bias: satisfaction surveys were answered by physiotherapists, but office admins use the tool. "
    "Redirected research to the actual users so scores reflected the product, not the contract.")

sublabel(doc, "Experiments and metrics")
bullet(doc,
    "Defined adoption and behavior KPIs in PostHog before launch; front-end validation cut support calls 30% and "
    "raised clinician NPS by 25 points.")
bullet(doc,
    "Analyzed 139,380 treatment-extension requests. 79% were always approved, which fueled a push to auto-approve; "
    "I argued a high approval rate can signal rushed review, not unnecessary review, and designed for case-manager "
    "judgment on an $80M spend category. Aging data also let us deprioritize a low-value feature.")
bullet(doc,
    "Used Pareto analysis to show 25 of 3,795 organizations generated 50% of remaining paper invoices, and "
    "targeted product and messaging at that cohort.")

sublabel(doc, "Launch and adoption")
bullet(doc,
    "Launched invoicing by named cohort (dark, soft, hard) so existing users were never disrupted. Paper channels "
    "fell 56% to 19% of line items while portal share grew 39% to 55%.")
bullet(doc,
    "Month-one adoption was near zero despite better features: users missed a key icon. Observed real behavior, "
    "fixed discoverability, and segmented launch messaging for the hard launch.")
bullet(doc,
    "Led identity migration for 5,600 providers: 0% downtime, 85% migrated before the deadline, 92% post-launch "
    "login success, coordinating Engineering, Operations, Communications, and external partners.")

sublabel(doc, "Partnerships and vendors")
bullet(doc,
    "Evaluated EMR vendors on integration risk and reach: validated with open-source OSCAR before paid vendors, "
    "engaged ~50 vendors, and mapped a roadmap covering ~70% of the provider ecosystem. Secured $80K to prove it.")
bullet(doc,
    "Won $580K from an executive sponsor for the portal, interoperability, and vendor-integration roadmap, "
    "with business cases defended before development began.")

sublabel(doc, "AI-native prototyping")
bullet(doc,
    "Built Referral Radar in two weeks, an LLM-agent prototype that surfaces referral opportunities across 20–75 "
    "documents per case with explainable evidence. Humans decide, AI retrieves. Placed 2nd of 36 ideas at InnoFest 2025.")
bullet(doc,
    "Prototype with Lovable, Cursor, and GitHub Copilot to validate concepts with users before engineering "
    "investment, cutting concept-to-validation time ~40%.")

# ── Technical Safety BC ───────────────────────────────────────────────────────
subheading(doc, "Product Manager", "Technical Safety BC", "Oct 2021 – Apr 2024")
bullet(doc,
    "Led discovery for a mobile remote-inspections platform: contextual research, workflow mapping, usability "
    "testing, and rapid prototyping before development investment.")
bullet(doc,
    "Built operational analytics showing 11.7% annual churn and an RFM segmentation model that retained 78% of "
    "high-risk customers through targeted campaigns.")
bullet(doc,
    "Built NLP email classification to route and triage incoming requests, reducing manual inbox processing.")

# ── 180 Degrees ───────────────────────────────────────────────────────────────
subheading(doc, "Strategy Consultant", "180 Degrees Consulting, University of British Columbia", "Sep 2020 – Oct 2021")
bullet(doc,
    "Designed a data-driven acquisition strategy for Open Primaries that cut website bounce rate 37% while "
    "doubling subscriptions.")

# ── Convertus ─────────────────────────────────────────────────────────────────
subheading(doc, "SEO Consultant", "Convertus", "May 2018 – Jul 2019")
bullet(doc,
    "Built analytics-driven growth strategies for 75+ client websites (~150% organic lift) and a forecasting "
    "tool predicting SEO performance with ~85% accuracy.")

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# EDUCATION
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Education")

subheading(doc, "Master of Business Analytics", "University of British Columbia", "")
body(doc, "Python  •  SQL  •  Machine Learning  •  Optimization  •  Product Analytics", size=9, color=LIGHT, space_before=0)

subheading(doc, "Bachelor of Business Administration (Marketing)", "British Columbia Institute of Technology", "")

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# LEADERSHIP
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Leadership and Storytelling")

sublabel(doc, "Speaker, ProductCamp BC (2025)", italic=False, size=9.5, color=DARK, space_before=0)
body(doc,
    '"How Legacy Industries Can Adopt a Product Mindset to Improve Service Delivery."',
    size=9.5, italic=True, space_before=0)

sublabel(doc, "Mentor, ProductBC", italic=False, size=9.5, color=DARK, space_before=3)
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
    clear_paragraph_space(p, before=1.5, after=1.5)
    rl = p.add_run(f"{label}:  ")
    rl.bold = True
    rl.font.size = Pt(9)
    rl.font.color.rgb = RGBColor(0x5B, 0x21, 0xB6)
    rs = p.add_run(skills)
    rs.font.size = Pt(9)
    rs.font.color.rgb = BODY

skills_row(doc, "Product",
    "Product Vision & Strategy  •  Roadmap Prioritization  •  User Stories  •  Go-to-Market & Launch Plans  •  "
    "Pilots  •  Agile / Scrum  •  Cross-functional Alignment")
skills_row(doc, "Research and Experimentation",
    "User Interviews  •  Usability Testing  •  Journey Mapping  •  Workflow Analysis  •  A/B Testing  •  "
    "Unbiased Feedback Collection")
skills_row(doc, "Data",
    "SQL  •  Python  •  PostHog  •  KPI Design (business, engagement)  •  Funnel & Cohort Analysis  •  Segmentation")
skills_row(doc, "Healthcare",
    "Regulated Healthcare  •  Provider & Clinician Experience  •  EMR/EHR Integrations  •  HIPAA  •  "
    "Vendor & Partner Evaluation")
skills_row(doc, "AI & Tools",
    "LLM Applications  •  Human-in-the-Loop Design  •  Figma  •  Lovable  •  Cursor  •  GitHub Copilot")

out_path = r"c:\Users\khush\Desktop\kdodani-portfolio\Khushboo_Dodani_Resume_Adyn.docx"
doc.save(out_path)
print(f"Saved: {out_path}")
