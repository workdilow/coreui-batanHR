/**
 * EPC ERP Main JavaScript
 * Handles client-side interactions for the ERP system
 */

// API Configuration
const API_BASE_URL = 'http://localhost:8000/api';
let authToken = localStorage.getItem('erp_auth_token');

// API Request Helper
async function apiRequest(endpoint, options = {}) {
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
      ...options.headers
    }
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      if (response.status === 401) {
        // Unauthorized - redirect to login
        localStorage.removeItem('erp_auth_token');
        window.location.href = 'login.html';
        return;
      }
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request Failed:', error);
    showNotification('error', 'Request Failed', error.message);
    throw error;
  }
}

// Notification System
function showNotification(type, title, message) {
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-white bg-${type === 'error' ? 'danger' : type} border-0`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');
  
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <strong>${title}</strong><br>
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-coreui-dismiss="toast"></button>
    </div>
  `;
  
  // Append to toast container or create one
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    document.body.appendChild(container);
  }
  
  container.appendChild(toast);
  
  const bsToast = new coreui.Toast(toast);
  bsToast.show();
  
  // Auto remove after hide
  toast.addEventListener('hidden.coreui.toast', () => {
    toast.remove();
  });
}

// Role-Based UI Management
function initializeRoleBasedUI() {
  const userRole = localStorage.getItem('user_role') || 'guest';
  
  // Hide elements not allowed for this role
  document.querySelectorAll('[data-role]').forEach(element => {
    const allowedRoles = element.dataset.role.split(',').map(r => r.trim());
    if (!allowedRoles.includes(userRole) && !allowedRoles.includes('all')) {
      element.style.display = 'none';
    }
  });
  
  // Update UI based on role
  const roleDisplay = document.querySelector('.user-role-display');
  if (roleDisplay) {
    roleDisplay.textContent = userRole.replace('_', ' ').toUpperCase();
  }
}

// Format Currency
function formatCurrency(amount, currency = 'IDR') {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  }).format(amount);
}

// Format Date
function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Format DateTime
function formatDateTime(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Workflow Status Helper
function getWorkflowStatusBadge(status) {
  const statusMap = {
    'DRAFT': 'secondary',
    'SUBMITTED': 'info',
    'APPROVED': 'success',
    'REJECTED': 'danger',
    'PENDING': 'warning',
    'CLOSED': 'dark'
  };
  
  const badgeClass = statusMap[status] || 'secondary';
  return `<span class="badge bg-${badgeClass}">${status}</span>`;
}

// Budget Progress Helper
function calculateBudgetProgress(budget, commitment, actual) {
  const total = commitment + actual;
  const percentage = (total / budget) * 100;
  
  let progressClass = 'bg-success';
  if (percentage >= 100) {
    progressClass = 'bg-danger';
  } else if (percentage >= 80) {
    progressClass = 'bg-warning';
  }
  
  return {
    percentage: percentage.toFixed(2),
    progressClass: progressClass,
    remaining: budget - total
  };
}

// Load Projects (Example API Call)
async function loadProjects() {
  try {
    const projects = await apiRequest('/projects');
    return projects;
  } catch (error) {
    console.error('Failed to load projects:', error);
    return [];
  }
}

// Load Dashboard Stats (Example)
async function loadDashboardStats() {
  try {
    const stats = await apiRequest('/dashboard/stats');
    
    // Update UI with stats
    if (stats) {
      document.querySelector('#active-projects')?.textContent = stats.activeProjects || 0;
      document.querySelector('#pending-approvals')?.textContent = stats.pendingApprovals || 0;
      document.querySelector('#budget-utilization')?.textContent = `${stats.budgetUtilization || 0}%`;
      document.querySelector('#active-pos')?.textContent = stats.activePOs || 0;
    }
  } catch (error) {
    console.error('Failed to load dashboard stats:', error);
  }
}

// Form Validation
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;
  
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('is-invalid');
      isValid = false;
    } else {
      field.classList.remove('is-invalid');
    }
  });
  
  return isValid;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize role-based UI
  initializeRoleBasedUI();
  
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-coreui-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new coreui.Tooltip(tooltipTriggerEl);
  });
  
  // Load dashboard stats if on dashboard page
  if (window.location.pathname.includes('dashboard')) {
    loadDashboardStats();
  }
  
  console.log('ERP System Initialized');
});

// Export for use in other scripts
window.ERPSystem = {
  apiRequest,
  showNotification,
  formatCurrency,
  formatDate,
  formatDateTime,
  getWorkflowStatusBadge,
  calculateBudgetProgress,
  loadProjects,
  validateForm
};
