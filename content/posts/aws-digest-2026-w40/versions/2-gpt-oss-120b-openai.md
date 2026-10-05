+++
title = "gpt-oss-120b (OpenAI)"
weight = 2
+++

The announcements reflect a push toward more automated and resilient application delivery, with ECS gaining built‑in traffic‑shifting on VPC Lattice and EKS adopting the latest Kubernetes features. Database engineers gain finer‑grained performance controls via Aurora partial indexes and selective DynamoDB exports, while Redshift now reaches data across regions without leaving the VPC. Security posture is tightened as GuardDuty runtime monitoring is folded into Security Hub and Identity Center expands multi‑Region replication. Finally, observability improves with OpenTelemetry metrics for Valkey, helping teams monitor cache workloads at scale.

## ECS adds VPC Lattice blue/green deployments

Amazon Elastic Container Service now natively supports blue/green, linear, and canary deployment strategies when services communicate through Amazon VPC Lattice. The feature shifts traffic at the service level, letting operators control rollout speed and rollback behavior without external tooling. This integration simplifies multi‑account, cross‑VPC deployments and provides managed traffic routing directly from ECS, reducing operational complexity for teams adopting service mesh patterns.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-ecs-vpc-lattice-blue-green-deployments)

## EKS supports Kubernetes 1.37

Amazon Elastic Kubernetes Service and Amazon EKS Distro now run Kubernetes version 1.37. The release introduces several new API enhancements, bug fixes, and performance improvements. Users can create new clusters on 1.37 or upgrade existing clusters via the console, eksctl, or IaC tools. Early adoption enables access to the latest scheduler optimizations and security patches, helping teams keep their Kubernetes workloads current without extensive migration effort.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-eks-distro-kubernetes-version-1-37)

## Aurora DSQL adds partial indexes

Amazon Aurora DSQL now allows partial indexes that cover only rows matching a WHERE clause. By indexing a focused working set—such as active orders—rather than an entire table, queries read fewer pages and storage consumption drops. The index remains small as the table grows, delivering faster lookups for high‑frequency patterns while keeping maintenance overhead low. This capability benefits workloads that retain large historical data alongside a small live subset.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/aurora-dsql-partial-indexes/)

## Redshift cross‑Region data lake queries

Amazon Redshift can now query Amazon S3 data lake tables located in a different AWS Region. Enhanced VPC routing keeps traffic inside the customer VPC, preserving security and latency expectations. The feature leverages Redshift’s integrated data lake engine on both provisioned and serverless clusters, enabling globally distributed analytics without data replication. Enterprises with multi‑Region data stores can run unified queries while maintaining strict network controls.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/redshift-cross-Region-queries-for-data-lake)

## DynamoDB filtered export to S3

Amazon DynamoDB now supports filtered exports to Amazon S3, letting users specify key condition and filter expressions to export only relevant items and attributes. Exports can be full or incremental over a time window, reducing data transfer and storage costs for analytics or sharing. This granular export capability aligns with compliance and cost‑optimization goals by avoiding unnecessary data movement.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-dynamodb-introduces-filtered-export/)

## GuardDuty runtime monitoring in Security Hub

Amazon GuardDuty Runtime Monitoring is now included in the AWS Security Hub Threat Analytics plan. The service inspects OS, network, and file activity on EC2, EKS, and Fargate workloads to surface threats such as container escapes and cryptomining. Integration consolidates findings and billing, simplifying threat detection across compute environments and giving security teams a unified view of runtime risks.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-security-hub-runtime-monitoring/)

## IAM Identity Center multi‑Region support expansion

AWS IAM Identity Center now lets customers replicate the service to additional supported Regions within the same AWS partition. Multi‑Region deployment improves resilience of identity federation and access management across geographically dispersed accounts. Configurations can be synchronized across supported Regions within that partition, enabling consistent user and permission propagation while reducing the blast radius of regional outages.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-iam-identity-center-extends-multi-region-support-to-more-aws-regions)

## Valkey adds OpenTelemetry metrics

Amazon ElastiCache for Valkey now publishes OpenTelemetry metrics to CloudWatch, alongside standard metrics. Each metric includes attributes usable in PromQL queries, giving operators fine‑grained visibility into node‑level performance. Two monitoring modes are offered: the legacy 60‑second CloudWatch metrics and the new OpenTelemetry stream, both at no extra charge. This enhancement supports modern observability stacks and aids in troubleshooting and capacity planning for cache workloads.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-elasticache-valkey-opentelemetry-metrics-detailed-monitoring)
