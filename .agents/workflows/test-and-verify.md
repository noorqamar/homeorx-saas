# Test & Verification Workflow

Use this workflow to execute tests, diagnose failures, verify changes, and ensure regressions are prevented before committing code.

---

## Steps to Execute

### 1. Scope Determination
- Determine the scope of recent modifications (which files and modules were touched).
- Identify relevant unit, integration, or end-to-end tests that cover those modules.

### 2. Targeted Execution
- Run targeted tests first for rapid feedback.
- If errors occur:
  - Isolate the stack trace and failing assertions.
  - Formulate an exact fix addressing root causes rather than patching symptoms.
  - Re-run targeted tests to verify the fix.

### 3. Full Suite Regression Test
- Run the full test suite as defined in `AGENTS.md`.
- Ensure all tests pass with zero regressions.

### 4. Build & Type Check
- Trigger the project build command to verify compilation integrity and bundler output.
- Check for type check errors (e.g. `tsc --noEmit`, `mypy`, `pyright`).

### 5. Sign-off Checklist
- [ ] Targeted tests passed
- [ ] Full suite passed
- [ ] Types and builds succeed without warnings
- [ ] Documentation updated if behavior changed
