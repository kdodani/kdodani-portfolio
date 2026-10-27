"""Generate Candid Health PM interview playbook (Word)."""
from playbook_docx_lib import (
    new_doc, rule, title_block, h1, h2, h3, body, bullet, labeled, say, note,
)

doc = new_doc()
title_block(
    doc,
    "Khushboo Dodani  ·  interview playbook",
    "Candid Health — Product Manager",
    "Recruiter screen first. Later rounds inferred from this JD, Glassdoor/Blind, and similar growth-stage loops. Locked numbers match the Candid resume.",
)

# ── HOW TO USE ────────────────────────────────────────────────────────────────
h1(doc, "How to use this")
body(doc, "This week’s only job is to convert the recruiter call into a hiring-manager screen. Later rounds are here so you do not scramble if they move fast.")
bullet(doc, "Answer structure (every question): Bottom line → Context → Decision → System + metric → Tradeoff → Stop. 60–90 seconds unless they ask you to go deeper.")
bullet(doc, "Do not open with what you are not. Open with first-pass yield, throughput, and data-intensive billing systems.")
bullet(doc, "Do not invent US RCM, CPT, ICD, 837, or a dollar cost-per-claim. You do not have those. You do have invalid submissions −40%, 3.7M line items, 280K blocked lines, ~$50K cost-to-process.")
bullet(doc, "On the recruiter call, ask them to confirm remaining rounds. This document’s later rounds are labeled INFERRED.")

h2(doc, "Locked numbers")
bullet(doc, "Invalid submissions −40% (first-pass yield / error rate). Fee schedules, contracted rates, service codes encoded in-product.")
bullet(doc, "3.7M invoice line items analyzed. 25 of 3,795 orgs = 50% of remaining paper.")
bullet(doc, "Throughput rebuild: was 1 claim/submit, 11 screens, 32-line cap → 5 screens, multi-claim, no line ceiling. Segment: 200–1,900 lines/month.")
bullet(doc, "Unlocked ~280K blocked lines. Paper 56%→19%. Portal 39%→55%. ~$50K lower cost-to-process. $580K funded. 322K digital lines/year protected.")
bullet(doc, "Treatment extensions: $80M physio program, 139K historical records, 79% always-approved → kept human review.")
bullet(doc, "OSCAR EMR 0-to-1: $80K, roadmap ~70% of provider ecosystem. CIAM: 5,600 professionals / 500 orgs, 0 downtime.")
bullet(doc, "Referral Radar: LLM over 20–75 claim documents/case. InnoFest 2025, 2nd. TSBC: dashboards + RFM, 11.7% churn, 78% high-risk retained.")

# ── PROBABLE LOOP ─────────────────────────────────────────────────────────────
h1(doc, "Probable loop")
note(doc, "CONFIRMED: recruiter phone screen (you are here). INFERRED below from (1) this PM JD, (2) Candid Health SWE Glassdoor: recruiter → technical phone screen → onsite (coding, behavioral, system design, senior leadership), (3) Customer Strategy/Ops Glassdoor: recruiter → first interview → case study, moved quickly, (4) Blind PM review Oct 2025: high intensity, low hierarchy, AI on enterprise B2B, rails for large customer revenue. Do not treat inferred rounds as a promise.")

h2(doc, "Best estimate for this PM role")
bullet(doc, "Round 1 — Recruiter, ~30 min. CONFIRMED. Fit, logistics, story, SF, TN, comp. Goal: hiring manager.")
bullet(doc, "Round 2 — Hiring manager, ~45–60 min. INFERRED. Ownership, unit economics, how you work with engineering, a miss, why Candid.")
bullet(doc, "Round 3 — Product case (live or take-home). INFERRED (case study showed up on an adjacent Candid Health loop). First-pass / touchless rate, prioritization, dashboards.")
bullet(doc, "Round 4–6 — Loop. INFERRED from SWE analog + JD: engineering partnership, PM/design, ops or customer rollout, possibly leadership/founder.")
bullet(doc, "Ask on the recruiter call: “What does the rest of the process look like, and who would I meet next?” Write it down.")

