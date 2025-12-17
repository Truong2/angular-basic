# System Patterns - Angular Basic App

## Architecture Overview
- **Entry Point:** `src/main.ts` bootstraps the Angular application using configuration from `app.config.ts`.
- **Core Layer (`src/app/core`)**
  - `config` and `constants` centralize configuration values (e.g., routes, lengths).
  - `guards` (`auth.guard.ts`, `guest.guard.ts`) control access to routes based on auth state.
  - `interceptors` (`auth.interceptor.ts`, `refresh.interceptor.ts`, `error.interceptor.ts`) handle HTTP concerns like auth headers, token refresh, and error handling.
  - `services` (e.g., `api.service.ts`, `auth.service.ts`, `user.service.ts`, `i18n.service.ts`) encapsulate shared logic and external communication.
  - `validators` hold validation schemas and custom validators (including Zod examples).

- **Features Layer (`src/app/features`)**
  - Feature-specific logic and UI, e.g.:
    - `login` feature: login page template, styling, and logic.
    - `dashboard` feature: main authenticated landing view.

- **Layouts Layer (`src/app/layouts`)**
  - `public` and `private` layouts to wrap feature routes depending on auth state.

- **Shared Layer (`src/app/shared`)**
  - `components`: reusable UI (e.g., `Button`, `FormItem`, `TextInput`, `LanguageSwitcher`).
  - `directives` and `pipes`: cross-cutting UX concerns (currently placeholders or expanding).

## Key Design Patterns
- **Separation of Concerns**
  - Core services and utilities are kept under `core`.
  - Visual and reusable UI is under `shared`.
  - Business flows are split into feature folders.

- **HTTP Interceptor Chain**
  - Outgoing HTTP requests are passed through interceptors in a defined order:
    1. `auth.interceptor` – attach auth token, handle basic auth headers.
    2. `refresh.interceptor` – detect expired tokens, refresh when needed.
    3. `error.interceptor` – capture and normalize API errors.

- **Routing & Guards**
  - Routes are defined in `app.routes.ts`.
  - Guards check auth state before navigation, redirecting to login or dashboard as appropriate.

- **Configuration & Environments**
  - `environment.ts` files hold environment-specific endpoints and flags.
  - `app.config.ts` wires up providers (e.g., HTTP interceptors, routing, i18n).

## Conventions
- Use clear, descriptive file names and folder groupings by responsibility.
- Prefer strongly typed services and models to avoid runtime issues.
- Keep validation logic centralized in `core/validators`.


