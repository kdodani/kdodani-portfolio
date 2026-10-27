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

def bullet(doc, text, size=9, indent=Inches(0.2), hanging=Inches(0.2)):
    p = doc.add_paragraph(style='List Bullet')
    clear_paragraph_space(p, before=0.5, after=0.5)
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
    clear_paragraph_space(p, before=2, after=2)
    rl = p.add_run(f"{label}:  ")
    rl.bold = True
    rl.font.size = Pt(9)
    rl.font.color.rgb = RGBColor(0x5B, 0x21, 0xB6)
    rs = p.add_run(skills)
    rs.font.size = Pt(9)
    rs.font.color.rgb = BODY

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
rt = p_title.add_run("PRODUCT MANAGER — PAYMENTS & BILLING EXPERIENCE")
rt.bold = True
rt.font.size = Pt(12)
rt.font.color.rgb = RGBColor(0x6D, 0x28, 0xD9)

p_pills = doc.add_paragraph()
clear_paragraph_space(p_pills, before=1, after=4)
p_pills.alignment = WD_ALIGN_PARAGRAPH.CENTER
rp = p_pills.add_run(
    "Payments, Billing & Insurance Experience  •  Cost Transparency  •  Care Access & Retention"
)
rp.font.size = Pt(9)
rp.font.color.rgb = RGBColor(0x5B, 0x21, 0xB6)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# SUMMARY
# ══════════════════════════════════════════════════════════════════════════════
body(
    doc,
    "Product Manager with 5 years owning healthcare payments, billing, and eligibility products at a payer. "
    "Built products that increase patient confidence to start and continue care by making cost, coverage, and "
    "eligibility clear before treatment begins. Turns insurance complexity into billing UX people can act on: "
    "contracted services visible before care, invalid claims stopped at submit (−40%), treatment that does not "
    "stall because a bill was wrong.",
    size=9.5,
    space_before=4,
    space_after=3,
)
body(
    doc,
    "Owned product strategy — not just delivery — for WorkSafeBC, British Columbia’s workers’ compensation "
    "insurer: a three-sided system of patients/injured workers, contracted providers, and the payer. Defined "
    "roadmaps across payments, billing, eligibility, authorization, identity, and EMR integrations; aligned "
    "engineering, design, operations, and executives; secured $1.2M+ in funding. Mental health is already in "
    "the work: Referral Radar surfaced eligibility for contracted programs — including mental-health / "
    "counselling pathways — so referrals were not delayed or left uncovered. Clinical partners: "
    "physiotherapists, physicians, clinic office admins, case managers, Healthcare Programs (~70 contracted "
    "services). Master of Business Analytics; BBA in Marketing.",
    size=9.5,
    space_before=0,
    space_after=4,
)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# EXPERIENCE
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Experience")

# ── WorkSafeBC ────────────────────────────────────────────────────────────────
subheading(doc, "Product Manager — Payments, Billing & Eligibility", "WorkSafeBC", "Apr 2024 – Present")

sublabel(doc, "Product strategy & org-level ownership")
bullet(doc,
    "Owned end-to-end strategy and roadmap across payments, billing UX, eligibility, treatment authorization, "
    "identity, and EMR integrations — one surface spanning patients/injured workers, providers, and payer ops. "
    "Aligned engineering, design, Healthcare Operations, and executives on what to ship vs. what not to automate.")
bullet(doc,
    "Influenced org investment: built the business cases that secured $1.2M+ for billing/payments, identity, "
    "and EMR APIs — including $580K to scale the payments rebuild. Defined success as first-pass yield, cost "
    "predictability, and whether patients could start and continue care — not feature output.")

sublabel(doc, "Payments experience, cost transparency & billing UX", space_before=3)
bullet(doc,
    "Owned end-to-end billing and payments experience for providers and internal operations, including pricing, "
    "claims validation, and eligibility enforcement — fee schedules, contracted rates, service codes, and "
    "what could be billed before care started.")
bullet(doc,
    "For certain programs, invoicing happens before treatment is delivered. If a claim was wrong or not covered "
    "and providers could still invoice, patients absorbed the failure as errors and delayed care — the same "
    "blocker as unclear deductibles, coverage changes, or surprise cost after a first session. Product job: "
    "financial clarity before care, not cleanup after.")
bullet(doc,
    "Exposed contract eligibility on the invoice API so orgs only see (and can bill) contracted services. "
    "Shipped in-product validation against fee schedules, rates, and service codes. Invalid submissions −40% "
    "(first-pass yield) — reducing downstream billing errors and improving cost predictability for patients "
    "before care.")

sublabel(doc, "Friction, confidence to start care, and retention", space_before=3)
bullet(doc,
    "Rebuilt a high-friction payments/billing journey (11 screens → 5, multi-claim) so providers could submit "
    "with confidence and patients were not stuck behind paper. Analyzed 3.7M invoice line items; 25 of 3,795 "
    "orgs drove 50% of remaining paper (~280K blocked lines). Paper 56% → 19%; portal 39% → 55%; digital "
    "adoption to 60% in six months.")
