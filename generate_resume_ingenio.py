from docx import Document
from docx.shared import Pt, RGBColor, Inches, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

doc = Document()

# ── Page margins ──────────────────────────────────────────────────────────────
for section in doc.sections:
    section.top_margin    = Cm(1.2)
    section.bottom_margin = Cm(1.2)
    section.left_margin   = Cm(1.8)
    section.right_margin  = Cm(1.8)

# ── Portfolio color system (matches globals.css + design-system.md) ───────────
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

def heading(doc, text, size=10.5, bold=True, color=RGBColor(0x6D, 0x28, 0xD9), space_before=5, space_after=2, caps=True):
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
    clear_paragraph_space(p, before=4, after=1)
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
    clear_paragraph_space(p, before=0, after=1)
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

def skills_row(doc, label, skills):
    p = doc.add_paragraph()
    clear_paragraph_space(p, before=1, after=1)
    rl = p.add_run(f"{label}:  ")
    rl.bold = True
    rl.font.size = Pt(9)
    rl.font.color.rgb = RGBColor(0x5B, 0x21, 0xB6)
    rs = p.add_run(skills)
    rs.font.size = Pt(9)
    rs.font.color.rgb = BODY
    return p

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
rt = p_title.add_run("GROWTH PRODUCT MANAGER")
rt.bold = True
rt.font.size = Pt(12)
rt.font.color.rgb = RGBColor(0x6D, 0x28, 0xD9)

p_pills = doc.add_paragraph()
clear_paragraph_space(p_pills, before=1, after=4)
p_pills.alignment = WD_ALIGN_PARAGRAPH.CENTER
rp = p_pills.add_run(
    "Activation  •  Conversion  •  Matching & Recommendations  •  Experimentation"
)
rp.font.size = Pt(9)
rp.font.color.rgb = RGBColor(0x5B, 0x21, 0xB6)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# SUMMARY
# ══════════════════════════════════════════════════════════════════════════════
body(
    doc,
    "Growth Product Manager focused on activation, conversion, and retention across user funnels. Proven track "
    "record increasing conversion and digital adoption through experimentation, segmentation, and behavioral insights.",
    size=9.5,
    space_before=3,
    space_after=2,
)
body(
    doc,
    "Owned onboarding and first-success experiences for products used by thousands of users, improving activation "
    "rates (39% → 55%) and reducing drop-off through funnel redesign and targeted GTM. Experienced partnering with "
    "marketing on acquisition strategies and building analytics-driven experimentation systems.",
    size=9.5,
    space_before=0,
    space_after=2,
)
body(
    doc,
    "Background in SEO and acquisition growth (+150% organic), retention (RFM-based experimentation), and "
    "AI-powered product experiences.",
    size=9.5,
    space_before=0,
    space_after=3,
)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# EXPERIENCE
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Experience")

# ── WorkSafeBC ────────────────────────────────────────────────────────────────
subheading(doc, "Product Manager — Activation, Conversion & Matching", "WorkSafeBC", "Apr 2024 – Present")
body(
    doc,
    "Own onboarding and first-success for products used by 5,600 users across 500 organizations (62K+ annual "
    "transactions). Diagnose why high-value segments do not convert, rebuild the funnel, and instrument it before launch.",
    size=9, color=LIGHT, space_before=0, space_after=3,
)

sublabel(doc, "Growth diagnosis — Pareto targeting, not broad GTM")
bullet(doc,
    "Analyzed 3.7M line items: 8.7% digital share and 322K lines/year already converting — PMF for one segment, "
    "but the product had structurally run out of room to grow.")
bullet(doc,
    "Pareto / power-law: 25 of 3,795 organizations (<1%) generated 50% of remaining volume (~280K lines). "
    "Constraint was a capacity ceiling (1 claim per submit, 11 screens, ~32-line cap), not training. Focused "
    "product and GTM on that cohort instead of communications to all 3,795.")

sublabel(doc, "Activation & conversion — first successful submit", space_before=2)
bullet(doc,
    "Rebuilt the high-volume funnel for throughput: multi-claim / multi-invoice, line duplication, 11 screens → 5. "
    "First-pass success as the conversion metric — validation so invalid submissions fail at submit (−40%). "
    "Product share 39% → 55%; paper 56% → 19% (~3×); digital adoption to 60% in six months; support −30%; "
    "NPS +25; ~$200K annual operational savings.")
bullet(doc,
    "Secured $580K in executive funding to scale the rebuild across the high-value segment — business case on "
    "named accounts and blocked volume, not a generic adoption story.")
bullet(doc,
    "Partnered with marketing and communications on targeted acquisition and activation strategies, aligning on "
    "conversion, adoption, and cost-to-serve metrics.")

sublabel(doc, "Experimentation, funnels & onboarding", space_before=2)
bullet(doc,
    "Wrote the PostHog spec before launch (conversion, drop-off, v1 vs v2, high-volume activation). Staged "
    "cohort rollout as a holdout: dark launch to 10 named orgs → soft launch (v2 default, v1 via banner) → "
    "hard launch. 322K existing digital lines/year uninterrupted while the new segment activated.")
bullet(doc,
    "First month after ship: near-zero adoption despite a better product. Session data showed users missed the "
    "duplicate-line control and re-entered work by hand — onboarding and discoverability, not a feature gap. "
    "Iterated GTM and in-product visibility.")
bullet(doc,
    "Demand-tested in discovery: removed a control from a prototype in a second round to see whether users "
    "missed it, ignored it, or created demand. Split GTM by segment after one launch narrative failed to convert "
    "every cohort — different value props and channels, not one message.")

