from docx import Document
from docx.shared import Pt, RGBColor, Inches, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

doc = Document()

for section in doc.sections:
    section.top_margin = Cm(1.0)
    section.bottom_margin = Cm(0.85)
    section.left_margin = Cm(1.5)
    section.right_margin = Cm(1.5)
    section.page_width = Inches(8.5)
    section.page_height = Inches(11)

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
FONT = "Calibri"


def set_run_font(run, size, color, bold=False, italic=False):
    run.bold = bold
    run.italic = italic
    run.font.size = Pt(size)
    run.font.color.rgb = color
    run.font.name = FONT
    rPr = run._element.get_or_add_rPr()
    rFonts = rPr.find(qn("w:rFonts"))
    if rFonts is None:
        rFonts = OxmlElement("w:rFonts")
        rPr.append(rFonts)
    rFonts.set(qn("w:ascii"), FONT)
    rFonts.set(qn("w:hAnsi"), FONT)
    rFonts.set(qn("w:cs"), FONT)


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

normal = doc.styles["Normal"]
normal.font.name = FONT
normal.font.size = Pt(9.5)
normal.font.color.rgb = BODY
normal.paragraph_format.space_before = Pt(0)
normal.paragraph_format.space_after = Pt(0)
normal.paragraph_format.line_spacing = 1.0
rPr = normal.element.get_or_add_rPr()
rFonts = rPr.find(qn("w:rFonts"))
if rFonts is None:
    rFonts = OxmlElement("w:rFonts")
    rPr.append(rFonts)
rFonts.set(qn("w:ascii"), FONT)
rFonts.set(qn("w:hAnsi"), FONT)
rFonts.set(qn("w:cs"), FONT)


def clear_paragraph_space(p, before=0, after=0):
    p.paragraph_format.space_before = Pt(before)
    p.paragraph_format.space_after = Pt(after)
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE
    p.paragraph_format.line_spacing = 1.0


def add_horizontal_rule(document, color=ACCENT, thickness=6):
    p = document.add_paragraph()
    clear_paragraph_space(p, before=1, after=1)
    p.paragraph_format.keep_with_next = True
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


def heading(document, text, size=10.5, space_before=4, space_after=0):
    p = document.add_paragraph()
    clear_paragraph_space(p, before=space_before, after=space_after)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text.upper())
    set_run_font(run, size, ACCENT, bold=True)
    return p


def subheading(document, role, org, period, size=10.5):
    p = document.add_paragraph()
    clear_paragraph_space(p, before=3, after=0)
    p.paragraph_format.keep_with_next = True
    r1 = p.add_run(f"{role}  |  {org}")
    set_run_font(r1, size, DARK, bold=True)
    if period:
        r2 = p.add_run(f"    {period}")
        set_run_font(r2, 9, LIGHT, bold=False)
    return p


def sublabel(document, text, space_before=1):
    p = document.add_paragraph()
    clear_paragraph_space(p, before=space_before, after=0)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    set_run_font(run, 9, INDIGO, italic=True)
    return p


def bullet(document, text, size=9.5):
    p = document.add_paragraph(style="List Bullet")
    clear_paragraph_space(p, before=0, after=0)
    p.paragraph_format.left_indent = Inches(0.2)
    p.paragraph_format.first_line_indent = Inches(-0.14)
    run = p.add_run(text)
    set_run_font(run, size, BODY)
    return p


def body(document, text, size=9.5, color=BODY, space_before=2, space_after=2, italic=False):
    p = document.add_paragraph()
    clear_paragraph_space(p, before=space_before, after=space_after)
    run = p.add_run(text)
    set_run_font(run, size, color, italic=italic)
    return p


def add_hyperlink(paragraph, text, url, font_size=9, color=LIGHT):
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
    rFonts.set(qn("w:ascii"), FONT)
    rFonts.set(qn("w:hAnsi"), FONT)
    rFonts.set(qn("w:cs"), FONT)
    rPr.append(rFonts)
    color_elem = OxmlElement("w:color")
    color_elem.set(qn("w:val"), f"{color[0]:02X}{color[1]:02X}{color[2]:02X}")
    rPr.append(color_elem)
    sz_val = str(int(font_size * 2))
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
    clear_paragraph_space(p, before=0, after=0)
    rl = p.add_run(f"{label}:  ")
    set_run_font(rl, 9, MID, bold=True)
    rs = p.add_run(skills)
    set_run_font(rs, 9, BODY)
    return p


if doc.paragraphs and not doc.paragraphs[0].text:
    empty = doc.paragraphs[0]
    empty._element.getparent().remove(empty._element)

# ══════════════════════════════════════════════════════════════════════════════
# HEADER
# ══════════════════════════════════════════════════════════════════════════════
p_name = doc.add_paragraph()
clear_paragraph_space(p_name, before=0, after=0)
p_name.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p_name.add_run("KHUSHBOO DODANI")
set_run_font(r, 18, DARK, bold=True)

