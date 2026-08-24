+++
title = "It's All Just AWS Under the Hood"
date = 2026-08-23T11:00:00-07:00
draft = false
summary = "Vercel, Netlify, Supabase, Heroku, Render, PlanetScale: open their region docs and you find AWS region codes. The platforms are thin layers over primitives you can learn directly. Deep AWS specialization — with real fluency in CDK and Terraform — is not narrowing. It is the thing that lets you use any of them, and leave any of them."
tags = ["aws", "cdk", "terraform", "infrastructure-as-code", "paas", "vercel", "career"]
categories = ["architecture"]
ai_model = "Claude Fable 5 (Anthropic)"
+++

{{< ai-disclosure >}}

There is a common worry among engineers who go deep on AWS: that specialization is a trap, that the real skill is "the cloud" in the abstract, and that tying yourself to one provider makes you brittle.

The opposite is true, and the evidence is sitting in the documentation of every developer platform you have ever used. Open the regions page. Read the codes.

## The region table is the tell

[Vercel's region docs](https://vercel.com/docs/regions) list a "Region Name" column. The values are `iad1`, `sfo1`, `pdx1`, `dub1`, `fra1`, `hnd1`. The column next to it says `us-east-1`, `us-west-1`, `us-west-2`, `eu-west-1`, `eu-central-1`, `ap-northeast-1`. Twenty compute regions, every one of them an AWS region code with a friendlier alias. Vercel said it directly in a [2022 post written with AWS](https://vercel.com/blog/aws-and-vercel-accelerating-innovation-with-serverless-computing): "We've turned lambda into an edge-first compute layer," running "millions of functions that get invoked over five billion times per week."

[Netlify's function configuration](https://docs.netlify.com/build/functions/optional-configuration/) lists deployable regions as `cmh | US East (Ohio)`, `iad | US East (N. Virginia)`, `pdx | US West (Oregon)`, `dub | EU (Ireland)`. Those are not Netlify's names for places. They are AWS's display names, verbatim. The same page says your Node version "must be a valid AWS Lambda runtime for Node.js," set through an environment variable called `AWS_LAMBDA_JS_RUNTIME`.

[Supabase](https://supabase.com/docs/guides/platform/regions): "Supabase will deploy your project to an available AWS region within that area based on current infrastructure capacity." The region list is `us-east-1`, `eu-central-1`, `ap-southeast-2`, and so on.

[Heroku's region docs](https://devcenter.heroku.com/articles/regions) show the Platform API returning `"provider":{"name":"amazon-web-services","region":"eu-central-1"}`. [Render](https://render.com/blog/render-joins-aws-marketplace): "Render runs in the very same data centers as your EC2 instances, Lambda invocations, and other AWS resources." [PlanetScale](https://planetscale.com/docs/concepts/regions) prefixes its region slugs with the provider: `AWS ap-northeast-1`, `gcp-us-east4`.

Move up the stack to the data layer and the pattern holds. [Snowflake](https://docs.snowflake.com/en/user-guide/intro-cloud-platforms) "runs completely on cloud infrastructure" and is hosted on AWS, Azure, or Google Cloud. [MongoDB Atlas](https://www.mongodb.com/docs/atlas/cloud-providers-regions/) and [Confluent Cloud](https://docs.confluent.io/cloud/current/clusters/regions.html) list the same three and use the providers' own region codes in their tables.

None of these companies are hiding it. The abstraction is a renaming layer and a very good developer experience on top of primitives you can rent directly.

## Platform limits are AWS limits in a costume

Once you know the substrate, the platform's ceilings stop being surprising.

Netlify's [Lambda compatibility page](https://docs.netlify.com/build/functions/lambda-compatibility/) states that the total size of all environment variables "cannot exceed 4 KB" because that is "AWS Lambda's environment variable size limit." Vercel's [Fluid compute](https://vercel.com/docs/fluid-compute), launched last month, exists so that "multiple invocations can share the same physical instance" — which is to say, it exists to escape Lambda's one-invocation-per-execution-environment model, the model every AWS engineer has been designing around for a decade.

If you know Lambda's cold-start behavior, its payload limits, its execution-environment lifecycle, and its regional quotas, you already know where Vercel Functions and Netlify Functions will bend. You do not need the vendor's documentation to tell you; you need it to tell you which of the limits they have papered over and how.

## Outages propagate downward

When the substrate fails, the platform can only wait. Heroku's [2017 post-incident review](https://status.heroku.com/incidents/1059) is the most honest version of this I have read: "Many of the problems during this incident stemmed from the Amazon S3 outage on the 28th," and then: "Any instability or unavailability due to issues with those providers or technologies is a consequence of our choices." The AWS [summary of that event](https://aws.amazon.com/message/41926/) explains what actually happened: a command input "entered incorrectly," and "a larger set of servers was removed than intended."

In December 2021 Heroku's [status page](https://status.heroku.com/incidents/2390) reported that "our upstream provider is experiencing elevated error rates in the US region," affecting apps "in both the US and EU regions." Heroku never named the provider. The [AWS post-event summary](https://aws.amazon.com/message/12721/) for the same afternoon describes an automated scaling activity that "triggered an unexpected behavior from a large number of clients inside the internal network," with EC2 API errors starting at 7:33 AM PST.

In June 2023 the [Lambda frontend fleet in us-east-1](https://aws.amazon.com/message/061323/) "crossed a capacity threshold that had previously never been reached," triggering "a latent software defect." EventBridge delivery latency reached 801 seconds. That is the service Vercel and Netlify functions run on, in the region Vercel functions default to.

An engineer who can read `aws.amazon.com/message/*` understands their own incident before their vendor's status page finishes updating. That is not a small thing during an outage.

## Undifferentiated heavy lifting is a dial

Werner Vogels' framing in the [2014 Lambda announcement](https://www.allthingsdistributed.com/2014/11/aws-lambda.html) — customers want to focus on "their unique application logic and business needs, not on the undifferentiated heavy lifting" — is usually read as an argument for maximum abstraction. It is better read as an argument for choosing the abstraction level per workload.

AWS CDK makes the dial explicit. The [construct levels](https://docs.aws.amazon.com/cdk/v2/guide/constructs.html):

- **L1** constructs "map directly to a single AWS CloudFormation resource" and "offer no abstraction."
- **L2** constructs "include sensible default property configurations, best practice security policies, and generate a lot of the boilerplate code and glue logic for you."
- **L3** constructs, or patterns, are "the highest-level of abstraction," bundling resources "configured to work together" — `ApplicationLoadBalancedFargateService` is the canonical example.

A PaaS is an L3 somebody else wrote and charges for. Most of the time that is exactly what you want. The question is what happens when the L3 stops fitting: you need VPC access to a private database, or a 15-minute function, or IAM-scoped access to a queue, or a region the vendor does not offer.

If your only skill is the PaaS, the answer is "migrate." If you have CDK and Terraform fluency on the same substrate, the answer is "drop one level." Same AWS account, same region, same IAM model, one more construct.

## Why CDK and Terraform, specifically

Two tools, because they are good at different things and you will encounter both.

CDK is the right tool when the infrastructure is tightly coupled to application code: a Lambda handler and its event source and its IAM policy in one TypeScript file, type-checked together. Its L2 constructs encode AWS's own opinions about least-privilege and sensible defaults, which is worth a lot when you are moving fast.

Terraform is the right tool when the infrastructure outlives any single application, spans providers, or is owned by a platform team that needs plan output a reviewer can read. The [AWS provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) is the most widely used provider in the registry, and its resource model is the one every cloud engineer you hire will already know.

[CDK for Terraform](https://developer.hashicorp.com/terraform/cdktf) closes the gap for teams that want CDK's programming model with Terraform's state and provider ecosystem. AWS CDK's construct model is portable: the docs note that constructs "are available to use with other tools such as CDK for Terraform (CDKtf), CDK for Kubernetes (CDK8s), and Projen."

Fluency in both means you can read any infrastructure repository you are handed and contribute to it the same week. That is the practical definition of flexible.

## The market makes the bet safe

Synergy Research Group's [Q4 2024 numbers](https://www.srgresearch.com/articles/cloud-market-jumped-to-330-billion-in-2024-genai-is-now-driving-half-of-the-growth): a $330 billion market, with Amazon at 30%, Microsoft at 21%, and Google at 12%. AWS is the largest single substrate, and the multi-cloud vendors — Snowflake, Atlas, Confluent — ship on it first.

The primitives also rhyme across providers. Regions, availability zones, virtual networks, identity-scoped permissions, managed queues, object storage: learn them deeply on one provider and the others are a vocabulary exercise. Learn them shallowly through a PaaS and you have learned the PaaS.

## Honest counterpoints

**Not everything is AWS.** [Fly.io](https://fly.io/docs/reference/regions/) runs on hardware it operates itself. Cloudflare Workers run on Cloudflare's network. 37signals [left AWS entirely](https://world.hey.com/dhh/we-have-left-the-cloud-251760fb) and expects to save "at least $1.5 million per year by owning our own hardware." On those platforms AWS fluency transfers less, and DHH's argument — that the hyperscaler premium is itself a cost the abstraction hides — is fair.

**Multi-cloud vendors genuinely abstract the provider.** If your team lives inside Snowflake or Kafka semantics, specialization in the vendor's product pays more than specialization in any single cloud underneath it. The underlying region's failure modes are mostly the vendor's problem.

**Renting someone else's operational learning is the point.** Vercel built Fluid compute so its customers never had to understand Lambda's concurrency model. Heroku, not its customers, owned the S3-dependency fix in 2017. Most teams should not reproduce that work, and this post is not arguing they should. It is arguing that the engineer who *could* reproduce it is the one who knows when the rental is worth the price.

## The thesis

Specialize in AWS. Go deep enough that you can build the L3 yourself, even if you mostly choose not to. Learn CDK and Terraform well enough to drop a level without changing providers. Then use whatever platform fits the workload, knowing what it is made of, what it will cost, and exactly where the exit is.

That is not narrowness. That is the only kind of flexibility that survives contact with an incident.
