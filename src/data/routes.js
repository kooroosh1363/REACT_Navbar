export const routes = Object.freeze([
  {
    id: "overview",
    path: "/",
    label: "Overview",
    kicker: "Navigation shell",
    title: "One route registry. One truthful source of navigation.",
    description:
      "BEACON replaces disconnected page components with a canonical route contract that drives labels, active state, page metadata, and navigation behavior from one place.",
    principles: [
      "Every visible navigation item resolves to a real route.",
      "Active state is derived from the canonical path, not duplicated component state.",
      "Static hosting uses hash routes so refreshes and deep links remain resolvable."
    ],
    signal: "Canonical registry"
  },
  {
    id: "routing",
    path: "/routing",
    label: "Routing",
    kicker: "Route contract",
    title: "Routes are data before they become interface.",
    description:
      "Path normalization, route lookup, hash generation, and page titles are isolated from React so route behavior can be verified without rendering the application.",
    principles: [
      "Paths are normalized before comparison.",
      "Unknown paths never silently render another page.",
      "Page titles and navigation labels share the same route metadata."
    ],
    signal: "Deterministic lookup"
  },
  {
    id: "accessibility",
    path: "/accessibility",
    label: "Accessibility",
    kicker: "Keyboard model",
    title: "Current location and keyboard intent stay visible.",
    description:
      "The shell exposes aria-current, a semantic disclosure button on small screens, visible focus states, a skip link, Escape handling, and arrow-key movement across navigation links.",
    principles: [
      "Arrow keys wrap across primary navigation links.",
      "Home and End jump to the first and last links.",
      "Mobile disclosure state closes after navigation or Escape."
    ],
    signal: "Keyboard aware"
  },
  {
    id: "responsive",
    path: "/responsive",
    label: "Responsive",
    kicker: "Viewport policy",
    title: "The same route model survives a different layout.",
    description:
      "Desktop navigation and compact navigation render from the same registry. Responsive behavior changes presentation without creating a second set of route definitions.",
    principles: [
      "The mobile menu is a disclosure, not a duplicate navigation model.",
      "Desktop transition clears stale open-menu state.",
      "Reduced-motion preferences remove non-essential transitions."
    ],
    signal: "Single route model"
  },
  {
    id: "diagnostics",
    path: "/diagnostics",
    label: "Diagnostics",
    kicker: "Failure state",
    title: "Unknown routes fail explicitly instead of impersonating valid pages.",
    description:
      "The legacy project accidentally rendered Careers for About, Products, and Contact. BEACON makes route mismatches observable and provides a deliberate recovery path.",
    principles: [
      "Unregistered hashes receive a dedicated not-found state.",
      "The attempted path stays visible for debugging.",
      "Recovery always returns to a known canonical route."
    ],
    signal: "Visible recovery"
  }
]);
