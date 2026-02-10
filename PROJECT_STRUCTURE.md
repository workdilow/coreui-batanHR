# EPC ERP Project Structure

This document provides an overview of the project structure that has been implemented.

## 📁 Directory Layout

```
coreui-batanHR/
├── .devcontainer/              # GitHub Codespaces configuration
│   ├── devcontainer.json       # Dev container settings (PHP 8.2, Node 18)
│   └── docker-compose.yml      # Docker services (app + PostgreSQL)
│
├── backend/                    # Laravel 12 Backend API
│   ├── app/
│   │   ├── Modules/
│   │   │   ├── Project/        # Project & WBS Management module
│   │   │   ├── Procurement/    # PR, PO, GR module
│   │   │   └── Finance/        # Billing, WIP, Retention module
│   │   ├── Services/           # Business logic layer
│   │   └── Http/Controllers/   # Request/response handlers
│   ├── .gitignore
│   └── README.md               # Backend setup and development guide
│
├── frontend/                   # CoreUI Free Bootstrap Admin
│   ├── .gitignore
│   └── README.md               # Frontend setup and CoreUI integration guide
│
├── docs/                       # Architecture & ERP design documentation
│   └── README.md               # Documentation index and guidelines
│
├── AI_AGENT.md                 # AI development guidelines and rules
├── README.md                   # Main project README (EPC ERP)
└── README_COREUI_ORIGINAL.md   # Original CoreUI documentation (backup)
```

## 📝 Key Files Created

### 1. README.md (Main Project Documentation)
- **Purpose**: Primary documentation for EPC ERP system
- **Contents**:
  - Project overview and scope lock
  - Core modules (Project & WBS, Budget, Procurement, Progress, Billing)
  - Tech stack (Laravel, CoreUI, PostgreSQL, Sanctum)
  - Development rules and workflow
  - API routes overview
  - Role-based access control
  - Getting started guide

### 2. .devcontainer/ (GitHub Codespaces Configuration)
- **devcontainer.json**: 
  - PHP 8.2 and Node 18 environment
  - VS Code extensions (Intelephense, PHP Debug, Prettier)
  - Post-create commands for Laravel setup
  
- **docker-compose.yml**:
  - PHP application container
  - PostgreSQL 15 database
  - Pre-configured database credentials

### 3. backend/README.md (Backend Development Guide)
- **Purpose**: Complete guide for Laravel backend development
- **Contents**:
  - Directory structure explanation
  - Setup instructions for Laravel
  - Development rules (thin controllers, service layer)
  - API routes definition
  - Database transaction patterns
  - Migration guidelines
  - Testing approach
  - Security guidelines

### 4. frontend/README.md (Frontend Development Guide)
- **Purpose**: Guide for CoreUI integration and customization
- **Contents**:
  - Setup instructions for CoreUI template
  - ERP feature to CoreUI component mapping
  - Role-based menu structure (Owner, PM, QS, Procurement, Finance)
  - Key pages to customize
  - API integration patterns
  - Styling guidelines
  - Component usage examples

### 5. docs/README.md (Documentation Index)
- **Purpose**: Central documentation hub
- **Contents**:
  - Document organization structure
  - Key concepts (Project, WBS, Budget, Workflow)
  - Reading guide for different roles
  - Documentation update guidelines
  - Quick reference for core modules and business rules

### 6. AI_AGENT.md (AI Development Guidelines)
- **Purpose**: Guidelines for AI-assisted development
- **Contents**:
  - Hard rules (5 non-negotiable principles)
  - Allowed operations (scaffolding, testing, refactoring)
  - Required behaviors (budget control, approval workflow, audit trail)
  - Code review checklist
  - Best practices with code examples
  - Development workflow
  - Error handling patterns

## 🎯 Implementation Status

✅ **Completed**:
- [x] Main README with EPC ERP documentation
- [x] GitHub Codespaces configuration (.devcontainer)
- [x] Backend directory structure with module placeholders
- [x] Frontend directory structure with documentation
- [x] Documentation directory with comprehensive README
- [x] AI Agent guidelines with development rules
- [x] .gitignore files for backend and frontend
- [x] Original CoreUI README preserved as backup

⏳ **Next Steps**:
1. Install Laravel in backend directory
2. Clone CoreUI template in frontend directory
3. Create base database migrations
4. Implement authentication with Laravel Sanctum
5. Build core module scaffolding
6. Create API endpoints
7. Customize CoreUI for ERP use cases

## 🔐 Key Principles Enforced

1. **Scope Lock**: All transactions must link to Project + WBS
2. **Thin Controllers**: Business logic in Service layer only
3. **DB Transactions**: All write operations wrapped in transactions
4. **Soft Deletes**: No hard deletes allowed
5. **Budget Control**: No bypass of budget validation
6. **Workflow Approval**: All transactions follow approval flow
7. **Audit Trail**: All changes logged for compliance

## 🛠 Technology Stack

- **Backend**: Laravel 10+ (PHP 8.2)
- **Frontend**: CoreUI Free Bootstrap Admin (Node 18)
- **Database**: PostgreSQL 15
- **Authentication**: Laravel Sanctum
- **Development**: GitHub Codespaces (mandatory)
- **Version Control**: Git

## 📚 Documentation Structure

The documentation is organized for different audiences:
- **Developers**: Architecture, API, Database schema
- **Business Users**: Business processes, workflows, roles
- **System Admins**: Deployment, security, monitoring

## 🚀 Getting Started

1. Open repository in GitHub Codespaces
2. Container will automatically:
   - Setup PHP 8.2 and Node 18
   - Start PostgreSQL database
   - Run backend setup commands
3. Follow backend/README.md for Laravel installation
4. Follow frontend/README.md for CoreUI setup
5. Refer to AI_AGENT.md for development guidelines

## 📞 Support

- Review docs/README.md for comprehensive documentation
- Check AI_AGENT.md for development guidelines
- Follow backend/README.md and frontend/README.md for specific setup

---

**Status**: Initial project structure complete and ready for development.
