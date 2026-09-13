# 1. Record Architecture Decisions

Date: 2026-09-13

## Status
Accepted

## Context
We need a standard mechanism to record architecturally significant decisions made during the lifecycle of this project. Without a persistent log, the context, trade-offs, and alternatives considered are quickly forgotten, leading to architectural erosion and inconsistent AI-assisted modifications.

## Decision
We will use Architecture Decision Records (ADRs) as outlined by Michael Nygard. Each ADR documents a single significant decision, structured as Context, Decision, and Consequences.

Key guidelines:
1. ADRs are numbered sequentially (e.g. `0001-record-architecture-decisions.md`, `0002-adopt-fastapi.md`).
2. Once accepted, ADRs are immutable. If a decision is superseded, create a new ADR referencing the superseded record.
3. Every non-trivial architectural change proposed by developers or AI agents must include an accompanying ADR.

## Consequences
- **Positive**: Transparent architectural history; AI agents understand the *why* behind design choices and do not propose previously rejected patterns.
- **Negative**: Minor overhead when adopting new architecture patterns or major dependencies.
