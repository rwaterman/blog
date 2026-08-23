+++
title = "Boring Managed Services Win"
date = 2023-12-04
draft = false
summary = "Every queue, scheduler, or database you run yourself spends an innovation token on something your customers will never notice. Managed AWS services are boring in the best sense: their failure modes are documented, their metrics ship by default, and the toil they remove is the toil nobody measures."
tags = ["aws", "serverless", "architecture", "managed-services", "operations", "cost"]
categories = ["architecture"]
ai_model = "Claude Fable 5 (Anthropic)"
+++

{{< ai-disclosure >}}

Most infrastructure decisions are not about capability. They are about who carries the pager.

When a team runs its own queue, its own job scheduler, its own Postgres, or its own orchestration layer, it is not buying flexibility. It is buying an operations job that nobody on the team applied for, and it is paying for that job with the hours that were supposed to go into the product. The managed alternative on AWS — SQS, Step Functions, EventBridge Scheduler, Aurora, DynamoDB, Lambda — is usually less interesting and usually the right call.

That is the whole argument. The rest of this post is the evidence.

## Innovation tokens are an infrastructure budget

Dan McKinley's [Choose Boring Technology](https://boringtechnology.club/) gives the clearest framing. "Let's say that we all get a limited number of innovation tokens to spend," he writes. "These represent our limited capacity to do something creative, or weird, or hard." Spend them on the problem that makes your company different. Do not spend them on a message broker.

McKinley's definition of boring is the useful part. Boring does not mean good. "It's boring in the sense that it's well understood. It's bad, but you know why it's bad. You can list all of the main ways it will let you down." That sentence describes SQS perfectly. Everyone knows the visibility timeout gotchas, the at-least-once delivery, the 256 KB message cap. Nobody can list the failure modes of the custom job runner a contractor wrote in 2019, because nobody has read it since.

"Adding the technology is easy," McKinley says. "Living with it is hard." Managed services move the living-with-it onto someone whose entire business is living with it.

## AWS says the same thing in its own vocabulary

This is not a contrarian position. It is a literal design principle in the [Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-design-principles.html), Operational Excellence pillar: "Use managed services: Reduce operational burden by using AWS managed services where possible. Build operational procedures around interactions with those services."