p_contact = doc.add_paragraph()
clear_paragraph_space(p_contact, before=0, after=0)
p_contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
contact_run(p_contact, "San Francisco Bay Area  |  khushdodani@gmail.com  |  ")
add_hyperlink(p_contact, "LinkedIn", LINKEDIN_URL)
contact_run(p_contact, "  |  ")
add_hyperlink(p_contact, "GitHub", GITHUB_URL)
contact_run(p_contact, "  |  ")
add_hyperlink(p_contact, "Portfolio", PORTFOLIO_URL)

p_title = doc.add_paragraph()
clear_paragraph_space(p_title, before=1, after=0)
p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
rt = p_title.add_run("PRODUCT MANAGER  —  PROVIDER ADOPTION, IMPLEMENTATION & GROWTH")
set_run_font(rt, 11.5, ACCENT, bold=True)

p_pills = doc.add_paragraph()
clear_paragraph_space(p_pills, before=0, after=1)
p_pills.alignment = WD_ALIGN_PARAGRAPH.CENTER
rp = p_pills.add_run(
    "Customer Ownership  •  Implementation  •  Expansion  •  Data-Driven Solutions  •  Healthcare Operations"
)
set_run_font(rp, 9, MID)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# SUMMARY
# ══════════════════════════════════════════════════════════════════════════════
body(
    doc,
    "Product manager who owns provider relationships end to end in regulated healthcare: discovery sessions, "
    "feature and rollout demos, onboarding, troubleshooting, and growth inside the accounts that matter most. "
    "At WorkSafeBC, rebuilt the submission experience for the 25 of 3,795 organizations driving half of remaining "
    "paper: about 60% digital within six months, paper share 56% → 19%, support calls −30%, NPS +25, about $200K "
    "saved, and $580K secured to scale. Moved 5,600 clinicians across 500 organizations with zero downtime. Sizes "
    "every initiative by spend, cost-to-serve, and segment lifetime value, from an $80M physiotherapy program to "
    "102,000 permits at 1.9% net churn. SQL, Python, and PostHog. Master of Business Analytics; BBA in Marketing.",
    size=9.5,
    space_before=2,
    space_after=2,
)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# EXPERIENCE
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Experience", space_before=2)

subheading(doc, "Product Manager — Provider Adoption & Platform", "WorkSafeBC", "Apr 2024 – Present")
sublabel(
    doc,
    "Lead product for provider groups (clinics, billing offices, EMR vendors) submitting invoices, treatment "
    "requests, and clinical forms. Success is adoption and cost-to-serve, not features shipped.",
)

sublabel(doc, "Provider demos, onboarding, and discovery", space_before=2)
bullet(
    doc,
    "Ran discovery sessions and gave feature and rollout demos to provider groups across invoice submission, "
    "treatment extension requests, and EMR integration, then handled onboarding and troubleshooting. What providers "
    "hit became roadmap fixes: the missing duplicate-line control, payee-number errors, and in-product validation.",
)
bullet(
    doc,
    "Grounded the EMR work in 15 physician interviews and physiotherapist focus groups, so the roadmap came from "
    "how providers actually work, not from internal assumptions.",
)

sublabel(doc, "Account growth and cost-to-serve", space_before=2)
bullet(
    doc,
    "25 of 3,795 organizations drove half of remaining paper (~280K of 3.7M lines). The portal was built for "
    "3 claims a week, so I rebuilt the flow for high-volume billers: multi-claim submit, 11 steps → 5. Portal share "
    "39% → 55%, paper 56% → 19%, about 60% digital in six months, support calls −30%, NPS +25, about $200K saved.",
)
bullet(
    doc,
    "Built the business case behind $580K in executive funding to scale to this segment, and $80K from the "
    "Innovation Council for the EMR proof of concept. Early processing savings of about $50K arrived as cohorts "
    "moved.",
)

sublabel(doc, "Implementation tradeoffs I walked providers and executives through", space_before=2)
bullet(
    doc,
    "Staged, named-cohort launch (dark → soft → full) over a big-bang cutover. Accepted two versions running in "
    "parallel and slower broad activation so 322K existing digital lines a year stayed live. When first-month "
    "adoption stalled, the cause was a hidden control, so I fixed discoverability rather than scope.",
)
bullet(
    doc,
    "Treatment extensions: shipped provider features first for early feedback and an incident buffer, ahead of "
    "case-manager decision rationale. Cut the stuck-request alert (most requests resolve within 3 days) and a body-map "
    "input (providers preferred text) to launch sooner.",
)
bullet(
    doc,
    "EMR integration: chose a direct API inside the EMR over a portal, because physicians would not leave their "
    "system of record. Started with open-source OSCAR (~1,200 BC physicians) before paid vendors; JSON for speed "
    "with FHIR as the upgrade path. POC validated March 2025; roadmap covers ~70% of the ecosystem.",
)

