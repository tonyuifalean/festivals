# Sighisoara Festival - Source Code Documentation

## 1. Project Overview

Sighisoara Festival is an Angular 17 web application for presenting festival information, tourist attractions, accommodations, restaurants, and blog content for Sighisoara, Romania.

Core characteristics:

- Angular 17 application with strict TypeScript configuration.
- Server-Side Rendering (SSR) support through Angular SSR and Express.
- Prerendering support for SEO-friendly static output.
- Bilingual content (English and Romanian) using ngx-translate JSON files.
- UI stack based on Angular Material, Bootstrap, and custom SCSS.
- Mock-data-first architecture (services expose Observable streams, with API-ready structure).

## 2. Tech Stack

Application:

- Angular 17
- TypeScript 5.3 (strict mode)
- RxJS 7
- Angular Router
- Angular Material + CDK
- Bootstrap 5

Internationalization:

- @ngx-translate/core
- @ngx-translate/http-loader

SSR and server:

- @angular/ssr
- Express

Utilities and integrations:

- angular-google-tag-manager
- ngx-cookieconsent
- ngx-clipboard
- ngx-scrolltop

Testing and tooling:

- Karma + Jasmine
- Prettier

## 3. Repository Structure

Top-level:

- angular.json: Angular workspace and build/serve/test/prerender/SSR targets.
- package.json: scripts, dependencies, devDependencies.
- server.ts: Express server entry for SSR rendering.
- routes.txt: prerender routes list.
- tsconfig\*.json: TypeScript configs for app/server/tests.
- src/: application and assets source root.

Primary source directories:

- src/app: Angular application modules, components, services, and models.
- src/assets/i18n: translation dictionaries (en, ro).
- src/assets/images: static images and media assets.
- src/environments: environment-specific settings.

## 4. Build, Run, Test, and Deploy

Main npm scripts:

- npm start: local development server (Angular dev server).
- npm run build: production browser build.
- npm run test: unit tests with Karma/Jasmine.
- npm run build:ssr: browser + server SSR bundle.
- npm run dev:ssr: local SSR development server.
- npm run serve:ssr: run built SSR bundle.
- npm run prerender: prerender configured routes.

Build/deploy behavior from angular.json:

- Browser output path: dist/sighisoara-festival/browser
- Server output path: dist/sighisoara-festival/server
- Environment replacement in production builds.
- Production budgets are configured for bundle and component styles.
- GitHub Pages deploy target exists via angular-cli-ghpages.

## 5. Application Architecture

### 5.1 Module Organization

The app uses feature modules plus a shared module pattern.

Core app files:

- src/app/app.module.ts
- src/app/app-routing.module.ts
- src/app/app.component.ts
- src/app/home/home.component.ts

Feature modules (lazy-loaded unless noted):

- festivals
- attractions
- accomodations
- restaurants
- blog
- authentication
- news (currently present; route may be commented/disabled)

Shared module:

- src/app/shared/shared.module.ts
- src/app/shared/modules/material.module.ts

### 5.2 Routing Strategy

Main routing is configured in src/app/app-routing.module.ts.

Behavior summary:

- Root path redirects to /home.
- /home uses HomeComponent directly (eager route).
- Feature routes are lazy-loaded with dynamic import.
- /register redirects to /auth/register.
- Wildcard path redirects to /home.
- scrollPositionRestoration is enabled.

### 5.3 State and Data Strategy

The codebase currently uses a service + static data file model:

- Data constants in .data.ts files.
- Services return Observables using of().
- HttpClient is already injected and environment backEndUrl exists for future API integration.

No NgRx or centralized global store is used.

## 6. SSR and Prerendering

SSR is configured through:

- server.ts (Express + CommonEngine)
- src/main.server.ts
- src/app/app.module.server.ts

Flow:

1. Express serves static files from dist browser output.
2. Non-static requests are rendered by Angular CommonEngine.
3. APP_BASE_HREF is provided for route base handling.

Prerender support:

- npm run prerender runs Angular prerender builder.
- routes can be controlled via routes.txt.

SSR safety note:

- Components should avoid direct DOM access unless guarded for browser platform.

## 7. Internationalization (i18n)

i18n files:

- src/assets/i18n/en.json
- src/assets/i18n/ro.json

Initialization:

