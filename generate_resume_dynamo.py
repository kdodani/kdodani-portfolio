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
INDIGO  = RGBColor(0x4F, 0x46, 0xE5)   # accent-hero-2 — sublabels
BG_HEX  = "FAF9F6"

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

def heading(doc, text, size=10.5, bold=True, color=ACCENT, space_before=8, space_after=2, caps=True):
    p = doc.add_paragraph()
    clear_paragraph_space(p, before=space_before, after=space_after)
    run = p.add_run(text.upper() if caps else text)
    run.bold = bold
    run.font.size = Pt(size)
    run.font.color.rgb = color
    return p

def subheading(doc, role, org, period, size=10):
    """Role | Org      Period — two runs on one line."""
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

def sublabel(doc, text, size=9, italic=True, color=INDIGO, space_before=0, space_after=1):
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

def skills_row(doc, label, skills, space_before=2, space_after=2):
    p = doc.add_paragraph()
    clear_paragraph_space(p, before=space_before, after=space_after)
    rl = p.add_run(f"{label}:  ")
    rl.bold = True
    rl.font.size = Pt(9)
    rl.font.color.rgb = MID
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
rc = p_contact.add_run(
    "San Francisco Bay Area  |  khushdodani@gmail.com  |  LinkedIn  |  GitHub  |  Portfolio"
)
rc.font.size = Pt(9)
rc.font.color.rgb = LIGHT

p_title = doc.add_paragraph()
clear_paragraph_space(p_title, before=2, after=2)
p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
rt = p_title.add_run("PRODUCT ANALYST")
rt.bold = True
rt.font.size = Pt(12)
rt.font.color.rgb = ACCENT

p_pills = doc.add_paragraph()
clear_paragraph_space(p_pills, before=1, after=4)
p_pills.alignment = WD_ALIGN_PARAGRAPH.CENTER
rp = p_pills.add_run(
    "Experimental Design  •  Product Metrics  •  Python & SQL  •  AI Prototypes"
)
rp.font.size = Pt(9)
rp.font.color.rgb = MID

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# SUMMARY
# ══════════════════════════════════════════════════════════════════════════════
body(
    doc,
    "Master of Business Analytics (Sauder, 2021). I scope a product question, set the metric, run the analysis, "
    "and return a recommendation a PM can ship. At Technical Safety BC I queried churn, lifetime value, and a "
    "controlled outreach test. At WorkSafeBC I analyzed invoice and treatment-request data and specified launch "
    "events so a miss was visible in days. I prototype with AI when that is faster than a debate, and I set the "
    "bar on evidence a reviewer can check.",
    size=9.5,
    space_before=4,
    space_after=2,
)

skills_row(
    doc,
    "Analysis",
    "Python  •  pandas  •  SQL  •  R  •  PostHog  •  Experiment design  •  Segmentation  •  Funnels",
    space_before=1,
    space_after=2,
)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# EXPERIENCE
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Experience")

subheading(doc, "Product Manager — Provider Experience", "WorkSafeBC", "Apr 2024 – Present")

sublabel(doc, "Invoice volume — analyzed the data, then staged the launch")
bullet(doc,
    "Analyzed 3.7M invoice line items. 25 of 3,795 organizations were 50% of remaining paper (~280K lines), "
    "so the recommendation was a named cohort, not a blast to everyone. Dark launch to 10 providers, then soft, "
    "then hard, leaving 322K existing digital lines on the prior path. Paper share of all lines moved from 56% "
    "to 19% (2023–2026); portal share from 39% to 55%.")

sublabel(doc, "Instrumentation — specified the events and the decision rule", space_before=2)
bullet(doc,
    "Specified PostHog events before launch (daily submissions on v1 vs v2, line items, error rate, funnel to "
    "confirmation) so adoption risk was visible within days. First-month use of a duplicate-line control was "
    "near zero: providers retyped instead of using it. Recommendation was discoverability and onboarding, not more scope.")

