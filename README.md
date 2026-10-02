# BEACON — Route-Aware Navigation Shell

BEACON modernizes a 2023 React navbar exercise into a focused navigation-engineering project.

The original repository had a visible five-item navbar, but its route contract was incorrect: `/ABOUT`, `/PRODUCTS`, and `/CONTACT` all rendered the Careers component. Most route pages contained only the navbar, the project depended on Create React App, React Router, Sass, and Web Vitals for a tiny demo, and the visual layer loaded a 3.08 MB decorative background plus a large Google Fonts request.

## Engineering focus

BEACON demonstrates navigation as application state:

- one canonical route registry
- active-route semantics
- `aria-current="page"`
- static-host-safe hash navigation
- unknown-route detection and recovery
- route-aware document titles
- semantic mobile disclosure
- Escape-to-close
- close-on-route-change
- close-on-desktop-transition
- arrow-key navigation across primary links
- Home / End keyboard shortcuts
- skip navigation
- reduced-motion support

## Architecture

```text
src/data/routes.js
        │
        ▼
src/lib/navigation.js
        ├─ path normalization
        ├─ route lookup
        ├─ canonical hash generation
        ├─ page-title policy
        ├─ keyboard index policy
        └─ mobile navigation reducer
        │
        ▼
src/App.jsx
        ├─ hashchange integration
        ├─ responsive menu lifecycle
        ├─ active-route rendering
        ├─ keyboard focus movement
        └─ explicit not-found state
```

Route behavior is deliberately isolated from React so it can be tested as deterministic policy.

## Why hash routing?

This project is intended for static GitHub Pages deployment.

Hash routes such as:

```text
#/routing
#/accessibility
#/responsive
```

are resolved entirely in the browser. Refreshing or opening a deep link therefore does not require server-side rewrite rules.

## Route contract

The registry currently contains:

- Overview — `/`
- Routing — `/routing`
- Accessibility — `/accessibility`
- Responsive — `/responsive`
- Diagnostics — `/diagnostics`

Unknown paths are not redirected silently. BEACON renders an explicit route-mismatch state and preserves the attempted path for diagnostics.

## Accessibility

- semantic `nav`
- semantic mobile menu button
- `aria-expanded`
- `aria-controls`
- `aria-current="page"`
- visible keyboard focus
- skip link
- Escape handling
- Arrow Up / Down / Left / Right navigation
- Home / End navigation
- responsive controls
- reduced-motion support

## Modernization summary

- Create React App → Vite
- React 18 → React 19
- removed React Router
- removed Sass
- removed Web Vitals
- removed CRA test/public boilerplate
- removed empty page-specific Sass files
- removed 3.08 MB decorative background image
- removed oversized Google Fonts import
- fixed incorrect route-to-component mapping
- replaced empty placeholder pages with one registry-driven shell
- added explicit unknown-route handling
- added Vitest, CI, Pages deployment, and professional documentation

## Local development

Requirements:

- Node.js 22+
- npm

```bash
npm install --legacy-peer-deps --no-audit --no-fund
npm run dev
```

## Tests

```bash
npm test
```

The suite covers:

- empty-path normalization
- hash normalization
- query stripping
- duplicate-slash cleanup
- registered route lookup
- unknown route detection
- canonical hash generation
- route-aware document titles
- not-found document title
- forward keyboard wrapping
- backward keyboard wrapping
- Home / End keyboard movement
- empty navigation handling
- mobile menu open/toggle
- route-change close
- Escape close
- desktop-transition close
- viewport breakpoint policy

## Quality gate

```bash
npm run check
```

This runs syntax checks, Vitest, and a Vite production build.

## CI

`.github/workflows/quality.yml` runs on pull requests and pushes to `main`.

## Deployment

BEACON includes a manual GitHub Pages workflow.

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Open **Actions → Deploy Pages**.
4. Run the workflow.

## Security review

No credentials, API keys, tokens, passwords, backend endpoints, authentication flows, sensitive browser storage, or user-controlled HTML injection are required.

## License

MIT. See [LICENSE](./LICENSE).