h2(doc, "What they are screening for (from the JD)")
bullet(doc, "4+ years PM. Data-intensive products. Unit economics. Dashboards. Field/customer signal. Feature rollouts to customers, ops, leadership.")
bullet(doc, "Partner with engineering and design. Can read code. Low ego, high output. Outcome-oriented. Bias to action.")
bullet(doc, "Preferred: healthcare or medical billing, or technical side of a regulated industry. 4 days in SF / NYC / Denver. $150–195k base + equity.")
bullet(doc, "Company thesis: get the claim right at submission (rules + data), not cheaper denial cleanup. Touchless rate is the product.")

# ── ROUND 1 ───────────────────────────────────────────────────────────────────
h1(doc, "Round 1 — Recruiter phone screen")
body(doc, "Clock: 30 minutes. ~20 talking, ~5 their pitch, ~5 your questions. They are not scoring product sense. They are scoring: clear story, role match, SF + 4-day office, authorization, compensation in band, no drama, send to HM.")

h2(doc, "Clock")
bullet(doc, "0–2 min: rapport. Let them lead.")
bullet(doc, "2–8 min: tell me about yourself + why Candid. This is the gate.")
bullet(doc, "8–18 min: one deep product, billing/data, engineers, logistics.")
bullet(doc, "18–25 min: comp, timeline, authorization, location.")
bullet(doc, "25–30 min: your three questions + “what does next look like?”")

h2(doc, "Do / don’t")
bullet(doc, "Do: lead with first-pass yield and throughput. Name 40%, 3.7M, 280K, $50K.")
bullet(doc, "Do: “I am not a US RCM PM. I am the PM who encoded billing rules so invalid claims fail at submit.” Then stop explaining.")
bullet(doc, "Don’t: start with SEO, consulting, or “I don’t have claims experience.”")
bullet(doc, "Don’t: negotiate equity math on this call. Don’t go above $195k base. Don’t ask about remote exceptions.")
bullet(doc, "Don’t: dump the whole resume. One walk, one proud product, one honest gap.")

h3(doc, "Q. Tell me about yourself / walk me through your background")
say(doc, [
    ("Bottom line", "I am a PM who builds data-intensive billing systems — first-pass yield, throughput, and cost-to-process — and I want to do that on Candid’s claims infrastructure."),
    ("Context", "Five years PM. Technical Safety BC: data products and dashboards. WorkSafeBC since 2024: provider invoicing plus the internal billing/ops tools behind it."),
    ("Decision", "I treated invalid claims as a product problem, not a training problem: encode fee schedules, rates, and service codes so errors fail at submit."),
    ("System + metric", "Invalid submissions −40%. Analyzed 3.7M line items, rebuilt throughput for 200–1,900 lines/month, unlocked ~280K blocked lines, paper 56%→19%, ~$50K lower processing cost."),
    ("Tradeoff", "I am not a US commercial RCM PM. Same failure mode as Candid — dirty claims hitting a human queue — from the payer-adjacent side."),
    ("Stop", "That’s the work I want to keep doing, on a rules engine built for US payers."),
], "75s")

h3(doc, "Q. Why Candid? Why this role?")
say(doc, [
    ("Bottom line", "Most RCM software makes denial cleanup faster. Candid’s bet is get the claim right on the way out. That is the problem I have been shipping."),
    ("Context", "At WorkSafeBC I owned provider invoicing and internal billing/ops. Invalid work died in a back-office queue until we encoded the rules in the product."),
    ("Decision", "I want to sit with engineering on a data-intensive payments system — payer rules, eligibility, first-pass — not a portal cosmetics job."),
    ("System + metric", "I already measure the same family of outcomes: error rate, throughput, cost-to-process, and I instrument launches (PostHog on 322K digital lines/year)."),
    ("Tradeoff", "I am choosing Candid over clinical-workflow PM roles because the unit of value here is a clean claim, and that matches how I already work."),
    ("Stop", "I would be in the San Francisco office, four days a week."),
], "60s")

h3(doc, "Q. Walk me through a product you are proud of")
say(doc, [
    ("Bottom line", "The invoicing rebuild: first-pass quality plus throughput, without blowing up 322K digital lines/year already in production."),
    ("Context", "PMF for low-volume clinics. High-volume orgs (200–1,900 lines/month) were architecturally blocked: 1 claim per submit, 11 screens, 32-line cap. 25 of 3,795 orgs produced half the remaining paper."),
    ("Decision", "Analyze 3.7M line items, rebuild for that cohort, encode fee schedules and service codes in-product, dark/soft/hard launch with ops instead of big-bang."),
    ("System + metric", "Invalid submissions −40%. ~280K lines unlocked. Paper 56%→19%. Portal 39%→55%. ~$50K cost-to-process. $580K funded. Existing 322K lines intact."),
    ("Tradeoff", "Slower broad rollout. I would not risk the live base to chase a launch date."),
    ("Stop", "Happy to go deeper on validation rules or the launch sequencing."),
], "75s")

