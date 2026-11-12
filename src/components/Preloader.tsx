"use client";

import { useRef, useState } from "react";
import { gsap, useIsoLayoutEffect } from "@/lib/gsap";

const WORD = "david cicery";

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useIsoLayoutEffect(() => {
    if (window.__introDone) {
      setDone(true);
      return;
    }

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.__introDone = true;
      window.dispatchEvent(new Event("intro:done"));
    };

    const fallback = window.setTimeout(() => {
      finish();
      setDone(true);
    }, 3200);

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          window.clearTimeout(fallback);
          setDone(true);
        },
      });

      tl.from(".pl-letter", { yPercent: 110, stagger: 0.035, duration: 0.9, ease: "expo.out" })
        .to(
          counter,
          {
            v: 100,
            duration: 1.3,
            ease: "power2.inOut",
            onUpdate: () => {
              if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          0
        )
        .to(".pl-bar", { scaleX: 1, duration: 1.3, ease: "power2.inOut" }, 0)
        .to(".pl-letter", { yPercent: -110, stagger: 0.02, duration: 0.6, ease: "expo.in" }, "+=0.05")
        .to(".pl-meta", { opacity: 0, duration: 0.3 }, "<")
        .add(finish, "-=0.1")
        .to(rootRef.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, "-=0.15");
    }, rootRef);

    return () => {
      window.clearTimeout(fallback);
      ctx.revert();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden
    >
      <div className="flex overflow-hidden pb-2 text-[clamp(2.5rem,7vw,5.5rem)] font-semibold tracking-[-0.05em] text-white">
        {WORD.split("").map((ch, i) => (
          <span key={i} className="pl-letter inline-block">
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
        <span className="pl-letter inline-block text-[#7C3AED]">.</span>
      </div>

      <div className="pl-meta absolute inset-x-0 bottom-10 mx-auto flex w-[min(420px,80vw)] flex-col gap-3">
        <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          <span>Portfolio — 2026</span>
          <span ref={countRef}>000</span>
        </div>
        <div className="h-px w-full overflow-hidden bg-white/10">
          <div className="pl-bar h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#7C3AED] via-[#8B6584] to-[#F87171]" />
        </div>
      </div>
    </div>
  );
}
