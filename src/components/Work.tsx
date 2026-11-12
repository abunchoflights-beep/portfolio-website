"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Layers, LayoutGrid, Monitor, Sparkles, X } from "lucide-react";
import { gsap, ScrollTrigger, useIsoLayoutEffect } from "@/lib/gsap";
import { PROJECT_FILTERS, PROJECTS, type Project, type ProjectFilter } from "@/data/projects";

function getSurfaceClasses(surface: Project["surface"]) {
  switch (surface) {
    case "light":
      return {
        card: "bg-[#f5f5f7] text-[#1d1d1f] ring-1 ring-black/[0.06]",
        muted: "text-black/55",
        subtle: "text-black/35",
        impact: "text-black/85",
        tag: "bg-black/[0.06] text-black/70",
        btnPrimary: "bg-[#1d1d1f] text-white hover:bg-black",
        btnSecondary: "bg-black/[0.06] text-[#1d1d1f] hover:bg-black/[0.12]",
        frame: "bg-black/[0.04] ring-1 ring-black/[0.08]",
      };
    case "violet":
      return {
        card: "bg-[#130f1e] text-white ring-1 ring-[#7C3AED]/30",
        muted: "text-white/65",
        subtle: "text-white/40",
        impact: "text-white/90",
        tag: "bg-[#7C3AED]/20 text-[#ddd6fe] ring-1 ring-[#7C3AED]/30",
        btnPrimary: "bg-[#7C3AED] text-white hover:bg-[#6D28D9]",
        btnSecondary: "bg-white/[0.08] text-white hover:bg-white/[0.15]",
        frame: "bg-black/40 ring-1 ring-white/10",
      };
    case "mauve":
      return {
        card: "bg-[#191217] text-white ring-1 ring-[#855E7B]/35",
        muted: "text-white/65",
        subtle: "text-white/40",
        impact: "text-white/90",
        tag: "bg-[#855E7B]/25 text-[#f5d0fe] ring-1 ring-[#855E7B]/35",
        btnPrimary: "bg-[#855E7B] text-white hover:bg-[#734f6a]",
        btnSecondary: "bg-white/[0.08] text-white hover:bg-white/[0.15]",
        frame: "bg-black/40 ring-1 ring-white/10",
      };
    case "dark":
    default:
      return {
        card: "bg-[#111113] text-white ring-1 ring-white/[0.08]",
        muted: "text-white/55",
        subtle: "text-white/35",
        impact: "text-white/85",
        tag: "bg-white/[0.07] text-white/70",
        btnPrimary: "bg-white text-black hover:bg-white/85",
        btnSecondary: "bg-white/[0.08] text-white hover:bg-white/[0.14]",
        frame: "bg-white/[0.03] ring-1 ring-white/[0.08]",
      };
  }
}

