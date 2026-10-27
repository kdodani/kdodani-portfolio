"""Candid Health — Head of Product behavioral / team-alignment playbook."""
from playbook_docx_lib import (
    new_doc, title_block, h1, h2, h3, body, bullet, labeled, say, note,
)

doc = new_doc()
title_block(
    doc,
    "Khushboo Dodani  ·  Head of Product",
    "Candid Health — team alignment, behavioral",
    "Recruiter: treat as behavioral. They already have Lori’s screen. Low ego, high output, can their PMs/eng/ops work with you. Not a second product case.",
)

h1(doc, "What this round is")
body(doc, "Head of Product. They lead. They are not testing whether you can walk PIS again from scratch. They are testing whether you move a team — eng, ops, design, seniors — without being the hero or the victim.")
bullet(doc, "Open with PIS. Two stories deep: PIS + discoverability miss. $80M no if they ask for another high or a “said no.”")
bullet(doc, "InfoX and Radar are alignment extras (influence, incomplete data). Do not dump them.")
bullet(doc, "If they flip to product vision, use slide 4 notes. Do not turn this conversation into the vision deck.")
note(doc, "Do not open with immigration. Do not open with “I don’t have US RCM.” Do not name WorkSafe individuals.")

h1(doc, "Clock")
bullet(doc, "0–3 min: rapport + TMAY. Same 90-second briefing. Do not restart. Do not add a third project.")
bullet(doc, "3–20 min: alignment stories. They lead. Stay in PIS, $80M no, discoverability.")
bullet(doc, "20–end: weakness, 90-day, your three questions.")
note(doc, "If they invert the order, keep the same two stories.")

h1(doc, "Locked kit")
labeled(doc, "Pride", "PIS. Fail closed at submit. High-volume orgs could bill. Existing book intact.")
labeled(doc, "Pride backup", "Treatment extensions. Refused auto-approve on $80M.")
labeled(doc, "Failure", "Shipped 11→5 and multi-claim. Cohort did not move. Duplicate-line unread.")
labeled(doc, "Failure backup", "Segmented the build, one launch message. Hearing aid / Blueprint.")
labeled(doc, "Do not use unless asked", "Referral Radar, InfoX, CIAM — extras, not the spine.")

h2(doc, "Numbers (do not mix)")
bullet(doc, "Invalid submissions −40%. 3.7M line items. 25 of 3,795 orgs = 50% of remaining paper. ~280K blocked lines. 11 screens → 5. 322K digital lines/year protected.")
bullet(doc, "If they saw the one-pagers: $500K ops / $200K saved / adoption +60%. Do not put $580K funding in the same breath as $500K ops.")
bullet(doc, "Extensions: 139K requests. 79% always approved. $80M physio. Human review kept.")
bullet(doc, "InfoX: $80K Innovation Council. 27 Mar 2025 POC. Not a fax-% claim.")
bullet(doc, "Radar: 2nd of 36. No production PHI. No minutes-saved claim.")
bullet(doc, "If they say CPT / 837: service codes = what was performed; invoice API = the structured submit. One sentence. Stop.")

# ── 1 TMAY ────────────────────────────────────────────────────────────────────
h1(doc, "1  ·  Tell me about yourself")
say(doc, [
    ("Context", "I build products that take manual billing and claims work out of queues — so providers get paid and spend the time on care."),
    ("Decision", "At WorkSafeBC I owned provider invoicing and the ops tools behind it. The platform could find errors but not auto-correct them. Every exception required a human, every time — the system did not learn."),
    ("Who", "I sat with PIS.API, architects, Healthcare Ops, CMS, design. I did not survey 3,795 providers."),
    ("Metric", "I encoded fee schedules, contracted rates, and service codes so invalid line items failed at submit — invalid −40%. 3.7M lines, 25 orgs, ~280K unlocked. Detect only."),
    ("Stop", "That gap is why Candid: encode, correct before it goes out, learn when a human still touches it. San Francisco office, four days a week."),
], "75–90s")

# ── 2 ENG PARTNER ─────────────────────────────────────────────────────────────
h1(doc, "2  ·  How do you partner with engineering?")
h3(doc, "Q. How do you work with engineers? / How do you spec?")
say(doc, [
    ("Context", "Eligibility on the invoice API: product wanted orgs to only see (and bill) contracted services. Gold-plating the UI could have wrecked submit latency."),
    ("Decision", "I bring the invalid state and the volume. They bring the constraint. We fail closed. Spec: what must fail, what the biller sees, what ops never receives. Cut polish."),
    ("Who", "PIS.API + architects / rules-engine PM. I sit in design review. I do not throw tickets over a wall. I will not pair-program a rules engine."),
    ("Metric", "Ineligible lines never queued. Invalid −40%. That was the win, not the screen."),
    ("Stop", "I lose visual arguments on purpose."),
], "50s")

