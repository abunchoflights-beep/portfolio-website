"use client";

import { useRef } from "react";
import { gsap, useIsoLayoutEffect } from "@/lib/gsap";

const BIO =
  "I spent years decoding human languages and the internals of Windows at Microsoft. Today I translate business problems into software — designing, engineering and shipping AI-native products end to end, from database schema to the very last micro-interaction.";

const LINES: { k: string; v: string; tone?: "ok" }[] = [
  { k: "stack", v: "Next.js · React · Node · TypeScript" },
  { k: "data", v: "PostgreSQL · Supabase · MongoDB" },
  { k: "ai", v: "Autonomous agents · RAG · Automations" },
  { k: "motion", v: "GSAP · Framer Motion · Lenis" },
  { k: "status", v: "Founder @ xBeliv — open to new projects", tone: "ok" },
];

const COMMAND = "npx david --profile";

export default function About() {
  const rootRef = useRef<HTMLElement>(null);
  const cmdRef = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ab-head > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".ab-head", start: "top 85%" },
        }
      );

      // Apple-style read-along: words light up as you scroll
      gsap.fromTo(
        ".ab-word",
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ".ab-bio", start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );

      // Terminal
      gsap.set(".tm-line", { opacity: 0, x: -12 });
      const typed = { n: 0 };
      const tl = gsap.timeline({ scrollTrigger: { trigger: ".tm", start: "top 75%" } });
      tl.fromTo(
        ".tm",
        { y: 60, opacity: 0, rotateX: 10 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: "expo.out" }
      )
        .to(
          typed,
          {
            n: COMMAND.length,
            duration: 1.1,
            ease: `steps(${COMMAND.length})`,
            onUpdate: () => {
              if (cmdRef.current) cmdRef.current.textContent = COMMAND.slice(0, Math.round(typed.n));
            },
          },
          "-=0.6"
        )
        .to(".tm-line", { opacity: 1, x: 0, stagger: 0.18, duration: 0.6, ease: "power3.out" }, "+=0.25");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={rootRef} className="relative w-full px-6 py-28 md:py-44">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <div className="ab-head">
            <span className="text-[13px] font-medium text-[#a78bfa]">About</span>
            <h2 className="mt-3 text-[clamp(2.5rem,5.5vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white">
              Linguist turned
              <br />
              <span className="text-gradient">engineer.</span>
            </h2>
          </div>
          <p className="ab-bio mt-8 text-[clamp(1.2rem,1.8vw,1.55rem)] font-medium leading-[1.45] tracking-[-0.015em] text-white">
            {BIO.split(" ").map((w, i) => (
              <span key={i} className="ab-word">
                {w}{" "}
              </span>
            ))}
          </p>
          <div className="mt-10 flex flex-wrap gap-2">
            {["Founder · xBeliv", "IBM Full-Stack Certified", "Ex-Microsoft Support", "Modern Languages"].map((t) => (
              <span key={t} className="rounded-full border border-white/10 px-3.5 py-1.5 text-[13px] text-white/60">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="[perspective:1400px]">
          <div className="tm overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e]/90 shadow-[0_40px_120px_-30px_rgba(124,58,237,0.45)] backdrop-blur-xl">
            <div className="relative flex items-center border-b border-white/[0.06] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="absolute left-1/2 -translate-x-1/2 text-[12px] text-white/35">david — profile.ts — zsh</span>
            </div>
            <div className="min-h-[300px] p-5 font-mono text-[12.5px] leading-7 md:p-7 md:text-[13.5px]">
              <div className="flex flex-wrap gap-x-2">
                <span className="text-[#a78bfa]">~/david</span>
                <span className="text-white/35">❯</span>
                <span className="text-white">
                  <span ref={cmdRef} />
                  <span className="caret ml-px inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] bg-white/80" />
                </span>
              </div>
              <div className="mt-3 space-y-0.5">
                {LINES.map((l) => (
                  <div key={l.k} className="tm-line flex gap-3">
                    <span className={l.tone === "ok" ? "text-emerald-400" : "text-white/30"}>
                      {l.tone === "ok" ? "✓" : "→"}
                    </span>
                    <span className="w-16 shrink-0 text-white/40">{l.k}</span>
                    <span className={l.tone === "ok" ? "text-emerald-300" : "text-white/85"}>{l.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

