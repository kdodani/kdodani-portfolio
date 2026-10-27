"""Candid Health Round 2 — 45-min team behavioral screen."""
from playbook_docx_lib import (
    new_doc, title_block, h1, h2, h3, body, bullet, labeled, say, note,
)

doc = new_doc()
title_block(
    doc,
    "Khushboo Dodani  ·  Round 2",
    "Candid Health — 45-min team screen",
    "Lori: strengths, weaknesses, pride, failures — specific examples, why they mattered. Not a product case. Two stories deep. Fill the visa form today.",
)

h1(doc, "What this round is")
body(doc, "1–2 teammates. ~45 minutes. Most of the time they ask; you get a few minutes at the end. They already have the recruiter version of you. They are checking whether it survives a PM in the room: low ego, high output, metrics, judgment.")
bullet(doc, "Email asked for: skills you have honed; moments of excellence; failures / mistakes / missed opportunities; why those highs and lows are meaningful.")
bullet(doc, "JD they are mapping to: data-intensive products, unit economics, dashboards, field signal, customer rollouts, engineering partnership, healthcare/billing, outcome-oriented.")
bullet(doc, "Candid thesis they want you to land on without lecturing: first-pass / touchless, auto-correct vs detect-only, humans on the residual 5%.")
bullet(doc, "If the second person is an engineer: failure modes and APIs. Eligibility API, invalid states. No LeetCode.")
note(doc, "Fill Lori’s visa Google Form the same day (TN). Do not open this call with immigration. Do not open with “I don’t have US RCM.” Open with PIS.")

h1(doc, "Clock")
bullet(doc, "0–3 min: rapport. Tell me about yourself = the 90-second briefing script. Do not restart. Do not add a third project.")
bullet(doc, "3–15 min: pride — PIS, deep. They will follow up. Stay here.")
bullet(doc, "15–27 min: failure — discoverability / first month flat. This is the hireable miss.")
bullet(doc, "27–37 min: strengths, weakness, skills honed. Second pride ($80M no) only if they ask for another high.")
bullet(doc, "37–45 min: your three questions.")
note(doc, "If they invert the order, keep the same two stories. Do not add Referral Radar unless they ask about AI.")

h1(doc, "0–3 min — Tell me about yourself")
body(doc, "Same 90-second briefing script. Do not restart. Skip Referral Radar in this 45-min unless they ask about AI.")
say(doc, [
    ("Bottom line", "I build products that take manual billing and claims work out of people’s queues — so providers get paid, and spend the time on care."),
    ("Gaps", "At WorkSafeBC I owned provider invoicing and the ops tools behind it. The platform could find errors but not auto-correct them. Every exception required a human, every time — the system did not learn. Fee schedules lived on a website. Large orgs only got siloed, location-level data."),
    ("Trajectory", "That is why I spoke at ProductCamp BC on modernizing legacy healthcare and insurance. Candid is the next step on that path."),
    ("PIS", "I encoded fee schedules, contracted rates, and service codes so invalid line items failed at submit — invalid submissions down 40%. 3.7M line items, 25 orgs, ~280K blocked lines unlocked. Detect layer. I could not ship auto-correct or a learning loop from ops touches."),
    ("Why Candid", "Candid’s product is the closed loop: encode payer rules, correct the claim before it goes out, learn when a human still has to touch it. I want that work, in the San Francisco office, four days a week."),
], "75–90s")
note(doc, "If they ask about AI: Referral Radar — an agent over 20–75 claim documents so a human can find eligibility and keep the decision. Same pattern as Candid’s residual 5%. Then stop.")

h1(doc, "Locked kit — two stories, not five")
labeled(doc, "Pride", "PIS. First-pass + throughput + cost-to-process.")
labeled(doc, "Pride backup", "Treatment extensions. Refused auto-approve on $80M.")
labeled(doc, "Failure", "Shipped 11→5 and multi-claim. Cohort did not move. Duplicate-line unread.")
labeled(doc, "Failure backup", "Segmented the build, one launch message. Hearing aid / Blueprint.")
labeled(doc, "Do not use unless asked", "Referral Radar, CIAM, OSCAR — extras, not the spine.")

h2(doc, "Numbers (do not mix)")
bullet(doc, "Invalid submissions −40%. Fee-schedule service codes, contracted rates, eligibility encoded in-product.")
bullet(doc, "3.7M line items. 25 of 3,795 orgs = 50% of remaining paper. 200–1,900 lines/month.")
bullet(doc, "11 screens → 5. ~280K blocked lines unlocked. Paper 56%→19%. Portal 39%→55%. ~$50K cost-to-process. $580K funded. 322K digital lines/year protected.")
bullet(doc, "139K extensions. 79% always approved. $80M physio. Human review kept.")
bullet(doc, "If they say CPT / 837: service codes = what was performed; invoice API = the structured submit. One sentence. Stop.")

