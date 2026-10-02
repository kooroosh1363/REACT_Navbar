import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { routes } from "./data/routes.js";
import {
  DESKTOP_QUERY,
  hashForPath,
  initialNavigationState,
  isDesktopWidth,
  navigationReducer,
  nextNavigationIndex,
  normalizePath,
  routeFromHash,
  titleForRoute
} from "./lib/navigation.js";

function MenuIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function App() {
  const [hash, setHash] = useState(window.location.hash || "#/");
  const [navState, dispatch] = useReducer(navigationReducer, initialNavigationState);
  const navRef = useRef(null);

  const route = useMemo(() => routeFromHash(hash, routes), [hash]);
  const attemptedPath = normalizePath(hash);

  useEffect(() => {
    document.title = titleForRoute(route);
  }, [route]);

  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash || "#/");
      dispatch({ type: "ROUTE_CHANGE" });
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);

    const syncViewport = () => {
      if (media.matches || isDesktopWidth(window.innerWidth)) {
        dispatch({ type: "DESKTOP" });
      }
    };

    syncViewport();
    media.addEventListener?.("change", syncViewport);
    return () => media.removeEventListener?.("change", syncViewport);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape" && navState.mobileOpen) {
        dispatch({ type: "ESCAPE" });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navState.mobileOpen]);

  function handleNavKeys(event) {
    const supported = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"];
    if (!supported.includes(event.key)) return;

    const links = [...navRef.current.querySelectorAll("a[data-nav-link]")];
    const currentIndex = links.indexOf(document.activeElement);
    const nextIndex = nextNavigationIndex(links.length, currentIndex, event.key);

    if (nextIndex >= 0) {
      event.preventDefault();
      links[nextIndex]?.focus();
    }
  }

  function goTo(path) {
    window.location.hash = hashForPath(path);
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="layout header-row">
          <a className="brand" href="#/" aria-label="BEACON overview">
            <span className="brand-mark" aria-hidden="true">B</span>
            <span>
              <strong>BEACON</strong>
              <small>Route-aware navigation shell</small>
            </span>
          </a>

          <button
            className="menu-button"
            type="button"
            aria-expanded={navState.mobileOpen}
            aria-controls="primary-navigation"
            onClick={() => dispatch({ type: "TOGGLE" })}
          >
            <MenuIcon open={navState.mobileOpen} />
            <span>{navState.mobileOpen ? "Close" : "Menu"}</span>
          </button>

          <nav
            id="primary-navigation"
            ref={navRef}
            className="primary-nav"
            data-open={navState.mobileOpen}
            aria-label="Primary"
            onKeyDown={handleNavKeys}
          >
            {routes.map((item) => {
              const active = route?.id === item.id;
              return (
                <a
                  key={item.id}
                  data-nav-link
                  href={hashForPath(item.path)}
                  aria-current={active ? "page" : undefined}
                >
                  <span>{item.label}</span>
                  <small>{item.signal}</small>
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex="-1">
        {route ? (
          <>
            <section className="hero layout">
              <p className="eyebrow">{route.kicker}</p>
              <h1>{route.title}</h1>
              <p className="hero-copy">{route.description}</p>

              <div className="route-readout" aria-label="Current route">
                <span>current route</span>
                <code>{route.path}</code>
                <strong>{route.signal}</strong>
              </div>
            </section>

            <section className="principles layout" aria-labelledby="principles-title">
              <div className="section-heading">
                <p className="eyebrow">Contract checks</p>
                <h2 id="principles-title">What this route promises</h2>
              </div>

              <div className="principle-grid">
                {route.principles.map((principle, index) => (
                  <article key={principle}>
                    <span>0{index + 1}</span>
                    <p>{principle}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="route-map layout" aria-labelledby="route-map-title">
              <div className="section-heading">
                <p className="eyebrow">Registry</p>
                <h2 id="route-map-title">Every navigation target is inspectable.</h2>
              </div>

              <div className="route-table" role="list">
                {routes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="listitem"
                    data-active={route.id === item.id}
                    onClick={() => goTo(item.path)}
                  >
                    <span>
                      <strong>{item.label}</strong>
                      <small>{item.signal}</small>
                    </span>
                    <code>{item.path}</code>
                    <ArrowIcon />
                  </button>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="not-found layout" aria-labelledby="not-found-title">
            <p className="eyebrow">Route mismatch</p>
            <h1 id="not-found-title">This path is not in the contract.</h1>
            <p>
              The attempted path <code>{attemptedPath}</code> does not map to a registered BEACON route.
              Unlike the legacy implementation, the shell will not silently render an unrelated page.
            </p>
            <button type="button" onClick={() => goTo("/")}>
              Return to overview
              <ArrowIcon />
            </button>
          </section>
        )}

        <section className="engineering-note layout">
          <div>
            <p className="eyebrow">Why it exists</p>
            <h2>Navigation is application state, not decoration.</h2>
          </div>
          <p>
            The original project had five route labels, but three of those routes rendered the Careers component.
            BEACON treats navigation as a verifiable contract: one registry drives labels, current-location semantics,
            page metadata, route lookup, static-host-safe links, and recovery behavior.
          </p>
        </section>
      </main>

      <footer className="site-footer layout">
        <strong>BEACON</strong>
        <span>React · route contracts · keyboard navigation · static hosting</span>
      </footer>
    </div>
  );
}
