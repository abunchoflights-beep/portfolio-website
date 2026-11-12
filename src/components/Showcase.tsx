"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Bot, Lock, MessageCircle, Sparkles } from "lucide-react";
import { gsap, useIsoLayoutEffect } from "@/lib/gsap";

const PILLARS = [
  {
    badge: "Instagram · +5",
    title: "Obsidian Command Bar",
    body: "Set up autonomous AI workflows in under 60 seconds with zero-latency triage across every incoming DM.",
    bg: "bg-[#121214] text-white border border-white/10",
    sub: "text-white/55",
    pill: "bg-white/10 text-white/80",
  },
  {
    badge: "Snapchat · +5",
    title: "Electric Violet Agents",
    body: "Context-aware agents that remember every contact's history, qualify leads, and draft or send replies automatically.",
    bg: "bg-[#7C3AED] text-white shadow-[0_30px_80px_-20px_rgba(124,58,237,0.55)]",
    sub: "text-white/80",
    pill: "bg-black/20 text-white",
  },
  {
    badge: "WhatsApp · +10",
    title: "Pinned Global Threads",
    body: "Keep high-priority conversations anchored across France, Colombia, USA, UK, Australia, and Spain in one unified view.",
    bg: "bg-[#855E7B] text-white shadow-[0_30px_80px_-20px_rgba(133,94,123,0.5)]",
    sub: "text-white/80",
    pill: "bg-black/20 text-white",
  },
];

