# Tech Context - Angular Basic App

## Technologies Used
- **Framework:** Angular (modern standalone-style setup, inferred from file structure).
- **Language:** TypeScript for application code, HTML/SCSS/CSS for templates and styles.
- **Tooling:**
  - `angular.json` for Angular workspace configuration.
  - `tsconfig.json`, `tsconfig.app.json`, `tsconfig.spec.json` for TypeScript compilation.
  - `tailwind.config.js` present (Tailwind likely used or planned).
  - Node/npm for dependency management (`package.json`, `package-lock.json`).

## App Structure
- `src/app/app.config.ts` – application-wide configuration and providers.
- `src/app/app.routes.ts` – route definitions.
- `src/app/core` – core concerns (config, constants, guards, interceptors, services, validators).
- `src/app/features` – individual features like `login` and `dashboard`.
- `src/app/layouts` – public/private layout components.
- `src/app/shared` – shared UI components, directives, and pipes.
- `src/assets/i18n` – language JSON files.
- `src/environments` – environment configuration (`environment.ts`, `.prod.ts`, etc.).

## Development Setup (Assumed)
- Install dependencies with `npm install`.
- Run dev server with an Angular CLI script (e.g., `npm start` or `npm run dev` depending on `package.json`).
- Build for production using `npm run build`.

## Technical Constraints & Considerations
- Must remain compatible with the Angular version specified in `package.json`.
- Environments and API URLs should be adjusted only in `environment` files or centralized config.
- HTTP interceptors need correct ordering when provided in `app.config.ts`.
- i18n JSON structure must remain consistent across languages.