h3(doc, "Q. Do you have medical billing / RCM experience?")
say(doc, [
    ("Bottom line", "Not US commercial RCM — no 837, CPT, or ICD production work. Direct analog: provider billing rules, fee schedules, service codes, eligibility, first-pass validation."),
    ("Context", "WorkSafeBC pays providers. Candid helps providers get paid. Same failure: bad claims, human cleanup."),
    ("Decision", "I encoded contracted rates and codes so invalid line items never reached ops, and I exposed eligibility on the invoice API so orgs can only bill what they are contracted for."),
    ("System + metric", "Invalid submissions −40%. API stopped ineligible services before the queue."),
    ("Tradeoff", "I would need to learn US payer variance fast. I have learned dense rule systems before; I would not pretend I already know every Medicare LCD."),
    ("Stop", "If that gap is a hard no, I would rather hear it now. If the bet is transferable systems thinking, I can show the work."),
], "60s")

h3(doc, "Q. This JD wants data-intensive products. What does that mean in your work?")
say(doc, [
    ("Bottom line", "I do not ship screens without a data model. The invoicing work started from 3.7M line items, not a workshop."),
    ("Context", "Volume is the product constraint: 322K digital lines/year, 280K blocked, 25 orgs at 200–1,900 lines/month."),
    ("Decision", "Pareto first. Instrument PostHog submit/error/drop-off before launch. Dashboards at TSBC for churn and revenue."),
    ("System + metric", "3.7M-line analysis drove the rebuild. RFM + churn dashboards: 11.7% annual churn, 78% of high-risk retained."),
    ("Tradeoff", "I did not survey 3,795 providers. I used the data to pick 25."),
    ("Stop", ""),
], "50s")

h3(doc, "Q. Can you work with engineers / do you read code?")
say(doc, [
    ("Bottom line", "Yes. I am not an engineer. I can read APIs, SQL, and diffs well enough to argue a design and not waste a sprint."),
    ("Context", "MBA Analytics — Python, SQL. Invoice eligibility was an API product. Copilot/Lovable in discovery with engineering."),
    ("Decision", "I write requirements as failure modes: what must fail at submit vs what ops handles. I do not throw tickets over a wall."),
    ("System + metric", "Eligibility API: orgs only see contracted services. Validation in-product, not a cleanup queue."),
    ("Tradeoff", "I will not pair-program a rules engine. I will sit in design review and catch product holes."),
    ("Stop", ""),
], "50s")

h3(doc, "Q. Why leave WorkSafeBC / why SF / why now?")
say(doc, [
    ("Bottom line", "I want to build this class of product at a company whose whole business is clean claims, in the Bay Area, on-site with engineering."),
    ("Context", "I have owned provider billing and first-pass validation inside a public insurer. The ceiling is the mandate, not the craft."),
    ("Decision", "SF office, four days. I am not looking for remote-first."),
    ("System + metric", "Same muscles Candid lists: unit economics, dashboards, customer rollouts, engineering partnership."),
    ("Tradeoff", "Leaving a stable public-sector seat. I am doing that on purpose."),
    ("Stop", ""),
], "45s")

h3(doc, "Q. Work authorization")
say(doc, [
    ("Bottom line", "Canadian citizen. I can work in the US on TN status — no H-1B lottery."),
    ("Context", "Happy to align start date with TN timing so it is not a surprise for the team."),
    ("Decision", "I am targeting the San Francisco office."),
    ("System + metric", ""),
    ("Tradeoff", ""),
    ("Stop", "If you need anything from me for that process, I will turn it around quickly."),
], "20s")
note(doc, "Do not give a legal seminar on TN occupation categories on this call. If they probe, “I will confirm the category with counsel so Candid is not guessing.” Product Manager is not a listed TN occupation; Management Consultant is the usual path and CBP can still question it. One sentence, then move.")

