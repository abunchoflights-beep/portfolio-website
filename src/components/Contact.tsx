"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { gsap, useIsoLayoutEffect } from "@/lib/gsap";
import Magnetic from "./Magnetic";

const EMAIL = "davidecicerys@gmail.com";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/exyzte", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/david-cicery-471355229/", icon: Linkedin },
  { label: "Email", href: `mailto:${EMAIL}`, icon: Mail },
];

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".ct-word", { yPercent: 115 });
      gsap.to(".ct-word", {
        yPercent: 0,
        stagger: 0.08,
        duration: 1.4,
        scrollTrigger: { trigger: ".ct-title", start: "top 85%" },
      });
      gsap.fromTo(
        ".ct-fade",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".ct-title", start: "top 75%" },
        }
      );
      gsap.fromTo(
        ".ct-giant",
        { yPercent: 60 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: ".ct-footer", start: "top bottom", end: "bottom bottom", scrub: true },
        }
      );
      gsap.fromTo(
        ".ct-orb",
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "center center", scrub: true },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const title: string[][] = [["Have", "an", "idea?"], ["Let's", "build", "it."]];

  return (
    <section id="contact" ref={rootRef} className="relative w-full overflow-hidden px-6 pt-36 md:pt-52">
      <div
        aria-hidden
        className="ct-orb pointer-events-none absolute left-1/2 top-[18%] h-[36rem] w-[36rem] -ml-[18rem] rounded-full bg-gradient-to-br from-[#7C3AED] via-[#8B6584] to-[#DC2626] opacity-0 blur-[160px]"
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <span className="ct-fade text-[13px] font-medium text-[#a78bfa]">Contact</span>
        <h2 className="ct-title mt-4 text-[clamp(3rem,9vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white">
          {title.map((line, li) => (
            <span key={li} className="block">
              {line.map((w, wi) => (
                <span key={w} className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-bottom last:mr-0">
                  <span className={`ct-word inline-block ${li === 1 ? (wi === line.length - 1 ? "text-gradient pr-[0.06em]" : "text-white") : "text-white/35"}`}>
                    {w}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h2>
        <p className="ct-fade mt-8 max-w-xl text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed text-white/55">
          A 20-minute call to map your bottlenecks and find out, honestly, whether custom software is the highest-return
          move for your business.
        </p>

        <div className="ct-fade mt-12 flex flex-wrap items-center justify-center gap-3">
          <Magnetic strength={0.4}>
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent("Let's build something")}`}
              className="group inline-flex h-14 items-center gap-2 rounded-full bg-white px-8 text-[16px] font-medium text-black transition-colors hover:bg-white/85"
            >
              Book a call
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-14 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-7 text-[15px] font-medium text-white backdrop-blur-xl transition-colors hover:border-white/30 hover:bg-white/[0.07]"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-white/60" />}
              {copied ? "Copied to clipboard" : EMAIL}
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Footer */}
      <footer className="ct-footer relative mx-auto mt-36 max-w-[1240px] md:mt-52">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 py-8 text-[13px] text-white/40 md:flex-row">
          <p>© 2026 David Cicery. All rights reserved.</p>
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p>Designed &amp; engineered by David · Next.js · GSAP</p>
        </div>
        <div className="overflow-hidden">
          <div
            aria-hidden
            className="ct-giant select-none whitespace-nowrap text-center text-[19vw] font-semibold leading-[0.8] tracking-[-0.07em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)] md:text-[17vw]"
          >
            david cicery
          </div>
        </div>
      </footer>
    </section>
  );
}
