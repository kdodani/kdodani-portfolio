"""Generate Meta-style PM interview playbook (Word), practiced on Khushboo's stories."""
from playbook_docx_lib import (
    new_doc, rule, title_block, h1, h2, h3, body, bullet, labeled, say, note,
)

doc = new_doc()
title_block(
    doc,
    "Khushboo Dodani  ·  interview playbook",
    "Meta-style Product Management",
    "Use this rigor on Candid’s hiring-manager and case rounds. Frameworks from the standard Meta PM loop (Product Sense, Analytical/Execution, Leadership & Drive). Answers are yours, not Facebook scale theater.",
)

h1(doc, "Why this exists")
body(doc, "Meta’s PM loop is the most standardized high-bar product interview in tech. Candid will not ask you to redesign Instagram. They will still punish unstructured answers. Practice here, then translate to billing.")
bullet(doc, "Loop (typical): recruiter → two 45-min screens (Product Sense + Analytical) → onsite/loop (Sense + Analytical/Execution + Leadership & Drive). AI product-sense exists for some Meta AI PM tracks; skip it unless Candid asks you to prototype live.")
bullet(doc, "Each 45-min: ~5 min intro, ~35 min core prompt + follow-ups, ~5 min your questions.")
bullet(doc, "Same spoken structure as the Candid playbook: Bottom line → Context → Decision → System + metric → Tradeoff → Stop.")
bullet(doc, "Locked metrics only: invalid −40%; 3.7M lines; 25/3,795 orgs; 200–1,900 lines/month; 11→5; paper 56%→19%; ~280K; 322K lines/year; ~$50K; $580K; $80M / 139K / 79%; OSCAR $80K / ~70%; CIAM 5,600 / 0 downtime.")

h1(doc, "The three scores")
labeled(doc, "Product Sense", "Can you turn an ambiguous problem into a user, a goal, a few solutions, a pick, an MVP, and metrics — and defend tradeoffs when they change the constraint?")
labeled(doc, "Analytical / Execution", "Can you set a north star, guardrails, diagnose a drop, prioritize with incomplete data, and not optimize a vanity metric?")
labeled(doc, "Leadership & Drive", "Do you own outcomes, disagree without drama, tell a real miss, and keep moving? Stories, not values posters.")

# ── PRODUCT SENSE ─────────────────────────────────────────────────────────────
h1(doc, "Product Sense")
h2(doc, "Clock (45 min)")
bullet(doc, "0–3 clarify: user, platform, success, constraints. Ask 3–5 questions. Do not skip this.")
bullet(doc, "3–8 mission/goal: one sentence. Then users: 2–3 segments, pick one with a reason.")
bullet(doc, "8–14 problems: 2–3 pain points for that segment. Rank. Pick one.")
bullet(doc, "14–25 solutions: always 2–3 distinct bets, then pick. MVP vs later.")
bullet(doc, "25–32 metrics + rollout + risks.")
bullet(doc, "32–40 follow-ups (they will move the metric or geography). Adapt; do not defend a dead plan.")
bullet(doc, "40–45 your questions.")

h2(doc, "Framework — say it out loud so they can follow")
body(doc, "I will (1) clarify, (2) pick a user and a goal, (3) name the problem, (4) give two or three solutions and pick one, (5) define MVP and metrics, (6) name the risk. Stop me if you want a different user.")

h2(doc, "Habits that pass")
bullet(doc, "Segments are jobs-to-be-done, not demographics. “High-volume biller at 1,900 lines/month” beats “healthcare providers.”")
bullet(doc, "Do not jump to UI. Problem first.")
bullet(doc, "Pick. Meta (and good PMs) hate a 2x2 with no decision.")
bullet(doc, "When they say “MAU is down but revenue is up,” change the goal; do not ignore it.")

