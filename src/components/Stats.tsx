"use client";

import { useRef } from "react";
import { gsap, useIsoLayoutEffect } from "@/lib/gsap";

const STATS = [
  { from: 0, to: 8, pad: 2, prefix: "", suffix: "+", label: "Systems shipped to production" },
  { from: 999, to: 100, pad: 0, prefix: "<", suffix: "ms", label: "Typical API latency" },
  { from: 0, to: 100, pad: 0, prefix: "", suffix: "%", label: "Code ownership for every client" },
  { from: 1990, to: 2017, pad: 0, prefix: "", suffix: "", label: "Writing code since" },
];

export default function Stats() {
  const rootRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".st-item").forEach((item, i) => {
        const num = item.querySelector<HTMLElement>(".st-num");
        const s = STATS[i];
        const obj = { v: s.from };
        const render = () => {
          if (num) num.textContent = String(Math.round(obj.v)).padStart(s.pad, "0");
        };
        render();
        const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: "top 85%" } });
        tl.fromTo(
          item,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", delay: i * 0.08 }
        ).to(obj, { v: s.to, duration: 1.8, ease: "expo.out", onUpdate: render }, "<0.1");

        const line = item.querySelector(".st-line");
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.3,
              ease: "expo.inOut",
              scrollTrigger: { trigger: item, start: "top 85%" },
            }
          );
        }
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} aria-label="Numbers" className="relative w-full px-6 py-24 md:py-36">
      <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4 md:gap-x-10">
        {STATS.map((s) => (
          <div key={s.label} className="st-item">
            <div className="st-line mb-6 h-px w-full origin-left bg-gradient-to-r from-white/30 to-white/0" />
            <div className="flex items-baseline text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.06em] text-white tabular-nums">
              {s.prefix && <span className="mr-1 text-white/35">{s.prefix}</span>}
              <span className="st-num">{s.to}</span>
              {s.suffix && <span className="text-gradient ml-0.5">{s.suffix}</span>}
            </div>
            <p className="mt-4 max-w-[14rem] text-[14px] leading-snug text-white/45">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