sublabel(doc, "Treatment requests — a control that looked efficient and failed the risk case", space_before=2)
bullet(doc,
    "Analyzed 139,380 extension requests on an $80M program. 79% were always approved (109,693), 27% resolved "
    "same-day, and most closed within 3 days. Recommended against auto-approve and against a stuck-request ping: "
    "high approval can mean the review is being skipped, and a ping adds little when work already clears in days. "
    "Shipped tracking, validation, and decision rationale so a person could still judge.")

sublabel(doc, "AI prototype — evaluation bar set before the demo", space_before=2)
bullet(doc,
    "Referral Radar, a two-week prototype (2nd of 36 at InnoFest 2025). Set the bar as an evidence trace a case "
    "manager can check, not an automation rate. Production claims were off limits, so the test set was synthetic "
    "and checked with a case manager. The system surfaces a recommendation; the person decides.")

subheading(doc, "Product Manager (promoted from Business Analyst)", "Technical Safety BC", "Oct 2021 – Apr 2024")

sublabel(doc, "Churn, lifetime value, and what was worth closing")
bullet(doc,
    "Queried an operating-permit view of about 102,000 active permits. Average annual churn was 11.7%; net churn "
    "was 1.9%. Lifetime value differed by industry (Energy Utility about $7,400 per permit). Split the loss into "
    "preventable net churn (−2.0%), which the team could act on, and unpreventable (4.4%).")

sublabel(doc, "Controlled outreach test — measures set first", space_before=2)
bullet(doc,
    "RFM targeting versus the existing call strategy, same two weeks, success defined before the calls went out. "
    "Result: 62 calls versus 48, and $45,742 collected versus $25,597 (78% more). Recommendation was to scale "
    "the RFM treatment.")

sublabel(doc, "Reactivation sequence", space_before=2)
bullet(doc,
    "Tested a three-step email on expired permits: introduction, a firmer follow-up, then regulatory language. "
    "135 clients, about CAD 46.7K; 23% paid from the first email. 2022 permit volume finished 8% above budget "
    "(16,877 versus 16,488).")

sublabel(doc, "Small AI tools, shipped into the workflow", space_before=2)
bullet(doc,
    "Shipped an email classifier that routed operational requests by intent and urgency into live queues, and an "
    "internal retrieval assistant for policy lookup — built when a small tool was faster than waiting on a full project.")

subheading(doc, "Strategy Consultant", "180 Degrees Consulting — University of British Columbia", "Sep 2020 – Oct 2021")
bullet(doc,
    "Designed a conversion path for Open Primaries that cut bounce rate 37% and doubled subscriptions.")

subheading(doc, "SEO Consultant", "Convertus", "May 2018 – Jul 2019")
bullet(doc,
    "Built analytics for 75+ client sites (about 150% organic growth) and a forecasting sheet that predicted "
    "SEO performance at about 85% accuracy.")

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# EDUCATION
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Education", space_before=6)

subheading(doc, "Master of Business Analytics", "University of British Columbia — Sauder School of Business", "2021")
body(
    doc,
    "Probability and uncertainty (BABS 506)  •  Clustering and predictive analytics (BABS 507)  •  Regression, "
    "logistic regression, and discrete choice (BABS 508)  •  Forecasting (BABS 502)  •  Data-driven marketing "
    "(BAMA 517)  •  Customer analytics (BAMA 520). Python, pandas, SQL, and R on assignments.",
    size=9,
    color=LIGHT,
    space_before=0,
    space_after=1,
)

subheading(doc, "Bachelor of Business Administration (Marketing)", "British Columbia Institute of Technology", "")

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# SKILLS
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Skills", space_before=6)

skills_row(doc, "Analysis",
    "Python  •  pandas  •  SQL  •  R  •  Excel  •  Segmentation  •  RFM  •  Lifetime value  •  Pareto")
skills_row(doc, "Experimentation",
    "Hypothesis and metric design  •  Control vs treatment  •  Staged launches  •  Funnels  •  Cohorts  •  PostHog")
skills_row(doc, "AI prototyping",
    "LLM workflows  •  Synthetic data  •  Human review  •  Retrieval  •  Cursor  •  n8n")

out_path = r"c:\Users\khush\Desktop\kdodani-portfolio\Khushboo_Dodani_Resume_Dynamo_AI.docx"
doc.save(out_path)
print(f"Saved: {out_path}")