sublabel(doc, "Matching, recommendations & AI", space_before=2)
bullet(doc,
    "Built Referral Radar, an LLM/RAG recommendation product that ranks next-best matches from 20–75 unstructured "
    "documents per case — priority, evidence traces, natural-language search, inspectable agent path. Rejected a "
    "ranked list with no why. Humans retain the decision. 2nd of 36 at InnoFest 2025. Unblocked with SME-validated "
    "synthetic data; prototyped with Lovable, GitHub Copilot, and n8n.")

sublabel(doc, "Channel strategy & first-use activation", space_before=2)
bullet(doc,
    "One surface could not convert every segment. Three distribution paths: rebuilt portal (high-volume), "
    "vendor/partner channel (users already in Blueprint — bottom-up demand via ops who hold daily relationships), "
    "and in-workflow API (users will not leave their system of record). $80K funding; roadmap covering ~70% of "
    "the ecosystem.")
bullet(doc,
    "Identity cutover as an activation campaign: 28-day multi-channel treatments (in-product banners, admin email, "
    "program-manager channels). Targeted 500 org admins as multipliers instead of 5,600 individuals with no email "
    "on file. 100% of active accounts transitioned; 0 service disruptions.")
bullet(doc,
    "On an $80M workflow, analyzed 139K historical requests (79% always approved). Killed auto-approve. Killed a "
    "“ping when stuck” feature after aging data showed most requests resolve within 3 days. Segmented users by "
    "workflow role (admin submits, practitioner delivers) — behavior predicted adoption better than org type.")

# ── Technical Safety BC ───────────────────────────────────────────────────────
subheading(
    doc,
    "Product Manager — Retention & Experimentation (promoted from Business Analyst)",
    "Technical Safety BC",
    "Oct 2021 – Apr 2024",
)

sublabel(doc, "A/B testing, RFM & retention")
bullet(doc,
    "Built membership, churn, and engagement data products: 11.7% average annual churn. Applied RFM (recency, "
    "frequency, monetary) to score at-risk accounts instead of treating all customers as one cohort.")
bullet(doc,
    "Ran targeted engagement treatments vs baseline outreach on high-risk RFM segments — control vs treatment, "
    "not a blanket campaign. Retained 78% of high-risk customers. Shipped a client-impact dashboard so operations "
    "could prioritize who to save next.")

sublabel(doc, "Matching, search & shipped NLP", space_before=2)
bullet(doc,
    "Shipped NLP classification into a live routing workflow: inbound requests scored by intent and urgency and "
    "matched to the right queue. Designed an internal retrieval product so support could search procedures and "
    "policy in context.")
bullet(doc,
    "Led discovery for a mobile inspection platform — interviews, workflow mapping, prototyping, usability "
    "testing — and held engineering spend until the workflow was validated.")

# ── 180 Degrees ───────────────────────────────────────────────────────────────
subheading(doc, "Strategy Consultant", "180 Degrees Consulting — University of British Columbia", "Sep 2020 – Oct 2021")
bullet(doc,
    "Designed and optimized consumer-facing landing pages and acquisition funnels for Open Primaries, reducing "
    "bounce rate by 37% and doubling user conversions. Built product and market strategies for nonprofit and "
    "clean-energy clients through customer research, segmentation, and funnel analysis.")

# ── Convertus ─────────────────────────────────────────────────────────────────
subheading(doc, "SEO Consultant — Growth & Analytics", "Convertus", "May 2018 – Jul 2019")
bullet(doc,
    "Owned organic acquisition for 75+ consumer-facing digital properties — growth experimentation, performance optimization, "
    "and a forecasting model predicting SEO performance with ~85% accuracy so channel investment followed "
    "projected return. Organic performance ~+150%.")

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# EDUCATION
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Education")

subheading(doc, "Master of Business Analytics", "University of British Columbia — Sauder School of Business", "")
body(
    doc,
    "Probability and uncertainty (BABS 506)  •  Clustering / predictive analytics (BABS 507)  •  Regression, logistic, "
    "discrete choice (BABS 508)  •  Forecasting (BABS 502)  •  Data-driven marketing (BAMA 517)  •  Customer analytics "
    "(BAMA 520)  •  ML applications  •  SQL / Python. Applied as RFM, Pareto, funnels, and hypothesis → metric → decision rule.",
    size=9, color=LIGHT, space_before=0, space_after=1,
)

subheading(doc, "Bachelor of Business Administration (Marketing)", "British Columbia Institute of Technology", "")
body(
    doc,
    "Consumer behavior, segmentation, and go-to-market.",
    size=9, color=LIGHT, space_before=0, space_after=1,
)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# LEADERSHIP
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Leadership")
body(
    doc,
    "Speaker, ProductCamp BC (2025) — “How Legacy Industries Can Adopt a Product Mindset to Improve Service Delivery.”   "
    "Mentor, ProductBC — product discovery, strategy, and career development.",
    size=9,
    space_before=1,
    space_after=2,
)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# SKILLS
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Skills")

skills_row(doc, "Growth",
    "Activation  •  Conversion  •  Onboarding  •  Funnel Optimization  •  Pareto  •  Segmentation  •  "
    "Retention  •  RFM  •  A/B Testing  •  Staged Launches  •  PostHog  •  Recommendations  •  LLM / RAG  •  NLP")
skills_row(doc, "Growth metrics",
    "Conversion Rate  •  Activation  •  Retention  •  Funnel Drop-off  •  CAC  •  LTV  •  "
    "Acquisition Channels  •  Monetization  •  Customer Analytics  •  SQL  •  Python  •  Forecasting")

# ── Save ──────────────────────────────────────────────────────────────────────
out_path = r"c:\Users\khush\Desktop\kdodani-portfolio\Khushboo_Dodani_Resume_Ingenio_Keen.docx"
doc.save(out_path)
print(f"Saved: {out_path}")