# ── 3 DISAGREE ENG/DESIGN ─────────────────────────────────────────────────────
h1(doc, "3  ·  Disagreement with eng / design")
h3(doc, "Q. Tell me about a time you disagreed with engineering or design")
say(doc, [
    ("Context", "An AI-assisted prototype said we could collapse 11 screens to 5. Legacy Kendo Grid could not ship that design. Clock was Aug 2025–Mar 2026."),
    ("Decision", "Prototypes validate desirability, not feasibility. We adapted the UX to Kendo and kept the workflow reduction. Standards fixes after launch. Functional value first."),
    ("Who", "Design wanted the prototype. Eng knew the grid. I made the call to ship on the stack we had, not hold the date for a mock that could not run."),
    ("Metric", "11→5 shipped on Kendo. V1 stayed live. I do not name designers."),
    ("Stop", "I will lose a visual argument to keep a data contract and a date."),
], "50s")

# ── 4 DISAGREE SENIORS ────────────────────────────────────────────────────────
h1(doc, "4  ·  Disagreement with seniors")
h3(doc, "Q. Tell me about a time you pushed back on leadership / architects")
say(doc, [
    ("Context", "$80M physiotherapy program. 79% of 139K extension requests were always approved. Seniors and architects pushed auto-approve. Speed was the obvious product."),
    ("Decision", "High approval can mean the review is broken (skimming), not that review is unnecessary. I said no. Digitize the request, error validation, tracking. Authorization stays with the case manager."),
    ("Who", "Senior PMs, architects, Healthcare Programs. I used 139K rows as the argument, not a preference."),
    ("Metric", "Human review kept on $80M. Slower cycle time than full automation."),
    ("Stop", "Candid’s residual 5% is this call — prior auth, medical necessity, COB. I have already made it."),
], "55s")

# ── 5 WRONG DIAGNOSIS ─────────────────────────────────────────────────────────
h1(doc, "5  ·  Align a team that diagnosed it wrong")
h3(doc, "Q. How do you get a team to change direction?")
say(doc, [
    ("Context", "Ops assumed paper was behavior: more marketing, pay-to-use, tax paper. The portal had PMF for small clinics. High-volume orgs were capped at one claim, 11 screens, 32 lines."),
    ("Decision", "I did not run a workshop of 3,795 providers. 3.7M line items picked 25 orgs = 50% of remaining paper. Unlock a segment. Do not spray features on the average user."),
    ("Who", "Healthcare Operations, program managers, executive sponsors. I disappointed loud low-volume users on purpose."),
    ("Metric", "Rebuild for 200–1,900 lines/month. ~280K blocked lines. Invalid −40%."),
    ("Stop", "Alignment was the data, not a consensus meeting."),
], "55s")

# ── 6 INFLUENCE ───────────────────────────────────────────────────────────────
h1(doc, "6  ·  Influence without authority")
h3(doc, "Q. How do you get buy-in when you do not own the org?")
say(doc, [
    ("Context", "Form 8/11 was locked in a 2001 billing spec. 52K faxes, ~$250K re-key. I was idea champion, then PM. A portal instinct was the easy ask."),
    ("Decision", "15 GP interviews: they will not leave the EMR. Advisors: notes truncated by billing limits. InnoFest “Death to PDFs” did not win. I socialized anyway."),
    ("Who", "GPs, medical advisors, claims, architects, Innovation Council. 50 vendors in outreach later — that should have run in parallel, and did not."),
    ("Metric", "$80K POC. Validated 27 Mar 2025. Form 8 not live. Not a fax-% claim."),
    ("Stop", "Socializing the idea across groups mattered more than winning the competition."),
], "55s")
note(doc, "Use this only if they ask influence / no-authority. Do not replace PIS as the pride story.")

# ── 7 SAID NO ─────────────────────────────────────────────────────────────────
h1(doc, "7  ·  Said no")
h3(doc, "Q. Tell me about a time you said no")
say(doc, [
    ("Context", "Primary: auto-approve on $80M because 79% of 139K were always approved. Backup: spray portal features across 3,795 orgs."),
    ("Decision", "Primary: no — digitize and keep the human. Backup: no — build for the 25 who were half the paper."),
    ("Who", "Seniors/architects on extensions. Ops and low-volume users on PIS."),
    ("Metric", "139K / 79% / $80M. Or 25 of 3,795 / ~280K."),
    ("Stop", "Excellence is not the highest automation number."),
], "40s")

