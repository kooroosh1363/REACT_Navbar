export const DESKTOP_QUERY = "(min-width: 761px)";

export function normalizePath(value) {
  let path = String(value ?? "").trim();

  if (path.startsWith("#")) path = path.slice(1);

  const queryIndex = path.indexOf("?");
  if (queryIndex >= 0) path = path.slice(0, queryIndex);

  if (!path || path === "/") return "/";

  path = `/${path.replace(/^\/+/, "")}`;
  path = path.replace(/\/{2,}/g, "/");
  path = path.replace(/\/+$/, "");

  return path.toLowerCase();
}

export function routeFromHash(hash, routeRegistry) {
  const path = normalizePath(hash);
  return routeRegistry.find((route) => normalizePath(route.path) === path) ?? null;
}

export function hashForPath(path) {
  return `#${normalizePath(path)}`;
}

export function titleForRoute(route, productName = "BEACON") {
  if (!route) return `Not found · ${productName}`;
  return `${route.label} · ${productName}`;
}

export function nextNavigationIndex(count, currentIndex, key) {
  if (!Number.isInteger(count) || count <= 0) return -1;

  const current = Number.isInteger(currentIndex) && currentIndex >= 0
    ? currentIndex % count
    : 0;

  switch (key) {
    case "Home":
      return 0;
    case "End":
      return count - 1;
    case "ArrowRight":
    case "ArrowDown":
      return (current + 1) % count;
    case "ArrowLeft":
    case "ArrowUp":
      return (current - 1 + count) % count;
    default:
      return current;
  }
}

export const initialNavigationState = Object.freeze({
  mobileOpen: false
});

export function navigationReducer(state, event) {
  switch (event?.type) {
    case "OPEN":
      return { ...state, mobileOpen: true };
    case "CLOSE":
    case "ESCAPE":
    case "ROUTE_CHANGE":
    case "DESKTOP":
      return { ...state, mobileOpen: false };
    case "TOGGLE":
      return { ...state, mobileOpen: !state.mobileOpen };
    default:
      return state;
  }
}

export function isDesktopWidth(width) {
  return Number.isFinite(width) && width >= 761;
}
