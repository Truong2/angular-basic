# TASK001 - Add i18n for Angular App

**Status:** In Progress  
**Added:** 2025-12-17  
**Updated:** 2025-12-17

## Original Request

create task: add i18n for angular

## Thought Process

The project already includes some i18n scaffolding (`src/assets/i18n/en.json`, `ja.json`, `vi.json` and an `i18n.service` in `core/services`).  
This task formalizes the work of wiring i18n cleanly through the Angular app so that:

- Text in key screens (login, layouts, shared components) is fully driven by translation keys.
- Language switching is handled via a dedicated control (e.g., `LanguageSwitcher` component) and persisted appropriately.
- The i18n architecture is consistent and easy to extend for new features and languages.

The concrete implementation details (services, pipes, helpers) will be clarified when this task is actively executed, but the plan below defines the main steps.

## Implementation Plan

- Audit existing i18n setup (JSON files, `i18n.service`, any pipes or directives) and document current behavior.
- Define/normalize translation key structure (namespacing, conventions) for core flows (login, layouts, shared components).
- Replace hard-coded text in templates (login, layouts, shared components) with i18n keys.
- Implement or refine language switching mechanism (e.g., `LanguageSwitcher` component) and connect it to `i18n.service`.
- Ensure selected language is persisted (e.g., in local storage) and restored on app init.
- Add or update tests/docs around i18n behavior where appropriate.

## Progress Tracking

**Overall Status:** In Progress - 10%

### Subtasks

| ID  | Description                                                    | Status      | Updated    | Notes                                                                                                    |
| --- | -------------------------------------------------------------- | ----------- | ---------- | -------------------------------------------------------------------------------------------------------- |
| 1.1 | Audit existing i18n service, JSON files, and usage             | Completed   | 2025-12-17 | Confirmed ngx-translate setup, translation JSONs for en/vi/ja, and language persistence via localStorage |
| 1.2 | Define/standardize translation key naming and structure        | Not Started | 2025-12-17 |                                                                                                          |
| 1.3 | Replace hard-coded strings in login and layouts with i18n keys | Not Started | 2025-12-17 |                                                                                                          |
| 1.4 | Wire/implement `LanguageSwitcher` with `i18n.service`          | Not Started | 2025-12-17 |                                                                                                          |
| 1.5 | Persist and restore selected language across sessions          | Not Started | 2025-12-17 |                                                                                                          |
| 1.6 | Add/update tests and minimal documentation for i18n usage      | Not Started | 2025-12-17 |                                                                                                          |

## Progress Log

### 2025-12-17

- Task created based on user request to "add i18n for angular".
- Documented current inferred i18n context and defined initial implementation plan and subtasks.

### 2025-12-17

- Marked task as In Progress and completed initial audit of current i18n setup.
- Verified presence of `en.json`, `ja.json`, `vi.json` with consistent key structure for common, label, message, and validation sections.
- Confirmed `I18nService` uses `@ngx-translate/core`, supports `en`, `vi`, `ja`, persists language in `localStorage` (`app-language`), and exposes helper methods for validation and translation.
