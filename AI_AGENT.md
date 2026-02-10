# AI Agent Guidelines for EPC ERP Development

## 🤖 Your Role

You are an AI assistant helping to develop an Enterprise-grade ERP system for Construction/EPC industry. Your primary responsibility is to ensure code quality, maintain architectural integrity, and enforce business rules.

## 🚫 Hard Rules (Never Violate)

### 1. Database Schema Changes
**❌ NEVER modify database schema without owner approval**
- Do not add/remove columns without discussion
- Do not change data types without approval
- Do not modify foreign key relationships
- Always propose schema changes first, wait for approval

### 2. Project & WBS Requirement
**✅ ALL logic must be project & WBS based**
- Every transaction MUST have project_id
- Every transaction MUST have wbs_id
- No global/unassociated transactions allowed
- Validate project/WBS existence before any operation

### 3. EPC Scope Lock
**❌ No features outside EPC scope**
- Stay within Construction/EPC domain
- Focus on: Projects, Budget, Procurement, Progress, Billing
- Do not add general-purpose features
- Do not build features for other industries

### 4. Accounting Correctness
**⚖️ Accounting correctness > UI speed**
- Financial integrity is paramount
- Double-entry bookkeeping ALWAYS
- Balance must always match
- Never skip validation for performance

### 5. Thin Controllers
**📏 Controllers must remain thin**
- Request/response handling ONLY
- No business logic in controllers
- All logic in Service layer
- Maximum 20 lines per controller method

## ✅ Allowed Operations

### CRUD Scaffolding
You CAN generate:
- Model boilerplate with proper relationships
- Migration files following conventions
- Controller methods (request/response only)
- Form Request validation classes
- API Resources for JSON responses

Example:
```php
// ✅ ALLOWED: Generate this structure
php artisan make:model PurchaseRequest -mcr
// Then implement service layer separately
```

### Test Generation
You CAN create:
- Unit tests for services
- Feature tests for APIs
- Test factories and seeders
- Integration tests for workflows

Example:
```php
// ✅ ALLOWED: Generate comprehensive tests
class PurchaseRequestTest extends TestCase
{
    public function test_pr_requires_project_and_wbs()
    {
        $response = $this->postJson('/api/pr', [
            'description' => 'Test PR'
        ]);
        
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['project_id', 'wbs_id']);
    }
}
```

### Safe Refactoring
You CAN perform:
- Extract method refactoring
- Rename variables for clarity
- Move logic from controller to service
- Optimize queries (with testing)

Example:
```php
// ✅ ALLOWED: Refactor fat controller to service
// Before (in controller):
public function store(Request $request) {
    $project = Project::find($request->project_id);
    // 50 lines of business logic...
}

// After:
public function store(CreatePRRequest $request) {
    $pr = $this->prService->create($request->validated());
    return new PRResource($pr);
}
```

## 🔒 Always Respect

### Budget Control
- Validate budget availability before commitment
- Check cumulative commitments
- Enforce budget approval workflow
- Calculate budget utilization correctly

```php
// ✅ REQUIRED: Always check budget before PO
if (!$this->budgetService->isAvailable($wbs, $amount)) {
    throw new InsufficientBudgetException();
}
```

### Approval Workflow
- Never skip workflow steps
- Respect approval hierarchy
- Log all approval actions
- Validate approver permissions

```php
// ✅ REQUIRED: Enforce workflow
$pr->status = 'DRAFT';  // Always start here
$pr->save();

// Never jump to:
$pr->status = 'APPROVED';  // ❌ Must go through workflow
```

### Audit Trail
- Log all create/update/delete operations
- Record user who performed action
- Timestamp all changes
- Keep soft-deleted records

```php
// ✅ REQUIRED: Audit every change
AuditLog::create([
    'user_id' => auth()->id(),
    'action' => 'purchase_request.created',
    'model_type' => PurchaseRequest::class,
    'model_id' => $pr->id,
    'changes' => $pr->toArray(),
]);
```

## 📋 Code Review Checklist

Before submitting any code, verify:

- [ ] All transactions have project_id and wbs_id
- [ ] Controllers are thin (< 20 lines per method)
- [ ] Business logic is in Service layer
- [ ] Database transactions used for writes
- [ ] Soft deletes instead of hard deletes
- [ ] Audit trail is logged
- [ ] Budget control is checked
- [ ] Approval workflow is enforced
- [ ] Tests are included
- [ ] No direct SQL queries (use Eloquent)

## 🎯 Best Practices

### Service Layer Pattern
```php
class PurchaseRequestService
{
    public function create(array $data): PurchaseRequest
    {
        DB::beginTransaction();
        try {
            // 1. Validate project & WBS
            $this->validateProjectWBS($data['project_id'], $data['wbs_id']);
            
            // 2. Check budget
            $this->checkBudgetAvailability($data['wbs_id'], $data['amount']);
            
            // 3. Create PR
            $pr = PurchaseRequest::create([
                ...$data,
                'status' => 'DRAFT',
                'created_by' => auth()->id(),
            ]);
            
            // 4. Audit log
            $this->auditLog('pr.created', $pr);
            
            DB::commit();
            return $pr;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
```

### Consistent Error Handling
```php
// Use custom exceptions
class BudgetExceededException extends BusinessException {}
class InvalidWorkflowStateException extends BusinessException {}

// Handle in controller
try {
    $pr = $this->prService->create($request->validated());
    return new PRResource($pr);
} catch (BudgetExceededException $e) {
    return response()->json(['error' => $e->getMessage()], 422);
}
```

### Proper Validation
```php
class CreatePurchaseRequestRequest extends FormRequest
{
    public function rules()
    {
        return [
            'project_id' => 'required|exists:projects,id',
            'wbs_id' => 'required|exists:wbs,id',
            'description' => 'required|string|max:500',
            'amount' => 'required|numeric|min:0',
            'requested_date' => 'required|date|after:today',
        ];
    }
    
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if (!$this->isWBSBelongsToProject()) {
                $validator->errors()->add('wbs_id', 'WBS must belong to the project');
            }
        });
    }
}
```

## 🚀 Development Workflow

1. **Understand Requirement**: Read issue/feature request carefully
2. **Design Service Layer**: Plan business logic flow
3. **Create Migration**: With proper foreign keys and indexes
4. **Build Model**: With relationships and scopes
5. **Implement Service**: With transactions and validations
6. **Create Controller**: Thin layer, delegate to service
7. **Write Tests**: Unit + Feature tests
8. **Document API**: Update API documentation
9. **Code Review**: Self-review against checklist

## ❓ When In Doubt

If you're unsure about:
- Schema changes → Ask owner
- New feature scope → Check if it's EPC-related
- Performance vs correctness → Choose correctness
- Complex business logic → Document thoroughly

## 🔄 Continuous Improvement

As you work on this codebase:
- Learn from existing patterns
- Maintain consistency
- Suggest improvements (don't implement without approval)
- Document unusual decisions
- Keep code readable and maintainable

## 📞 Getting Help

When you encounter issues:
1. Check this guide first
2. Review existing similar code
3. Consult Laravel documentation
4. Ask specific questions to owner
5. Never guess about business rules

---

**Remember**: You are building a mission-critical financial system. When in doubt, prefer safety over convenience, correctness over speed, and clarity over cleverness.
