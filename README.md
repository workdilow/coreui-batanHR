# EPC ERP – Construction / EPC Management System

Enterprise-grade ERP untuk industri Construction / EPC dengan kontrol ketat pada:
- Project & WBS
- Budget & commitment
- Progress billing & retention
- WIP & revenue recognition

## 🚫 Scope Lock (Non-Negotiable)

Semua transaksi HARUS:
- Terhubung ke Project
- Terhubung ke WBS
- Melewati workflow approval
- Aman secara accounting

## 🧱 Core Modules

1. **Project & WBS Management**
2. **Budget & Commitment Control**
3. **Procurement (PR–PO–GR)**
4. **Progress & Cost Capture**
5. **Billing, WIP & Retention**

## 🛠 Tech Stack

- **Backend**: Laravel 10+
- **Frontend**: CoreUI Free Bootstrap Admin
- **DB**: PostgreSQL
- **Auth**: Laravel Sanctum
- **Dev Env**: GitHub Codespaces (WAJIB)

## 📂 Repository Structure

```
backend/          Laravel 12 API & business logic
frontend/         CoreUI UI
docs/             Architecture & ERP design
.devcontainer/    Codespaces config
```

## 🔐 Development Rules

- No business logic in controller
- All write = DB transaction
- No hard delete
- No bypass budget control

## 🔄 Workflow Example (PR)

```
DRAFT → SUBMITTED → APPROVED → PO_CREATED → CLOSED
```

## ✅ Definition of Done

- API tested
- UI role-safe
- Project costing intact
- Audit trail tersedia

## 🗺 Roadmap

- **Phase 1**: Project, WBS, Budget
- **Phase 2**: Procurement, Finance
- **Phase 3**: Enterprise (EV, Multi-company)

## 🚀 Getting Started

### Prerequisites

- GitHub Codespaces (WAJIB)
- GitHub account with repository access

### Setup

1. Open repository in GitHub Codespaces
2. Codespaces akan otomatis:
   - Install PHP 8.2 dan Node 18
   - Setup PostgreSQL database
   - Install Laravel dependencies
   - Generate application key
   - Run migrations

### Backend Development

```bash
cd backend
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

## 📝 API Routes

### Project Management
- `GET/POST /api/projects` - Project CRUD
- `POST /api/projects/{id}/wbs` - WBS management

### Procurement
- `GET/POST /api/pr` - Purchase Request
- `GET/POST /api/po` - Purchase Order

### Progress & Billing
- `POST /api/progress` - Progress capture
- `POST /api/billing/progress` - Progress billing

## 👥 Role-Based Access

- **Owner**: Full access
- **Project Manager**: Project & WBS management
- **QS**: Quantity surveying & progress
- **Procurement**: PR & PO management
- **Finance**: Billing & financial reports

## 📚 Documentation

Lihat folder `docs/` untuk:
- Architecture diagrams
- Database schema
- Business process flows
- Integration guides

## 🔒 Security

- All endpoints require authentication via Laravel Sanctum
- Role-based authorization on all resources
- Audit trail on all transactions
- No hard deletes - soft delete only

## 🤝 Contributing

1. WAJIB gunakan GitHub Codespaces
2. Follow development rules
3. Semua PR harus lulus:
   - Unit tests
   - Integration tests
   - Code review
   - Security scan

## 📄 License

Proprietary - All rights reserved
