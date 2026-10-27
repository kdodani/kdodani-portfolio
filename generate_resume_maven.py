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
    clear_paragraph_space(p, before=4, after=0)
    p.paragraph_format.keep_with_next = True
    r1 = p.add_run(f"{role}  |  {org}")
    set_run_font(r1, size, DARK, bold=True)
    if period:
        r2 = p.add_run(f"    {period}")
        set_run_font(r2, 9, LIGHT, bold=False)
    return p


def sublabel(document, text, space_before=2):
    p = document.add_paragraph()
    clear_paragraph_space(p, before=space_before, after=0)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    set_run_font(run, 9.5, INDIGO, bold=True)
    return p


def bullet(document, text, size=9.5):
    p = document.add_paragraph(style="List Bullet")
    clear_paragraph_space(p, before=0.5, after=0.5)
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
rt = p_title.add_run("PRODUCT MANAGER  —  CARE DELIVERY")
set_run_font(rt, 11.5, ACCENT, bold=True)

p_pills = doc.add_paragraph()
clear_paragraph_space(p_pills, before=0, after=1)
p_pills.alignment = WD_ALIGN_PARAGRAPH.CENTER
rp = p_pills.add_run(
    "Provider Workflows  •  Clinical Documentation & EHR  •  Billing & Quality Rules  •  Platform Primitives"
)
set_run_font(rp, 9, MID)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# SUMMARY
# ══════════════════════════════════════════════════════════════════════════════
body(
    doc,
    "Product manager for the infrastructure of care delivery: provider workflows, billing and eligibility rules, "
    "clinical documentation and EHR connectivity, and platform pieces reused across programs. Works daily with "
    "engineering, design, clinical operations, and physicians. At WorkSafeBC: rebuilt the invoice portal for "
    "high-volume providers (11 screens to 5, paper 56% → 19%, invalid submissions −40%), kept case-manager review "
    "on an $80M physio program, proved a clinical-reporting channel inside OSCAR, and moved 5,600 clinicians to a "
    "new login with 0% downtime. $1.23M secured. Master of Business Analytics.",
    size=9.5,
    space_before=2,
    space_after=2,
)

add_horizontal_rule(doc)

# ══════════════════════════════════════════════════════════════════════════════
# EXPERIENCE
# ══════════════════════════════════════════════════════════════════════════════
heading(doc, "Experience", space_before=6)

subheading(
    doc,
    "Product Manager — Provider & Clinician Experience",
    "WorkSafeBC",
    "Apr 2024 – Present",
)

# 1 ─ Own workflows end to end
sublabel(doc, "Own provider workflows end to end: PIS invoicing — direct")
bullet(
    doc,
    "Fragmented workflow: 3.7M invoice lines a year across mail, fax, batch, and the portal (8.7% digital). The "
    "portal allowed 1 claim, 1 invoice reference, and about 32 lines. 25 of 3,795 organizations produced half of "
    "remaining paper; a taxi provider with 1,900 lines a month could not use it, and hearing-aid providers who "
    "faxed digitally still had staff re-key their forms.",
)
bullet(
    doc,
    "Shipped multi-claim and multi-invoice entry, line duplication, bulk delete, and real-time validation, cutting "
    "11 screens to 5. Paper 56% → 19%, portal 39% → 55%, about 60% digital within six months, about $200K saved, "
    "about $50K lower processing cost. Secured $500K for invoicing.",
)
bullet(
    doc,
    "Failed submissions: to scale volume, submission to the claims system became asynchronous, so a provider could "
    "not tell if a request failed. Built an automatic retry queue; only items still failing after retry email the "
    "developers. Providers never track or resend a failed invoice.",
)

# 2 ─ Encode program policy and fee schedules
sublabel(doc, "Encode program policy, fee schedules, and eligibility — direct")
bullet(
    doc,
    "Fee codes load by period from the claims system into table storage and Azure Search. The invoice form requires "
    "Date of Service before the fee-code search runs, and the API matches the fee code valid on that date.",
)
bullet(
    doc,
    "Contract eligibility: providers see only the services they signed up for, and screening questions point them "
    "to the right program before they submit. A known physio versus CVPT payee mismatch stayed on the roadmap for "
    "authenticated pre-population.",
)
bullet(
    doc,
    "With Healthcare Operations, encoded fee schedules and program rules across about 70 contracted healthcare "
    "services so invalid lines fail at submit, not in back-office cleanup. Invalid submissions −40%.",
)

