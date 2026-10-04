+++
title = "Mistral Large 3 (Mistral AI)"
weight = 1
+++

AWS introduced managed AI agents (Bedrock Managed Agents) and accelerated Aurora scaling for bursty workloads like agentic AI, reflecting a push toward autonomous systems. New deployment strategies in ECS with VPC Lattice and enhanced security tools in Security Hub and GuardDuty integrate deeper into DevOps and observability workflows. Enterprise-focused updates include AMD-based RDS instances and multi-Region support for critical services like IAM Identity Center and Kinesis Video Streams, improving resilience. Partial indexes in Aurora DSQL and filtered exports in DynamoDB optimize storage and query efficiency, while OpenTelemetry support in ElastiCache for Valkey aligns with standardized observability practices.

## Amazon Bedrock Managed Agents, powered by OpenAI, is now available in preview

AWS and OpenAI released Bedrock Managed Agents (BMA), an AWS-native implementation of OpenAI's Agents API. BMA manages state persistence, tool selection, and multi-step workflows entirely within AWS, using existing IAM identities and permissions. Durable sessions retain context across interactions, enabling complex agentic applications without custom orchestration. This simplifies building agents optimized for OpenAI models while adhering to AWS governance, targeting enterprises needing secure, self-hosted agentic workflows.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/09/bedrock-managed-agents-preview/)

## Amazon Aurora serverless now scales faster to support agentic AI and other bursty workloads

Aurora serverless now scales in 16 ACU increments within seconds, up from smaller increments, and continues scaling up to 256 ACUs. This enables immediate capacity for bursty workloads like agentic AI, which exhibit sudden activity followed by idleness. The system automatically scales down to zero, charging only for active usage. This addresses latency-sensitive applications needing instant compute while eliminating over-provisioning costs.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/08/aurora-serverless-instant-16-acu-scaling/)

## Amazon ECS adds Amazon VPC Lattice support for blue/green, linear, and canary deployments

ECS now integrates native blue/green, linear, and canary deployment strategies with VPC Lattice. Applications using Lattice for cross-account and cross-VPC service communication can now manage traffic shifting directly from ECS during deployments. This simplifies progressive rollouts, reducing the need for custom traffic management scripts or third-party tools, especially in microservices architectures spanning multiple VPCs.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-ecs-vpc-lattice-blue-green-deployments)

## Amazon Aurora DSQL now supports partial indexes

Aurora DSQL introduces partial indexes, allowing CREATE INDEX with a WHERE clause to index only a subset of table rows. For tables with large historical data and small active datasets (e.g., open orders), queries targeting the subset scan less data while index storage costs decrease. This improves query performance and reduces I/O as tables grow, making it valuable for high-scale transactional applications.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/aurora-dsql-partial-indexes/)

## GuardDuty Runtime Monitoring is now included in the AWS Security Hub Threat Analytics plan

Security Hub now consolidates GuardDuty Runtime Monitoring under its Threat Analytics plan, streamlining billing for threat detection across EC2, EKS, and Fargate. Runtime Monitoring inspects OS, network, and file activity for threats like container escapes. This integration reduces licensing complexity while providing unified visibility into runtime and static security findings for enterprises managing large distributed infrastructures.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-security-hub-runtime-monitoring/)

## Amazon ElastiCache for Valkey now supports OpenTelemetry metrics and detailed monitoring

ElastiCache for Valkey now publishes OpenTelemetry metrics to CloudWatch, with attributes for filtering via PromQL. Standard monitoring now includes OpenTelemetry metrics at no extra cost, while detailed monitoring adds metrics at 1-second granularity. This alignment with OpenTelemetry standards simplifies integration with observability platforms like Prometheus and Grafana, reducing custom instrumentation for real-time performance tracking.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-elasticache-valkey-opentelemetry-metrics-detailed-monitoring)

## AWS Well-Architected Agent is now available in preview

The Well-Architected Agent is an AI-powered service that analyzes infrastructure across cost, security, performance, and reliability. It correlates metrics and topology against Well-Architected best practices, and evaluates Terraform, CDK, and CloudFormation templates. The agent delivers contextualized, prioritized recommendations aligned with business goals, evolving Trusted Advisor and Well-Architected Tool capabilities for continuous optimization without manual reviews.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-well-architected-agent/)

## Amazon RDS now supports AMD-based R8a and M8a instances

Aurora and RDS now offer R8a and M8a instances powered by 5th-generation AMD EPYC processors, delivering consistent per-core performance. R8a targets high-I/O database workloads with up to 75 Gbps network and 60 Gbps EBS bandwidth, while M8a suits general-purpose workloads. These instances, built on the Nitro system, provide cost-efficient alternatives to Intel-based instances for enterprises needing predictable performance at scale.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/09/aurora-rds-amd-r8a/)