# ── PRIDE ─────────────────────────────────────────────────────────────────────
h1(doc, "Pride — PIS (primary)")
h3(doc, "Q. What are you proudest of? / A moment of excellence")
say(doc, [
    ("Bottom line", "I rebuilt provider invoicing so invalid work died at submit and high-volume orgs could actually bill — without breaking the 322K digital lines already in production."),
    ("Context", "The portal had PMF for small clinics. High-volume orgs were capped: one claim per submit, 11 screens, 32-line ceiling. Paper felt cheaper than switching. 25 organizations created half the remaining paper."),
    ("Decision", "Start from 3.7M line items, not a workshop. Encode fee-schedule service codes, contracted rates, and eligibility so bad lines fail in-product. Rebuild throughput for 200–1,900 lines/month. Dark / soft / hard launch with ops."),
    ("System + metric", "Invalid submissions −40%. ~280K lines unlocked. Paper 56%→19%. Portal 39%→55%. ~$50K lower cost-to-process. $580K funded. Existing volume intact."),
    ("Tradeoff", "I optimized the 25, not the average of 3,795. Slower vanity launch. Detect only — we did not auto-correct. That gap is why I want Candid."),
    ("Why it was meaningful", "Same units Candid runs the company on: error rate, throughput, cost-to-serve. Time and dollars were leaking; payments and treatment were delayed. This is the work I want to keep doing on a closed loop."),
    ("Stop", "Happy to go into the rules, the API, or the launch."),
], "75s")

h2(doc, "PIS follow-ups (stay in the story)")
h3(doc, "How did you know what to encode?")
body(doc, "Volume first. Invalid services and ineligible contracts were showing up in ops cleanup. We put fee-schedule codes, rates, and contract eligibility in the product so the failure happened at submit. Invoice API: orgs only see services they are signed up for.")

h3(doc, "That’s not US billing.")
body(doc, "Correct. CPT is our service codes. 837 is our invoice API — structured claim + lines, not X12. I built detect-and-validate. Candid also corrects and learns from the touch. I am not performing RCM jargon.")

h3(doc, "How did you work with engineering?")
say(doc, [
    ("Bottom line", "I bring the invalid state and the volume. They bring the constraint. We fail closed."),
    ("Context", "Eligibility on the invoice API could have wrecked submit latency if we gold-plated the UI."),
    ("Decision", "Spec: what must fail, what the biller sees, what ops never receives. Cut polish."),
    ("System + metric", "Ineligible lines never queued. That was the win."),
    ("Tradeoff", "I lose visual arguments on purpose."),
    ("Stop", ""),
], "40s")

# ── JUDGMENT ──────────────────────────────────────────────────────────────────
h1(doc, "Pride backup — $80M no")
h3(doc, "Q. Another example of excellence / a hard call")
say(doc, [
    ("Bottom line", "I refused to auto-approve treatment extensions even though 79% of 139K historical requests were always approved."),
    ("Context", "$80M physiotherapy program. Speed was the obvious product. Rubber-stamping spend was the risk. Seniors and architects pushed auto-approve."),
    ("Decision", "Digitize the request, add error validation and tracking, keep authorization in human review."),
    ("System + metric", "139K rows as the argument, not a preference."),
    ("Tradeoff", "Slower cycle time than full automation."),
    ("Why it was meaningful", "Excellence is not the highest automation number. Candid’s residual 5% is this call — prior auth, medical necessity, COB. I have already made it."),
    ("Stop", ""),
], "55s")

# ── FAILURE ───────────────────────────────────────────────────────────────────
h1(doc, "Failure — discoverability (primary)")
h3(doc, "Q. A failure, mistake, or missed opportunity")
say(doc, [
    ("Bottom line", "We shipped a better invoicing product. The high-volume cohort barely moved in month one. I had treated architecture as adoption."),
    ("Context", "11 screens to 5, multi-claim, duplicate-line. On paper that was the unlock for 200–1,900 lines/month."),
    ("Decision", "I was wrong that “they will find it.” Users did not recognize the duplicate-line icon. They re-typed patient data like v1, or stayed on paper."),
    ("System + metric", "PostHog showed usage, not a survey. We fixed the affordance and onboarding. Launch became the start of the funnel, not the finish."),
    ("Tradeoff", "I had over-invested in capacity and under-invested in whether a named user could complete the new path unassisted."),
    ("Why it was meaningful", "This is how I now ship. Candid auto-edits that billers override or never notice fail the same way. Watching submit behavior after ship is the skill, not the screen count."),
    ("Stop", "That is the miss I am proudest of learning from. I do not blame the users."),
], "75s")

h3(doc, "What would you do differently?")
body(doc, "Named-cohort dark launch was right. Definition of done was wrong. I now require: a named user completes the new path without a walkthrough, and the new control shows up in the funnel within days. Features that cannot be found do not exist.")

h3(doc, "Second failure if they ask — GTM")
say(doc, [
    ("Bottom line", "I segmented the roadmap and then used one launch message."),
    ("Context", "Hearing-aid providers still had to leave Blueprint / their EMR. A nicer portal did not solve their job."),
    ("Decision", "Channel-specific GTM after the fact. Should have been in the launch plan."),
    ("System + metric", "25 orgs were 50% of paper — but not one persona."),
    ("Tradeoff", ""),
    ("Why it was meaningful", "Digital-health API customers and multi-site MSOs are not one comms plan. The JD asks for rollouts to customers and ops. That is this muscle."),
    ("Stop", ""),
], "40s")

