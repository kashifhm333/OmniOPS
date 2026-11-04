# OmniOPS — Infrastructure as Code (IaC) Specification

| Attribute | Details |
| :--- | :--- |
| **Document ID** | `DOC-08-OPS-03` |
| **Status** | `Draft` (Pending Review) |
| **Version** | `0.1.0` |
| **Document Owner** | Lead Cloud Infrastructure Architect Placeholder |
| **Target Audience** | DevOps Engineers, SREs, Security Engineers, Cloud Economists |
| **Last Updated** | 2026-11-04 (UTC) |

---

## 1. Document Control & Executive Summary

### 1.1 Executive Summary
This specification defines the cloud architecture, resource topologies, network isolation models, and automated provisioning pipelines for OmniOPS using **Terraform (v1.5+)**. The target production environment is orchestrated on **Amazon Web Services (AWS)** across multi-AZ isolated subnets, utilizing managed container runtimes, automated secret management, and remote encrypted state backends.

---

## 2. AWS Multi-Account & Network Architecture

```mermaid
flowchart TD
    subgraph Internet["Public Internet"]
        USER["End User / Browser / CLI"]
    end

    subgraph AWSCloud["AWS Production VPC (10.0.0.0/16)"]
        subgraph PublicSubnets["Public Ingress Tier (Subnets: 10.0.1.0/24, 10.0.2.0/24)"]
            ALB["Application Load Balancer (ALB)\n- TLS 1.3 Termination (ACM Cert)\n- AWS WAF Protection"]
            NAT["NAT Gateways (Multi-AZ)"]
        end

        subgraph PrivateSubnets["Application Compute Tier (Subnets: 10.0.10.0/24, 10.0.20.0/24)"]
            ECS_API["ECS Fargate Tasks: Express API\n(No Public IPs)"]
            ECS_WRK["ECS Fargate Tasks: Background Workers\n(No Public IPs)"]
        end

        subgraph IsolatedSubnets["Database & Persistence Tier (Subnets: 10.0.100.0/24, 10.0.200.0/24)"]
            MONGO[(Managed MongoDB / DocumentDB Cluster\n- Multi-AZ Replica Set\n- Inaccessible from Public Internet)]
            KMS["AWS KMS Key Management Service"]
        end
    end

    USER -->|HTTPS (443)| ALB
    ALB -->|HTTP Internal (4000)| ECS_API
    ECS_API -->|MongoDB Wire Protocol (27017)| MONGO
    ECS_WRK -->|MongoDB Wire Protocol (27017)| MONGO
    ECS_API -->|Decrypt Keys| KMS
    ECS_WRK -->|Outbound HTTPS via NAT| NAT
    NAT -->|Egress to Internet| Internet
```

---

## 3. Compute & Database Architecture Decisions

### 3.1 Compute Engine: AWS ECS Fargate vs. EKS
- **Decision (Proposed)**: Adopt **AWS ECS on Fargate**.
  - *Rationale*: Eliminates the operational burden, security patching, and cluster control-plane overhead of Kubernetes for the OmniOPS modular monolith. Docker containers run serverless with automatic horizontal task autoscaling.

### 3.2 MongoDB Hosting Topology
- **Production Target**: Managed **MongoDB Atlas (AWS Peering)** or AWS DocumentDB with MongoDB 5.0+ compatibility.
- **Teardown Safeguards**: Production database terraform resources explicitly enforce `lifecycle { prevent_destroy = true }` to eliminate accidental deletion risks.

---

## 4. Terraform State Management & Module Layout

### 4.1 State Backend Configuration
Terraform state is stored in an encrypted Amazon S3 bucket with strict locking:
```hcl
terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket         = "omniops-terraform-state-prod"
    key            = "production/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "omniops-terraform-locks"
  }
}
```

### 4.2 Module Inventory (`infrastructure/terraform/modules/`)
- `modules/vpc`: Subnets, Route Tables, Internet Gateway, NAT Gateways across 2 Availability Zones.
- `modules/alb`: Load balancer, target groups, security groups, ACM certificate binding.
- `modules/ecs`: ECS Cluster, Task Definitions, Fargate Service, autoscaling alarms.
- `modules/kms`: Customer Managed Key (CMK) for envelope encryption and S3 state encryption.
- `modules/secrets`: AWS Secrets Manager references.

---

## 5. Security & Least Privilege IAM Policies

1. **Task Execution Role**: Permits ECS tasks to pull images from Amazon ECR and push logs to Amazon CloudWatch.
2. **Task Runtime Role**: Scoped exclusively to reading required secrets from Secrets Manager and invoking `kms:Decrypt` on the designated application KEK.
3. **No IAM Keys in Code**: All provisioning actions executed via GitHub Actions assume an ephemeral IAM role using GitHub OIDC.

---

## 6. Related Documents & Traceability

- [CI/CD & Deployment Strategy](CI_CD_AND_DEPLOYMENT.md)
- [Containerization & Local Development](CONTAINERIZATION_AND_LOCAL_DEVELOPMENT.md)
- [Security Architecture](../06-security/SECURITY_ARCHITECTURE.md)
- [Database Architecture](../05-database/DATABASE_DESIGN.md)