h2(doc, "Drill 1 — Candid-shaped (practice this until it is muscle)")
h3(doc, "Prompt: Design a product to help a clinic get paid faster.")
body(doc, "Clarify: Clinic size? Already on an EHR? Are they on Candid today or greenfield? “Get paid faster” — days in A/R, denial rate, or staff hours? I will assume a 40-clinician group, live on an EHR, live on Candid, pain is too many claims still need a human before submit.")
labeled(doc, "User I pick", "In-house biller / office manager. Clinicians are upstream data sources, not the daily user. Candid ops is a secondary user on exceptions.")
labeled(doc, "Goal", "Raise touchless / first-pass rate this quarter without increasing false rejects.")
labeled(doc, "Problems", "(A) Wrong or missing data at submit vs payer/fee-schedule rules. (B) Eligibility/enrollment gaps. (C) Exception queue is unprioritized. I pick A — highest volume × dollars × in-product fix. Matches Candid’s thesis.")
labeled(doc, "Solutions", "(1) Pre-submit validation: fail the field against rules/fee schedule. (2) Chart-to-claim missing-field prompts in the EHR. (3) Smarter human queue. I pick 1 as MVP; 2 if data is not enterable; 3 is cleanup and I deprioritize it.")
labeled(doc, "MVP", "Top N fail reasons by dollars for this group. Field-level fail + reason. Override with reason code. Logging for the rules team.")
labeled(doc, "Metrics", "North star: touchless rate. Guardrails: false-positive block rate, denial rate post-submit, time-to-pay, biller minutes per claim.")
labeled(doc, "Rollout", "One specialty or one payer family. Dark flags for Candid ops → one clinic → group. Do not big-bang payments.")
labeled(doc, "Your analog", "I shipped this motion: fee schedules and service codes in-product, invalid submissions −40%, 3.7M lines to find the cohort, 322K existing lines not disrupted.")
note(doc, "If they push “why not generative appeals?”: because that is denial remediation. The company is not in the cleanup business. I would only do appeals after first-pass is saturated.")

h2(doc, "Drill 2 — Classic Meta: Improve Facebook Groups")
body(doc, "Clarify: consumer or admin? Which country? Success = engagement, trust, or creator viability? Assume consumer, US, goal = meaningful participation (posts that get a reply), not just DAU.")
labeled(doc, "Users", "Casual members, power posters, admins. I pick casual members who lurk — largest, leaky.")
labeled(doc, "Problem", "They do not know what is safe/useful to post, so they never convert lurk → first post.")
labeled(doc, "Solutions", "(1) Prompted first-post based on last 3 threads they read. (2) Admin-set “starter” prompts. (3) Better notifications. I pick 1.")
labeled(doc, "MVP", "One group type (neighborhood or school). Suggested post, one tap, admin can disable.")
labeled(doc, "Metrics", "North star: % members with a post that received a reply in 7 days. Guardrails: spam rate, admin remove rate, time in app (don’t juice).")
labeled(doc, "Follow-up if “engagement up, time spent down”", "If replies are up and time is down, we may be more efficient. I would not revert unless north star and trust drop. I check spam and unfollows before celebrating.")

h2(doc, "Drill 3 — Design a parking product for Maps")
body(doc, "Clarify: drivers, cities, garage partners, or all? Monetize? Assume consumer drivers in dense US cities, goal = reduce time-to-park and failed arrival.")
labeled(doc, "User", "Driver approaching destination in 10 minutes, unpaid street + garage mix.")
labeled(doc, "Problem", "Uncertainty: is there a spot, legal, how far walk, how much.")
labeled(doc, "Pick", "Live availability + walk-time + price for the last mile, starting with partner garages (data exists) before crowd-sourced street (cold start).")
labeled(doc, "Metrics", "Time from “5 min away” to parked; % reroutes; partner fill rate. Guardrail: driver distraction / safety.")
note(doc, "Translation for Candid interviews: always prefer the segment where data already exists (garages = payer rules you already encoded) over the romantic cold-start (street spots = greenfield ML).")