# ── STRENGTHS / WEAKNESS / SKILLS ─────────────────────────────────────────────
h1(doc, "Skills honed / strengths / weakness")

h2(doc, "Skills I have honed (pick two, 20 seconds each)")
labeled(doc, "1. Encode from volume", "I do not start from a request pile. 3.7M lines told me the 25 orgs and the invalids. Rules come from the data.")
labeled(doc, "2. Design for the submitter", "Office admins used the physio tool; surveys were filled by physios. Candid’s daily user is the biller. I research the person who hits submit.")
labeled(doc, "3. Instrument the payments path", "PostHog on 322K lines/year before cutover. I will not launch a billing change I cannot see. JD: dashboards and accountability.")

h3(doc, "Q. What are your strengths?")
say(doc, [
    ("Bottom line", "I am strongest where data, rules, and the person submitting meet."),
    ("Context", "WorkSafe invoicing and ops tools — detect layer, named-cohort launches, real users after ship."),
    ("Decision", "I will disappoint a loud low-volume user to unlock the Pareto tail. I will keep a human on an $80M decision."),
    ("System + metric", "Invalid −40%. 280K lines. Launch-as-funnel after the miss."),
    ("Tradeoff", "I am not the PM who gold-plates the homepage."),
    ("Stop", ""),
], "40s")

h3(doc, "Q. What is a weakness?")
say(doc, [
    ("Bottom line", "I shipped capacity and assumed adoption. That was a real miss, not a humble-brag."),
    ("Context", "PIS v2. Architecture was right. Discoverability was not in the definition of done."),
    ("Decision", "I now put a named-user unassisted path and a funnel check into done before I call it shipped."),
    ("System + metric", "Month-one flat taught me faster than a retro."),
    ("Tradeoff", "I move a little slower at “launched” and much faster at “used.”"),
    ("Stop", "If you mean domain: I do not have US 837/CPT production work. I have detect-and-validate on a fee-schedule system. That gap is why I am here — Candid is the correct-and-learn half."),
], "50s")
note(doc, "Do not say “I work too hard” or “I care too much.” If they only want a skill gap, use the US clause and stop. If they want a working-style gap, use discoverability.")

h3(doc, "Q. Why are these highs and lows meaningful to you?")
say(doc, [
    ("Bottom line", "They are the same product: get billing right before a human cleans it up, and do not confuse shipping with changing behavior."),
    ("Context", "At WorkSafe the system could find errors and not correct them, and could not learn from ops touches. Fee codes lived on a website. Enterprise orgs saw siloed data."),
    ("Decision", "I spoke at ProductCamp on modernizing legacy industries. Candid is that trajectory — auto-correct, rule flywheel, enterprise visibility, touchless rate."),
    ("System + metric", "Pride = first-pass and throughput. Failure = I now watch the submitter after launch."),
    ("Tradeoff", ""),
    ("Stop", "That is the work I want to do in the San Francisco office."),
], "40s")

h3(doc, "Q. How would you ramp in 90 days?")
say(doc, [
    ("Bottom line", "I would not memorize CPT. I would sit on real claim failures until I can explain the top denial families in the book of business."),
    ("Context", "I learned a dense fee-schedule system by encoding it."),
    ("Decision", "Weeks 1–3: shadow ops, one customer, the rules owners. 4–8: one payer or edit family, a measurable first-pass slice. 9–12: a dashboard the team actually uses."),
    ("System + metric", "I can point at TCR / first-pass for my slice and say what we changed."),
    ("Tradeoff", "I will not perform industry trivia in standup."),
    ("Stop", ""),
], "40s")

# ── QUESTIONS ─────────────────────────────────────────────────────────────────
h1(doc, "Your three questions (pick three)")
bullet(doc, "Of the residual 5% that is not touchless, what share is missing clinical data vs payer-rule drift vs prior auth?")
bullet(doc, "When a human corrects a claim today, how fast does that become a suggested rule — and who accepts it, PM or ops?")
bullet(doc, "What would this PM own first — submission, rules/edits, denials, reporting, or onboarding?")
bullet(doc, "How do you know a PM is working here — touchless rate, time-to-pay, cost-to-collect, something else?")
note(doc, "Do not ask about remote, culture-in-the-abstract, or “what’s the next round” as your first question. Process is fine as a closer: “What does success in this conversation look like for you?”")

h1(doc, "Do / don’t")
bullet(doc, "Do: open with PIS. Two stories. Metrics in the first sentence of each.")
bullet(doc, "Do: name the miss without blaming design, engineering, or “the business.”")
bullet(doc, "Don’t: four projects. Don’t dump Referral Radar. Don’t invent cost-per-claim.")
bullet(doc, "Don’t: a 3-minute origin story. Don’t apologize for Canada. One clause, then parallel.")
bullet(doc, "Don’t: “I’m passionate about healthcare.”")

out = r"c:\Users\khush\Desktop\kdodani-portfolio\Candid_Health_Round2_Behavioral_Playbook.docx"
doc.save(out)
print(f"Saved: {out}")
