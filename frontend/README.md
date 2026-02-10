# Frontend Structure

CoreUI Free Bootstrap Admin for EPC ERP

## Directory Structure

```
frontend/
├── coreui/                # CoreUI template files
│   ├── src/
│   ├── dist/
│   └── views/
├── assets/               # Custom assets
│   ├── css/
│   ├── js/
│   └── images/
└── README.md
```

## Setup Instructions

### 1. Clone CoreUI Template

```bash
cd frontend
git clone https://github.com/coreui/coreui-free-bootstrap-admin-template.git coreui
cd coreui
npm install
```

### 2. CoreUI to ERP Mapping

| ERP Feature | CoreUI Component |
|-------------|------------------|
| Dashboard | widgets.html |
| Project & WBS | tree-view + cards |
| Budget Control | progress bar |
| Approval Workflow | modal + badge |
| Data Tables | tables.html |
| Forms | forms.html |

## Role-Based Menu Structure

### Owner
- ✅ Full system access
- ✅ All modules visible
- ✅ System configuration

### Project Manager
- ✅ Project & WBS management
- ✅ Budget tracking
- ✅ Progress monitoring
- ❌ Financial posting

### QS (Quantity Surveyor)
- ✅ Progress measurement
- ✅ Quantity tracking
- ✅ WBS costing
- ❌ Budget approval

### Procurement
- ✅ PR/PO management
- ✅ Vendor management
- ✅ GR processing
- ❌ Budget approval

### Finance
- ✅ Billing & invoicing
- ✅ WIP calculation
- ✅ Revenue recognition
- ✅ Financial reports
- ❌ Project creation

## Key Pages to Customize

### 1. Dashboard (index.html)
- Project overview cards
- Budget vs Actual charts
- Pending approvals
- Recent activities

### 2. Project Management
- Project list (tables.html)
- Project detail (cards.html)
- WBS tree (tree-view or custom)

### 3. Procurement
- PR list with status badges
- PO management
- Approval workflow modal

### 4. Progress & Billing
- Progress entry form
- Billing schedule
- Retention tracking

### 5. Reports
- Budget reports
- Cost analysis
- Progress curves

## Menu Configuration

Edit `coreui/src/views/_nav.html` or equivalent:

```html
<li class="nav-item">
  <a class="nav-link" href="dashboard.html">
    <i class="nav-icon cil-speedometer"></i> Dashboard
  </a>
</li>
<li class="nav-item nav-group" data-role="owner,pm">
  <a class="nav-link nav-group-toggle" href="#">
    <i class="nav-icon cil-puzzle"></i> Projects
  </a>
  <ul class="nav-group-items">
    <li class="nav-item">
      <a class="nav-link" href="projects.html">Project List</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="wbs.html">WBS Management</a>
    </li>
  </ul>
</li>
<li class="nav-item" data-role="procurement">
  <a class="nav-link" href="procurement.html">
    <i class="nav-icon cil-cart"></i> Procurement
  </a>
</li>
<li class="nav-item" data-role="finance">
  <a class="nav-link" href="billing.html">
    <i class="nav-icon cil-dollar"></i> Billing
  </a>
</li>
```

## API Integration

### Configuration
Create `frontend/assets/js/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000/api';

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('api_token');
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    }
  };
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  return response.json();
}

// Example usage
async function getProjects() {
  return await apiRequest('/projects');
}

async function createProject(data) {
  return await apiRequest('/projects', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}
```

### Role-Based UI

```javascript
// Check user role and show/hide menu items
function initializeRoleBasedUI() {
  const userRole = localStorage.getItem('user_role');
  
  document.querySelectorAll('[data-role]').forEach(element => {
    const allowedRoles = element.dataset.role.split(',');
    if (!allowedRoles.includes(userRole)) {
      element.style.display = 'none';
    }
  });
}

// Call on page load
document.addEventListener('DOMContentLoaded', initializeRoleBasedUI);
```

## Styling Guidelines

- Use CoreUI default theme
- Maintain consistent color scheme:
  - Primary: Project-related actions
  - Success: Approved status
  - Warning: Pending approval
  - Danger: Rejected/Error
  - Info: Information/Help

## Components Usage

### Status Badges
```html
<span class="badge bg-success">APPROVED</span>
<span class="badge bg-warning">PENDING</span>
<span class="badge bg-danger">REJECTED</span>
```

### Progress Bars (Budget)
```html
<div class="progress">
  <div class="progress-bar" role="progressbar" 
       style="width: 75%" 
       aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
    75% Used
  </div>
</div>
```

### Approval Modal
```html
<button type="button" class="btn btn-primary" data-coreui-toggle="modal" data-coreui-target="#approvalModal">
  Approve PR
</button>

<div class="modal fade" id="approvalModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Approve Purchase Request</h5>
        <button type="button" class="btn-close" data-coreui-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <!-- Approval form -->
      </div>
    </div>
  </div>
</div>
```

## Development Workflow

1. Start backend API server
2. Run CoreUI development server:
   ```bash
   cd frontend/coreui
   npm run serve
   ```
3. Access at http://localhost:3000

## Build for Production

```bash
cd frontend/coreui
npm run build
```

Output will be in `dist/` directory ready for deployment.

## Next Steps

1. Clone CoreUI template into frontend directory
2. Customize navigation menu
3. Create API integration layer
4. Implement role-based UI
5. Build project-specific pages