# ── 8 CROSS-TEAM ──────────────────────────────────────────────────────────────
h1(doc, "8  ·  Cross-team / two surfaces")
h3(doc, "Q. Tell me about aligning two teams that do not share a backlog")
say(doc, [
    ("Context", "Treatment extensions: providers submit in the portal (PXT). Case managers adjudicate in CMS. Fax and mail still exist. A portal-only design would have broken the ID link."),
    ("Decision", "Joint architecture. Unique request identifier across channels. Fix current physio extensions (tracking, validation, decision rationale) before adding new request types."),
    ("Who", "PXT and CMS product/eng, Healthcare Programs. I do not name people."),
    ("Metric", "139K historical requests informed the auto-approve no and the feature cut (ping deprioritized — most resolve in 3 days)."),
    ("Stop", "If I were doing it again I would put CMS in the portal design on day one, not at integration."),
], "50s")

# ── 9 LAUNCH WITH OPS ─────────────────────────────────────────────────────────
h1(doc, "9  ·  Launch with ops")
h3(doc, "Q. How do you roll something out without blowing up the book?")
say(doc, [
    ("Context", "V2 was for 200–1,900 lines/month. V1 already carried 322K digital lines/year. Big-bang would have risked the live base."),
    ("Decision", "Named-cohort dark launch with Healthcare Operations, then soft, then hard. V1 stayed live on purpose. Dual maintenance."),
    ("Who", "Healthcare Ops owned provider relationships. I owned cohort definition and PostHog before cutover."),
    ("Metric", "Existing volume intact. Dark launch of 10 names taught us they would not submit if it was too slow — that is Q14."),
    ("Stop", "I will not risk a live billing book to hit a date."),
], "45s")

# ── 10 WRONG ──────────────────────────────────────────────────────────────────
h1(doc, "10  ·  When you were wrong")
h3(doc, "Q. A failure, mistake, or missed opportunity")
say(doc, [
    ("Context", "We shipped 11→5 and multi-claim. On paper that unlocked 200–1,900 lines/month. Month one of the high-volume cohort barely moved."),
    ("Decision", "I had treated architecture as adoption. Users did not recognize the duplicate-line icon. They re-typed like v1, or stayed on paper. I do not blame design, eng, or “the users.”"),
    ("Who", "I went back to Ops and eng with PostHog, not a survey. We fixed the affordance and onboarding. Launch became the start of the funnel."),
    ("Metric", "Named-user unassisted path is now in definition of done. Features that cannot be found do not exist."),
    ("Stop", "That is the miss I am proudest of learning from."),
], "75s")

# ── 11 SECOND MISS ────────────────────────────────────────────────────────────
h1(doc, "11  ·  Second miss if they push")
h3(doc, "Q. Another time it did not land")
say(doc, [
    ("Context", "We segmented the roadmap: portal for high-volume, Blueprint for hearing aid, EMR for physicians. Then we used one launch message."),
    ("Decision", "Hearing-aid providers still had to leave Blueprint. A nicer portal did not solve their job. Channel-specific GTM should have been in the launch plan."),
    ("Who", "Program managers (Blueprint demand) and Ops. I had aligned the build, not the comms."),
    ("Metric", "25 orgs were 50% of paper — not one persona."),
    ("Stop", "Digital-health API customers and multi-site MSOs are not one comms plan. The JD asks for rollouts. That is this muscle."),
], "40s")

# ── 12 CHANGED MIND ───────────────────────────────────────────────────────────
h1(doc, "12  ·  Changed someone’s mind")
h3(doc, "Q. Tell me about a time you persuaded a partner")
say(doc, [
    ("Context", "Invalid services and ineligible contracts were showing up in ops cleanup. The instinct was more training or a better form."),
    ("Decision", "Put fee-schedule codes, rates, and contract eligibility in the product so the failure happened at submit. Invoice API: orgs only see services they are signed up for."),
    ("Who", "Ops (stop the queue), eng (fail closed without wrecking latency), execs (fund the 25, not the average)."),
    ("Metric", "Ineligible lines never queued. Invalid −40%."),
    ("Stop", "I changed the location of the failure, not the slide."),
], "45s")

# ── 13 INCOMPLETE DATA ────────────────────────────────────────────────────────
h1(doc, "13  ·  Incomplete data")
h3(doc, "Q. How do you decide when you do not have the data you want?")
say(doc, [
    ("Context", "Referral Radar. 2-week InnoFest. Production PHI unavailable. SMEs said 20–75 docs and 90+ min — not an ops extract. Challenge framed as automate."),
    ("Decision", "Finding, not judging, was the bottleneck. Synthetic data + case-manager validation so DS was not blocked. Mind map + evidence, not a ranked score. Human keeps the decision."),
    ("Who", "Data science, architects, CMs. A data architect followed up on the map. I blocked auto-refer by design."),
    ("Metric", "2nd of 36. Prototype, not production. No minutes-saved claim."),
    ("Stop", "Use only if they ask incomplete data or AI. Do not make Radar the pride story."),
], "50s")

