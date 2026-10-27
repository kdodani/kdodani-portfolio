"""Candid Health — Product Functional round (45 min). Speaker-support deck."""
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN
from pptx.util import Inches, Pt

# Palette matches playbook_docx_lib.py
DARK = RGBColor(0x1C, 0x19, 0x17)
MID = RGBColor(0x5B, 0x21, 0xB6)
ACCENT = RGBColor(0x6D, 0x28, 0xD9)
BODY = RGBColor(0x44, 0x40, 0x3C)
LIGHT = RGBColor(0x78, 0x71, 0x6C)
INDIGO = RGBColor(0x4F, 0x46, 0xE5)
BG = RGBColor(0xFA, 0xF9, 0xF6)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
CARD = RGBColor(0xFF, 0xFF, 0xFF)
RULE = RGBColor(0xE7, 0xE5, 0xE4)

SLIDE_W = Inches(13.333)
SLIDE_H = Inches(7.5)
MARGIN_L = Inches(0.7)
MARGIN_R = Inches(0.7)
CONTENT_W = SLIDE_W - MARGIN_L - MARGIN_R


def _set_run(run, text, size=18, bold=False, color=BODY, italic=False):
    run.text = text
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = color
    run.font.name = "Calibri"


def _fill(shape, color):
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()


def _notes(slide, text):
    slide.notes_slide.notes_text_frame.text = text


def new_prs():
    prs = Presentation()
    prs.slide_width = SLIDE_W
    prs.slide_height = SLIDE_H
    return prs


def blank(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, SLIDE_W, SLIDE_H)
    _fill(bg, BG)
    # top accent bar
    bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, SLIDE_W, Inches(0.08))
    _fill(bar, ACCENT)
    return slide


def kicker(slide, text, top=Inches(0.28)):
    box = slide.shapes.add_textbox(MARGIN_L, top, CONTENT_W, Inches(0.32))
    p = box.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.LEFT
    r = p.add_run()
    _set_run(r, text.upper(), size=12, bold=True, color=ACCENT)


def title(slide, text, top=Inches(0.55), height=Inches(0.7), size=28):
    box = slide.shapes.add_textbox(MARGIN_L, top, CONTENT_W, height)
    tf = box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    r = p.add_run()
    _set_run(r, text, size=size, bold=True, color=DARK)
    return box


def bullets(slide, items, top=Inches(1.45), height=Inches(5.4), size=18):
    box = slide.shapes.add_textbox(MARGIN_L, top, CONTENT_W, height)
    tf = box.text_frame
    tf.word_wrap = True
    for i, item in enumerate(items):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.level = 0
        p.space_after = Pt(10)
        p.space_before = Pt(2)
        r = p.add_run()
        _set_run(r, item, size=size, color=BODY)
    return box


def footer(slide, page, total=20):
    box = slide.shapes.add_textbox(MARGIN_L, Inches(7.12), CONTENT_W, Inches(0.28))
    tf = box.text_frame
    p = tf.paragraphs[0]
    r = p.add_run()
    _set_run(r, f"Khushboo Dodani  ·  Candid Health Product Functional  ·  {page}/{total}", size=11, color=LIGHT)
    p2_box = slide.shapes.add_textbox(SLIDE_W - Inches(2.2), Inches(7.12), Inches(1.5), Inches(0.28))
    p2 = p2_box.text_frame.paragraphs[0]
    p2.alignment = PP_ALIGN.RIGHT
    r2 = p2.add_run()
    _set_run(r2, "Confidential", size=11, color=LIGHT)


def add_cards(slide, cards, top=Inches(1.5), card_h=Inches(2.15)):
    """cards = list of (kicker, body). 3 across."""
    n = len(cards)
    gap = Inches(0.22)
    w = (CONTENT_W - gap * (n - 1)) / n
    y = top
    for i, (k, body) in enumerate(cards):
        x = MARGIN_L + i * (w + gap)
        shp = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, w, card_h)
        _fill(shp, WHITE)
        shp.line.color.rgb = RULE
        shp.line.width = Pt(1)
        # inner text
        tb = slide.shapes.add_textbox(x + Inches(0.18), y + Inches(0.16), w - Inches(0.36), card_h - Inches(0.28))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        r = p.add_run()
        _set_run(r, k.upper(), size=11, bold=True, color=ACCENT)
        p2 = tf.add_paragraph()
        p2.space_before = Pt(8)
        r2 = p2.add_run()
        _set_run(r2, body, size=14, color=BODY)