bullet(doc,
    "Partnered with Healthcare Operations and support on billing/payments tickets. Clearer eligibility and "
    "fewer dead-end submits cut support calls 30% and lifted clinician NPS +25 — confidence to complete the "
    "financial path so care could start. Instrumented PostHog (submit, error, drop-off) and ran dark → soft → "
    "hard launches on 322K digital lines/year; treated onboarding as product when first-month adoption stalled.")

sublabel(doc, "Continuing care — authorization, coverage, and treatment that does not stall", space_before=3)
bullet(doc,
    "Digitized physiotherapy treatment-extension requests (replacing fax/phone) on an $80M program so injured "
    "workers keep treatment moving. Users: physiotherapists, clinic office admins (who submit), and case "
    "managers (who approve/deny/revise). Segmented by workflow — admins submit, clinicians treat — not org type.")
bullet(doc,
    "Analyzed 139K historical extensions. 79% were always approved — the tempting move was auto-approve. "
    "Rejected it: rubber-stamping would have weakened clinical review on the largest spend category. Shipped "
    "tracking, error validation, and decision rationale so case managers could actually adjudicate.")

sublabel(doc, "Mental health program access — delayed referrals and coverage", space_before=3)
bullet(doc,
    "Built Referral Radar (LLM/RAG) because case managers spent 90+ minutes on 20–75 documents per claim — "
    "intake notes, medical reports, counselling plans — and still missed program eligibility. Failure mode: "
    "delayed or uncovered referrals into mental-health / counselling pathways while recovery windows closed. "
    "AI surfaces eligibility with evidence traces; humans decide (rule inspectable, not a hidden score). "
    "2nd of 36, InnoFest 2025.")

sublabel(doc, "0-to-1 surfaces and the provider–payer–client system", space_before=3)
bullet(doc,
    "Led 0-to-1 EMR discovery so physicians submit from OSCAR instead of a side portal ($80K funding; ~70% "
    "provider-ecosystem roadmap). Migrated 5,600 healthcare professionals / 500 orgs to modern identity on a "
    "portal with 62,000+ annual referrals — 0 downtime. Network: physiotherapists, physicians, imaging and "
    "hearing-aid clinics, office admins, case managers, counselling/mental-health eligibility on the claim.")

# ── Technical Safety BC ───────────────────────────────────────────────────────
subheading(doc, "Product Manager (promoted from Business Analyst)", "Technical Safety BC", "Oct 2021 – Apr 2024")
bullet(doc,
    "Owned retention as a product problem: membership, churn, and engagement data products identified 11.7% "
    "annual churn; RFM segmentation retained 78% of high-risk customers. Clients who cannot see cost or status "
    "clearly do not continue.")
bullet(doc,
    "Shipped NLP classification to route inbound operational requests out of a shared inbox — support-load "
    "reduction on the analog of billing/coverage tickets. Led discovery for a mobile inspection platform "
    "(interviews, workflow mapping, prototyping, usability testing) before engineering investment.")

# ── 180 Degrees ───────────────────────────────────────────────────────────────
subheading(doc, "Strategy Consultant", "180 Degrees Consulting — University of British Columbia", "Sep 2020 – Oct 2021")
bullet(doc,
    "Built product and market strategies for nonprofit and clean-energy clients; designed a conversion system "
    "for Open Primaries that cut bounce rate 37% while doubling subscriptions.")

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

skills_row(doc, "Product leadership",
    "Product Strategy  •  End-to-End Surface Ownership  •  0-to-1  •  Roadmaps  •  Org-Level Influence  •  "
    "Executive Business Cases  •  Outcomes over Outputs")
skills_row(doc, "Payments, billing & insurance",
    "Payments Experience  •  Billing UX  •  Cost Transparency  •  Financial Clarity  •  Eligibility  •  "
    "Coverage Rules  •  Fee Schedules  •  First-Pass Yield  •  Claims Validation")
skills_row(doc, "Care access & mental health",
    "Patient / Client Experience  •  Confidence to Start Care  •  Care Continuity  •  Mental-Health Program "
    "Eligibility  •  Counselling / Psychological-Injury Claims  •  Delayed Referral Prevention")
skills_row(doc, "Retention & operations",
    "Support-Call Reduction  •  NPS  •  Digital Adoption  •  Churn / RFM  •  Change Management  •  "
    "Design / UXR / Ops / Support Partnership")
skills_row(doc, "Analytics & technical",
    "PostHog Funnels  •  Staged Launches  •  SQL  •  Python  •  REST APIs  •  EMR/EHR  •  LLM / RAG  •  "
    "NLP (shipped)")

# ── Save ──────────────────────────────────────────────────────────────────────
out_path = r"c:\Users\khush\Desktop\kdodani-portfolio\Khushboo_Dodani_Resume_Grow_Therapy_Payments.docx"
doc.save(out_path)
print(f"Saved: {out_path}")