export default function Showcase() {
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Device tilts up and settles flat, Apple keynote style
      gsap.fromTo(
        ".sc-device",
        { rotateX: 28, scale: 0.84, y: 70, opacity: 0.45 },
        {
          rotateX: 0,
          scale: 1,
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top 95%", end: "top 15%", scrub: 1 },
        }
      );

      // Glass reflection sweep across the display
      gsap.fromTo(
        ".sc-sheen",
        { xPercent: -120 },
        {
          xPercent: 180,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top 85%", end: "bottom 20%", scrub: 1 },
        }
      );

      // Glow intensifies as it lands
      gsap.fromTo(
        ".sc-glow",
        { opacity: 0.15, scale: 0.7 },
        {
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top 80%", end: "top 10%", scrub: 1 },
        }
      );

      // Floating chips with different depths
      gsap.utils.toArray<HTMLElement>(".sc-chip").forEach((chip) => {
        const depth = Number(chip.dataset.depth ?? 1);
        gsap.fromTo(
          chip,
          { y: 100 * depth, opacity: 0, scale: 0.88 },
          {
            y: -45 * depth,
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: rootRef.current, start: "top 80%", end: "bottom 35%", scrub: 1 },
          }
        );
      });

      gsap.fromTo(
        ".sc-caption > *",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".sc-caption", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".sc-pillar",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".sc-pillars", start: "top 85%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Subtle interactive 3D cursor tilt on the Studio frame
  useEffect(() => {
    const el = frameRef.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    const rY = gsap.quickTo(el, "rotationY", { duration: 0.8, ease: "power3.out" });
    const rX = gsap.quickTo(el, "rotationX", { duration: 0.8, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      rY(nx * 3.5);
      rX(-ny * 2.5);
    };
    const onLeave = () => {
      rY(0);
      rX(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="showcase" ref={rootRef} className="relative w-full px-4 pb-32 pt-8 md:px-6 md:pb-44">
      <div className="relative mx-auto max-w-[1080px] [perspective:1800px]">
        <div
          aria-hidden
          className="sc-glow pointer-events-none absolute -inset-x-10 -bottom-10 top-1/4 rounded-[50%] bg-gradient-to-r from-[#7C3AED]/45 via-[#855E7B]/35 to-[#DC2626]/20 blur-[100px]"
        />

        <div ref={frameRef} className="[transform-style:preserve-3d]">
          <div
            className="sc-device relative origin-[50%_0%] rounded-[24px] border border-white/15 bg-[#141416] p-1.5 shadow-[0_60px_140px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.06)] will-change-transform md:rounded-[30px] md:p-2.5"
            data-cursor="Explore"
          >
            <a href="https://xbeliv.com" target="_blank" rel="noreferrer" className="block">
              {/* macOS Studio Window Chrome */}
              <div className="flex items-center justify-between px-3 pb-2.5 pt-1.5 md:px-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.05] px-4 py-1 text-[11px] font-medium text-white/65 md:px-20">
                  <Lock className="h-3 w-3 text-emerald-400" />
                  <span>app.xbeliv.com</span>
                  <span className="hidden text-white/30 sm:inline">— AI CRM Workspace</span>
                </div>
                <div className="hidden items-center gap-1.5 font-mono text-[10px] text-white/40 sm:flex">
                  <span className="rounded-full border border-white/10 px-2 py-0.5">R +2</span>
                  <span className="rounded-full border border-white/10 px-2 py-0.5">P +1</span>
                  <span className="rounded-full border border-white/10 px-2 py-0.5">P +5</span>
                </div>
              </div>

              {/* Screen viewport */}
              <div className="relative aspect-[1024/884] w-full overflow-hidden rounded-[16px] bg-white ring-1 ring-black/5 md:rounded-[20px]">
                <Image
                  src="/images/xbeliv-platform.jpg"
                  alt="xBeliv AI CRM platform dashboard"
                  fill
                  sizes="(max-width: 1100px) 100vw, 1080px"
                  className="object-cover object-top"
                  priority
                />
                {/* Subtle optical glass sheen */}
                <div
                  aria-hidden
                  className="sc-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                />
              </div>
            </a>
          </div>
        </div>

        {/* Floating chips matching xBeliv UI */}
        <div
          data-depth="1.15"
          className="sc-chip absolute -left-2 top-[15%] z-20 flex items-center gap-2.5 rounded-2xl border border-black/[0.06] bg-white/95 px-4 py-2.5 text-[13px] font-semibold text-[#1d1d1f] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl md:-left-14"
        >
          <span>Inquiries</span>
          <span className="rounded-full bg-[#DC2626] px-2.5 py-0.5 text-[11px] font-semibold text-white">50 new</span>
        </div>

        <div
          data-depth="0.9"
          className="sc-chip absolute -right-2 top-[12%] z-20 hidden items-center gap-2.5 rounded-2xl border border-white/15 bg-[#121214]/95 px-4 py-2.5 text-[12px] font-medium text-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:flex md:-right-12"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#a78bfa]" />
          <span>Finish setting up your AI — 1 min</span>
        </div>

        <div
          data-depth="0.75"
          className="sc-chip absolute -right-2 top-[46%] z-20 flex items-center gap-3 rounded-2xl bg-[#7C3AED] px-4 py-3 text-white shadow-[0_25px_60px_-12px_rgba(124,58,237,0.75)] md:-right-16"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
            <Bot className="h-4 w-4" />
          </span>
          <span className="leading-tight">
            <span className="block text-[13px] font-semibold">Snapchat &amp; IG Agent</span>
            <span className="block text-[11px] text-white/75">Replied in 1.8 seconds</span>
          </span>
        </div>

        <div
          data-depth="1.45"
          className="sc-chip absolute bottom-[8%] left-[4%] z-20 hidden items-center gap-3 rounded-2xl bg-[#855E7B] px-4 py-3 text-white shadow-[0_25px_60px_-12px_rgba(133,94,123,0.85)] sm:flex md:-left-10"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
            <MessageCircle className="h-4 w-4" />
          </span>
          <span className="leading-tight">
            <span className="block text-[13px] font-semibold">WhatsApp Business</span>
            <span className="block text-[11px] text-white/75">Connected · +10 active chats</span>
          </span>
        </div>
      </div>

      {/* Editorial Caption */}
      <div className="sc-caption mx-auto mt-16 flex max-w-3xl flex-col items-center text-center md:mt-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[12px] font-medium text-[#c4b5fd]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
          Flagship Product · Founder &amp; Lead Architect
        </div>
        <h2 className="mt-4 text-[clamp(2rem,4.6vw,3.85rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white">
          beliv. One minimalist workspace.{" "}
          <span className="text-white/40">Every social channel. Autonomous agents that close.</span>
        </h2>
        <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
          Designed around pure monochrome clarity with electric violet, dusty mauve, and signal crimson accents — built
          so sales teams can connect Instagram, Snapchat, and WhatsApp in sixty seconds.
        </p>
      </div>

      {/* 3-Card xBeliv Palette Pillar Strip */}
      <div className="sc-pillars mx-auto mt-14 grid max-w-[1080px] grid-cols-1 gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
        {PILLARS.map((p) => (
          <a
            key={p.title}
            href="https://xbeliv.com"
            target="_blank"
            rel="noreferrer"
            className={`sc-pillar group relative flex flex-col justify-between overflow-hidden rounded-[26px] p-7 transition-transform duration-500 hover:-translate-y-1 ${p.bg}`}
          >
            <div className="flex items-center justify-between">
              <span className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-tight ${p.pill}`}>
                {p.badge}
              </span>
              <ArrowUpRight className="h-4 w-4 opacity-60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </div>
            <div className="mt-10">
              <h3 className="text-[22px] font-semibold tracking-[-0.03em]">{p.title}</h3>
              <p className={`mt-2 text-[14.5px] leading-relaxed ${p.sub}`}>{p.body}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