def cover(prs):
    slide = blank(prs)
    kicker(slide, "Khushboo Dodani  ·  Product Functional  ·  45 min")
    title(slide, "Walk the products — not a case", top=Inches(0.7), height=Inches(1.0), size=34)
    sub = slide.shapes.add_textbox(MARGIN_L, Inches(1.7), CONTENT_W, Inches(0.7))
    tf = sub.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    r = p.add_run()
    _set_run(
        r,
        "Senior PM scoring: what you shipped, PM fundamentals, communication, complexity, teams, influence. Conversational. They lead.",
        size=18,
        color=BODY,
    )
    add_cards(
        slide,
        [
            ("Default", "PIS — first-pass, throughput, cost-to-process. Deep."),
            ("If EHR / API", "InfoX / OSCAR — clinical data at point of care."),
            ("If AI / agents", "Referral Radar — retrieve; human decides."),
        ],
        top=Inches(2.6),
        card_h=Inches(2.4),
    )
    bullets(
        slide,
        [
            "Locked numbers only. No cost-per-claim. No 837 production. Detect ≠ auto-correct.",
            "Two deep beats three shallow. Do not add CIAM. Extensions only if they ask “said no.”",
        ],
        top=Inches(5.2),
        height=Inches(1.6),
        size=16,
    )
    footer(slide, 1)
    _notes(
        slide,
        "SAY · 0–3 min TMAY (briefing 90s). Bottom line: I build products that take manual billing and claims work out of queues. PIS: encoded fee schedules so invalids fail at submit (−40%). Detect only — no auto-correct. That is why Candid, SF office, four days. Skip Referral Radar unless they ask about AI. Do not open with the US RCM gap.",
    )


def how_to(prs):
    slide = blank(prs)
    kicker(slide, "How to use this deck")
    title(slide, "They lead. You do not present 18 slides.")
    bullets(
        slide,
        [
            "Screen-share only if they ask you to walk a product. Otherwise these are your notes.",
            "Default walk: PIS (scope → complexity → teams → metric → miss).",
            "Second product only if they pull: InfoX for EMR/integrations, Radar for AI. Not both unless they ask.",
            "Fundamentals follow-ups: prioritize, disagree with eng, miss, 90-day ramp.",
            "Close with 2 questions: what this PM owns first; how they know a PM is working (TCR vs something else).",
        ],
    )
    footer(slide, 2)
    _notes(
        slide,
        "Clock: 0–3 TMAY. 3–20 PIS deep. 20–32 second product if asked. 32–40 fundamentals. 40–45 questions. If they invert order, keep the same stories.",
    )


def clock(prs):
    slide = blank(prs)
    kicker(slide, "Clock  ·  45 minutes")
    title(slide, "Conversational. Most of the time they ask.")
    add_cards(
        slide,
        [
            ("0–3", "Rapport + TMAY. Briefing 90s. PIS in the arc. No third project."),
            ("3–20", "PIS deep. Scope, systems, influence, metric, miss (discoverability)."),
            ("20–32", "Second product only if they ask. InfoX or Radar — not both."),
        ],
        top=Inches(1.5),
        card_h=Inches(2.3),
    )
    add_cards(
        slide,
        [
            ("32–40", "Fundamentals: prioritize, eng disagreement, miss, 90-day ramp."),
            ("40–45", "Your 2 questions. Process is fine as a closer."),
            ("Do not", "Four projects. LeetCode. Invented US RCM. “I’m passionate about healthcare.”"),
        ],
        top=Inches(4.05),
        card_h=Inches(2.3),
    )
    footer(slide, 3)
    _notes(slide, "If the interviewer is more engineering-leaning: stay in failure modes and APIs (eligibility API, invalid states, async retry). No LeetCode.")


# ── PIS ───────────────────────────────────────────────────────────────────────
def pis_title(prs):
    slide = blank(prs)
    kicker(slide, "Project 1  ·  default walk  ·  JD: data-intensive, unit economics, dashboards, rollouts")
    title(slide, "Provider Invoice Submission")
    bullets(
        slide,
        [
            "Role: PM, provider invoicing + internal billing/ops. Users: office admins (not the contracted MD).",
            "Shipped in-product validation: fee-schedule service codes, contracted rates, eligibility. Invalid submissions −40%.",
            "3.7M line items. 25 of 3,795 orgs = 50% of remaining paper. Rebuilt 11 screens → 5, multi-claim, no 32-line cap.",
            "Unlocked ~280K blocked lines. Paper 56%→19%. Portal 39%→55%. ~$50K cost-to-process. $580K funded.",
            "PostHog on 322K digital lines/year. Dark → soft → hard launch with Healthcare Operations.",
        ],
        size=17,
    )
    footer(slide, 4)
    _notes(
        slide,
        "SAY · Bottom line: I rebuilt provider invoicing so invalid work died at submit and high-volume orgs could bill — without breaking 322K digital lines. CPT analog = service codes. 837 analog = invoice API. One sentence if they go US. Then stop. Detect only — we did not auto-correct.",
    )