h3(doc, "Q. Compensation expectations")
say(doc, [
    ("Bottom line", "I am calibrated to the posted $150–195k base. For a four-day San Francisco role at this scope, I am targeting the upper half — around $180k base — plus equity I take seriously at this stage."),
    ("Context", "Five years PM, data-intensive billing systems, Bay Area on-site. The posted band is the right box."),
    ("Decision", "I will not optimize base on this call. I want the total package and the work to make sense together."),
    ("System + metric", ""),
    ("Tradeoff", "I am not asking above $195k base here."),
    ("Stop", "Happy to go deeper once there is mutual fit with the hiring manager."),
], "35s")

h3(doc, "Q. Timeline / notice / competing processes")
say(doc, [
    ("Bottom line", "Candid is a priority. I can move on your process. I would need a normal notice period at WorkSafeBC once an offer is real."),
    ("Context", "I am interviewing selectively for health-tech PM roles in the Bay Area."),
    ("Decision", "I will not manufacture a fake exploding offer."),
    ("System + metric", ""),
    ("Tradeoff", ""),
    ("Stop", "If you have a target start window, tell me and I will be straight about it."),
], "25s")

h3(doc, "Q. Anything else we should know? / gaps")
say(doc, [
    ("Bottom line", "The honest gap is US payer-rule fluency. The honest match is first-pass validation, throughput, and shipping with ops and engineering on a regulated billing system."),
    ("Context", "Portfolio has the invoicing case if anyone wants depth before the next round."),
    ("Decision", "I would rather flag the gap than get caught performing RCM jargon."),
    ("System + metric", "kdodani-portfolio.vercel.app/projects/provider-invoice-digitization"),
    ("Tradeoff", ""),
    ("Stop", ""),
], "30s")

h2(doc, "Questions you ask (pick three)")
bullet(doc, "What does the rest of the interview process look like, and who is the next person I would meet?")
bullet(doc, "Which product surface would this PM own first — submission, rules/edits, denials, reporting, or onboarding?")
bullet(doc, "How do you measure whether a PM is working? Touchless rate, time-to-pay, logo growth, something else?")
bullet(doc, "How do PMs and engineers actually split work here — written specs, pairing, on-call for launches?")
note(doc, "Do not ask about vacation, remote exceptions, or “what’s the culture like?” in the abstract. Blind already told you: intense, high output, not rest-and-vest.")

# ── ROUND 2 HM ────────────────────────────────────────────────────────────────
h1(doc, "Round 2 — Hiring manager")
note(doc, "INFERRED. ~45–60 min. They will test whether the recruiter story survives a PM. Expect: one deep walk, prioritization, a miss, engineering, how you’d ramp on US payers.")

h2(doc, "What “good” looks like")
bullet(doc, "You own outcomes (first-pass, throughput, cost-to-process), not a feature list.")
bullet(doc, "You can kill a bad idea (auto-approve the $80M extensions).")
bullet(doc, "You talk to engineers in failure modes and APIs, not “the team will figure it out.”")
bullet(doc, "You have a 90-day ramp that is humble and specific.")

h3(doc, "Q. How do you decide what to build?")
say(doc, [
    ("Bottom line", "I start from the unit of value and the constraint in the data, not from a request pile."),
    ("Context", "Invoicing looked like a UX problem. The data said 25 orgs and a structural cap."),
    ("Decision", "3.7M lines → Pareto cohort → rebuild throughput and in-product validation → instrument before cutover."),
    ("System + metric", "If it does not move first-pass, throughput, or cost-to-process, it is not the next bet."),
    ("Tradeoff", "I will disappoint a loud low-volume user to unlock 280K blocked lines."),
    ("Stop", ""),
], "60s")

h3(doc, "Q. Tell me about a time you said no / a tradeoff")
say(doc, [
    ("Bottom line", "I refused to auto-approve treatment extensions even though 79% of 139K historical records were always approved."),
    ("Context", "$80M physio program. Speed was the obvious product. Rubber-stamping spend was the risk."),
    ("Decision", "Digitize request + error validation + tracking. Keep authorization in human review."),
    ("System + metric", "139K records as the evidence, not an opinion."),
    ("Tradeoff", "Slower cycle time than full automation. I would rather be late than unsupervised on $80M."),
    ("Stop", "Candid’s analog is: AI may edit a claim; a human still owns clinical/financial judgment when the error is expensive."),
], "60s")

