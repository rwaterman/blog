+++
title = "GLM-5 (Z.AI)"
weight = 3
+++

This week highlights significant investment in agentic AI infrastructure and operational tooling. Bedrock Managed Agents and AgentCore Gateway enhancements provide AWS-native foundations for autonomous AI applications with proper governance controls. Container platforms advance with ECS VPC Lattice integration enabling sophisticated traffic management, while Kubernetes 1.37 lands on EKS. Security operations consolidate with GuardDuty Runtime Monitoring now bundled into Security Hub, simplifying billing and coverage. AWS Health Version Catalog adds proactive lifecycle management capabilities. Aurora Serverless scaling improvements target bursty AI workloads, reflecting how platform changes increasingly accommodate agentic patterns.

## Amazon ECS adds VPC Lattice support for blue/green and canary deployments

Amazon ECS now supports built-in blue/green, linear, and canary deployment strategies for services using Amazon VPC Lattice. Applications using VPC Lattice for service-to-service communication across VPCs and accounts can now leverage managed traffic shifting natively during rollouts. This eliminates the need for separate traffic management tooling when deploying updates to ECS services connected via VPC Lattice.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-ecs-vpc-lattice-blue-green-deployments)

## Amazon Bedrock Managed Agents enters preview

Bedrock Managed Agents, developed jointly by AWS and OpenAI, provides an AWS-native agent framework built on a customized version of OpenAI's Agents API. Agents run entirely inside AWS with existing IAM identities, permissions, and governance controls. The service manages state persistence, tool selection, code execution, and multi-step coordination. Durable sessions persist conversation state for long-running workflows.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/09/bedrock-managed-agents-preview/)

## Amazon EKS supports Kubernetes version 1.37

Amazon EKS and EKS Distro now support Kubernetes version 1.37. Customers can create new clusters or upgrade existing ones via the console, eksctl, or infrastructure-as-code tools. The update brings new features and bug fixes from the upstream Kubernetes release. Standard version support policies apply for planning upgrade cycles.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-eks-distro-kubernetes-version-1-37)

## GuardDuty Runtime Monitoring joins Security Hub Threat Analytics plan

Amazon GuardDuty Runtime Monitoring is now included in the AWS Security Hub Threat Analytics plan. The feature inspects OS, network, and file activity to detect container escapes, privilege escalation, and cryptomining on EC2, EKS, and ECS Fargate. Security Hub now bills this coverage through unified pricing, eliminating separate GuardDuty enablement for customers with the Threat Analytics plan.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-security-hub-runtime-monitoring/)

## AWS Health introduces version catalog for lifecycle management

AWS Health now offers a version catalog providing centralized lifecycle information for software versions across AWS services. The catalog shifts customers from reactive to proactive management of version upgrades and end-of-support risks. Available in the AWS Health Dashboard and via API for Business Support Plus, Enterprise Support, or Unified Operations customers.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-health-introduces-version-catalog-software-lifecycle-management)

## Aurora Serverless scales faster for agentic AI workloads

Amazon Aurora Serverless now scales in larger increments, adding up to 16 ACUs within a second and reaching 256 ACUs as workloads grow. This faster scaling suits agentic AI applications with bursty activity and long idle periods. The service automatically scales down to zero when idle, maintaining pay-per-use economics for intermittent workloads.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/08/aurora-serverless-instant-16-acu-scaling/)

## AgentCore Gateway adds private TLS certificate support

Amazon Bedrock AgentCore Gateway now supports TLS certificates from private certificate authorities on MCP, OpenAPI, and HTTP proxy targets. This enables secure connections to gateway targets using internally issued certificates. Customers can connect directly to private VPC endpoints without intermediate Application Load Balancers.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/agentcore-gateway-private-tls-vpc/)

## AWS MCP Server expands to six additional Regions

The AWS MCP Server, part of the Agent Toolkit for AWS, is now available in Singapore, Sydney, Tokyo, Ireland, London, and Oregon. This managed Model Context Protocol server gives AI coding agents a single interface to AWS APIs. Agents can discover and call AWS services without maintaining per-service integrations.

[Source](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-mcp-server-six-additional-regions/)