def pis_complexity(prs):
    slide = blank(prs)
    kicker(slide, "PIS  ·  product complexity")
    title(slide, "Rules, dates, and two products in production")
    bullets(
        slide,
        [
            "Fee codes live in CMS HUB with multiple periods. No Date of Service → no fee-code search. DOS is the join key.",
            "Invoice API: orgs only see (and can bill) contracted services. Fail closed. Eligibility could have wrecked submit latency — cut polish.",
            "V1 stayed live (322K lines). V2 for 200–1,900 lines/month. Dual maintenance on purpose.",
            "Sync CMS → async to scale. Portal can succeed while CMS fails. Retry queue; then email to eng for manual submit.",
            "Legacy Kendo Grid: the prototype was not shippable. Compromised UX vs. the Aug 2025–Mar 2026 clock.",
            "Grid encodes format and contract. Entitlement (is this line for this injury?) stays with a human. Residual, not a regex.",
        ],
        size=16,
    )
    footer(slide, 5)
    _notes(
        slide,
        "If they go engineer: invalid state first, then the API. Ineligible lines never queued. That was the win. Date-only UI + contract buffer is the class of bug Candid calls time-based coding — do not claim a measured timezone-denial rate.",
    )


def pis_influence(prs):
    slide = blank(prs)
    kicker(slide, "PIS  ·  teams and influence")
    title(slide, "Ops launches, eng fail-closed, Pareto over volume")
    bullets(
        slide,
        [
            "Healthcare Operations: named-cohort dark / soft / hard launch. Existing book not disrupted.",
            "Engineering (PIS.API): I bring the invalid state and the volume. They bring the constraint. We fail closed.",
            "I did not survey 3,795 providers. 3.7M lines picked the 25. Disappointed loud low-volume users on purpose.",
            "Design: ship on Kendo, not the AI prototype. Functional value first; standards fixes after launch.",
            "Segment GTM miss: we segmented the build, then used one launch message. Hearing aid still lived in Blueprint.",
        ],
        size=17,
    )
    footer(slide, 6)
    _notes(
        slide,
        "SAY · How I work with eng: spec what must fail, what the biller sees, what ops never receives. I lose visual arguments on purpose. Do not name internal designers.",
    )


def pis_fundamentals(prs):
    slide = blank(prs)
    kicker(slide, "PIS  ·  PM fundamentals")
    title(slide, "Prioritize the 25. The miss was adoption, not architecture.")
    bullets(
        slide,
        [
            "Prioritize: structural ceiling first (multi-claim, 11→5), then batch/CSV. If they cannot send a high-volume invoice, batch is theater.",
            "Metric family: first-pass (invalid −40%), throughput (~280K lines), cost-to-serve (~$50K ELAN to date). No $/claim.",
            "Tradeoff: slower vanity launch; detect only; two products in prod.",
            "Miss: shipped 11→5 and multi-claim. Month one of the cohort was flat. Duplicate-line icon unread. Users re-typed or stayed on paper.",
            "Fix: PostHog, then affordance + onboarding. Named-user unassisted path is now in definition of done. Launch ≠ done.",
        ],
        size=16,
    )
    footer(slide, 7)
    _notes(
        slide,
        "SAY · Failure: we shipped a better product; the cohort did not move. I had treated architecture as adoption. I do not blame the users. Weakness if they ask: I shipped capacity and assumed adoption. I was wrong. Do not say I care too much.",
    )