# 3 ─ Provider messaging
sublabel(doc, "Provider messaging: physio extension requests and login migration — direct")
bullet(
    doc,
    "Extension requests arrived by fax, phone, and mail. Discovery showed office administrators, not physiotherapists, "
    "use the tool, so injured-worker details are entered and validated once instead of rebuilding screen 2 for each "
    "of 6 request types.",
)
bullet(
    doc,
    "Shipped request tracking, a View Details page, error validation, case-manager decision rationale, and the "
    "decision email that links to the decision online, with a call-centre fallback. Tested every physio and hydro "
    "decision combination with the claims team.",
)
bullet(
    doc,
    "BCeID holds no email addresses and the new login runs on email, so every user had to add one by March 27: "
    "advisory email, bulletin, three in-product banners, and a call script for clinic administrators.",
)

# 4 ─ Decisions
sublabel(doc, "Decisions where clinical accuracy and provider experience conflict — direct")
bullet(
    doc,
    "Physio: rejected auto-approve although 109,693 of 139,380 requests (79%) were always approved, against pushback "
    "from architects and senior PMs. 27% resolved the same day, which suggested skimming on $80M of spend, so the "
    "investment went to decision rationale. Cut a ping feature (most requests resolve within 3 days); chose a text "
    "box over a body map.",
)
bullet(
    doc,
    "InfoX: killed a WorkSafeBC-hosted web form after 15 physician interviews showed GPs will not leave their EMR. "
    "Split clinical reporting from the 2001 billing spec; chose JSON now with FHIR documented as the upgrade path; "
    "started on OSCAR before paid vendors.",
)
bullet(
    doc,
    "PIS: accepted one extra required field (Date of Service) for fee-code accuracy. Deferred inline editing "
    "(13 story points, about $26K) so providers could submit and be paid first.",
)

# 5 ─ Hands-on AI
sublabel(doc, "Hands-on AI and prototyping — direct")
bullet(
    doc,
    "PIS: validated the 11-to-5 flow in an AI-built prototype before engineering committed. The legacy Kendo Grid "
    "could not render the design, so I adapted it. When design sign-off stalled before launch, had developers build "
    "working Lovable prototypes to ship functional value first, and fixed WorkSafeBC-standard issues before "
    "best-practice ones.",
)
bullet(
    doc,
    "Referral Radar: case managers read 20-75 documents per claim to find one referral. With no production data, "
    "generated claim scenarios in ChatGPT, had an experienced case manager review them, and gave the approved set "
    "to data science. Pushed the team from a ranked list to an interactive mind map (built with Lovable) with "
    "evidence and agent-trace views. 2nd of 36 at InnoFest 2025; about $20M potential claim-cost reduction; "
    "concept-to-validation about 40% faster.",
)

# 6 ─ Partnering
sublabel(doc, "Partner with engineering, design, clinical, and operations — direct")
bullet(
    doc,
    "PIS: shipped on a legacy Kendo Grid in an Angular and .NET stack governed by common engineering. Traced a "
    "slowdown (fine at 85 line items, slow at 195) to a test environment a quarter of production size; it moved "
    "from 1 to 4 vCPU. Chose the dark-launch cohort and set rules with Healthcare Operations.",
)
bullet(
    doc,
    "InfoX: 15 physician interviews, medical advisors, Doctors of BC, OSCAR and McMaster developers, solution "
    "architects, and about 50 EMR vendors. Asked vendors whether one endpoint can take a PDF and its metadata.",
)

# 7 ─ Regulatory and quality
sublabel(doc, "Regulatory and quality requirements: rehab KPI equivalent — direct")
bullet(
    doc,
    "Contracted rehab networks are scored on time to treatment, reporting turnaround, time in program, and "
    "return-to-work. The work maps to those: tracking and rationale on treatment decisions, and structured Form 8/11 "
    "data (diagnosis codes and return-to-work dates were being guessed inside a 2001 billing spec; about 115,000 "
    "forms a year).",
)
bullet(
    doc,
    "Privacy: a claims partner flagged a possible FIPP concern when payee numbers were typed by hand. Shipped "
    "error validation first; authenticated pre-population stayed on the roadmap.",
)

# 8 ─ Instrument
sublabel(doc, "Instrument, watch, iterate: PostHog — direct")
bullet(
    doc,
    "Wrote the PostHog spec before the first slice launched. Tracked daily submissions v1 versus v2, line items per "
    "submission, single versus multi-claim and multi-invoice use, the funnel from dashboard to confirmation, error "
    "rate by type, successful versus failed submissions, session duration and page leave, optional-field adoption, "
    "and volume bands (under 50, 50-100, 100-200 lines).",
)
bullet(
    doc,
    "After near-zero adoption in month one, watched real behavior and made the hidden duplicate-line control easier "
    "to find. Session data on large sessions drove the performance work. Releases ran dark (10 named providers), "
    "soft, then hard; 322K existing digital lines a year stayed untouched.",
)