h3(doc, "Q. Tell me about a miss")
say(doc, [
    ("Bottom line", "After we cut 11 screens to 5 and shipped multi-claim, the first month of the high-volume cohort barely moved — users did not discover duplicate-line."),
    ("Context", "We had treated discoverability as obvious. It was not."),
    ("Decision", "Watch behavior, not launch day. Fix the onboarding/affordance before blaming the segment."),
    ("System + metric", "Launch is the start of the funnel. PostHog was how we saw it in days, not a quarter."),
    ("Tradeoff", "I was wrong that “better architecture” equals adoption."),
    ("Stop", "I now bake a named-cohort launch and a discoverability check into the definition of done."),
], "60s")

h3(doc, "Q. How would you ramp on US payer rules in 90 days?")
say(doc, [
    ("Bottom line", "I would not memorize CPT. I would sit on real claim failure modes until I can explain the top denial families in our book of business."),
    ("Context", "I have already learned a dense eligibility/fee-schedule system by encoding it into validation."),
    ("Decision", "Week 1–3: shadow ops + one customer + the rules engine owners. Week 4–8: pick one payer or one edit family and own a measurable first-pass slice. Week 9–12: a dashboard the team actually uses."),
    ("System + metric", "Success = I can point at touchless rate / first-pass for my slice and say what we changed."),
    ("Tradeoff", "I will not perform industry trivia in standups."),
    ("Stop", ""),
], "60s")

h3(doc, "Q. How do you work with engineering when you disagree?")
say(doc, [
    ("Bottom line", "I bring the failure mode and the volume. They bring the constraint. We pick the cheapest way to fail closed."),
    ("Context", "Eligibility on the invoice API: product wanted orgs to only see contracted services. Engineering had to expose it without wrecking submit latency."),
    ("Decision", "Define invalid states first. Ship the control that stops bad claims. Defer polish."),
    ("System + metric", "Invalid claims stopped before ops. That is the win, not the UI."),
    ("Tradeoff", "I will lose a visual argument to keep a data contract."),
    ("Stop", ""),
], "50s")

# ── CASE ──────────────────────────────────────────────────────────────────────
h1(doc, "Round 3 — Product case")
note(doc, "INFERRED. Adjacent Candid Health loop included a case study. Likely live 30–45 min or a take-home. Prompt family: raise touchless / first-pass for a provider; prioritize a billing roadmap; design a dashboard for ops and leadership.")

h2(doc, "How to run any Candid-shaped case")
bullet(doc, "0–3 min: clarify. Who is the user — biller, office manager, clinician, Candid ops, payer? What is in/out of EHR?")
bullet(doc, "3–8 min: goal. North star: touchless claim rate (submitted, processed, paid/adjudicated with no human). Guardrails: denial rate, days in A/R, cost per claim (ops minutes), customer impl time.")
bullet(doc, "8–15 min: problem. Claim dies because data was wrong at submit (Candid thesis), not because appeals are slow.")
bullet(doc, "15–25 min: 2–3 bets. Pick one with unit economics. MVP. How you roll out to one org without breaking the book.")
bullet(doc, "25–30 min: metrics + risks (wrong edit, compliance, edge-case payers). Questions for them.")

h2(doc, "Worked case: “Improve first-pass for a 40-clinician group”")
h3(doc, "Clarify (say this)")
body(doc, "I am assuming the customer is already live on Candid, claims are electronic, and the pain is still too many claims needing a human. Users: billing staff in the group, Candid’s ops if there is a remaining queue, and clinicians only if missing data originates at chart-close. Constraints: we cannot rip out their EHR this quarter. Success in 90 days is first-pass / touchless up, not a new module for its own sake. Is that the frame?")