def pis_candid(prs):
    slide = blank(prs)
    kicker(slide, "PIS  ·  Candid hook  ·  then stop")
    title(slide, "Same units as TCR. Missing half: auto-correct.")
    bullets(
        slide,
        [
            "Candid: get the claim right at submit, then learn from the human residual.",
            "I built the detect layer: rules at submit, invalid −40%, ineligible never queued.",
            "WorkSafe could find errors and not correct them. No flywheel from ops touches into new rules. Fee codes lived on a website.",
            "That gap is why I am here — not because I lack a billing system.",
            "Stop. Do not lecture 1,000 payers. Do not invent 837I.",
        ],
        size=18,
    )
    footer(slide, 8)
    _notes(
        slide,
        "SAY · If they say that’s not US billing: Correct. CPT is our service codes. 837 is our invoice API — structured claim + lines, not X12. I built detect-and-validate. Candid also corrects and learns from the touch.",
    )


# ── INFOX ─────────────────────────────────────────────────────────────────────
def infox_title(prs):
    slide = blank(prs)
    kicker(slide, "Project 2  ·  if they ask EHR / integrations / 0-to-1")
    title(slide, "InfoX / OSCAR — clinical reporting in the EMR")
    bullets(
        slide,
        [
            "Role: idea champion → PM, Claims. 15 physician interviews (Aug 2022) → $80K Innovation Council → POC 27 Mar 2025.",
            "Form 8/11 is the clinical record that starts every WorkSafe claim. Locked in a 2001 HIBC/Teleplan billing spec. Content frozen since 2015.",
            "Direct JSON from OSCAR eForm → Azure APIM → WorkSafe CMS. No HIBC on the clinical path. Billing can stay on Teleplan.",
            "Beachhead: ~1,200 BC physicians on OSCAR. Roadmap: top 5 EMRs ≈ ~80% of BC physicians, ~70% of the provider ecosystem.",
            "Success for the POC: validated channel + funding. Not “fax volume already dropped.”",
        ],
        size=16,
    )
    footer(slide, 9)
    _notes(
        slide,
        "SAY · Physicians were not the bottleneck. A 20-year-old billing system forced clinical documentation through an administrative channel. The hardest call was: clinicians never leave the tool they already trust.",
    )


def infox_complexity(prs):
    slide = blank(prs)
    kicker(slide, "InfoX  ·  product complexity")
    title(slide, "Digital in the EMR. Fax to WorkSafe.")
    bullets(
        slide,
        [
            "The eForm looked digital. It was built for HIBC/Teleplan — a billing pipe with character limits. Notes truncated. ICD-9 guessed. RTW dates guessed.",
            "Clinical copy still left as print / PDF image → fax (or digital fax) → ELAN re-key. 52K faxes/year. ~$250K. 28M keystrokes. WorkSafe could not ingest the image as data.",
            "Every field change needed WorkSafe + HIBC + every EMR vendor. Care had moved; the spec had not.",
            "GPs will not leave the EMR. A WorkSafe portal or web form fails adoption regardless of UX. First hypothesis (web forms) was wrong.",
            "JSON over FHIR for weeks-not-months. FHIR is the upgrade path. Dual clinical/billing paths on purpose.",
        ],
        size=16,
    )
    footer(slide, 10)
    _notes(
        slide,
        "SAY · Digital in the EMR was a billing-shaped form. Fax was how the clinical form got to us. We built a second pipe so the note goes to CMS as data, not as an image. Do not say we already moved the 52K faxes.",
    )


def infox_influence(prs):
    slide = blank(prs)
    kicker(slide, "InfoX  ·  teams and influence")
    title(slide, "Council money. Vendor pipeline. SMEs were wrong.")
    bullets(
        slide,
        [
            "Lost InnoFest (“Death to PDFs”). Socialized anyway. Innovation Council funded $80K. 2021 research had sat unfunded; I re-pitched.",
            "Physicians, medical advisors, claims (305-person survey), architects, OSCAR/McMaster. 50 EMR vendors in outreach. Signals: QHR, Plexia, Medinet, Intrahealth.",
            "SMEs: EMRs have no incentive — pay them. Reality after vendor meetings: they integrate to keep doctors. Test the assumption.",
            "WorkSafe is a small fish: ~128K WSBC GP visits vs ~1.9M public. “Be WCB” will not pull EMRs. Form-pay / speed-to-pay might.",
        ],
        size=17,
    )
    footer(slide, 11)
    _notes(
        slide,
        "What I would change: parallelize vendor commits with the POC. Scale lives in the other four EMRs, not only OSCAR. Measure pipeline velocity and a live F8 with no fax — not only a validated JSON.",
    )


