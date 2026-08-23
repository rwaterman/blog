+++
title = "Vercel Is Great for Frontend Teams"
date = 2026-02-24
draft = false
summary = "Vercel's developer experience is the best in the business, and for a frontend team without cloud depth it is the right call. But if your organization already has AWS CDK or Terraform specialization, you are paying a markup on Lambda and CloudFront for an abstraction you do not need, with spend controls that lag, private networking behind an Enterprise contract, and a self-hosting story that has finally caught up."
tags = ["vercel", "nextjs", "aws", "cdk", "terraform", "serverless", "cost", "platform-engineering"]
categories = ["architecture"]
ai_model = "Claude Fable 5 (Anthropic)"
+++

{{< ai-disclosure >}}

Let me start with the part that is true without qualification: Vercel is great for frontend teams.

If you are a team of frontend engineers shipping a Next.js application, and nobody on the team wants to learn IAM, Vercel is the correct choice. It will be correct for a long time. Everything below the fold of this post is about a different team.

## What Vercel gets right

**The developer experience is the product.** Push a commit to any branch and you get a [preview deployment](https://vercel.com/docs/deployments/environments) with a branch-specific URL and a commit-specific URL, posted to the pull request. Zero configuration for Next.js. Instant rollback. Custom environments. None of it requires a line of infrastructure code, and that matters enormously for a team whose job is the interface, not the platform.

**Next.js is first-party.** Vercel is ["made by the creators of Next.js"](https://vercel.com/frameworks/nextjs), and it shows. The Next.js [deployment docs](https://nextjs.org/docs/app/getting-started/deploying) list exactly two verified adapters: Vercel and Bun. Performance features like Partial Prerendering served from the CDN edge, ISR propagating globally in [under a second](https://vercel.com/frameworks/nextjs), and skew protection land on Vercel first.

**The engineering underneath is real.** Vercel runs [126 points of presence and 20 compute regions](https://vercel.com/docs/regions). It built a [Rust function runtime with in-function concurrency](https://vercel.com/blog/serverless-servers-node-js-with-in-function-concurrency) to get streaming and many-to-one invocation out of a substrate that did not natively offer it, and it reports that [Fluid compute](https://vercel.com/blog/introducing-fluid-compute) cuts compute cost by up to 85% for idle-heavy workloads. That is not marketing; that is hard distributed-systems work, done well.

If that is the whole story for your team, stop reading and go ship.

## Now the other team

Here is the team this post is actually for: an organization with a platform or backend group that already writes AWS CDK or Terraform, already runs Lambda and CloudFront, already has an AWS account structure with IAM boundaries and CloudWatch dashboards and a WAF. For that team, Vercel's premium buys much less than it looks like, and costs more than the invoice shows.

## You are paying a markup on your own primitives

Vercel's [region table](https://vercel.com/docs/regions) maps `iad1` to `us-east-1`, `pdx1` to `us-west-2`, `fra1` to `eu-central-1`. All twenty regions are AWS regions. Vercel has said plainly that [Vercel Functions run on AWS Lambda](https://vercel.com/blog/aws-and-vercel-accelerating-innovation-with-serverless-computing) — "we've turned lambda into an edge-first compute layer" — reached through a TCP tunnel Vercel built between its infrastructure and Lambda.

Compare the list prices, as of this writing.

| Resource | Vercel Pro | AWS direct |
|---|---|---|
| Function invocations | [$0.60 per million](https://vercel.com/pricing) after 1M included | [$0.20 per million](https://aws.amazon.com/lambda/pricing/) after 1M free |
| Data transfer out | [$0.15 per GB](https://vercel.com/pricing) after 1 TB included | [$0.085 per GB](https://aws.amazon.com/cloudfront/pricing/pay-as-you-go/) after 1 TB free |
| Edge / CDN requests | [$2.00 per million](https://vercel.com/pricing) after 10M included | [$1.00 per million](https://aws.amazon.com/cloudfront/pricing/pay-as-you-go/) after 10M free |

Three times the request price, roughly 1.8 times the egress price, twice the CDN request price. That is the cost of the renaming layer. If your team cannot write the CDK to put a Lambda behind CloudFront, the markup is a bargain. If it can, the markup is paying for something you already own.

And then there are seats. Vercel Pro is [$20 per developer per month](https://vercel.com/pricing). That number scales with headcount, not traffic. A platform team of twelve pays $240 a month before a single request is served. CloudFront, Lambda, [Amplify Hosting](https://aws.amazon.com/amplify/pricing/), and an SST deployment have no seat price at all.

## The controls you want are behind the Enterprise wall

Look at what the [Enterprise plan](https://vercel.com/docs/plans/enterprise) gates: SSO/SAML login, directory sync, audit logs, log drains, tracing support, Datadog and New Relic integrations, SLAs, automatic failover regions, and Secure Compute. Pricing is "Custom."

[Secure Compute](https://vercel.com/docs/networking/secure-compute) is the one that matters most to the AWS team. It is how your Vercel functions reach a private RDS instance or an internal service. It is "available as an Enterprise feature," it works by VPC peering from a Vercel-owned network into your AWS VPC, it does not support the Edge runtime or middleware, and private data transfer that leaves the network is billed at $0.15 per GB.

On AWS the Lambda is already in your account. Put it in the VPC. Attach the security group. Write the IAM policy scoped to the one queue it needs. Ship logs to the CloudWatch group your platform team already alerts on. Trace it with X-Ray. Every one of those is a few lines of CDK, none of them requires a sales call, and the data never leaves your account. SST's [migration guide](https://v2.sst.dev/migrating/vercel) says it in one sentence: "Your data will never leave your AWS account."

## Spend controls lag, and you do not own the throttle

In June 2024 the art platform Cara grew from 40,000 to 650,000 users in a week, peaked at [56 million function invocations a day](https://www.infoq.com/news/2024/06/vercel-serverless-scale-expenses), and received a [$96,280 bill from Vercel](https://x.com/zemotion/status/1799664010616512929) for serverless function execution ([Silicon Republic](https://www.siliconrepublic.com/enterprise/instagram-cara-crash-generative-ai-user-surge)). The founder's [own account](https://blog.cara.app/blog/finances-and-future-of-cara): "I was hit with a $100k bill from one of our service providers for 1 week of traffic."

Vercel responded with [Spend Management](https://vercel.com/docs/spend-management), which is better than nothing and worse than you would hope. From the docs: "Setting a spend amount does not automatically stop usage." Pausing is opt-in, pauses all production projects with a `503 DEPLOYMENT_PAUSED`, and "because these checks are not continuous, notifications, webhooks, and project pausing can trigger several minutes after you cross your spend amount." Seats and add-ons are excluded.

Usage-based billing without a hard cap is a property of cloud generally, not Vercel specifically — Yan Cui [made that point](https://x.com/theburningmonk/status/1798703655908192570) at the time, fairly. The difference is who owns the throttles. On AWS, the team that writes the CDK sets reserved concurrency on the function, puts a rate-based rule on the WAF in front of CloudFront, and can choose CloudFront's [flat-rate plans](https://aws.amazon.com/cloudfront/pricing/) with no overage charges. Those knobs exist on Vercel only to the extent Vercel exposes them.

## The bill is hard to model

Vercel has repriced its compute three times in about fifteen months: [metered SKUs](https://vercel.com/blog/improved-infrastructure-pricing) in April 2024, [Fluid compute](https://vercel.com/blog/introducing-fluid-compute) in February 2025 promising up to 85% savings, and [Active CPU pricing](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute) in June 2025 promising up to 90% for idle-heavy workloads. Each was framed as a cut. Each changed the unit you are billed on — from GB-hours to Active CPU hours plus provisioned memory plus invocations plus edge requests plus origin transfer.

Lambda's GB-second model has not changed in years. A platform team can forecast it on a napkin. That stability is a feature for anyone whose job includes a budget.

## Self-hosting Next.js caught up

The strongest historical argument for Vercel was that Next.js outside Vercel was a degraded experience. That argument has expired.

The Next.js team's own [platform guide](https://nextjs.org/docs/app/guides/deploying-to-platforms) now says: "To run Next.js, your platform needs a Node.js server. That's it." A single `next start` "handles every Next.js feature correctly: Server Components, ISR, PPR, Cache Components, Server Actions, Proxy, and `after()`." And: "There are no private framework hooks or integration paths: Vercel's adapter uses the same public API as every other adapter."

[OpenNext](https://opennext.js.org/aws), whose AWS adapter is maintained by the SST community, covers App and Pages Router, SSR, SSG, ISR, middleware, image optimization, and `use cache`. [SST](https://sst.dev/docs/start/aws/nextjs/) wraps the roughly seventy AWS resources that make up a Next.js deployment into one component: `new sst.aws.Nextjs("MyWeb", { link: [bucket] })`, deployed to Lambda, CloudFront, and S3 in your account. [Amplify Hosting](https://docs.aws.amazon.com/amplify/latest/userguide/server-side-rendering-amplify.html) supports Next.js 15 "without the need for an adapter," with pull-request previews and atomic deployments, at [$0.30 per million SSR requests and no seat fee](https://aws.amazon.com/amplify/pricing/).

If you would rather own it yourself, the pieces are a CloudFront distribution, an S3 bucket for static assets, a Lambda function URL for the server, and a cache handler. A team with CDK fluency has built that before, for something else, and has the constructs lying around.

## Honest counterpoints

**Engineering time is not free.** SST's "around seventy low-level AWS resources" is the honest count. Self-hosting means you own multi-instance cache coordination, the Server Actions encryption key, `deploymentId` for skew protection, and the fact that an [ALB with Lambda integration may buffer streaming responses](https://nextjs.org/docs/app/guides/self-hosting). These are solved problems, but they are your problems now.

**Parity is functional, not always performance.** The Next.js docs distinguish functional fidelity from performance fidelity. PPR's static shell at CDN latency and sub-second ISR propagation are what Vercel tunes. OpenNext's page still says "some features are work in progress," and Amplify is "not verified by the Next.js team."

**Idle-heavy workloads can genuinely be cheaper on Active CPU billing.** If your functions spend most of their wall-clock waiting on a model API, paying only for active CPU is a real advantage over provisioned compute. Lambda bills wall-clock. For that specific shape, run the numbers both ways.

## The decision

The question is not "is Vercel good." It is. The question is whether your organization already has the specialization Vercel is charging you not to need.

A frontend team without it: use Vercel. You will ship faster and the premium is cheap against the alternative of learning AWS under deadline.

A team with CDK or Terraform depth: the markup buys a renaming layer over Lambda and CloudFront, the controls you care about are behind an Enterprise contract, the spend cap is a notification, and the framework now runs everywhere on the same public API. Put the Next.js app in your own account, next to the rest of your infrastructure, governed by the same IAM, observed by the same dashboards, and paid for at list price.

You already did the hard part. Do not pay someone else for it twice.
