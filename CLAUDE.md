# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start              # Dev server at http://localhost:4200
npm run build          # Production build → dist/sighisoara-festival/browser
npm run build:ssr      # Build both browser + SSR server bundles
npm run dev:ssr        # Dev SSR server
npm run serve:ssr      # Prod SSR server (node dist/.../server/main.js)
npm run prerender      # Static HTML generation for routes in routes.txt
npm run test           # Karma + Jasmine tests (Chrome)
npx prettier --write . # Format code (no npm script)
```

## Architecture

**Stack**: Angular 17 + TypeScript 5.3 (strict), Angular Material 17, Bootstrap 5, SCSS, SSR via Express.js.

**Project name**: `sighisoara-festival` — a bilingual (EN/RO) festival website for Sighișoara, Romania.

### Routing & Modules

All feature modules are lazy-loaded except `HomeComponent`:

| Route | Module |
|-------|--------|
| `/festivals`, `/festivals/festival-details/:path` | `FestivalsModule` |
| `/attractions` | `AttractionsModule` |
| `/accomodations` | `AccomodationsModule` |
| `/restaurants` | `RestaurantsModule` |
| `/blog` | `BlogModule` |
| `/auth/**` | `AuthenticationModule` |

Each feature lives in `src/app/{feature}/` with `components/`, `services/`, `models/`, and barrel `index.ts` files.

### Data Layer

No NgRx or state management — services return `Observable`s via `of()` with static mock data stored in `.data.ts` files. `HttpClient` is wired up for future API integration (`backEndUrl` in `environment.prod.ts` points to `https://tonyuifalean.github.io/festival/api`).

### SSR & Prerendering

- `server.ts` → Express app; `main.server.ts` → `AppServerModule`
- Specific routes in `routes.txt` are prerendered to static HTML for SEO
- `provideClientHydration()` is enabled — avoid DOM manipulation that breaks hydration

### i18n

`@ngx-translate` with JSON files in `src/assets/i18n/`. Use `{{ 'KEY' | translate }}` in templates. Language toggle via `AppComponent.switchLang()`.

### Shared Module

`src/app/shared/` exports `MaterialModule` (pre-configured Angular Material imports), `SpinnerComponent`, `TableComponent`, and `AuthenticationService`. Feature modules import `SharedModule` to get Material components.

### TypeScript Path Aliases

Use `@app/*` and `@environments/*` instead of deep relative imports (configured in `tsconfig.json`).

### Formatting

Prettier config: single quotes, 100-char line width, semicolons. No ESLint.

### Deployment

GitHub Pages via `angular-cli-ghpages`. Production domain: `sighisoarafestival.com`. GA4 tracking ID: `G-ZMBD41WFT2`.
