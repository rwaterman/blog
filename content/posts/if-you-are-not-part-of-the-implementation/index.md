+++
title = "If You Are Not Part of the Implementation, You Are Part of the Problem"
date = 2024-05-14
draft = false
summary = "An architect who does not ship code has no feedback loop, and an architecture with no feedback loop is a guess with a diagram. Own a real piece of the build — the hard module, the infrastructure as code, the review queue — or accept that the team will route around you."
tags = ["architecture", "leadership", "engineering-culture", "infrastructure-as-code", "adr"]
categories = ["architecture"]
+++

{{< ai-disclosure >}}

The old line is "if you're not part of the solution, you're part of the problem." For software and cloud architects the version that matters is narrower: if you are not part of the implementation, you are part of the problem.

Not the whole implementation. Not the critical path. But a real, committed, reviewed piece of the system you designed, so that the consequences of your decisions land on you before they land on the team.

This is not a new idea. It is a twenty-year-old consensus that organizations keep failing to act on.

## The feedback loop is the job

Gregor Hohpe's [Architect Elevator](https://martinfowler.com/articles/architect-elevator.html) names the failure mode exactly: "A well-known architecture department anti-pattern is the 'ivory tower': architects sit in the penthouse to define how developers should design and build software, without developing any software themselves. Such a setup has one cardinal flaw: it doesn't provide feedback to the architects as to the effectiveness nor the cost of their decisions."

He goes further: "Worse yet: some architects quite enjoy themselves not having to deal with those consequences."

That is the uncomfortable part. An architecture role that never touches the build is comfortable precisely because nothing ever proves it wrong. The diagram was correct. The team must have implemented it badly. A design that cannot be falsified is not a design; it is a position.