def infox_fundamentals(prs):
    slide = blank(prs)
    kicker(slide, "InfoX  ·  PM fundamentals")
    title(slide, "Invisible submit. POC before scale.")
    bullets(
        slide,
        [
            "Prioritize: Form 8/11 first (highest-volume clinical data). Confirmation logs and bidirectional exchange on the roadmap — not in POC done.",
            "Kill: WorkSafe-hosted portal. Discovery said GPs will not use it.",
            "Tradeoff: OSCAR beachhead over immediate commercial coverage. JSON over FHIR. Dual path over one HIBC channel.",
            "Metric for this stage: pipe works, $80K, vendor willingness. Not a production channel-shift like PIS.",
            "Miss to name if asked: sequenced vendors after the POC; started on web forms. Interviews should have come first.",
        ],
        size=16,
    )
    footer(slide, 12)
    _notes(
        slide,
        "SAY · Success for InfoX was validate the channel, not move the fax volume yet. We proved EMR-native submit, got $80K, and lined up the path to ~70% of the ecosystem.",
    )


def infox_candid(prs):
    slide = blank(prs)
    kicker(slide, "InfoX  ·  Candid hook  ·  then stop")
    title(slide, "Integrate where the chart lives.")
    bullets(
        slide,
        [
            "Candid ingests from EHRs (Healthie-class) and builds the 837 from digital data. Paper is a leftover, not the product.",
            "Same PM call: GPs will not leave OSCAR. Hearing aid bills in Blueprint. A nicer portal does not unlock that paper.",
            "I will prioritize the API at point of care over homepage polish.",
            "Stop. I did not ship “print a CMS-1500 from an API.” Closest: eForm JSON into CMS.",
        ],
        size=18,
    )
    footer(slide, 13)
    _notes(slide, "One analog sentence, then your metric ($80K, POC date, ~70% roadmap). Do not invent 837I from Form 8/11 — that is the clinical report that starts the claim, not a UB-04.")


# ── RADAR ─────────────────────────────────────────────────────────────────────
def radar_title(prs):
    slide = blank(prs)
    kicker(slide, "Project 3  ·  only if they ask about AI / agents / residual 5%")
    title(slide, "Referral Radar — retrieve; human decides")
    bullets(
        slide,
        [
            "InnoFest 2025, Healthcare Programs (~70 contracted services). 2-week sprint. 36 ideas org-wide. 2nd, Process Transformation.",
            "You: problem, MVP, synthetic data, mind-map experience, stakeholder alignment. Cross-functional: DS, architects, devs, SMEs, case managers.",
            "Case managers hunt 20–75 documents (intake, medical, counselling, CM notes, RTW) to find one referral. Windows close.",
            "LLM / RAG over the claim. Evidence traces, timeline, search, mind map. AI recommends. CM keeps the decision.",
            "Prototype. Not a production minutes-saved number. 90+ min is SME input, not a locked ops dashboard.",
        ],
        size=16,
    )
    footer(slide, 14)
    _notes(
        slide,
        "SAY · 45s. Bottom line: I built an AI assist so case managers could find referral opportunities buried in the claim — and still keep the decision. Do not say we reduced review time by X%. Do not say we used live PHI.",
    )


def radar_complexity(prs):
    slide = blank(prs)
    kicker(slide, "Radar  ·  product complexity")
    title(slide, "No production data. Trust is the constraint.")
    bullets(
        slide,
        [
            "Production claim data could not be used in the sprint. Healthcare SME had limited time. Data science was blocked.",
            "Finding is the bottleneck, not judging. A ranked list without “why” would not be trusted.",
            "Privacy: synthetic scenarios, not live PHI. Edge cases in synthetic data are incomplete — named tradeoff.",
            "2-week sprint, no formal authority. MVP = explainability (evidence + mind map), not model-accuracy theater.",
        ],
        size=18,
    )
    footer(slide, 15)
    _notes(slide, "Cognitive load is in finding, not deciding. AI should reduce search, not replace judgment.")


def radar_influence(prs):
    slide = blank(prs)
    kicker(slide, "Radar  ·  teams and influence")
    title(slide, "Unblock the model without waiting on PHI")
    bullets(
        slide,
        [
            "I generated injured-worker / CM interaction scenarios in ChatGPT.",
            "An experienced case manager reviewed and revised them. Approved set went to data science.",
            "Pushed the team off a recommendation list to an interactive mind map — connections, not a score.",
            "Showcase: mind map was the memorable piece. A data architect followed up on the stack. RTW Compliance: “Can this be used for pain?”",
        ],
        size=18,
    )
    footer(slide, 16)
    _notes(slide, "Influence without title: unblock DS, shape the MVP, keep clinical judgment in the product. Same muscle as Candid agents on the residual.")


