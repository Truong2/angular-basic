# Project Brief - Angular Basic App

**Project Name:** Angular Basic  
**Owner:** User (Windows, workspace `d:\FE\angular-basic`)  
**Date Initialized:** 2025-12-17

## Overview
This project is an Angular front-end application (workspace root: `d:\FE\angular-basic`). It appears to be a basic but opinionated starter with authentication, i18n, shared UI components, and core services/guards.

## Core Goals
- Provide a clean, maintainable Angular codebase with clear structure (`core`, `features`, `layouts`, `shared`, etc.).
- Implement authentication flow (e.g., login, guards, interceptors for auth and refresh).
- Support internationalization (i18n) with multiple language JSON files.
- Offer reusable UI components (e.g., `Button`, `FormItem`, `TextInput`, layout components).
- Serve as a base for expanding features like dashboards and other pages.

## Primary User Flows
- **Authentication:** User can log in via a login feature and then access protected routes (e.g., dashboard) using guards and interceptors.
- **Navigation:** Public vs private layouts determine what an unauthenticated vs authenticated user sees.
- **Localization:** Users can see localized content via i18n JSON files and services.

## High-Level Requirements
- Use Angular best practices (standalone components, typed services, proper routing).
- Keep configuration centralized (`app.config.ts`, environment files, constants).
- Ensure error handling and auth handling via HTTP interceptors.
- Maintain a clear separation of concerns between core services, feature modules, and shared UI.

## Non-Goals (for now)
- Backend implementation (assumed handled by external APIs).
- Complex state management beyond what Angular provides out-of-the-box (e.g., NgRx) unless later required.