h2(doc, "Follow-ups — how to recover")
bullet(doc, "“It’s working in NY, not in the region.” Re-segment. Density, payer mix, EHR mix, staffing. Do not ship the same MVP harder.")
bullet(doc, "“How would you monetize?” For Candid: take-rate / PMPM on additional touchless, not ads. For Meta: ads or commerce only after the user goal is real.")
bullet(doc, "“Mission?” One sentence, then back to the user. Do not speech.")

# ── ANALYTICAL ────────────────────────────────────────────────────────────────
h1(doc, "Analytical / Execution")
h2(doc, "Clock")
bullet(doc, "Clarify the product and the decision you are being asked to make.")
bullet(doc, "Goal → actions → metrics (north star + input metrics + guardrails) → evaluation / diagnosis.")
bullet(doc, "If they give you a drop: tree the causes before naming a fix. Volume first.")

h2(doc, "GAME (say it)")
labeled(doc, "G", "Goal for the business and the user, in one line.")
labeled(doc, "A", "The user actions in the funnel (for claims: chart close → claim build → validate → submit → payer → remit).")
labeled(doc, "M", "North star, 3–5 inputs, 2 guardrails. Define the formula.")
labeled(doc, "E", "How you know you were wrong in two weeks. Experiment, holdout, or named cohort.")

h2(doc, "Drill 1 — North star for Candid")
h3(doc, "Prompt: You are the PM for claim submission. What is the north star?")
say(doc, [
    ("Bottom line", "Touchless claim rate: share of claims that are submitted, processed, and adjudicated correctly with no human in the loop."),
    ("Context", "If we optimize speed of submit, we will ship garbage. If we optimize appeals won, we are in cleanup."),
    ("Decision", "North star = touchless. Inputs: pre-submit fail rate (good up to a point), first-pass payer accept, time-to-pay, % claims with a rule-hit that auto-corrected."),
    ("System + metric", "Guardrails: false-positive blocks, days in A/R, impl time per new customer, $ collected vs billed."),
    ("Tradeoff", "I would not use NPS as north star. I would not use “edits applied” if edits are noisy."),
    ("Stop", "My analog: invalid submissions −40% was the first-pass proxy I could own without a US clearinghouse."),
], "70s")

h2(doc, "Drill 2 — Diagnose a drop")
h3(doc, "Prompt: Invalid submissions jumped 20% week over week after a launch. What do you do?")
body(doc, "I will not ship a revert until I know which slice moved.")
bullet(doc, "Confirm the metric: definition of invalid, timezone, bot/test claims, volume mix.")
bullet(doc, "Segment: customer, payer, specialty, claim type, new vs existing users, platform (API vs UI), the feature flag cohort.")
bullet(doc, "Funnel: build → validate → submit. Did validate fail more, or did submit mix shift to dirtier claims?")
bullet(doc, "Change log: rules, fee schedule load, EHR mapping, a customer going live, a holiday.")
bullet(doc, "My analog: after v2, volume did not move because discoverability failed — not because validation was wrong. I would look at “attempted duplicate-line” vs “used it.”")
bullet(doc, "Decision: if a new rule false-positives on one payer, kill that rule for that payer. If mix shifted to a new high-volume customer, that is a ramp, not a regression.")
bullet(doc, "Stop: I do not “add training.” I change the system or the flag.")

h2(doc, "Drill 3 — Metric tradeoff")
h3(doc, "Prompt: Pre-submit blocks are up 30% and touchless is up 5%. Good or bad?")
say(doc, [
    ("Bottom line", "Maybe good. Blocks can be working if they are true fails. I need false-positive rate and dollars collected."),
    ("Context", "We wanted errors to fail at submit, not in ops. Block rate going up is the mechanism."),
    ("Decision", "Split blocks: true ineligible vs false. If false-positives are stable and time-to-pay and $ collected are up, I keep it. If billers override 80% of blocks, the rules are noisy — I roll back that family."),
    ("System + metric", "Same as encoding fee schedules: invalid −40% was a win only because ops cleanup fell, not because we annoyed submitters."),
    ("Tradeoff", "I will not celebrate a block-rate trophy."),
    ("Stop", ""),
], "50s")

