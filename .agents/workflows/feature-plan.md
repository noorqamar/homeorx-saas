# Feature Planning & Execution Workflow

Use this workflow when planning and executing a non-trivial new feature or architectural refactor.

---

## Steps to Execute

### 1. Requirements Discovery & Boundary Check
- Clarify user requirements and desired outcome.
- Consult [ARCHITECTURE.md](../../ARCHITECTURE.md) to identify invariants and affected components.
- Check [PROJECT_MAP.md](../../PROJECT_MAP.md) to locate relevant modules, data schemas, and interfaces.

### 2. Architectural Design & ADR
- If the feature introduces new external dependencies, state management paradigms, or API contracts:
  - Draft an Architecture Decision Record in `docs/decisions/` using the ADR template.
  - Define clear interface boundaries.

### 3. Implementation Plan
- Formulate a phased step-by-step implementation plan:
  1. Data layer / schemas / models
  2. Business logic / services
  3. UI / API routes / controllers
  4. Unit & integration tests

### 4. Step-by-Step Execution & Verification
- Implement changes phase-by-phase.
- Run tests continuously during implementation.
- Maintain existing code conventions and formatting.

### 5. Memory & Documentation Update
- Update [PROJECT_MAP.md](../../PROJECT_MAP.md) with any newly added files or directories.
- Update [ARCHITECTURE.md](../../ARCHITECTURE.md) if component relationships or data flows changed.
