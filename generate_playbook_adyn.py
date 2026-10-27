"""Generate adyn Product Experience interview playbook (Word)."""
from playbook_docx_lib import (
    new_doc, rule, title_block, h1, h2, h3, body, bullet, labeled, say, note,
)

doc = new_doc()
title_block(
    doc,
    "Khushboo Dodani  ·  interview playbook",
    "adyn — Product Experience",
    "Application is by email. The loop below is INFERRED from a 7-person Seattle startup (YC S20) hiring a founding-style product leader. Locked numbers match the adyn resume and your case studies.",
)

# ── HOW TO USE ────────────────────────────────────────────────────────────────
h1(doc, "How to use this")
body(doc, "Goal for the first conversation: show you are a rigorous, curious, mission-led product person who can run discovery and ship at startup speed, without pretending to be a consumer-health or genetics expert.")
bullet(doc, "Answer structure: Bottom line → Context → Decision → System + metric → Tradeoff → Stop. 60–90 seconds unless they go deeper.")
bullet(doc, "Open with discovery, experiments, and decisions on evidence. That maps to their first-month and first-year list almost line for line.")
bullet(doc, "Do not claim consumer, DTC, genetics, or women's health experience you do not have. Say what transfers and how fast you will close the gap.")
bullet(doc, "Do not cite the $20M Referral Radar figure (unvalidated) or the $1.2M funding figure (untraceable). Use $580K and $80K.")

h2(doc, "Locked numbers")
bullet(doc, "Submission journey 11 steps → 5. Digital adoption 60% in six months. ~$200K annual operational savings. Support calls −30%. NPS +25.")
bullet(doc, "139,380 treatment-extension requests analyzed; 79% always approved; rejected auto-approve; $80M physio spend; aging data deprioritized a ping feature.")
bullet(doc, "25 of 3,795 orgs = 50% of remaining paper. Paper 56%→19%. Portal 39%→55%. $580K funded. Dark → soft → hard launch.")
bullet(doc, "Month-one adoption near zero after launch (users missed the duplicate-line icon) → observed behavior, fixed discoverability, segmented launch messaging.")
bullet(doc, "OSCAR EMR: 15 physician interviews, ~50 EMR vendors in outreach, OSCAR beachhead before paid vendors, $80K POC, roadmap ~70% of provider ecosystem.")
bullet(doc, "CIAM: 5,600 providers / 500+ orgs, 0% downtime, 85% migrated before deadline, 92% login success.")
bullet(doc, "Referral Radar: two weeks, LLM over 20–75 documents/case, humans decide, 2nd of 36 at InnoFest 2025. Prototyping with Lovable/Cursor cut concept-to-validation ~40%.")
bullet(doc, "Technical Safety BC: 11.7% churn, RFM retained 78% of high-risk customers, NLP inbox routing. ProductCamp BC speaker 2025, ProductBC mentor.")
note(doc, "Timeline flag: your OSCAR case study dates the 15 physician interviews to Aug 2022, but the resume lists WorkSafeBC from Apr 2024. Decide how you describe that before anyone asks.")

# ── PROBABLE LOOP ─────────────────────────────────────────────────────────────
h1(doc, "Probable loop (INFERRED)")
note(doc, "adyn lists a team size of 7 and hires by email. Expect few rounds, all senior, and the CEO (Dr. Elizabeth Ruzzo) early. Ask in the first reply what the process looks like.")
bullet(doc, "Round 1 — Founder / CEO conversation, 30–45 min. Mission fit, values, why you, scientific curiosity, working style.")
bullet(doc, "Round 2 — Product and UX exercise (live or take-home). Likely a consumer-health UX critique or concept, which your teardown previews.")
bullet(doc, "Round 3 — Cross-functional chats with engineering, bioinformatics, design, customer success, marketing.")
bullet(doc, "Throughout — values screen (six values) and work authorization / start date.")

h2(doc, "What they are screening for (from the posting)")
bullet(doc, "PM with technical dependencies, Agile/Scrum, data-driven thinking, launch plans.")
bullet(doc, "Consensus-building in a fast startup. Unbiased user feedback. Storytelling. Healthcare is a plus, not required.")
bullet(doc, "Leadership: shaping the product experience function and eventually hiring.")