h3(doc, "Structure (say this)")
labeled(doc, "North star", "Touchless rate — claims that go submit → payer with no human edit.")
labeled(doc, "Guardrails", "Denial rate after submit, time-to-pay, impl/ops minutes per claim, % claims blocked pre-submit (good if we catch errors).")
labeled(doc, "Problem", "Split failures: missing eligibility, wrong codes/units vs fee schedule, provider enrollment, attachment missing. I would rank by volume × dollars × fixability in-product.")
labeled(doc, "Bets", "(1) Pre-submit validation against payer/fee-schedule rules — fail closed in the UI or API. (2) Eligibility + enrollment checks before claim build. (3) Better ops dashboard so remaining humans work the right queue. I pick (1) first: it is Candid’s thesis and it matches what I shipped.")
labeled(doc, "Why (1)", "At WorkSafeBC, encoding fee schedules and service codes in-product cut invalid submissions 40% and stopped junk before ops. Same motion: rules at the edge, not a bigger cleanup team.")
labeled(doc, "MVP", "One specialty or one payer family. Top N edits that explain most failures. Show the biller the failing field before submit. Log every fail for the rules team.")
labeled(doc, "Rollout", "Named cohort, not big-bang — same as 322K lines I would not disrupt. Dark: Candid ops sees flags. Soft: one clinic. Hard: the group.")
labeled(doc, "Risk", "Over-blocking clean claims. Guardrail: false-positive fail rate. Human override with reason code.")
labeled(doc, "Stop", "I would not start with a generative “appeal writer.” That is denial cleanup. Candid’s edge is not being in that business.")

h2(doc, "If they ask you to prioritize three bets")
body(doc, "Use: impact on touchless × confidence × cost to build × reversible? Example ranking:")
bullet(doc, "P0: Pre-submit rule fails for the top denial family by dollars. High impact, you have the data loop.")
bullet(doc, "P1: Dashboard that makes first-pass and fail reasons visible to the customer and to Candid leadership (JD: rigorous reporting).")
bullet(doc, "P2: EHR field mapping for the two missing chart fields that drive P0. Only if P0 shows the data is not enterable today.")
bullet(doc, "Kill: a redesign of the billing homepage. No unit-economic story.")

# ── ENG / OPS / LEAD ──────────────────────────────────────────────────────────
h1(doc, "Loop — engineering, ops/customer, leadership")
note(doc, "INFERRED. SWE onsite had technical + behavioral + system design + senior leadership. For PM: engineering working session, rollout/customer, founder or head of product.")

h2(doc, "Engineering partnership")
h3(doc, "Q. How do you spec a rules / validation change?")
say(doc, [
    ("Bottom line", "I spec invalid states, volume, and what happens on fail — not a paragraph of hopes."),
    ("Context", "Invoice API eligibility: org must only see contracted services."),
    ("Decision", "Contract in / contract out. Fail at submit with a field-level reason. No silent drop."),
    ("System + metric", "Invalid claims never reach ops. Measure fail count and false fails."),
    ("Tradeoff", "I will cut copy and empty states before I cut the data contract."),
    ("Stop", ""),
], "45s")

h3(doc, "Q. You said you use Copilot / Lovable. So you code?")
say(doc, [
    ("Bottom line", "I prototype and I read. I do not merge production rules."),
    ("Context", "I use it to show a flow or to understand a PR before I argue it."),
    ("Decision", "Keeps discovery cheap. Engineering still owns the engine."),
    ("System + metric", "Faster yes/no on a workflow before we spend a sprint."),
    ("Tradeoff", "A pretty prototype is not an estimate."),
    ("Stop", ""),
], "30s")

h2(doc, "Ops, customers, rollouts")
h3(doc, "Q. How do you roll out a breaking billing change?")
say(doc, [
    ("Bottom line", "Named cohort, instrumented, ops in the room. Never big-bang a payments path."),
    ("Context", "322K digital lines/year already working. High-volume v2 could have wrecked them."),
    ("Decision", "Dark → soft → hard with Healthcare Operations. PostHog on submit/error/drop-off from day one."),
    ("System + metric", "Existing throughput intact while 200–1,900 lines/month segment came on."),
    ("Tradeoff", "Slower vanity launch. JD literally asks for communication of feature rollouts to customers, ops, and leadership — that is this muscle."),
    ("Stop", ""),
], "50s")

h3(doc, "Q. How do you get signal from the field?")
say(doc, [
    ("Bottom line", "Volume first, then a small number of the users who generate it."),
    ("Context", "I did not survey 3,795 providers. 25 orgs were half the paper."),
    ("Decision", "Analytics → named interviews with that cohort → ship for their constraint (multi-claim, no line cap)."),
    ("System + metric", "3.7M lines told me where to stand. Interviews told me the 11-screen path was impossible, not merely annoying."),
    ("Tradeoff", "Average CSAT can lie when the Pareto tail is on fax."),
    ("Stop", ""),
], "45s")

