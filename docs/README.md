# EPC ERP Documentation

This directory contains architecture, design documents, and technical specifications for the EPC ERP Construction Management System.

## 📁 Directory Structure

```
docs/
├── architecture/          # System architecture diagrams
├── database/             # Database schema and ER diagrams
├── business-process/     # Business process flows
├── api/                  # API documentation
└── deployment/           # Deployment guides
```

## 📚 Document Index

### Architecture Documents
- System Architecture Overview
- Module Integration Diagram
- Technology Stack Details
- Security Architecture

### Database Design
- Entity Relationship Diagram
- Database Schema
- Migration Scripts Documentation
- Indexing Strategy

### Business Process Flows
- Project Creation Workflow
- Purchase Request Workflow (PR → PO)
- Progress Measurement & Billing
- Budget Control & Approval Flow
- WIP & Revenue Recognition

### API Documentation
- Authentication & Authorization
- Project Management APIs
- Procurement APIs
- Progress & Billing APIs
- Reporting APIs

### Deployment Guides
- GitHub Codespaces Setup
- Production Deployment
- Database Backup & Recovery
- Monitoring & Logging

## 🎯 Key Concepts

### 1. Project Structure
- **Project**: Top-level container for all activities
- **WBS (Work Breakdown Structure)**: Hierarchical breakdown of project work
- **Budget**: Financial allocation per WBS element
- **All transactions must link to Project + WBS**

### 2. Budget Control
- Budget set at WBS level
- Commitment tracked via PR/PO
- Actual cost recorded via GR/Invoice
- Budget utilization = Commitment + Actual

### 3. Approval Workflow
```
DRAFT → SUBMITTED → APPROVED → EXECUTED → CLOSED
         ↓              ↓
      RETURNED      REJECTED
```

### 4. Progress & Billing
- Physical progress measured by QS
- Progress billing based on measurement
- Retention % withheld
- WIP calculated for revenue recognition

## 📖 Reading Guide

### For Developers
1. Start with Architecture Overview
2. Review Database Schema
3. Understand Business Process Flows
4. Follow API Documentation for implementation

### For Business Users
1. Read Business Process documentation
2. Understand Approval Workflows
3. Review User Role Permissions
4. Check Reporting capabilities

### For System Administrators
1. Review Deployment Guides
2. Understand Security Architecture
3. Study Monitoring & Logging
4. Learn Backup & Recovery procedures

## 🔄 Document Updates

All documentation should be:
- ✅ Kept up-to-date with code changes
- ✅ Reviewed during PR process
- ✅ Version controlled
- ✅ Written in Markdown format

## 📝 Contributing to Documentation

When adding new features:
1. Update relevant architecture diagram
2. Document database schema changes
3. Add API endpoint documentation
4. Update business process flows if needed
5. Include examples and use cases

## 🎨 Diagram Tools

Recommended tools for creating diagrams:
- **Architecture**: draw.io, Lucidchart
- **Database**: dbdiagram.io, MySQL Workbench
- **Process Flow**: draw.io, Microsoft Visio
- **Sequence**: PlantUML, Mermaid

## 📍 Quick Reference

### Core Modules
1. **Project & WBS Management** - Project structure and hierarchy
2. **Budget & Commitment Control** - Financial controls
3. **Procurement (PR-PO-GR)** - Purchase process
4. **Progress & Cost Capture** - Progress measurement
5. **Billing, WIP & Retention** - Financial recognition

### Key Business Rules
- No transaction without Project + WBS
- Budget approval required before exceeding
- Soft delete only (no hard delete)
- All changes logged in audit trail
- Workflow approval mandatory

### Tech Stack
- Backend: Laravel 10+
- Frontend: CoreUI Bootstrap
- Database: PostgreSQL 15
- Auth: Laravel Sanctum
- Dev Environment: GitHub Codespaces

## 🔗 External Resources

- [Laravel Documentation](https://laravel.com/docs)
- [CoreUI Documentation](https://coreui.io/bootstrap/docs/)
- [PostgreSQL Manual](https://www.postgresql.org/docs/)
- [GitHub Codespaces](https://docs.github.com/en/codespaces)

---

For questions or clarifications, please contact the project team or refer to the AI_AGENT.md file for development guidelines.
