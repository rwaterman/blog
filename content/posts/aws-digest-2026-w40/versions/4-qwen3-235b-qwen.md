+++
title = "Qwen3 235B (Qwen)"
weight = 4
+++

The week highlights AWS's strategic push toward intelligent automation and data-centric architectures. Managed AI agents on Bedrock, system-managed materialized views in Iceberg, and the AgentCore Gateway with private TLS support reflect deep investments in secure, scalable agent systems. On the data side, Aurora's integration of Iceberg/Parquet and DynamoDB's filtered exports enable more precise analytics without ETL. Simultaneously, deployment enhancements in ECS, EKS, and Redshift cross-Region queries signal stronger support for complex, global workloads. Together, these features point to a platform maturing around AI-native applications and fine-grained data operations.

## Amazon Bedrock Managed Agents for OpenAI now in preview

Amazon Bedrock now offers Managed Agents powered by OpenAI, enabling customers to build AI agents that run entirely within AWS using native IAM identities and governance controls. The service manages state preservation, tool selection, code execution, and multi-step workflows. This integration simplifies deployment of AI agents that require durable sessions and interaction with AWS resources, reducing operational overhead while maintaining security and compliance.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/09/bedrock-managed-agents-preview/)

## Amazon ECS adds VPC Lattice support for advanced deployments

Amazon ECS now supports blue/green, linear, and canary deployments using Amazon VPC Lattice for service-to-service communication across VPCs and AWS accounts. This enables controlled traffic shifting during deployments without requiring custom tooling. Customers can manage rollout strategies directly within ECS, improving deployment safety and observability for microservices architectures operating at scale across multiple accounts and networks.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-ecs-vpc-lattice-blue-green-deployments)

## Aurora PostgreSQL adds direct Apache Iceberg and Parquet query support

Aurora PostgreSQL now allows direct querying of data lake formats including Apache Iceberg and Parquet without ETL or data duplication. This enables existing PostgreSQL tools and applications to access operational and analytical data in S3 natively. The feature eliminates the need for extract-and-load pipelines, simplifying data architecture and enabling real-time analytics on large-scale, distributed datasets stored in open formats.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/09/aurora-postgresql-query-apache-iceberg-and-parquet/)

## Apache Iceberg system-managed materialized views now available

AWS now supports system-managed materialized views for Apache Iceberg, ensuring that precomputed query results are protected from unauthorized modifications. Only AWS Glue can update the view’s data and definition, preserving accuracy and consistency across engines. This capability enhances data governance for shared data lakes, particularly when multiple teams or workloads depend on reliable, performant access to aggregated or transformed datasets.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/system-managed-iceberg-materialized-views)

## Amazon DynamoDB introduces filtered export to S3

DynamoDB now supports filtered exports to Amazon S3, allowing customers to export only specific items and attributes based on key conditions and filter expressions. This reduces data volume for analytics and sharing use cases while improving cost efficiency. The feature eliminates the need for post-export filtering, streamlining workflows that require selective data movement from DynamoDB to data lake environments.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-dynamodb-introduces-filtered-export/)

## Amazon Aurora DSQL adds partial indexing support

Amazon Aurora DSQL now supports partial indexes, enabling indexes to be created on a subset of table rows using a WHERE clause. This improves query performance and reduces storage costs for tables with large historical datasets where only recent records are frequently accessed. As the table grows, the index remains compact and efficient, benefiting workloads like order processing where active records represent a small fraction of total data.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/aurora-dsql-partial-indexes/)

## Amazon ElastiCache for Valkey adds OpenTelemetry metrics

Amazon ElastiCache for Valkey now publishes OpenTelemetry metrics to CloudWatch for node-based clusters, enabling filtering and aggregation using PromQL. Standard monitoring now includes core OpenTelemetry metrics at no extra cost, sampled every 60 seconds. This enhances observability for caching workloads, allowing integration with existing Prometheus-based monitoring stacks and providing deeper insights into performance and utilization patterns for Valkey deployments.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-elasticache-valkey-opentelemetry-metrics-detailed-monitoring)

## GuardDuty Runtime Monitoring now included in Security Hub plan

GuardDuty Runtime Monitoring is now part of the AWS Security Hub Threat Analytics plan, providing detection of threats such as container escapes, privilege escalation, and cryptomining on EC2, EKS, and ECS Fargate. The coverage is now included by default with streamlined pricing. This integration centralizes runtime threat detection within Security Hub, simplifying visibility and response for security teams managing large-scale AWS environments.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-security-hub-runtime-monitoring/)
