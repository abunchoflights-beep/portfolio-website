"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "expo.out", duration: 1 });
}

/** useLayoutEffect on the client (no flash of un-animated content), useEffect on the server. */
export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Runs `cb` once the intro preloader has finished (or immediately if it already has). */
export function onIntroDone(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  if (window.__introDone) {
    cb();
    return () => {};
  }
  window.addEventListener("intro:done", cb, { once: true });
  return () => window.removeEventListener("intro:done", cb);
}

export function scrollToTarget(target: string) {
  const el = document.querySelector<HTMLElement>(target);
  if (!el) return;
  if (window.lenis) window.lenis.scrollTo(el, { duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export { gsap, ScrollTrigger };