def radar_fundamentals(prs):
    slide = blank(prs)
    kicker(slide, "Radar  ·  PM fundamentals")
    title(slide, "Do not auto-refer. Same call as $80M.")
    bullets(
        slide,
        [
            "Kill: fully automated referral routing. Clinical judgment stays with the CM.",
            "Prioritize: evidence traceability over a black-box confidence score.",
            "Tradeoff: less automation, more trust. Completeness of synthetic data vs. a blocked sprint.",
            "Metric: 2nd of 36; stakeholder pull to extend. Not a production TCR.",
            "If they ask “said no” on a shipped product: treatment extensions — 139K / 79% / $80M — refused auto-approve. Radar is the AI version of that boundary.",
        ],
        size=16,
    )
    footer(slide, 17)
    _notes(
        slide,
        "SAY · Excellence is not the highest automation number. Candid’s residual 5% is this call — prior auth, medical necessity, COB. I have already made it.",
    )


def radar_candid(prs):
    slide = blank(prs)
    kicker(slide, "Radar  ·  Candid hook  ·  then stop")
    title(slide, "Agents retrieve. Humans keep the expensive decision.")
    bullets(
        slide,
        [
            "Candid: eligibility / coding / appeals agents on the graph; humans on the leftover 5%.",
            "Same pattern: surface evidence, do not unsupervised-spend.",
            "Stop. Do not dump Radar unless they asked about AI. Do not make it the pride story — that is PIS.",
        ],
        size=18,
    )
    footer(slide, 18)
    _notes(slide, "If they did not ask about AI, you should not be on this slide.")


def questions(prs):
    slide = blank(prs)
    kicker(slide, "Close  ·  pick two")
    title(slide, "Your questions")
    bullets(
        slide,
        [
            "What would this PM own first — submission, rules/edits, denials, reporting, or onboarding?",
            "How do you know a PM is working here — touchless rate, time-to-pay, cost-to-collect, something else?",
            "Of the residual 5%, what share is missing clinical data vs payer-rule drift vs prior auth?",
            "When a human corrects a claim, how fast does that become a suggested rule — and who accepts it?",
        ],
        size=18,
    )
    footer(slide, 19)
    _notes(
        slide,
        "Do not lead with remote, culture-in-the-abstract, or “what’s the next round.” Process is fine as a closer: What does success in this conversation look like for you?",
    )


def guardrails(prs):
    slide = blank(prs)
    kicker(slide, "Do / don’t")
    title(slide, "Locked kit")
    bullets(
        slide,
        [
            "Do: open with PIS. Metrics in the first sentence. Name the miss without blaming users or eng.",
            "Do: office admins submit; EMR/Blueprint is the system of record; detect ≠ auto-correct.",
            "Don’t: four projects. Don’t invent cost-per-claim or US 837/CPT production.",
            "Don’t: “I shadowed case managers every week.” Don’t say Radar shipped a time-saved metric.",
            "Don’t: InfoX already cut 52K faxes. Don’t name internal people as the villain.",
            "Numbers: invalid −40%; 3.7M; 25/3,795; 11→5; ~280K; paper 56%→19%; ~$50K; $580K; 322K; $80M / 139K / 79%; OSCAR $80K / 27 Mar 2025 / ~70%; Radar 2nd / 36.",
        ],
        size=16,
    )
    footer(slide, 20)
    _notes(slide, "If they ask Head of Product next: 30s on strengths (encode from volume; design for the submitter; instrument payments) and why Candid (closed loop). This deck is not for Adam.")


def main():
    prs = new_prs()
    cover(prs)
    how_to(prs)
    clock(prs)
    pis_title(prs)
    pis_complexity(prs)
    pis_influence(prs)
    pis_fundamentals(prs)
    pis_candid(prs)
    infox_title(prs)
    infox_complexity(prs)
    infox_influence(prs)
    infox_fundamentals(prs)
    infox_candid(prs)
    radar_title(prs)
    radar_complexity(prs)
    radar_influence(prs)
    radar_fundamentals(prs)
    radar_candid(prs)
    questions(prs)
    guardrails(prs)
    out = r"c:\Users\khush\Desktop\kdodani-portfolio\Candid_Health_Product_Functional_Slides.pptx"
    prs.save(out)
    print(f"Saved: {out}  ({len(prs.slides)} slides)")


if __name__ == "__main__":
    main()
