"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useIsoLayoutEffect } from "@/lib/gsap";

const ROW_A = ["Next.js", "React", "TypeScript", "Node.js", "Supabase", "PostgreSQL", "MongoDB", "Vercel"];
const ROW_B = ["AI Agents", "RAG", "Automations", "GSAP", "Tailwind", "Express", "Railway", "Realtime"];

function Row({ items, className }: { items: string[]; className: string }) {
  return (
    <div className={`flex w-max will-change-transform ${className}`}>
      {[...items, ...items].map((t, i) => (
        <span
          key={`${t}-${i}`}
          className="flex shrink-0 items-center px-5 text-[clamp(1.75rem,4vw,3.5rem)] font-semibold tracking-[-0.04em] text-white/20 transition-colors duration-500 hover:text-white md:px-8"
        >
          {t}
          <span className="ml-10 h-2 w-2 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#8B6584] md:ml-16" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const rootRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const a = gsap.fromTo(".mq-a", { xPercent: 0 }, { xPercent: -50, ease: "none", duration: 38, repeat: -1 });
      const b = gsap.fromTo(".mq-b", { xPercent: -50 }, { xPercent: 0, ease: "none", duration: 44, repeat: -1 });
      const skewTo = gsap.quickTo(".mq-track", "skewX", { duration: 0.6, ease: "power3" });

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          const boost = Math.min(Math.abs(v) / 220, 6);
          [a, b].forEach((t) =>
            gsap.to(t, {
              timeScale: 1 + boost,
              duration: 0.2,
              overwrite: true,
              onComplete: () => {
                gsap.to(t, { timeScale: 1, duration: 1.2, ease: "power2.out" });
              },
            })
          );
          skewTo(gsap.utils.clamp(-8, 8, v / -300));
        },
        onLeave: () => skewTo(0),
        onLeaveBack: () => skewTo(0),
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="Technologies"
      className="relative w-full overflow-hidden border-y border-white/[0.06] py-10 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] md:py-14"
    >
      <div className="mq-track flex flex-col gap-2 md:gap-4">
        <Row items={ROW_A} className="mq-a" />
        <Row items={ROW_B} className="mq-b" />
      </div>
    </section>
  );
}

