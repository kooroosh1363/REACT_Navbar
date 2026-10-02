import { describe, expect, it } from "vitest";
import { routes } from "../data/routes.js";
import {
  hashForPath,
  initialNavigationState,
  isDesktopWidth,
  navigationReducer,
  nextNavigationIndex,
  normalizePath,
  routeFromHash,
  titleForRoute
} from "./navigation.js";

describe("BEACON route contract", () => {
  it("normalizes an empty value to the overview path", () => {
    expect(normalizePath("")).toBe("/");
  });

  it("normalizes hash-prefixed routes", () => {
    expect(normalizePath("#/Routing")).toBe("/routing");
  });

  it("removes query data before route matching", () => {
    expect(normalizePath("#/routing?from=test")).toBe("/routing");
  });

  it("collapses duplicate slashes and trailing slashes", () => {
    expect(normalizePath("//ACCESSIBILITY///")).toBe("/accessibility");
  });

  it("resolves a registered route", () => {
    expect(routeFromHash("#/responsive", routes)?.id).toBe("responsive");
  });

  it("returns null for an unknown route", () => {
    expect(routeFromHash("#/missing", routes)).toBeNull();
  });

  it("creates canonical hash links", () => {
    expect(hashForPath("/Diagnostics/")).toBe("#/diagnostics");
  });

  it("creates route-aware document titles", () => {
    expect(titleForRoute(routes[1])).toBe("Routing · BEACON");
  });

  it("creates an explicit missing-route title", () => {
    expect(titleForRoute(null)).toBe("Not found · BEACON");
  });

  it("moves navigation focus forward with wrapping", () => {
    expect(nextNavigationIndex(5, 4, "ArrowRight")).toBe(0);
  });

  it("moves navigation focus backward with wrapping", () => {
    expect(nextNavigationIndex(5, 0, "ArrowLeft")).toBe(4);
  });

  it("supports Home and End navigation keys", () => {
    expect(nextNavigationIndex(5, 3, "Home")).toBe(0);
    expect(nextNavigationIndex(5, 1, "End")).toBe(4);
  });

  it("returns -1 when no navigation links exist", () => {
    expect(nextNavigationIndex(0, 0, "ArrowRight")).toBe(-1);
  });

  it("opens and toggles the mobile menu", () => {
    expect(navigationReducer(initialNavigationState, { type: "OPEN" }).mobileOpen).toBe(true);
    expect(navigationReducer({ mobileOpen: true }, { type: "TOGGLE" }).mobileOpen).toBe(false);
  });

  it("closes mobile navigation after route changes", () => {
    expect(navigationReducer({ mobileOpen: true }, { type: "ROUTE_CHANGE" }).mobileOpen).toBe(false);
  });

  it("closes mobile navigation on Escape", () => {
    expect(navigationReducer({ mobileOpen: true }, { type: "ESCAPE" }).mobileOpen).toBe(false);
  });

  it("closes stale mobile state when desktop layout activates", () => {
    expect(navigationReducer({ mobileOpen: true }, { type: "DESKTOP" }).mobileOpen).toBe(false);
  });

  it("uses 761px as the desktop policy boundary", () => {
    expect(isDesktopWidth(760)).toBe(false);
    expect(isDesktopWidth(761)).toBe(true);
  });
});