Werner Vogels made the operations version of this argument for Amazon in [2006](https://aws.amazon.com/blogs/aws/acm_queue_inter): "The traditional model is that you take your software to the wall that separates development and operations, and throw it over and then forget about it. Not at Amazon. You build it, you run it." His reason was not ideology. "Giving developers operational responsibilities has greatly enhanced the quality of the services." The same mechanism applies one level up. You design it, you build part of it.

## Astronauts have been with us since 2001

Joel Spolsky described the pattern in [Don't Let Architecture Astronauts Scare You](https://www.joelonsoftware.com/2001/04/21/dont-let-architecture-astronauts-scare-you/): "When you go too far up, abstraction-wise, you run out of oxygen." And: "It's very hard to get them to write code or design programs, because they won't stop thinking about Architecture."

His 2008 [follow-up](https://www.joelonsoftware.com/2008/05/01/architecture-astronauts-take-over/) gives the tell: "The hallmark of an architecture astronaut is that they don't solve an actual problem… they solve something that appears to be the template of a lot of problems."

The modern astronaut does not write white papers about XML. They produce a reference architecture in a slide deck, a set of "guardrails" nobody can find in a repo, and a platform roadmap that assumes an engineering team that does not exist. The slide deck is not wrong. It is unfalsifiable, which is worse.

## Two kinds of architect

Martin Fowler's [Who Needs an Architect?](https://martinfowler.com/ieeeSoftware/whoNeedsArchitect.pdf) from 2003 splits the role in two.

*Architectus Reloadus* "is the person who makes all the important decisions. The architect does this because a single mind is needed to ensure a system's conceptual integrity, and perhaps because the architect doesn't think that the team members are sufficiently skilled to make those decisions."

*Architectus Oryzus* looks different: "In the morning, the architect programs with a developer, trying to harvest some common locking code. In the afternoon, the architect participates in a requirements session." Fowler's summary is that "the most noticeable part of the work is the intense collaboration," and he offers a better job title: "guide, as in mountaineering," someone who "is always there for the really tricky stuff."

His sharpest line is the one I keep coming back to: "an architect's value is inversely proportional to the number of decisions he or she makes." The hands-on architect is not the one who decides everything. It is the one who is close enough to the code to know which decisions actually matter, and takes the hardest one personally.

## The profession already agreed

Simon Brown, [2010](https://www.infoq.com/articles/brown-are-you-a-software-architect/): "an architect that codes is more effective and happier than an architect that watches from the sidelines." On the policy some organizations have of keeping architects out of code because they are too valuable: "why let your architects put all that effort into defining the architecture if you're not going to let them contribute to its successful delivery?"

Brown again, [2020](https://dev.to/simonbrown/the-software-architecture-role-is-about-coding-coaching-and-collaboration-4gp3): "Appreciating that you're going to be contributing to the coding activities often provides enough incentive to ensure that your designs are grounded in reality too."

Mark Richards and Neal Ford, in [Fundamentals of Software Architecture](https://www.thoughtworks.com/content/dam/thoughtworks/documents/books/bk_Fundamentals_of_Software_Architecture_Free_Chapter_en.pdf): "The most successful architects we know are those who have broad hands-on technical knowledge coupled with a strong knowledge of a particular domain." Their observation about decay is the consequence of losing that: "not enough architects focus their energies on continually analyzing existing architectures. As a result, most architectures experience elements of structural decay."

ThoughtWorks put [Coding architects](https://www.thoughtworks.com/radar/techniques/coding-architects) in the Adopt ring of the Technology Radar in August 2010 and kept it there through 2012. Adopt means "we feel strongly that the industry should be adopting these items." That was twelve years ago.

## Architecture is now literally code

The strongest reason to be part of the implementation in 2024 is that the architecture is no longer a document describing the system. It is a Terraform module or a CDK stack in a repository, and it is the system.

The VPC topology, the IAM boundaries, the queue retry policies, the Lambda concurrency limits, the Aurora failover configuration: none of that lives in a diagram anymore except as a lagging, usually stale, illustration of what the IaC says. If the architect cannot open a pull request against the infrastructure repository, the architect does not own the architecture. Someone else does, and that someone will eventually stop asking.

Michael Nygard's [Architecture Decision Records](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) belong in the same place: "We will keep ADRs in the project repository under doc/arch/adr-NNN.md." Without the rationale next to the code, he notes, a later engineer can only "blindly accept the decision" or "blindly change it." An architect who writes ADRs into the repo, and whose IaC commits reference them, is part of the implementation in the most durable way possible.

## What "part of the implementation" means in practice

It does not mean taking the critical-path feature. Richards and Ford call that the bottleneck trap, and they are right: an architect who owns the one module everyone is waiting on stalls the team and stops doing the rest of the job.

It means something like this:

- **Own the infrastructure as code.** Write the first version of the CDK stack or Terraform module yourself. Review every change to it. This is the piece of the build that most directly encodes your decisions.
- **Take the hard module, not the big one.** The idempotency layer, the outbox pattern, the event schema versioning, the authorizer. Small in lines, large in consequence. Fowler's "really tricky stuff."
- **Build the proof of concept before the decision, not after.** If the ADR says Step Functions over a custom orchestrator, the ADR should link to a working state machine you deployed.
- **Sit in the review queue.** Not as a gate. As the person who reads the most pull requests on the team, because that is where you find out what the architecture actually costs.
- **Carry a pager for what you designed.** You build it, you run it.

Two or three of those, consistently, is enough. Zero of them is the problem.

## Honest counterpoints

**Breadth versus depth.** Richards and Ford argue architects should "focus on technical breadth rather than technical depth." That is correct, and deep ownership of one module can trade away breadth. The resolution is to choose implementation work that forces breadth: IaC touches every service; the review queue touches every module.

**The penthouse is also the job.** Hohpe's elevator goes both directions. An architect who only lives in the engine room fails to connect strategy to delivery. Brown concedes that being hands-on "doesn't necessarily mean that you have to get involved in the day-to-day coding tasks," and some weeks there is no time. The point is engagement over time, not a daily line count.

**Scale.** Past a certain organization size, one person cannot commit to every repository. The answer is not to stop, but to pick the repository whose decisions are hardest to reverse. Fowler's definition of architecture is "things that people perceive as hard to change." Go implement in the place that is hardest to change.

## The test

Ask any architect one question: what did you merge last month?

If the answer is a diagram, the organization has an astronaut. If the answer is a Terraform module, an ADR, a proof of concept, and a stack of reviewed pull requests, it has a guide.

The architecture will reflect which one it got.