function StackCard({
  project,
  index,
  total,
  onInspect,
}: {
  project: Project;
  index: number;
  total: number;
  onInspect: (p: Project) => void;
}) {
  const [screenIdx, setScreenIdx] = useState(0);
  const s = getSurfaceClasses(project.surface);
  const activeImage = project.screens ? project.screens[screenIdx]?.src ?? project.image : project.image;

  return (
    <>
      <div className="wc-marker h-0" aria-hidden />
      <article
        className="wc relative mb-6 md:sticky md:top-[var(--stack-top)] md:mb-[12vh]"
        style={{ "--stack-top": `calc(8.5vh + ${index * 10}px)` } as React.CSSProperties}
      >
        <div
          className={`wc-inner group relative origin-top overflow-hidden rounded-[28px] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.75)] will-change-transform md:h-[min(74vh,680px)] md:rounded-[36px] ${s.card}`}
        >
          {/* Ambient accent glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-36 -top-36 h-[28rem] w-[28rem] rounded-full opacity-[0.22] blur-[120px] transition-opacity duration-700 group-hover:opacity-35"
            style={{ background: project.accent }}
          />

          <div className="relative grid h-full grid-cols-1 gap-6 p-6 md:grid-cols-12 md:gap-10 md:p-11">
            {/* Left Column: Editorial Story */}
            <div className="flex flex-col justify-between gap-6 md:col-span-5">
              <div className="wc-reveal flex flex-wrap items-center justify-between gap-2 text-[13px] font-medium">
                <span className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: project.accent }} />
                  <span className={s.muted}>{project.category}</span>
                </span>
                <div className="flex items-center gap-2">
                  {project.poweredByBeliv && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#7C3AED] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                      <Sparkles className="h-2.5 w-2.5" /> xBeliv
                    </span>
                  )}
                  <span className={`font-mono text-[12px] ${s.subtle}`}>
                    {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="wc-reveal text-[clamp(2.1rem,4.4vw,4rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
                  {project.title}
                </h3>
                <p className={`wc-reveal mt-4 text-[15.5px] leading-relaxed md:text-[16.5px] ${s.muted}`}>
                  {project.description}
                </p>
                <div
                  className={`wc-reveal mt-5 border-l-2 pl-4 text-[14.5px] leading-relaxed ${s.impact}`}
                  style={{ borderColor: project.accent }}
                >
                  {project.impact}
                </div>
              </div>

              <div className="wc-reveal flex flex-col gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className={`rounded-full px-3 py-1 text-[11.5px] font-medium ${s.tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => onInspect(project)}
                    className={`inline-flex h-10 items-center gap-2 rounded-full px-5 text-[13px] font-semibold transition-all duration-300 ${s.btnPrimary}`}
                  >
                    Case Study
                  </button>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium transition-all duration-300 ${s.btnSecondary}`}
                  >
                    <span>{project.domain}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Visual Stage */}
            <div
              className={`relative aspect-[16/11] overflow-hidden rounded-[20px] md:col-span-7 md:aspect-auto md:h-full md:rounded-[24px] ${s.frame}`}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                data-cursor="Visit"
                className="block h-full w-full"
              >
                <div className="wc-img absolute inset-x-0 -inset-y-[6%] will-change-transform">
                  <Image
                    src={activeImage}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>
              </a>

              {/* Multi-screen switcher for Relink:Data */}
              {project.screens && project.screens.length > 1 && (
                <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/15 bg-black/75 p-1.5 backdrop-blur-xl">
                  <div className="flex flex-wrap items-center gap-1">
                    {project.screens.map((scr, idx) => (
                      <button
                        key={scr.src}
                        type="button"
                        onClick={() => setScreenIdx(idx)}
                        className={`rounded-xl px-3 py-1.5 font-mono text-[11px] font-medium transition-all ${
                          screenIdx === idx
                            ? "bg-[#7C3AED] text-white shadow-sm"
                            : "text-white/60 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {scr.label}
                      </button>
                    ))}
                  </div>
                  <span className="hidden items-center gap-1.5 pr-2 font-mono text-[11px] text-white/50 sm:flex">
                    <Monitor className="h-3 w-3" /> 3 System Screens
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Shade applied while the next card stacks over */}
          <div aria-hidden className="wc-shade pointer-events-none absolute inset-0 bg-black opacity-0" />
        </div>
      </article>
    </>
  );
}