# ── DOMAIN PRIMER ─────────────────────────────────────────────────────────────
h1(doc, "Domain primer (so you sound curious, not faking)")
bullet(doc, "Product: The Birth Control Test, $369, saliva for DNA + finger-prick blood for six hormones (AMH, DHEA-S, SHBG, E2, FSH, LH), processed at CLIA-certified labs. Report covers all highly effective methods: pill, minipill, hormonal and copper IUD, patch, ring, shot, implant. Includes a 25-minute virtual visit. No insurance; HSA/FSA accepted. Not available in NY, NJ, RI.")
bullet(doc, "Journey: kit in 2-7 days → hormone sample on cycle day 3 → results in 2-6 weeks (average 3) → book visit → prescription, optional mail-order pharmacy → retest over time.")
bullet(doc, "Claim: genetic risk for blood clots and depression plus hormone levels, combined with preferences, to reduce side-effect risk. Their stated basis is 50+ peer-reviewed studies.")
bullet(doc, "General background you can safely say: estrogen-containing methods carry higher clot risk than progestin-only or copper options, and some inherited variants raise baseline risk. Do not claim anything about adyn's specific panel or accuracy.")
bullet(doc, "Honest tension: public skeptics ask whether genetics predict formulation-specific side effects. As a PM, this means the experience must be transparent about evidence strength. Say that, do not defend or attack the science.")
bullet(doc, "Founder story: Dr. Ruzzo, PhD in human genetics, had severe depression on the pill and was dismissed by a doctor. The mission is closing the medical research gender gap and making discovery more inclusive.")

# ── ROUND 1 ───────────────────────────────────────────────────────────────────
h1(doc, "Conversation 1 — Founder / mission fit")

h3(doc, "Q. Tell me about yourself / why adyn?")
say(doc, [
    ("Bottom line", "I'm a PM who runs discovery on evidence and ships in regulated healthcare. adyn's promise, ending trial and error, is a product experience problem as much as a science problem."),
    ("Context", "Four-plus years PM at WorkSafeBC and Technical Safety BC. Providers and clinicians use what I build under stress, where trust and data quality matter."),
    ("Decision", "I want to own the experience layer for a product that turns biology into a decision. That means research, experiments, launch, and partners."),
    ("System + metric", "11 steps to 5, support calls −30%, NPS +25, and a PostHog loop before launch. I use the same loop on every release."),
    ("Tradeoff", "I haven't built a consumer product or worked in genetics. I'd close that gap by talking to users and your scientists in my first weeks."),
    ("Stop", "The mission, closing research gaps through better care, is why I applied."),
], "75s")

h3(doc, "Q. Tell me how you exemplify one of our values (they will probe your email)")
say(doc, [
    ("Bottom line", "Powered by data: I let the evidence overrule the consensus when they conflict."),
    ("Context", "Senior stakeholders wanted to auto-approve treatment extensions because 79% of 139,380 requests were always approved, on an $80M spend category."),
    ("Decision", "I argued a high approval rate can mean review is rushed, not unnecessary. We rejected auto-approve and designed to improve case-manager review."),
    ("System + metric", "I pair that analysis with interviews and usability studies. Aging data also let us drop a feature nobody needed."),
    ("Tradeoff", "We accepted slower processing for stronger oversight. Data told us what the number did not mean."),
    ("Stop", "I'd apply the same skepticism to our own product metrics at adyn."),
], "60–75s")

h3(doc, "Q. You don't have consumer or women's-health experience. How will you get up to speed?")
say(doc, [
    ("Bottom line", "My users have been professionals in regulated systems, not consumers. The method transfers, the context doesn't, so I'll close that quickly."),
    ("Context", "Discovery with providers, usability testing, and journey mapping at WorkSafeBC. At adyn it will be customers making a personal decision."),
    ("Decision", "In the first month I'd study the journey, interview customers and your provider team, and run the competitive teardown the role asks for."),
    ("System + metric", "I already prepared a one-page teardown from public info, with three hypotheses and proposed KPIs."),
    ("Tradeoff", "I'd rather admit the gap and move fast than pretend to know your customers."),
    ("Stop", "Happy to walk you through it."),
], "60s")

# ── STAR STORIES ──────────────────────────────────────────────────────────────
h1(doc, "Core stories mapped to the posting")

h2(doc, "1. Discovery and unbiased feedback")
bullet(doc, "Story: provider surveys came from physiotherapists but office admins use the tool. Redirected research to the real users.")
bullet(doc, "Also: 15 physician interviews showed GPs will not leave their EMR, so strategy moved from a side portal to in-workflow integration.")
bullet(doc, "Lands on: 'collect unbiased high-quality user feedback and apply it'.")

h2(doc, "2. Experimentation and learning from a miss")
bullet(doc, "Story: launch showed almost no adoption in month one despite 11→5 screens. Users missed a key icon. Observed behavior, fixed discoverability, segmented messaging.")
bullet(doc, "Lessons: launch is the beginning; segment GTM from day one. You said what you would do differently, which is the point.")
bullet(doc, "Lands on: 'conduct experiments and user testing', 'driving go-to-market/launch plans'.")

h2(doc, "3. Launch plan and metrics")
bullet(doc, "Story: Pareto analysis, named-cohort dark/soft/hard launch, PostHog before launch, paper 56%→19%, portal 39%→55%.")
bullet(doc, "Lands on: 'define metrics and KPIs and track them', 'set commercial targets'.")

