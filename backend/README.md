# Backend Structure

Laravel 12 API & Business Logic

## Directory Structure

```
app/
├── Modules/
│   ├── Project/           # Project & WBS Management
│   │   ├── Controllers/
│   │   ├── Models/
│   │   ├── Services/
│   │   └── Routes/
│   ├── Procurement/       # PR, PO, GR Management
│   │   ├── Controllers/
│   │   ├── Models/
│   │   ├── Services/
│   │   └── Routes/
│   └── Finance/           # Billing, WIP, Retention
│       ├── Controllers/
│       ├── Models/
│       ├── Services/
│       └── Routes/
├── Services/              # Shared business logic
└── Http/Controllers/      # Base controllers
```

## Setup Instructions

### 1. Create Laravel Project

```bash
cd backend
composer create-project laravel/laravel .
php artisan install:api
```

### 2. Configure Database

Edit `.env`:
```
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=epc_erp
DB_USERNAME=erp
DB_PASSWORD=erp
```

### 3. Install Module Generator (Optional)

```bash
composer require nwidart/laravel-modules
php artisan vendor:publish --provider="Nwidart\Modules\LaravelModulesServiceProvider"
```

### 4. Create Modules

```bash
php artisan module:make Project
php artisan module:make Procurement
php artisan module:make Finance
```

## Development Rules

### Controller Rules
- **Request/Response ONLY**
- No business logic in controllers
- Use Form Requests for validation
- Return JSON responses

Example:
```php
class ProjectController extends Controller
{
    public function store(CreateProjectRequest $request)
    {
        $project = $this->projectService->create($request->validated());
        return response()->json($project, 201);
    }
}
```

### Service Layer Rules
- **All business logic goes here**
- Handle DB transactions
- Implement approval workflows
- Ensure project & WBS association

Example:
```php
class ProjectService
{
    public function create(array $data): Project
    {
        return DB::transaction(function () use ($data) {
            $project = Project::create($data);
            $this->createDefaultWBS($project);
            $this->auditLog('project.created', $project);
            return $project;
        });
    }
}
```

### Model Rules
- Use soft deletes
- Include audit trail
- Define relationships
- Implement scopes for project/WBS filtering

Example:
```php
class PurchaseRequest extends Model
{
    use SoftDeletes, HasAuditTrail;
    
    protected $fillable = ['project_id', 'wbs_id', 'status', ...];
    
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    
    public function wbs()
    {
        return $this->belongsTo(WBS::class);
    }
}
```

## API Routes

### Project Management
```php
Route::apiResource('projects', ProjectController::class);
Route::post('projects/{id}/wbs', WbsController::class);
```

### Procurement
```php
Route::apiResource('pr', PurchaseRequestController::class);
Route::apiResource('po', PurchaseOrderController::class);
Route::post('pr/{id}/submit', [PurchaseRequestController::class, 'submit']);
Route::post('pr/{id}/approve', [PurchaseRequestController::class, 'approve']);
```

### Progress & Billing
```php
Route::post('progress', ProgressController::class);
Route::post('billing/progress', BillingController::class);
```

## Database Transaction Pattern

All write operations MUST use transactions:

```php
DB::transaction(function () {
    // Create/Update/Delete operations
    // Budget validation
    // Approval workflow
    // Audit trail
});
```

## Testing

```bash
php artisan test
php artisan test --filter=ProjectTest
```

## Migration Guidelines

- Always include project_id and wbs_id in transaction tables
- Use foreign keys with cascading rules
- Include audit columns (created_by, updated_by, deleted_by)
- Add workflow status columns

Example:
```php
Schema::create('purchase_requests', function (Blueprint $table) {
    $table->id();
    $table->foreignId('project_id')->constrained()->onDelete('restrict');
    $table->foreignId('wbs_id')->constrained()->onDelete('restrict');
    $table->string('pr_number')->unique();
    $table->enum('status', ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED', 'CLOSED']);
    $table->decimal('amount', 15, 2);
    $table->foreignId('created_by')->constrained('users');
    $table->timestamps();
    $table->softDeletes();
});
```

## Security

- Use Laravel Sanctum for API authentication
- Implement role-based authorization
- Validate project/WBS access per user
- Log all transactions for audit

## Next Steps

1. Install Laravel in the backend directory
2. Configure database connection
3. Create base models and migrations
4. Implement authentication
5. Build module scaffolding