h2(doc, "Drill 4 — Prioritize three bets (execution)")
h3(doc, "Prompt: You have one squad. Pick: homepage redesign, payer X rule pack, customer dashboard.")
say(doc, [
    ("Bottom line", "Payer X rule pack first if X is material volume. Dashboard second. Homepage kill."),
    ("Context", "Unit economics: rule pack moves first-pass on a slice of dollars. Dashboard makes the PM and customer accountable (JD). Homepage does not."),
    ("Decision", "Impact × confidence × time. Rule pack: high/high/medium. Dashboard: medium/high/small. Homepage: low/low/never."),
    ("System + metric", "I would attach a target: +N points touchless on payer X in 60 days, or we stop."),
    ("Tradeoff", "Sales may want the homepage. I will show them the dollar funnel instead of a fight."),
    ("Stop", "My analog: I built for 25 orgs that were 50% of paper, not a nicer portal for 3,795."),
], "55s")

h2(doc, "Drill 5 — Classic Meta: Notifications north star")
body(doc, "Goal: bring people back to meaningful activity, not tap-through. North star: % users who take a meaningful action within T minutes of a notification (reply, not just open). Guardrails: disable rate, session quality, time-to-first-hide. If open rate is up and north star is down, we are spam. Kill the copy, not “more sends.”")

# ── LEADERSHIP ────────────────────────────────────────────────────────────────
h1(doc, "Leadership & Drive")
body(doc, "45 min, 3–4 stories. They want ownership, conflict, a miss, and whether you are low-ego high-output. Lead with the metric. Do not editorialize your personality.")

h2(doc, "Story 1 — Proud")
h3(doc, "Q. Product you are most proud of")
say(doc, [
    ("Bottom line", "Invoicing v2: first-pass and throughput on a live payments path."),
    ("Context", "High-volume providers stuck on paper. Product had PMF for small clinics and a structural ceiling."),
    ("Decision", "3.7M-line Pareto, rebuild for 200–1,900 lines/month, validation in-product, named-cohort launch."),
    ("System + metric", "Invalid −40%. 280K lines. Paper 56%→19%. ~$50K cost-to-process. $580K. 322K lines not broken."),
    ("Tradeoff", "I optimized the tail that created the cost, not the average user."),
    ("Stop", ""),
], "60s")

h2(doc, "Story 2 — Disagree and commit / said no")
h3(doc, "Q. Time you pushed back")
say(doc, [
    ("Bottom line", "I blocked auto-approve on an $80M extension workflow."),
    ("Context", "79% of 139K historical extensions always approved. Automation looked free."),
    ("Decision", "Digitize and validate. Keep a human on authorization."),
    ("System + metric", "139K rows as the argument, not preference."),
    ("Tradeoff", "Cycle time. I will not unsupervised-spend $80M for a demo."),
    ("Stop", "Same rule I would use if someone wanted autonomous claim edits with no override."),
], "50s")

h2(doc, "Story 3 — Miss")
h3(doc, "Q. Tell me about a failure")
say(doc, [
    ("Bottom line", "We shipped the capacity. We did not ship discoverability. First month of the target cohort was basically flat."),
    ("Context", "11→5 and multi-claim were real. Duplicate-line was invisible."),
    ("Decision", "Treat PostHog as the source of truth. Fix the affordance and onboarding. Do not blame users."),
    ("System + metric", "Launch ≠ adoption. I now include “can a named user complete the new path unassisted” in done."),
    ("Tradeoff", "I was overconfident that architecture is the product."),
    ("Stop", ""),
], "50s")

