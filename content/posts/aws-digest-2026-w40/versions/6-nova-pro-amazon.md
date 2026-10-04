+++
title = "Nova Pro (Amazon)"
weight = 6
+++

This week's AWS announcements highlight significant enhancements across various services. Key updates include the addition of Amazon VPC Lattice support for blue/green, linear, and canary deployments in Amazon ECS, improvements in security with GuardDuty Runtime Monitoring and AWS Security Hub remediation plans, and AI innovations such as Amazon Bedrock Managed Agents. Additionally, there are notable updates in database management with Amazon Aurora and DynamoDB, and enhanced monitoring capabilities with Amazon ElastiCache for Valkey. These updates collectively aim to improve deployment strategies, bolster security measures, and leverage AI for more efficient and intelligent operations.

## Amazon ECS adds Amazon VPC Lattice support for blue/green, linear, and canary deployments

Amazon Elastic Container Service (Amazon ECS) now supports built-in blue/green, linear, and canary deployment strategies for ECS services using Amazon VPC Lattice. Applications that use VPC Lattice for service-to-service communication across VPCs and AWS accounts can now take advantage of managed traffic shifting natively from Amazon ECS when rolling out updates. With this launch, ECS customers using VPC Lattice can shift traffic in a controlled manner during deployments, choosing how quickly to transition between versions.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-ecs-vpc-lattice-blue-green-deployments)

## GuardDuty Runtime Monitoring is now included in the AWS Security Hub Threat Analytics plan

AWS announces that Amazon GuardDuty Runtime Monitoring is now included in the AWS Security Hub Threat Analytics plan. Runtime Monitoring inspects operating system, network, and file activity to surface threats such as container escapes, privilege escalation, and cryptomining on Amazon EC2 instances, Amazon EKS clusters, and Amazon ECS tasks on AWS Fargate. Security Hub now bills this coverage through streamlined pricing. If you have Security Hub enabled in an account and region, you no longer need to enable GuardDuty separately for runtime monitoring.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-security-hub-runtime-monitoring/)

## Amazon Bedrock Managed Agents, powered by OpenAI, is now available in preview

Developed jointly by AWS and OpenAI, Bedrock Managed Agents (BMA) is built on a customized version of OpenAI's Agents API engineered to be AWS-native and integrated with AWS resources. You can now build agents optimized for OpenAI models that run entirely inside AWS with the identities, permissions, and governance controls you already use. BMA manages how the model preserves state, selects and uses tools, executes code, and coordinates work across multiple steps and decisions. Durable sessions remain active as long as you need, and you can start and stop them as you wish.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/09/bedrock-managed-agents-preview/)

## Amazon ElastiCache for Valkey now supports OpenTelemetry metrics and detailed monitoring

Amazon ElastiCache for Valkey now publishes OpenTelemetry metrics to Amazon CloudWatch for your node-based clusters, and each metric carries attributes you can filter and aggregate on with Prometheus Query Language (PromQL) expressions. ElastiCache now offers two monitoring modes. Standard monitoring, the existing experience, continues to publish CloudWatch Metrics (Classic) every 60 seconds and now also publishes a core set of OpenTelemetry metrics at the same interval at no additional charge.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-elasticache-valkey-opentelemetry-metrics-detailed-monitoring)

## Amazon Aurora DSQL now supports partial indexes

Amazon Aurora DSQL now lets you build an index over a specific subset of a table, storing only qualifying rows rather than every row in the entire table, which improves query performance and lowers index storage cost. Many tables hold a small working set alongside a much larger history, such as open orders among years of completed ones. Add a WHERE clause to CREATE INDEX to index just that working set. The index stays small as the table grows, and queries that target those rows read less data.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/aurora-dsql-partial-indexes/)
