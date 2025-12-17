# Product Context - Angular Basic App

## Why This Project Exists
This Angular app serves as a foundation or starter for building front-end features such as authentication, dashboards, and shared UI components. It is designed to be a learning and productivity base, making it easy to extend with new features while keeping structure and patterns consistent.

## Problems It Solves
- Reduces setup time for new Angular projects by providing a ready-made structure.
- Encapsulates common concerns (auth, i18n, layout, validation) in one place.
- Provides a consistent styling and UI component approach, so new features can be built quickly.

## How It Should Work
- **Login & Auth Flow**
  - Unauthenticated users access public routes (e.g., login) via a `public` layout.
  - On successful login, users are redirected to protected routes (e.g., dashboard) under a `private` layout.
  - Guards (`auth.guard`, `guest.guard`) protect and redirect based on auth state.
  - HTTP interceptors (`auth`, `refresh`, `error`) attach tokens, handle refreshing, and surface errors.

- **Navigation & Layouts**
  - `public` layout: used for routes that should be accessible without authentication.
  - `private` layout: used for routes requiring authentication (e.g., dashboard).

- **Internationalization**
  - Language files live under `src/assets/i18n` (e.g., `en.json`, `ja.json`, `vi.json`).
  - An `i18n.service` in `core/services` and any `LanguageSwitcher` components coordinate language changes.

- **Shared UI**
  - Components like `Button`, `FormItem`, and `TextInput` live under `src/app/shared/components`.
  - These are reused across features to maintain visual and behavioral consistency.

## User Experience Goals
- Smooth login flow with clear error messaging.
- Simple, intuitive navigation between public and private sections.
- Clean, modern-looking UI using shared components.
- Language switching that feels seamless and consistent across the app.


