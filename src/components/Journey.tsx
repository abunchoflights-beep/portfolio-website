"use client";

import { ReactNode, useRef } from "react";
import { Bot, Code2, Cpu, Languages, Terminal } from "lucide-react";
import { gsap, useIsoLayoutEffect } from "@/lib/gsap";

const STEPS: { period: string; title: string; icon: ReactNode; description: string; skills: string[] }[] = [
  {
    period: "2017",
    title: "Programming genesis",
    icon: <Cpu className="h-5 w-5" />,
    description:
      "Began my technical journey with C++, HTML, JavaScript and CSS — laying the foundational logic for software development.",
    skills: ["C++", "HTML & CSS", "JavaScript"],
  },
  {
    period: "2018 — 2023",
    title: "Modern languages",
    icon: <Languages className="h-5 w-5" />,
    description:
      "A deep dive into linguistic structures, semantics and syntax. Advanced pattern recognition that translates directly into logical thinking.",
    skills: ["Comparative Linguistics", "Syntax Analysis", "Communication", "Community Management"],
  },
  {
    period: "2019 — 2023",
    title: "Technical support @ Microsoft",
    icon: <Terminal className="h-5 w-5" />,
    description:
      "Up & Running and Windows support. Wrote Batch scripts to troubleshoot apps, updates and processes, and resolved driver conflicts, file corruption and registry errors over Quick Assist.",
    skills: ["Batch Scripting", "Windows Internals", "Registry", "Troubleshooting"],
  },
  {
    period: "2023 — 2025",
    title: "Full-stack foundations",
    icon: <Code2 className="h-5 w-5" />,
    description:
      "Mastered the MERN stack with a focus on structured, scalable architectures. IBM Full Stack Developer certified, with a passion for clean code and intuitive UI/UX.",
    skills: ["MERN", "TypeScript", "UI/UX Design", "Agile"],
  },
  {
    period: "2025 — Now",
    title: "AI software architect",
    icon: <Bot className="h-5 w-5" />,
    description:
      "Building autonomous agents and LLM-powered systems, integrating AI into full-stack products — and founding xBeliv.",
    skills: ["AI Agents", "Prompt Engineering", "RAG Systems", "Automation"],
  },
];

export default function Journey() {
  const rootRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // The light sheet rises and expands into place
      gsap.fromTo(
        "#journey-sheet",
        { scale: 0.92, borderRadius: "64px" },
        {
          scale: 1,
          borderRadius: "40px",
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "top 10%", scrub: true },
        }
      );

      gsap.fromTo(
        ".jn-head > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".jn-head", start: "top 85%" },
        }
      );

      // Progress line
      gsap.fromTo(
        ".jn-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".jn-list", start: "top 60%", end: "bottom 60%", scrub: true },
        }
      );

      gsap.utils.toArray<HTMLElement>(".j-row").forEach((row) => {
        gsap.fromTo(
          row.querySelectorAll(".j-reveal"),
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: row, start: "top 84%" },
          }
        );
        gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 60%", end: "bottom 60%", toggleClass: "is-active" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={rootRef} className="relative w-full px-2 md:px-4">
      <div id="journey-sheet" className="origin-top overflow-hidden rounded-[40px] bg-[#f5f5f7] text-[#1d1d1f] will-change-transform">
        <div className="mx-auto max-w-[1160px] px-6 py-24 md:px-10 md:py-40">
          <div className="jn-head mb-16 md:mb-24">
            <span className="text-[13px] font-medium text-[#7C3AED]">Journey</span>
            <h2 className="mt-3 text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
              From language
              <br />
              <span className="text-black/30">to machine intelligence.</span>
            </h2>
          </div>

          <div className="jn-list relative">
            {/* Track + progress */}
            <div className="absolute bottom-0 left-[5px] top-0 w-px bg-black/[0.08] md:left-[245px]" />
            <div className="jn-progress absolute bottom-0 left-[5px] top-0 w-px origin-top bg-gradient-to-b from-[#7C3AED] via-[#8B6584] to-[#DC2626] md:left-[245px]" />

            {STEPS.map((s) => (
              <div
                key={s.title}
                className="j-row relative grid grid-cols-1 gap-4 py-10 pl-10 md:grid-cols-[245px_1fr] md:gap-0 md:py-14 md:pl-0"
              >
                <span className="j-dot absolute left-0 top-[3.1rem] h-[11px] w-[11px] rounded-full md:left-[240px] md:top-[4.4rem]" />
                <div className="j-reveal j-year pr-8 text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold tracking-[-0.04em] md:pt-1">
                  {s.period}
                </div>
                <div className="md:pl-14">
                  <div className="j-reveal flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#1d1d1f] shadow-[0_6px_20px_-6px_rgba(0,0,0,0.15)]">
                      {s.icon}
                    </span>
                    <h3 className="text-[clamp(1.5rem,2.4vw,2.1rem)] font-semibold tracking-[-0.04em]">{s.title}</h3>
                  </div>
                  <p className="j-reveal mt-5 max-w-2xl text-[17px] leading-relaxed text-black/55">{s.description}</p>
                  <div className="j-reveal mt-6 flex flex-wrap gap-2">
                    {s.skills.map((k) => (
                      <span
                        key={k}
                        className="rounded-full border border-black/[0.06] bg-white px-3.5 py-1.5 text-[13px] font-medium text-black/65"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