- App module adds supported languages and sets default language through APP_INITIALIZER.

Usage pattern:

- Templates reference translation keys.
- AppComponent includes language switch behavior and cookie message translation refresh.

## 8. Shared Layer

Shared module contains reusable components and exports:

- Spinner component
- Table component
- Material module aggregation
- shared models and services exports through barrel files

Key files:

- src/app/shared/components/spinner/spinner.component.ts
- src/app/shared/components/table/table.component.ts
- src/app/shared/modules/material.module.ts
- src/app/shared/services/authentication.service.ts

## 9. Feature-by-Feature Documentation

### 9.1 Home

Purpose:

- Landing page and high-level entry point for main sections.

Key files:

- src/app/home/home.component.ts
- src/app/home/home.component.html
- src/app/home/home.component.scss

### 9.2 Festivals

Purpose:

- Festival listing, details view, and schedule rendering.

Components:

- FestivalListComponent
- FestivalDetailsComponent
- FestivalScheduleComponent

Data and services:

- Static data in festivals-data.ts
- Service API facade in festivals.service.ts

Key files:

- src/app/festivals/festivals.module.ts
- src/app/festivals/festivals-routing.module.ts
- src/app/festivals/services/festivals.service.ts
- src/app/festivals/services/festivals-data.ts
- src/app/festivals/components/festival-details/festival-details.component.ts

### 9.3 Attractions

Purpose:

- Display tourist attraction details and location-focused content.

Key files:

- src/app/attractions/attractions.component.ts
- src/app/attractions/attraction-location.data.ts
- src/app/attractions/attractions.module.ts

### 9.4 Accomodations

Purpose:

- Display accommodations and offer copy-to-clipboard location links.

Notable implementation details:

- Uses ClipboardService for location copying.
- Uses MatSnackBar for user feedback.
- Sets page-specific SEO and OG meta tags.
- Pushes GTM event in production mode.

Key files:

- src/app/accomodations/accomodations.component.ts
- src/app/accomodations/accomodation.data.ts
- src/app/accomodations/accomodations.module.ts

### 9.5 Restaurants

Purpose:

- Showcase restaurants and related curated information.

Key files:

- src/app/restaurants/restaurants.component.ts
- src/app/restaurants/restaurant.data.ts
- src/app/restaurants/restaurants.module.ts

### 9.6 Blog

Purpose:

- Display editorial or informational content through blog pages.

Key files:

- src/app/blog/blog.component.ts
- src/app/blog/subcomponents/blog-post/blog-post.component.ts
- src/app/blog/blog.module.ts

### 9.7 Authentication

Purpose:

- Login/Register UI flow and basic auth service abstraction.

Current behavior:

- AuthenticationService contains placeholder mock login behavior.
- Current user stream is managed through BehaviorSubject.

Key files:

- src/app/authentication/login/login.component.ts
- src/app/authentication/register/register.component.ts
- src/app/shared/services/authentication.service.ts

### 9.8 News

Purpose:

- News feature module scaffold.

Key files:

- src/app/news/news.component.ts
- src/app/news/news.module.ts

## 10. Environment and Configuration

Environment files:

- src/environments/environment.ts
- src/environments/environment.prod.ts

Typical values configured:

- production flag
- frontEndUrl
- backEndUrl
- gaTrackingId

TypeScript strictness:

- strict: true
- strictInjectionParameters: true
- strictTemplates: true

Path aliases:

- @app/\*
- @environments/\*

## 11. Analytics, SEO, and Metadata

Analytics:

- Google Tag Manager integration via angular-google-tag-manager.
- GTM push events are generally guarded by environment.production.

SEO/meta:

- Per-page Meta and Title updates are present in multiple components.
- OpenGraph tags are set for social sharing.
- robots.txt and sitemap.xml exist in src.

## 12. Testing Approach

Testing framework:

- Jasmine + Karma.

Current test profile:

- Most component specs validate instantiation and baseline setup.
- Service tests exist for selected services.

Key test files (examples):

- src/app/festivals/services/festivals.service.spec.ts
- src/app/festivals/components/festival-details/festival-details.component.spec.ts
- src/app/accomodations/accomodations.component.spec.ts

## 13. Known Technical Improvement Opportunities

High priority:

- Align ngx-translate child loader provider tokens consistently with TranslateLoader usage.
- Remove hardcoded credential flow from authentication mock logic in production-bound code paths.
- Resolve TypeScript deprecated compiler options before TS7 migration.

Medium priority:

- Improve subscription lifecycle handling for long-lived streams.
- Replace direct DOM interactions with Angular-safe patterns in SSR/hydration-sensitive components.
- Expand test coverage beyond component creation checks.

Low priority:

- Remove dead utility methods not tied to domain behavior.
- Consolidate naming consistency for accommodations (spelling currently mixed in several places).

## 14. Source Inventory Appendix

Inventory counts at generation time:

- Total files under src: 160
- Total files under src/app: 119
- Total translation files under src/assets/i18n: 2

Complete file list from src:

- src/app/accomodations/accomodation.data.ts
- src/app/accomodations/accomodation.model.ts
- src/app/accomodations/accomodations-routing.module.ts
- src/app/accomodations/accomodations.component.html
- src/app/accomodations/accomodations.component.scss
- src/app/accomodations/accomodations.component.spec.ts
- src/app/accomodations/accomodations.component.ts
- src/app/accomodations/accomodations.module.ts
- src/app/accomodations/index.ts
- src/app/app-routing.module.ts
- src/app/app.component.html
- src/app/app.component.scss
- src/app/app.component.spec.ts
- src/app/app.component.ts
- src/app/app.module.server.ts
- src/app/app.module.ts
- src/app/attractions/attraction-location.data.ts
- src/app/attractions/attraction-location.model.ts
- src/app/attractions/attractions-routing.module.ts
- src/app/attractions/attractions.component.html
- src/app/attractions/attractions.component.scss
- src/app/attractions/attractions.component.spec.ts
- src/app/attractions/attractions.component.ts
- src/app/attractions/attractions.module.ts
- src/app/attractions/index.ts
- src/app/authentication/authentication-routing.module.ts
- src/app/authentication/authentication.module.ts
- src/app/authentication/index.ts
- src/app/authentication/login/login.component.html
- src/app/authentication/login/login.component.scss
- src/app/authentication/login/login.component.spec.ts
- src/app/authentication/login/login.component.ts
- src/app/authentication/register/register.component.html
- src/app/authentication/register/register.component.scss
- src/app/authentication/register/register.component.spec.ts
- src/app/authentication/register/register.component.ts
- src/app/blog/blog-routing.module.ts
- src/app/blog/blog.component.html
- src/app/blog/blog.component.scss
- src/app/blog/blog.component.spec.ts
- src/app/blog/blog.component.ts
- src/app/blog/blog.module.ts
- src/app/blog/index.ts
- src/app/blog/subcomponents/blog-post/blog-post.component.html
- src/app/blog/subcomponents/blog-post/blog-post.component.scss
- src/app/blog/subcomponents/blog-post/blog-post.component.spec.ts
- src/app/blog/subcomponents/blog-post/blog-post.component.ts
- src/app/festivals/components/festival-details/festival-details.component.html
- src/app/festivals/components/festival-details/festival-details.component.scss
- src/app/festivals/components/festival-details/festival-details.component.spec.ts
- src/app/festivals/components/festival-details/festival-details.component.ts
- src/app/festivals/components/festival-details/festival-location.data.ts
- src/app/festivals/components/festival-details/festival-location.model.ts
- src/app/festivals/components/festival-list/festival-list.component.html
- src/app/festivals/components/festival-list/festival-list.component.scss
- src/app/festivals/components/festival-list/festival-list.component.spec.ts
- src/app/festivals/components/festival-list/festival-list.component.ts
- src/app/festivals/components/festival-schedule/festival-schedule.component.html
- src/app/festivals/components/festival-schedule/festival-schedule.component.scss
- src/app/festivals/components/festival-schedule/festival-schedule.component.spec.ts
- src/app/festivals/components/festival-schedule/festival-schedule.component.ts
- src/app/festivals/components/index.ts
- src/app/festivals/festivals-routing.module.ts
- src/app/festivals/festivals.module.ts
- src/app/festivals/index.ts
- src/app/festivals/models/festival.model.ts
- src/app/festivals/models/index.ts
- src/app/festivals/services/festivals-data.ts
- src/app/festivals/services/festivals.service.spec.ts
- src/app/festivals/services/festivals.service.ts
- src/app/festivals/services/index.ts
- src/app/google-maps-wrapper/google-maps-wrapper.component.html
- src/app/google-maps-wrapper/google-maps-wrapper.component.scss
- src/app/google-maps-wrapper/google-maps-wrapper.component.spec.ts
- src/app/google-maps-wrapper/google-maps-wrapper.component.ts
- src/app/google-maps-wrapper/google-maps-wrapper.module.ts
- src/app/google-maps-wrapper/index.ts
- src/app/home/home.component.html
- src/app/home/home.component.scss
- src/app/home/home.component.spec.ts
- src/app/home/home.component.ts
- src/app/home/index.ts
- src/app/news/index.ts
- src/app/news/news-routing.module.ts
- src/app/news/news.component.html
- src/app/news/news.component.scss
- src/app/news/news.component.spec.ts
- src/app/news/news.component.ts
- src/app/news/news.module.ts
- src/app/restaurants/index.ts
- src/app/restaurants/restaurant.data.ts
- src/app/restaurants/restaurant.model.ts
- src/app/restaurants/restaurants-routing.module.ts
- src/app/restaurants/restaurants.component.html
- src/app/restaurants/restaurants.component.scss
- src/app/restaurants/restaurants.component.spec.ts
- src/app/restaurants/restaurants.component.ts
- src/app/restaurants/restaurants.module.ts
- src/app/shared/components/index.ts
- src/app/shared/components/spinner/spinner.component.html
- src/app/shared/components/spinner/spinner.component.scss
- src/app/shared/components/spinner/spinner.component.spec.ts
- src/app/shared/components/spinner/spinner.component.ts
- src/app/shared/components/table/index.ts
- src/app/shared/components/table/tabel.model.ts
- src/app/shared/components/table/table.component.html
- src/app/shared/components/table/table.component.scss
- src/app/shared/components/table/table.component.spec.ts
- src/app/shared/components/table/table.component.ts
- src/app/shared/index.ts
- src/app/shared/models/index.ts
- src/app/shared/models/user.model.ts
- src/app/shared/models/user.ts
- src/app/shared/modules/index.ts
- src/app/shared/modules/material.module.ts
- src/app/shared/services/authentication.service.spec.ts
- src/app/shared/services/authentication.service.ts
- src/app/shared/services/index.ts
- src/app/shared/shared.module.ts
- src/assets/.gitkeep
- src/assets/i18n/en.json
- src/assets/i18n/ro.json
- src/assets/images/.DS_Store
- src/assets/images/accomodations.jpg
- src/assets/images/accomodations/casa_georgius_krauss.jpg
- src/assets/images/accomodations/casa_joseph_haydn.jpg
- src/assets/images/attractions.jpg
- src/assets/images/blog.jpg
- src/assets/images/discover-sighisoara.jpg
- src/assets/images/en.png
- src/assets/images/festival-logo.png
- src/assets/images/festival-logo.svg
- src/assets/images/festivals.jpg
- src/assets/images/festivals/blues.jpg
- src/assets/images/festivals/brass_band.jpg
- src/assets/images/festivals/dava.jpg
- src/assets/images/festivals/medieval.jpg
- src/assets/images/festivals/proetnica.jpg
- src/assets/images/parchment.png
- src/assets/images/restaurants.jpg
- src/assets/images/restaurants/casa_georgius_krauss.jpg
- src/assets/images/restaurants/casa_joseph_haydn.jpg
- src/assets/images/restaurants/ferdinand_bistro_gourmet.jpg
- src/assets/images/ro.png
- src/assets/images/sighisoara-curiosities.jpg
- src/assets/images/sighisoara-festival-tower.svg
- src/assets/images/sighisoara-festival.svg
- src/assets/images/sighisoara-sunset.jpg
- src/assets/images/sighisoara.ico
- src/environments/environment.prod.ts
- src/environments/environment.ts
- src/favicon.ico
- src/index.html
- src/main.server.ts
- src/main.ts
- src/polyfills.ts
- src/robots.txt
- src/sitemap.xml
- src/styles.scss
- src/test.ts

## 15. Generated Metadata

- Generated on: 2026-07-03
- Generated for repository: festivals
- Document type: full-source overview and architecture documentation