# ── 14 BAD NEWS / SLOW ────────────────────────────────────────────────────────
h1(doc, "14  ·  Bad news / slow the team")
h3(doc, "Q. When have you slowed a team down? / How do you deliver bad news?")
say(doc, [
    ("Context", "Dark launch, 10 named high-volume providers. They never submitted. Too slow, poor UX. I had optimized capacity (1000–2000 lines), not responsiveness."),
    ("Decision", "Say it plainly: scalability and performance are one problem. Do not push big-bang. Keep the dual-run. Soft → hard only after the path is usable."),
    ("Who", "Eng (performance), Ops (cohort still live on v1), me (I owned the wrong optimization)."),
    ("Metric", "Existing 322K lines intact. Later: adoption +60% if they saw the one-pagers. No post-denial %."),
    ("Stop", "I do not dress a miss as a process win."),
], "45s")

# ── 15 STRENGTHS ──────────────────────────────────────────────────────────────
h1(doc, "15  ·  Strengths")
h3(doc, "Q. What are your strengths? / Skills you have honed")
say(doc, [
    ("Context", "I am strongest where data, rules, and the person who hits submit meet."),
    ("Decision", "Encode from volume (3.7M → 25). Design for the submitter (office admin, not the MD; physio tool used by admins, surveys by physios). Instrument before cutover (PostHog on the live book)."),
    ("Who", "That is how I show up with eng, ops, and design — same three habits."),
    ("Metric", "Invalid −40%. Launch-as-funnel after the miss."),
    ("Stop", "I am not the PM who gold-plates the homepage."),
], "40s")

# ── 16 WEAKNESS ───────────────────────────────────────────────────────────────
h1(doc, "16  ·  Weakness")
h3(doc, "Q. What is a weakness?")
say(doc, [
    ("Context", "I shipped capacity and assumed adoption. PIS v2. Architecture was right. Discoverability was not in definition of done."),
    ("Decision", "Named-user unassisted path and a funnel check are now in done before I call it shipped."),
    ("Who", "I do not outsource the miss to design."),
    ("Metric", "Month-one flat taught me faster than a retro. I move a little slower at “launched” and much faster at “used.”"),
    ("Stop", "If they only want a skill gap: I do not have US 837/CPT production work. I have detect-and-validate on a fee-schedule system. That gap is why I am here."),
], "50s")
note(doc, "Do not say “I work too hard” or “I care too much.” Working-style gap = discoverability. Domain gap = US clause, then stop.")

# ── 17 90 DAY ─────────────────────────────────────────────────────────────────
h1(doc, "17  ·  90-day ramp")
h3(doc, "Q. How would you ramp here?")
say(doc, [
    ("Context", "I would not memorize CPT. I learned a dense fee-schedule system by encoding it."),
    ("Decision", "Weeks 1–3: shadow ops, one customer, the rules owners. 4–8: one payer or edit family, a measurable first-pass slice. 9–12: a dashboard the team actually uses."),
    ("Who", "Ops + rules-engine owners first. Then the PM/eng pair on that slice. Then you, on whether the metric is real."),
    ("Metric", "I can point at TCR / first-pass for my slice and say what we changed."),
    ("Stop", "I will not perform industry trivia in standup."),
], "40s")

h1(doc, "If they ask something I do not have")
body(doc, "PIP, hiring, skip-level coaching, “tell me about a difficult personality”: I do not have a WorkSafe example at that grain. Say that. Go to discoverability (I was wrong) or $80M no (I held a line). Do not invent a person.")

h1(doc, "Your three questions (pick three)")
bullet(doc, "Where do PMs get stuck aligning eng vs ops vs customer success here?")
bullet(doc, "When a biller overrides an auto-edit, who accepts the rule — PM or ops?")
bullet(doc, "What does a good disagreement look like on this team?")
bullet(doc, "What would this PM own first — submission, rules/edits, denials, reporting, or onboarding?")
note(doc, "Do not ask about remote, culture-in-the-abstract, or “what’s the next round” as the first question. Process is fine as a closer.")

h1(doc, "Do / don’t")
bullet(doc, "Do: open with PIS. Two stories. Metrics in the first sentence. Talk about who you moved, not the feature list.")
bullet(doc, "Do: name the miss without blaming design, engineering, or “the business.”")
bullet(doc, "Don’t: four projects. Don’t dump Referral Radar. Don’t invent cost-per-claim or a TCR you do not own.")
bullet(doc, "Don’t: a 3-minute origin story. Don’t apologize for Canada. One clause, then parallel.")
bullet(doc, "Don’t: “I’m passionate about healthcare.” Don’t name WorkSafe individuals.")

out = r"c:\Users\khush\Desktop\kdodani-portfolio\Candid_Health_HoP_Behavioral_Playbook.docx"
doc.save(out)
print(f"Saved: {out}")
