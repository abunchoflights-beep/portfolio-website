"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("has-cursor");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });

    let visible = false;
    const onMove = (e: MouseEvent) => {
      if (!visible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
        visible = true;
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    let state = "";
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      const interactive = target.closest("a, button");
      const next = labelled ? `label:${labelled.dataset.cursor}` : interactive ? "hover" : "idle";
      if (next === state) return;
      state = next;

      if (labelled) {
        label.textContent = labelled.dataset.cursor ?? "";
        gsap.to(ring, {
          width: 92,
          height: 92,
          backgroundColor: "rgba(255,255,255,1)",
          borderColor: "rgba(255,255,255,1)",
          mixBlendMode: "normal",
          duration: 0.5,
          ease: "expo.out",
        });
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.4, ease: "expo.out" });
        gsap.to(dot, { scale: 0, duration: 0.3 });
      } else if (interactive) {
        gsap.to(ring, {
          width: 56,
          height: 56,
          backgroundColor: "rgba(255,255,255,1)",
          borderColor: "rgba(255,255,255,1)",
          mixBlendMode: "difference",
          duration: 0.5,
          ease: "expo.out",
        });
        gsap.to(label, { opacity: 0, scale: 0.5, duration: 0.2 });
        gsap.to(dot, { scale: 0, duration: 0.3 });
      } else {
        gsap.to(ring, {
          width: 34,
          height: 34,
          backgroundColor: "rgba(255,255,255,0)",
          borderColor: "rgba(255,255,255,0.5)",
          mixBlendMode: "difference",
          duration: 0.5,
          ease: "expo.out",
        });
        gsap.to(label, { opacity: 0, scale: 0.5, duration: 0.2 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };

    const onLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
      visible = false;
    };
    const onDown = () => gsap.to(ring, { scale: 0.85, duration: 0.2 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden [@media(pointer:fine)]:block">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/50 opacity-0 mix-blend-difference"
      >
        <span ref={labelRef} className="scale-50 text-[12px] font-semibold tracking-tight text-black opacity-0">
          View
        </span>
      </div>
      <div ref={dotRef} className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-white opacity-0 mix-blend-difference" />
    </div>
  );
}