h2(doc, "4. Partnerships and vendors")
bullet(doc, "Story: OSCAR beachhead before paid EMR vendors (lower integration risk, faster proof), ~50 vendors in outreach, $80K POC, ~70% ecosystem roadmap.")
bullet(doc, "Map to adyn: telemedicine and pharmacy delivery partners. Same questions: integration cost, reach, risk, pilot design, success metrics.")

h2(doc, "5. Prototyping and speed")
bullet(doc, "Story: Referral Radar in two weeks; Lovable/Cursor/Figma prototypes cut concept-to-validation ~40%; humans decide, AI retrieves.")
bullet(doc, "Lands on: 'create UX prototypes and supporting concept materials' in month one.")

h2(doc, "6. Consensus and storytelling")
bullet(doc, "Story: socialized 'Death to PDFs' at InnoFest; did not win, but momentum produced $80K funding. Also ProductCamp BC speaker.")
bullet(doc, "Lands on: 'build consensus in a fast startup', 'inspire through storytelling'.")

# ── HARD QUESTIONS ────────────────────────────────────────────────────────────
h1(doc, "Hard questions")

h3(doc, "Q. Are you authorized to work in the US? Do you need sponsorship?")
body(doc, "Decide your honest answer before the first call. The posting says US citizen/visa only, and a small startup will ask early. Answer in one sentence, then redirect to timeline and start date. Do not improvise.")

h3(doc, "Q. Some people doubt that genetics can predict birth control side effects. What do you think?")
say(doc, [
    ("Bottom line", "I'm a product person, not a geneticist, and I'd defer to your scientists on the science. My job is to make the evidence legible."),
    ("Context", "Trust is the conversion lever for a genetics-based claim."),
    ("Decision", "I'd show what we know, how strong it is, and what is still uncertain, in plain language with references."),
    ("System + metric", "Measure it: report-to-visit conversion, patient confidence, and side-effect-driven method switches at 3 and 6 months."),
    ("Tradeoff", "More transparency can lower short-term conversion, but it protects trust and clinical credibility."),
    ("Stop", "I'd want to learn from your bioinformatician how best to express evidence strength."),
], "60s")

h3(doc, "Q. How would you prioritize with a team of seven?")
say(doc, [
    ("Bottom line", "Pick the one constraint on the core journey and test it before building."),
    ("Context", "Same as invoicing: 25 organizations drove half the problem, so we targeted them instead of everyone."),
    ("Decision", "Rank by impact on the journey metric, evidence strength, and effort. Cheap tests first."),
    ("System + metric", "For adyn, I'd start with purchase-to-valid-sample and report-to-visit conversion."),
    ("Tradeoff", "Say no to good ideas. A seven-person team can run two bets at a time."),
    ("Stop", "Review weekly against the data."),
], "60s")

h3(doc, "Q. Tell me about a time you were wrong.")
body(doc, "Use the month-one adoption story. You shipped a better product and nobody noticed. You did not blame users; you watched them. Segmented GTM from day one is what you would do differently.")

# ── 30 / 60 / 90 ──────────────────────────────────────────────────────────────
h1(doc, "30 / 60 / 90 plan (mirrors the posting)")
h2(doc, "First 30 days")
bullet(doc, "Learn the science, product, and GTM. Shadow provider visits and support. Audit the current journey end to end.")
bullet(doc, "Present a competitive UX analysis of consumer digital health (Nurx, Hers, Natural Cycles, others).")
bullet(doc, "Agree on priorities with the team. Prototype two concepts (for example Results Home and a while-you-wait tracker).")
h2(doc, "Days 31-90")
bullet(doc, "Evaluate telemedicine and pharmacy delivery partners; design a pilot with clinical and experiential success metrics.")
bullet(doc, "Define the KPI set across clinical, engagement, and business; instrument it; review weekly.")
bullet(doc, "Run first usability sessions and one A/B test on results layout. Set quarterly targets.")
h2(doc, "Year one")
bullet(doc, "Run a continuous experiment loop; reduce time to first value; build the retest and longitudinal relationship.")
bullet(doc, "Document operating procedures as the team scales and identify the first product-experience hires.")

# ── QUESTIONS TO ASK ──────────────────────────────────────────────────────────
h1(doc, "Questions to ask them")
bullet(doc, "Where does the journey lose the most customers today, and how do you know?")
bullet(doc, "How do you decide when evidence is strong enough to put in the report?")
bullet(doc, "What does a good first 90 days look like to you, and what would make you say 'wrong hire'?")
bullet(doc, "Who owns the provider relationship today, and how are telemedicine and pharmacy partners evaluated?")
bullet(doc, "How do you think about retesting and the long-term relationship versus the one-time test?")
bullet(doc, "What is the process from here, and what is the timeline?")
rule(doc)
body(doc, "Keep the teardown for when they ask what you would do. Send it as a follow-up if they don't.", italic=True, size=9)

out = r"c:\Users\khush\Desktop\kdodani-portfolio\adyn_Product_Experience_Interview_Playbook.docx"
doc.save(out)
print("Saved:", out)
