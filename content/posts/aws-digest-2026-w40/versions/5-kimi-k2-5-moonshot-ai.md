+++
title = "Kimi K2.5 (Moonshot AI)"
weight = 5
+++

This week brings meaningful operational improvements across compute, security, and data domains. ECS now supports native traffic-shifting deployments through VPC Lattice, eliminating the need for custom tooling to achieve safe rollouts. The agent ecosystem matures with Bedrock Managed Agents and broader MCP Server availability, signaling AWS's bet on AI-assisted infrastructure. Data lake users gain substantial new capabilities: Redshift can now query S3 data across regions, Glue protects Iceberg materialized views from unauthorized writes, and DynamoDB supports filtered exports to reduce data movement. Security teams receive consolidated GuardDuty management through Organizations declarative policies and integrated Runtime Monitoring in Security Hub. These changes collectively reduce undifferentiated heavy lifting in deployment pipelines, data architectures, and security operations.

## ECS adds VPC Lattice support for blue/green, linear, and canary deployments

Amazon ECS now supports built-in blue/green, linear, and canary deployment strategies for services using Amazon VPC Lattice. Previously, teams needed custom automation to shift traffic safely during releases. Now ECS manages traffic shifting natively, letting practitioners control rollout velocity and rollback without additional infrastructure. This matters for organizations standardizing on VPC Lattice for cross-VPC service mesh communication.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-ecs-vpc-lattice-blue-green-deployments)

## AWS Security Hub includes GuardDuty Runtime Monitoring in Threat Analytics plan

AWS Security Hub now includes Amazon GuardDuty Runtime Monitoring in its Threat Analytics plan, consolidating billing and coverage. Runtime Monitoring detects threats like container escapes and privilege escalation across EC2, EKS, and ECS Fargate. For practitioners, this removes the need to enable and cost-optimize GuardDuty separately while maintaining comprehensive runtime threat detection.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-security-hub-runtime-monitoring/)

## Redshift supports cross-Region queries for data lake tables

Amazon Redshift can now query Amazon S3 data lake tables located in different AWS Regions, with traffic staying within your VPC when enhanced VPC routing is enabled. This eliminates data replication for globally distributed analytics, but Redshift compute processes the data outside the S3 table's Region, so teams should assess applicable data-residency requirements for their workloads. The feature runs on Redshift's integrated query engine without additional infrastructure.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/redshift-cross-Region-queries-for-data-lake)

## System-managed write protection for Apache Iceberg materialized views

AWS Glue now offers system-managed materialized views for Apache Iceberg, restricting writes to Glue only. Previously, any principal with S3 access could modify precomputed result tables, risking stale or corrupted data for downstream consumers. This change ensures materialized view integrity while maintaining open table format compatibility across query engines.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/system-managed-iceberg-materialized-views)

## DynamoDB introduces filtered export to S3

Amazon DynamoDB now supports filtering during export to S3, allowing specification of which items and attributes to include. Practitioners can export only active records or specific columns rather than entire tables, reducing storage costs and downstream processing. The feature uses key condition and filter expressions familiar from query operations.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-dynamodb-introduces-filtered-export/)

## Bedrock Managed Agents powered by OpenAI enters preview

AWS and OpenAI jointly developed Bedrock Managed Agents, running OpenAI models natively inside AWS with existing IAM and governance controls. The service manages state persistence, tool selection, code execution, and multi-step coordination. This matters for organizations wanting OpenAI capabilities without managing cross-cloud infrastructure or identity federation.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/09/bedrock-managed-agents-preview/)

## AWS MCP Server expands to six additional Regions

The AWS MCP Server is now available in Singapore, Sydney, Tokyo, Ireland, London, and Oregon. The managed Model Context Protocol server provides AI agents a unified interface to AWS APIs, eliminating per-service integration work. Regional expansion reduces latency for agent operations and supports data residency requirements for AI-assisted tooling.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-mcp-server-six-additional-regions/)

## GuardDuty supports centralized management via Organizations declarative policies

Amazon GuardDuty now integrates with AWS Organizations declarative policies for centralized enablement across all accounts and Regions. Policies automatically apply to existing accounts and new account creations, eliminating drift and manual enrollment. This enables security teams to ensure comprehensive threat detection coverage through infrastructure-as-code governance.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/guardduty-org-enablement-policies/)