sublabel(doc, "Healthcare economics and judgment", space_before=2)
bullet(
    doc,
    "Physiotherapy is $80M of WorkSafeBC's $500M spend. Reviewed 139K historical extension requests: 79% were always "
    "approved, which could mean skimming, not waste. Rejected auto-approve, kept clinical review, and shipped "
    "request tracking, decision rationale, and notification email so providers stopped phoning for status.",
)
bullet(
    doc,
    "Faxed clinical forms cost about $250K a year to re-key (52,000 faxes, 28 million keystrokes), driven by a "
    "2001 billing spec. Decoupled clinical reporting from billing so form content could change again.",
)

sublabel(doc, "Playbooks and rollout", space_before=2)
bullet(
    doc,
    "Moved 5,600 clinicians across 500 organizations (62,000+ annual referrals) with a change plan, in-product "
    "banners, administrator email, and a 28-day rollout. Zero downtime; 100% of active accounts moved on deadline. "
    "The constraint was behavior (emails not on file), not the identity stack.",
)
bullet(
    doc,
    "Instrumented PostHog before launch (conversion, drop-off, segment) so every cohort had a baseline. Built an "
    "LLM/RAG prototype that surfaces evidence across 20–75 documents per case, with traces so humans make the "
    "decision. 2nd of 36 at InnoFest 2025.",
)

subheading(doc, "Product Manager (promoted from Business Analyst)", "Technical Safety BC", "Oct 2021 – Apr 2024")
sublabel(doc, "Customer retention, lifetime value, and reactivation")
bullet(
    doc,
    "Built the operating-permit view for about 102,000 active permits: 1.9% net churn, and average revenue and "
    "permit lifetime value by industry and work class (Energy Utility about $7,400 per permit). Separated "
    "preventable churn from unpreventable (4.4%) so the team acted on gains it could win.",
)
bullet(
    doc,
    "RFM outreach versus the existing call strategy over the same two weeks, measures set first: $45,742 "
    "collected versus $25,597 (78% more). Reactivated expired permits (135 clients, about CAD 46.7K) with a "
    "three-step sequence; 23% paid from the first email.",
)
bullet(
    doc,
    "Shipped NLP email classification into a live routing workflow to triage incoming requests. Led discovery for a "
    "mobile inspection platform through customer interviews, workflow mapping, and usability testing.",
)

subheading(doc, "Strategy Consultant", "180 Degrees Consulting — University of British Columbia", "Sep 2020 – Oct 2021")
bullet(
    doc,
    "Built product and market strategies for nonprofit and clean energy clients. Designed a consumer conversion "
    "journey for Open Primaries that cut bounce rate 37% and doubled subscriptions.",
)

subheading(doc, "SEO Consultant — Consumer Growth", "Convertus", "May 2018 – Jul 2019")
bullet(
    doc,
    "Built acquisition and analytics for 75+ client websites, increasing organic performance by about 150%.",
)

add_horizontal_rule(doc)

heading(doc, "Education", space_before=2)
subheading(doc, "Master of Business Analytics", "University of British Columbia", "")
body(
    doc,
    "Customer lifetime value  •  Gains charts  •  Python  •  SQL  •  R",
    size=9,
    color=LIGHT,
    space_before=0,
    space_after=0,
)
subheading(doc, "Bachelor of Business Administration (Marketing)", "British Columbia Institute of Technology", "")

heading(doc, "Leadership", space_before=2)
body(
    doc,
    "Speaker, ProductCamp BC (2025). Mentor, ProductBC — product discovery, strategy, and career development.",
    size=9,
    space_before=0,
    space_after=1,
)

add_horizontal_rule(doc)

heading(doc, "Skills", space_before=2)
skills_row(
    doc,
    "Customer & implementation",
    "Provider demos  •  Discovery  •  Onboarding  •  Troubleshooting  •  Change management  •  Staged launches  •  "
    "Account growth",
)
skills_row(
    doc,
    "Data & economics",
    "SQL  •  Python  •  R  •  Funnel and cohort analysis  •  Segmentation  •  RFM  •  Lifetime value  •  "
    "Business cases  •  PostHog",
)
skills_row(
    doc,
    "Technical & AI",
    "REST APIs  •  FHIR / JSON  •  EMR integration  •  LLM / RAG prototyping  •  Human-in-the-loop design  •  "
    "NLP (shipped)  •  Lovable  •  n8n",
)
skills_row(
    doc,
    "Partners",
    "Clinical operations  •  Engineering  •  Design  •  Communications  •  Executives",
)

out_path = r"c:\Users\khush\Desktop\kdodani-portfolio\Khushboo_Dodani_Resume_Valerie_Health.docx"
doc.save(out_path)
print(f"Saved: {out_path}")