h2(doc, "Leadership / founder (if it happens)")
h3(doc, "Q. Why this problem for the next five years?")
say(doc, [
    ("Bottom line", "US healthcare wastes a grotesque amount of money on getting paid. The winning companies will treat that as data infrastructure, not a staffing agency."),
    ("Context", "I have already felt the failure mode: rules in people’s heads, cleanup after the fact."),
    ("Decision", "I want to build the pre-submit system, not a nicer queue."),
    ("System + metric", "Touchless rate is a cleaner company-level metric than NPS."),
    ("Tradeoff", "This will be intense. Blind’s PM review matches how I like to work. I am not looking for a rest-and-vest seat."),
    ("Stop", ""),
], "45s")

h2(doc, "Questions for later rounds")
bullet(doc, "What is the current touchless rate range across customers, and what actually moves it?")
bullet(doc, "Where do PMs get blocked — payer rule coverage, EHR mappings, or customer ops change management?")
bullet(doc, "Show me a dashboard a PM looks at on Monday. What is on it?")
bullet(doc, "When a customer’s first-pass drops, who owns the diagnosis — PM, ops, or data?")

# ── STORY BANK ────────────────────────────────────────────────────────────────
h1(doc, "Story bank")
body(doc, "Memorize the tag line. Use the matching story. Do not mix metrics across stories.")

h2(doc, "Invoicing rebuild — first-pass + throughput")
labeled(doc, "Use for", "Proud product, data-intensive, unit economics, execution, launch.")
labeled(doc, "Line", "3.7M lines → 25 orgs → rebuild 11→5 / multi-claim → invalid −40%, 280K unlocked, paper 56%→19%, ~$50K, $580K, 322K protected.")

h2(doc, "Eligibility API — fail closed")
labeled(doc, "Use for", "APIs, engineering, data contracts.")
labeled(doc, "Line", "Contract eligibility on the invoice API. Orgs only bill signed-up services. Invalid never reaches ops.")

h2(doc, "Treatment extensions — $80M human-in-the-loop")
labeled(doc, "Use for", "No / ethics / AI boundaries / leadership.")
labeled(doc, "Line", "139K records, 79% always approved, $80M program. Digitize + validate. Do not auto-approve.")

h2(doc, "Discoverability miss")
labeled(doc, "Use for", "Failure, iteration, metrics.")
labeled(doc, "Line", "Architecture shipped. Duplicate-line not found. First month flat. PostHog + onboarding fix. Launch ≠ adoption.")

h2(doc, "OSCAR EMR")
labeled(doc, "Use for", "0-to-1, integrations, EHR as system of record.")
labeled(doc, "Line", "$80K, ~70% ecosystem, 50 vendors. Physicians will not leave the EHR for a side portal.")

h2(doc, "CIAM migration")
labeled(doc, "Use for", "Regulated delivery, change management, 0 downtime.")
labeled(doc, "Line", "5,600 professionals, 500 orgs, 62k referrals/year, 0 downtime, 100% active accounts on deadline.")

h2(doc, "Referral Radar")
labeled(doc, "Use for", "AI, claims data, human retains decision.")
labeled(doc, "Line", "LLM over 20–75 claim docs/case. Synthetic data when prod claims blocked. InnoFest 2nd.")

h2(doc, "TSBC dashboards")
labeled(doc, "Use for", "Data products, dashboards, unit economics of retention.")
labeled(doc, "Line", "Membership/churn/RFM. 11.7% churn. 78% high-risk retained. NLP routing off the inbox.")

# ── RED FLAGS ─────────────────────────────────────────────────────────────────
h1(doc, "Red flags — recruiter call")
bullet(doc, "Opening with “I don’t have RCM experience.” Flip it: first-pass validation analog, then the gap in one clause.")
bullet(doc, "A 3-minute origin story before a metric.")
bullet(doc, "Asking them to explain what Candid does. You already wrote the application.")
bullet(doc, "Comp first, or a number above $195k.")
bullet(doc, "“Are you hybrid-flexible?” The JD is 4 days in office.")
bullet(doc, "Name-dropping Palantir/founders as if you worked there.")

out = r"c:\Users\khush\Desktop\kdodani-portfolio\Candid_Health_PM_Interview_Playbook.docx"
doc.save(out)
print(f"Saved: {out}")