h2(doc, "Story 4 — Ambiguity / unblock")
h3(doc, "Q. Time you had to move without perfect data")
say(doc, [
    ("Bottom line", "Production claim data was blocked for Referral Radar. I shipped a synthetic-data path so the sprint did not die."),
    ("Context", "LLM over 20–75 documents/case. Could not wait on a data-use argument."),
    ("Decision", "Synthetic set, validated with case managers. Humans still decide. AI retrieves."),
    ("System + metric", "Unblocked learning. InnoFest 2nd. Not a production claims auto-adjudicator."),
    ("Tradeoff", "Synthetic ≠ production distribution. I would not have claimed clinical accuracy."),
    ("Stop", ""),
], "45s")

h2(doc, "Story 5 — Stakeholder / change")
h3(doc, "Q. Time you had to bring people with you")
say(doc, [
    ("Bottom line", "CIAM migration: 5,600 professionals, 500 orgs, 0 downtime, deadline."),
    ("Context", "Identity is not a feature. It is the lock on 62k referrals/year."),
    ("Decision", "Admin-led rollout, multi-channel comms, helpdesk enablement. Engineering + ops + comms as one plan."),
    ("System + metric", "0 downtime. 100% of active accounts on deadline."),
    ("Tradeoff", "I optimized for no outage, not a clever UX story."),
    ("Stop", ""),
], "45s")

h2(doc, "Story 6 — Working with engineers")
h3(doc, "Q. How do you lead without authority?")
say(doc, [
    ("Bottom line", "I bring volume and failure modes. I do not bring rank."),
    ("Context", "Eligibility API: product needed fail-closed. Engineering owned the contract."),
    ("Decision", "Write invalid states. Sit in design. Cut scope that is not the data contract."),
    ("System + metric", "Ineligible services never queued for ops."),
    ("Tradeoff", "I lose aesthetic arguments on purpose."),
    ("Stop", ""),
], "40s")

# ── CROSSWALK ─────────────────────────────────────────────────────────────────
h1(doc, "Candid round → Meta muscle")
labeled(doc, "Recruiter", "Leadership & Drive lite + a 75s product walk. Do not run a full Sense case on the phone.")
labeled(doc, "Hiring manager", "Proud story + miss + how you prioritize (Execution) + 90-day ramp.")
labeled(doc, "Case", "Full Product Sense + GAME metrics, on touchless/first-pass. Drill 1 in this doc.")
labeled(doc, "Engineering", "Execution + data contracts. Eligibility API story. No LeetCode.")
labeled(doc, "Founder", "Drive + why this problem. Short. They will test intensity and whether you get the thesis.")

h1(doc, "Practice plan (90 minutes)")
bullet(doc, "2× out loud: Tell me about yourself (Candid playbook) + proud product. Record your phone. Cut anything after 90s.")
bullet(doc, "1× Drill 1 Product Sense (clinic get paid) with a timer. Force two discarded solutions.")
bullet(doc, "1× Diagnose the 20% invalid jump. Draw the tree on paper.")
bullet(doc, "1× Miss story. If you sound defensive, rewrite the last two sentences.")
bullet(doc, "List three questions for the recruiter. Stop.")

h1(doc, "Phrases to kill")
bullet(doc, "“I’m passionate about healthcare.” → “I encode billing rules so invalid claims fail at submit.”")
bullet(doc, "“We aligned stakeholders.” → name the decision and who lost.")
bullet(doc, "“We should A/B test it” with no metric or unit.")
bullet(doc, "“Users want a simple, intuitive experience.” That is not a problem statement.")
bullet(doc, "“Cost per claim was $X” — you do not have that number. Say cost-to-process ~$50K and invalid −40%.")

out = r"c:\Users\khush\Desktop\kdodani-portfolio\Meta_Style_PM_Interview_Playbook.docx"
doc.save(out)
print(f"Saved: {out}")