# 9 ─ Platform primitives
sublabel(doc, "Platform primitives reused across programs — direct")
bullet(
    doc,
    "An Azure API Management document router built for InfoX, reusable for every future EMR partner. The contract "
    "eligibility API serves invoice and extension-request forms. The retry queue, first built for the "
    "injured-worker portal, was reused in PIS. $80K secured for EMR integration; $650K for identity.",
)
bullet(
    doc,
    "Identity: replaced BCeID with a new login for 5,600 providers across 500 organizations and a portal with "
    "62,000+ annual referrals. 0% downtime, 85% migrated before the deadline, 92% login success. Emulating the "
    "BCeID call and passing the same tokens cut about $145K of vendor cost.",
)

# 10 ─ POV on AI
sublabel(doc, "Point of view on AI in care delivery — direct")
bullet(
    doc,
    "AI retrieves and explains; people decide. The same boundary drove two calls: rejecting auto-approve on physio "
    "extensions, and not auto-referring in Referral Radar, where every recommendation shows its evidence.",
)

subheading(
    doc,
    "Product Manager (promoted from Business Analyst)",
    "Technical Safety BC",
    "Oct 2021 – Apr 2024",
)
sublabel(doc, "AI classification and retrieval — direct")
bullet(
    doc,
    "Built an NLP email classification engine that prioritized inbound operational requests by intent and urgency, "
    "and designed an internal chatbot that surfaced procedures, documentation, and policy context for support teams.",
)
sublabel(doc, "Workflow discovery — transferable")
bullet(
    doc,
    "Led discovery for a remote assessment platform for regulated inspections: customer interviews, usability "
    "testing, and prototypes across evidence capture, compliance validation, and approval coordination before "
    "engineering investment.",
)
sublabel(doc, "Metrics and prioritization — transferable")
bullet(
    doc,
    "Built the analytics leadership used to prioritize retention: 11.7% annual churn, and an RFM segmentation "
    "model whose campaigns retained 78% of high-risk customers.",
)

subheading(doc, "Strategy Consultant", "180 Degrees Consulting — University of British Columbia", "Sep 2020 – Oct 2021")
sublabel(doc, "Customer research — transferable")
bullet(
    doc,
    "Developed product and market strategies for nonprofit and clean energy clients. Designed an acquisition "
    "strategy for Open Primaries that cut bounce rate 37% and doubled subscriptions.",
)

subheading(doc, "SEO Consultant", "Convertus", "May 2018 – Jul 2019")
sublabel(doc, "Analytics and forecasting — transferable")
bullet(
    doc,
    "Built acquisition and analytics for 75+ websites (organic performance up about 150%) and a forecasting model "
    "that predicted SEO performance with about 85% accuracy.",
)

add_horizontal_rule(doc)

heading(doc, "Education", space_before=6)
subheading(doc, "Master of Business Analytics", "University of British Columbia", "Python  •  SQL  •  Machine learning  •  Product analytics")
subheading(doc, "Bachelor of Business Administration (Marketing)", "British Columbia Institute of Technology", "")

heading(doc, "Leadership", space_before=6)
body(
    doc,
    "Speaker, ProductCamp BC (2025): legacy industries adopting a product mindset.  Mentor, ProductBC.",
    size=9.5,
    space_before=0,
    space_after=1,
)

add_horizontal_rule(doc)

heading(doc, "Skills", space_before=6)
skills_row(
    doc,
    "Care delivery",
    "Provider workflows  •  Clinical documentation  •  Fee schedules  •  Eligibility  •  First-pass yield  •  Messaging",
)
skills_row(
    doc,
    "Platform",
    "EHR/EMR  •  Interoperability  •  FHIR  •  REST APIs  •  Azure API Management  •  Azure Search  •  CIAM",
)
skills_row(
    doc,
    "Practice",
    "Product discovery  •  Business cases  •  PostHog  •  SQL  •  Python  •  NLP  •  Lovable  •  GitHub Copilot",
)

out_path = r"c:\Users\khush\Desktop\kdodani-portfolio\Khushboo_Dodani_Resume_Maven_Clinic.docx"
doc.save(out_path)
print(f"Saved: {out_path}")