The [Cost Optimization pillar](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/design-principles.html) repeats it from the other direction: "Stop spending money on undifferentiated heavy lifting." Werner Vogels has been using that phrase since the mid-2000s; the canonical written version is his [2014 Lambda announcement](https://www.allthingsdistributed.com/2014/11/aws-lambda.html), where he describes what customers do not want to own: "provisioning and scaling servers, keeping software stacks patched and up to date, handling fleet-wide deployments, or dealing with routine monitoring, logging, and web service front ends."

Read that list again and count how many of those items your self-hosted component drags back onto your team.

## The hidden tax has a name

Google's SRE book calls it [toil](https://sre.google/sre-book/eliminating-toil/): work "tied to running a production service that tends to be manual, repetitive, automatable, tactical, devoid of enduring value, and that scales linearly as a service grows." Their test is blunt: "If your service remains in the same state after you have finished a task, the task was probably toil."

Google caps toil at 50% of an SRE's time. Most small teams running their own infrastructure blow through that number without ever measuring it, because toil hides inside "quick" tasks: rotating a certificate on the broker, bumping a Postgres minor version, clearing a stuck job, adding disk. None of those tasks leave the system better than they found it. All of them were somebody's evening.

Charity Majors puts the management obligation plainly in [On Call Shouldn't Suck](https://charity.wtf/2020/10/03/on-call-shouldnt-suck-a-guide-for-managers/): "It is engineering's responsibility to be on call and own their code," and "It is management's responsibility to make sure that on call does not suck." Her prescription — "Closely track how often your team gets alerted. Take ANY out-of-hours-alert seriously" — is much easier to honor when the thing paging you is a Lambda function with a dead-letter queue than a hand-rolled scheduler with a cron entry and a prayer.

## Boring includes observable

Well-Architected lists "Implement observability for actionable insights" and "Anticipate failure" right alongside "Use managed services." That is not a coincidence. Managed services ship with the observability built in:

- SQS publishes queue depth and message age to CloudWatch without configuration.
- Step Functions keeps a full execution history you can replay.
- Lambda gives you invocation counts, errors, throttles, and duration by default.
- DynamoDB exposes consumed capacity and throttling per table.
- Aurora surfaces Performance Insights without an agent.

Werner Vogels' [Frugal Architect](https://thefrugalarchitect.com/laws/) laws, published at re:Invent this year, make the connection explicit in Law IV: "Unobserved Systems Lead to Unknown Costs." A custom component is unobserved until somebody instruments it, and somebody rarely does, because instrumenting it was never on the ticket.

## The Prime Video case is evidence for, not against

Earlier this year Prime Video published a post about moving one monitoring service off Step Functions and Lambda, cutting its infrastructure cost by more than 90%. The post was widely read as "serverless failed." It says the opposite if you read the details ([InfoQ summary](https://www.infoq.com/news/2023/05/prime-ec2-ecs-saves-costs/)).

The service did stream-defect detection on video. The first version used Step Functions to orchestrate Lambda detectors, passing frames through S3. The problem was specific: "several state transitions for each second of the analyzed audio/video stream," each billed, plus Tier-1 S3 reads and writes for every intermediate frame. Their fix packed the detectors into a single process on ECS so data could move in memory, and they kept Lambda as the entry point and ECS as the managed runtime.

Sam Newman's read, quoted in [DevClass](https://www.devclass.com/ci-cd/2023/05/05/reduce-costs-by-90-by-moving-from-microservices-to-monolith-amazon-internal-case-study-raises-eyebrows/1621790), is that the post "is really speaking more about pricing models of functions vs long-running VMs." Adrian Cockcroft's [response](https://www.thestack.technology/prime-video-monolith-architecture-debate-bad-takes-adrian-cockcroft/) says the team did what he has advised for years: build serverless first, then "optimize serverless applications by also building services using containers to solve for lower startup latency" where needed. Jeremy Daly's [summary](https://offbynone.io/issues/233/): "Serverless First," not "Serverless Only."

That is the pattern. Start on the managed, boring path. Measure. When one hot path's billing model fights the workload, re-platform that one path onto the next-most-boring managed service. Prime Video never ran their own orchestrator. They moved from one AWS-managed runtime to another.

## What custom orchestration becomes

Brian Foote and Joseph Yoder described the end state in 1997, in [Big Ball of Mud](https://www.laputan.org/mud/mud.html): a system whose "organization, if one can call it that, is dictated more by expediency than design." Their observation about throwaway code is the one that should worry you: it "was intended to be used only once and then discarded. However, such code often takes on a life of its own."

A custom retry loop becomes a custom scheduler becomes a custom state machine with no execution history and one person who understands it. Step Functions imposes that structure up front — states, retries, catch blocks, timeouts — and does so in a way the next engineer can read from the console.

## Honest counterpoints

**Pricing models can fight you at scale.** Per-transition and per-invocation billing is wrong for chatty, tightly coupled, high-frequency work. Prime Video is the proof. The answer is to measure and move the specific component, not to start on EC2 for everything.

**Steady, predictable load changes the math.** DHH's [Why we're leaving the cloud](https://world.hey.com/dhh/why-we-re-leaving-the-cloud-654b47e0) argues that at steady scale 37signals was "paying an at times almost absurd premium for the possibility that it could" burst. He is right about his case, and he concedes the case this post is about: cloud wins "when your application is so simple and low traffic that you really do save on complexity by starting" there, or when traffic swings. Most teams are in that second category longer than they think.

**Lock-in is real.** Amazon States Language, DynamoDB's data model, and Lambda event shapes do not port. Gregor Hohpe's [Don't get locked up into avoiding lock-in](https://martinfowler.com/articles/oss-lockin.html) is the right frame: lock-in is a trade-off to price, not a taboo. "We may happily accept some amount of lock-in if we get a commensurate pay-off," and "additional investment into reducing lock-in actually leads to higher total cost." If the utility is high, accept it and write it down in an ADR.

## The default

When there is a managed AWS service for the job, use it. When there is not, look harder, because there usually is. When you have confirmed there is not, build the smallest thing that works, instrument it on day one, and treat it as a liability on the balance sheet rather than an asset.

Boring is not a compromise. It is the thing that lets the interesting work happen.
