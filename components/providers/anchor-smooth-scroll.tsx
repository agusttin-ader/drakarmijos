"use client";

import { useEffect } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function resolveSectionId(href: string, pathname: string): string | null {
  if (!href.includes("#")) return null;

  if (href.startsWith("#")) {
    const id = href.slice(1);
    return id || null;
  }

  try {
    const url = new URL(href, window.location.origin);
    if (url.pathname !== pathname) return null;
    const id = url.hash.slice(1);
    return id || null;
  } catch {
    return null;
  }
}

export function scrollToSection(id: string, smooth = !prefersReducedMotion()) {
  const target = document.getElementById(id);
  if (!target) return false;

  target.scrollIntoView({
    behavior: smooth ? "smooth" : "instant",
    block: "start",
  });

  return true;
}

/** Scroll suave al hacer clic en anclas internas (#sección). No afecta la rueda del mouse. */
export function AnchorSmoothScroll() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest("a[href*='#']");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target === "_blank") return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const sectionId = resolveSectionId(href, window.location.pathname);
      if (!sectionId) return;
      if (!document.getElementById(sectionId)) return;

      event.preventDefault();

      const smooth = !prefersReducedMotion();
      scrollToSection(sectionId, smooth);

      const nextUrl = `${window.location.pathname}${window.location.search}#${sectionId}`;
      history.pushState(null, "", nextUrl);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash || !document.getElementById(hash)) return;

    requestAnimationFrame(() => {
      scrollToSection(hash, !prefersReducedMotion());
    });
  }, []);

  return null;
}
