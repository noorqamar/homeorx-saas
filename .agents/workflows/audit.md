# Code Quality, Security & Dependency Audit Workflow

Use this workflow to systematically inspect the repository for code quality, dependency vulnerabilities, dead code, and configuration drift.

---

## Steps to Execute

### 1. Dependency & Security Check
- Inspect package manifest files (`package.json`, `pyproject.toml`, `Cargo.toml`, etc.).
- Run security audit command if available:
  - Node: `npm audit` or `pnpm audit`
  - Python: `pip-audit` or `safety check`
  - Rust: `cargo audit`
- Check for outdated or deprecated packages.

### 2. Static Analysis & Linting
- Execute the project linter / type checker.
- Record any unused imports, untyped variables, or broken docstrings.
- Ensure formatting adheres to the repository standard.

### 3. Documentation & Memory Audit
- Verify that [PROJECT_MAP.md](../../PROJECT_MAP.md) accurately reflects all current directories and entry points.
- Verify that [ARCHITECTURE.md](../../ARCHITECTURE.md) matches the active system topology.
- Flag any undocumented modules or unreferenced configurations.

### 4. Audit Summary Report
- Produce a structured markdown summary outlining:
  - Critical / High findings
  - Code hygiene improvements
  - Documentation synchronization tasks