function BentoCard({
  project,
  index,
  onInspect,
}: {
  project: Project;
  index: number;
  onInspect: (p: Project) => void;
}) {
  const [screenIdx, setScreenIdx] = useState(0);
  const s = getSurfaceClasses(project.surface);
  const activeImage = project.screens ? project.screens[screenIdx]?.src ?? project.image : project.image;
  // Asymmetric Apple Bento spans: row 1 (7+5), row 2 (5+7), etc.
  const wide = index % 4 === 0 || index % 4 === 3;

  return (
    <article
      className={`bento-card group relative flex flex-col justify-between overflow-hidden rounded-[30px] p-6 transition-transform duration-500 hover:-translate-y-1 md:p-8 ${
        wide ? "md:col-span-7" : "md:col-span-5"
      } ${s.card}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full opacity-20 blur-[100px] transition-opacity duration-500 group-hover:opacity-35"
        style={{ background: project.accent }}
      />

      <div>
        <div className="flex items-center justify-between gap-2 text-[12.5px] font-medium">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: project.accent }} />
            <span className={s.muted}>{project.category}</span>
          </span>
          {project.poweredByBeliv && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#7C3AED] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
              <Sparkles className="h-2.5 w-2.5" /> Powered by xBeliv
            </span>
          )}
        </div>

        <h3 className="mt-3 text-[clamp(1.75rem,3vw,2.6rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
          {project.title}
        </h3>
        <p className={`mt-2.5 line-clamp-2 text-[15px] leading-relaxed ${s.muted}`}>{project.tagline}</p>
      </div>

      {/* Preview Image */}
      <div className={`relative my-6 aspect-[16/10] w-full overflow-hidden rounded-[20px] ${s.frame}`}>
        <Image
          src={activeImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {project.screens && project.screens.length > 1 && (
          <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center gap-1 rounded-xl border border-white/15 bg-black/75 p-1 backdrop-blur-xl">
            {project.screens.map((scr, idx) => (
              <button
                key={scr.src}
                type="button"
                onClick={() => setScreenIdx(idx)}
                className={`flex-1 rounded-lg px-2 py-1 font-mono text-[10px] font-medium transition-all ${
                  screenIdx === idx ? "bg-[#7C3AED] text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {scr.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${s.tag}`}>
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onInspect(project)}
            className={`rounded-full px-4 py-2 text-[12.5px] font-semibold transition-all ${s.btnPrimary}`}
          >
            Case Study
          </button>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.title}`}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${s.btnSecondary}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const rootRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [viewMode, setViewMode] = useState<"stack" | "bento">("stack");
  const [selected, setSelected] = useState<Project | null>(null);
  const [modalScreen, setModalScreen] = useState(0);

  const filteredProjects = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.filter === filter)),
    [filter]
  );

  // Use Stack View only when viewMode === "stack" and filter === "all"; filtered subsets look best in Bento Grid
  const effectiveMode = filter === "all" ? viewMode : "bento";

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".wk-head > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".wk-head", start: "top 85%" },
        }
      );

      if (effectiveMode === "stack") {
        const markers = gsap.utils.toArray<HTMLElement>(".wc-marker");
        const cards = gsap.utils.toArray<HTMLElement>(".wc");

        cards.forEach((card, i) => {
          gsap.fromTo(
            card.querySelectorAll(".wc-reveal"),
            { y: 32, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.06,
              duration: 1,
              ease: "expo.out",
              scrollTrigger: { trigger: markers[i], start: "top 82%" },
            }
          );
          const img = card.querySelector(".wc-img");
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -4 },
              {
                yPercent: 4,
                ease: "none",
                scrollTrigger: { trigger: markers[i], start: "top bottom", end: "+=180%", scrub: true },
              }
            );
          }
        });
      } else {
        gsap.fromTo(
          ".bento-card",
          { y: 36, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.07,
            duration: 0.85,
            ease: "expo.out",
          }
        );
      }
    }, rootRef);

    if (effectiveMode === "stack") {
      mm.add("(min-width: 768px)", () => {
        const markers = gsap.utils.toArray<HTMLElement>(".wc-marker", rootRef.current);
        const cards = gsap.utils.toArray<HTMLElement>(".wc", rootRef.current);
        cards.forEach((card, i) => {
          const next = markers[i + 1];
          if (!next) return;
          const st = { trigger: next, start: "top bottom", end: "top 12%", scrub: true };
          const inner = card.querySelector(".wc-inner");
          const shade = card.querySelector(".wc-shade");
          if (inner) gsap.to(inner, { scale: 0.91, ease: "none", scrollTrigger: st });
          if (shade) gsap.to(shade, { opacity: 0.5, ease: "none", scrollTrigger: { ...st } });
        });
      });
    }

    const id = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(id);
      ctx.revert();
      mm.revert();
    };
  }, [effectiveMode, filter]);

  const handleInspect = (p: Project) => {
    setModalScreen(0);
    setSelected(p);
  };

  // Lock background scroll when case study modal is open
  useEffect(() => {
    if (selected) {
      window.lenis?.stop();
    } else if (window.__introDone) {
      window.lenis?.start();
    }
  }, [selected]);

  return (
    <section id="work" ref={rootRef} className="relative w-full px-4 pt-32 md:px-6 md:pt-48">
      <div className="wk-head mx-auto mb-12 flex max-w-[1240px] flex-col gap-8 md:mb-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[12px] font-medium text-white/70">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Case Studies · Verified Production
            </div>
            <h2 className="text-[clamp(3rem,8vw,7.25rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-white">
              Selected
              <br />
              <span className="text-white/35">work.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-[17px] leading-relaxed text-white/55">
              Real systems in production with measurable commercial outcomes — custom software, AI agents, and B2B
              platforms engineered end to end.
            </p>
            <a
              href="https://xbeliv.com/client-portfolio"
              target="_blank"
              rel="noreferrer"
              className="group mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#a78bfa] transition-colors hover:text-white"
            >
              Verified portfolio on xBeliv
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Apple Segmented Filter & View Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-white/[0.08] py-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {PROJECT_FILTERS.map((f) => {
              const count = f.id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.filter === f.id).length;
              const isActive = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-white text-black shadow-sm"
                      : "bg-white/[0.04] text-white/60 hover:bg-white/[0.09] hover:text-white"
                  }`}
                >
                  <span>{f.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 font-mono text-[11px] ${
                      isActive ? "bg-black/10 text-black" : "bg-white/10 text-white/50"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {filter === "all" && (
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1">
              <button
                type="button"
                onClick={() => setViewMode("stack")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-all ${
                  viewMode === "stack" ? "bg-white text-black" : "text-white/60 hover:text-white"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                Cinema Stack
              </button>
              <button
                type="button"
                onClick={() => setViewMode("bento")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-all ${
                  viewMode === "bento" ? "bg-white text-black" : "text-white/60 hover:text-white"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                Bento Grid
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cards Container */}
      <div className="relative mx-auto max-w-[1240px]">
        {effectiveMode === "stack" ? (
          filteredProjects.map((p, i) => (
            <StackCard
              key={p.id}
              project={p}
              index={i}
              total={filteredProjects.length}
              onInspect={handleInspect}
            />
          ))
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {filteredProjects.map((p, i) => (
              <BentoCard key={p.id} project={p} index={i} onInspect={handleInspect} />
            ))}
          </div>
        )}
      </div>

      {/* Apple-Style Case Study Sheet Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-2xl"
          onClick={() => setSelected(null)}
        >
          <div
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[32px] border border-white/15 bg-[#111113] p-6 text-white shadow-[0_40px_120px_rgba(0,0,0,0.9)] md:p-10"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-[12.5px] font-medium text-white/60">
                  <span className="h-2 w-2 rounded-full" style={{ background: selected.accent }} />
                  <span>{selected.category}</span>
                  {selected.poweredByBeliv && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#7C3AED] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                      <Sparkles className="h-2.5 w-2.5" /> Powered by xBeliv
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight tracking-[-0.045em]">
                  {selected.title}
                </h3>
                <p className="mt-1 text-[16px] text-white/60">{selected.tagline}</p>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setSelected(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/70 transition-colors hover:bg-white/15 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Preview stage */}
            <div className="relative my-6 aspect-[16/10] w-full overflow-hidden rounded-[22px] border border-white/10 bg-black">
              <Image
                src={selected.screens ? selected.screens[modalScreen]?.src ?? selected.image : selected.image}
                alt={selected.title}
                fill
                sizes="(max-width: 900px) 100vw, 850px"
                className="object-cover object-top"
              />
              {selected.screens && selected.screens.length > 1 && (
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 rounded-2xl border border-white/15 bg-black/80 p-1.5 backdrop-blur-xl">
                  {selected.screens.map((scr, idx) => (
                    <button
                      key={scr.src}
                      type="button"
                      onClick={() => setModalScreen(idx)}
                      className={`rounded-xl px-3.5 py-1.5 font-mono text-[11.5px] font-medium transition-all ${
                        modalScreen === idx ? "bg-[#7C3AED] text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {scr.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Challenge / Solution / Impact */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">01 · Challenge</span>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/75">{selected.challenge}</p>
              </div>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#a78bfa]">02 · Solution</span>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/75">{selected.solution}</p>
              </div>
              <div className="rounded-2xl border border-[#7C3AED]/30 bg-[#7C3AED]/10 p-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#c4b5fd]">03 · Impact</span>
                <p className="mt-2.5 text-[14.5px] font-medium leading-relaxed text-white">{selected.impact}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div className="flex flex-wrap gap-1.5">
                {selected.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[12px] text-white/75"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={selected.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-[14px] font-semibold text-black transition-colors hover:bg-white/85"
              >
                Visit {selected.domain}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
