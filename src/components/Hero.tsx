"use client";

import { MouseEvent, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, onIntroDone, scrollToTarget, useIsoLayoutEffect } from "@/lib/gsap";
import Magnetic from "./Magnetic";

function Words({ words, gradientLast = false }: { words: string[]; gradientLast?: boolean }) {
  return (
    <>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-bottom last:mr-0">
          <span
            className={`hero-word inline-block will-change-transform ${
              gradientLast && i === words.length - 1 ? "text-gradient pr-[0.06em]" : ""
            }`}
          >
            {w}
          </span>
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    let offIntro = () => {};
    const ctx = gsap.context(() => {
      gsap.set(".hero-word", { yPercent: 115, rotate: 4 });
      gsap.set(".hero-fade", { opacity: 0, y: 24, filter: "blur(8px)" });
      gsap.set(".hero-orbs", { opacity: 0, scale: 0.8 });

      const intro = gsap.timeline({ paused: true });
      intro
        .to(".hero-orbs", { opacity: 1, scale: 1, duration: 2.4, ease: "expo.out" }, 0)
        .to(".hero-word", { yPercent: 0, rotate: 0, stagger: 0.08, duration: 1.4, ease: "expo.out" }, 0.1)
        .to(".hero-fade", { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.1, duration: 1.2, ease: "expo.out" }, 0.55);
      offIntro = onIntroDone(() => intro.play());

      // Scroll-out: content drifts up, blurs and fades like a page turning
      gsap.to(".hero-content", {
        yPercent: -18,
        scale: 0.94,
        opacity: 0,
        filter: "blur(6px)",
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-orbs-wrap", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, rootRef);

    // Mouse parallax on aurora
    const orbs = orbsRef.current;
    let onMove: ((e: globalThis.MouseEvent) => void) | null = null;
    if (orbs && window.matchMedia("(pointer: fine)").matches) {
      const xTo = gsap.quickTo(orbs, "x", { duration: 2, ease: "power3" });
      const yTo = gsap.quickTo(orbs, "y", { duration: 2, ease: "power3" });
      onMove = (e) => {
        xTo((e.clientX / window.innerWidth - 0.5) * 80);
        yTo((e.clientY / window.innerHeight - 0.5) * 60);
      };
      window.addEventListener("mousemove", onMove);
    }

    return () => {
      offIntro();
      ctx.revert();
      if (onMove) window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const go = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>, target: string) => {
    e.preventDefault();
    scrollToTarget(target);
  };

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32"
    >
      {/* Background */}
      <div aria-hidden className="hero-orbs-wrap pointer-events-none absolute inset-0">
        <div className="hero-grid absolute inset-0" />
        <div ref={orbsRef} className="absolute inset-0">
          <div className="hero-orbs absolute inset-0">
            <div className="absolute left-[18%] top-[18%] h-[34rem] w-[34rem] rounded-full bg-[#7C3AED] opacity-[0.28] blur-[130px] animate-orb-a md:h-[44rem] md:w-[44rem]" />
            <div className="absolute right-[12%] top-[30%] h-[28rem] w-[28rem] rounded-full bg-[#8B6584] opacity-[0.32] blur-[130px] animate-orb-b md:h-[36rem] md:w-[36rem]" />
            <div className="absolute bottom-[12%] left-[45%] h-[18rem] w-[18rem] rounded-full bg-[#DC2626] opacity-[0.10] blur-[110px] animate-orb-c" />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-black" />
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 flex max-w-6xl flex-col items-center text-center will-change-transform">
        <a
          href="https://xbeliv.com"
          target="_blank"
          rel="noreferrer"
          className="hero-fade group mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-4 text-[13px] text-white/70 backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
        >
          <span className="rounded-full bg-[#DC2626] px-2.5 py-0.5 text-[11px] font-semibold text-white">New</span>
          <span>xBeliv AI CRM is live</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>

        <h1 className="text-[clamp(3.1rem,10vw,9rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-white">
          <span className="block">
            <Words words={["Software", "that"]} />
          </span>
          <span className="block">
            <Words words={["thinks", "ahead."]} gradientLast />
          </span>
        </h1>

        <p className="hero-fade mt-9 max-w-xl text-[clamp(1.05rem,1.5vw,1.3rem)] leading-relaxed text-white/55">
          I&apos;m <span className="font-medium text-white">David Cicery</span> — a full-stack &amp; AI engineer building
          production systems, autonomous agents and interfaces people love to use.
        </p>

        <div className="hero-fade mt-11 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <a
              href="#work"
              onClick={(e) => go(e, "#work")}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-[15px] font-medium text-black transition-colors hover:bg-white/85"
            >
              View my work
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              onClick={(e) => go(e, "#contact")}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-7 text-[15px] font-medium text-white backdrop-blur-xl transition-colors hover:border-white/30 hover:bg-white/[0.06]"
            >
              Get in touch
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Bottom meta */}
      <div className="hero-fade absolute inset-x-0 bottom-8 z-10 hidden items-center justify-between px-10 text-[12px] text-white/40 md:flex">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for new projects
        </div>
        <div>Founder · xBeliv</div>
      </div>
      <button
        type="button"
        aria-label="Scroll down"
        onClick={(e) => go(e, "#showcase")}
        className="hero-fade absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-white/40 transition-colors hover:text-white"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <span className="animate-scroll-dot absolute left-0 top-0 h-1/3 w-px bg-white" />
        </span>
      </button>
    </section>
  );
}

