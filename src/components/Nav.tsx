"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, onIntroDone, scrollToTarget } from "@/lib/gsap";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const [light, setLight] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { yPercent: -160, opacity: 0 });
    const offIntro = onIntroDone(() =>
      gsap.to(nav, { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.6 })
    );

    let hidden = false;
    const hideShow = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const shouldHide = self.scroll() > 500 && self.direction === 1;
        if (shouldHide === hidden) return;
        hidden = shouldHide;
        gsap.to(nav, { yPercent: shouldHide ? -160 : 0, duration: 0.6, ease: "expo.out", overwrite: "auto" });
      },
    });

    const sectionTriggers = LINKS.map((l, i) =>
      ScrollTrigger.create({
        trigger: `#${l.id}`,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => self.isActive && setActive(i),
      })
    );
    const edges = ["#top", "#contact"].map((sel) =>
      ScrollTrigger.create({
        trigger: sel,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => self.isActive && setActive(-1),
      })
    );
    const lightTrigger = ScrollTrigger.create({
      trigger: "#journey-sheet",
      start: "top 48px",
      end: "bottom 48px",
      onToggle: (self) => setLight(self.isActive),
    });

    return () => {
      offIntro();
      hideShow.kill();
      sectionTriggers.forEach((t) => t.kill());
      edges.forEach((t) => t.kill());
      lightTrigger.kill();
    };
  }, []);

  // Sliding active pill
  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;
    const el = active >= 0 ? linkRefs.current[active] : null;
    if (!el) {
      gsap.to(pill, { opacity: 0, duration: 0.3 });
      return;
    }
    gsap.to(pill, { x: el.offsetLeft, width: el.offsetWidth, opacity: 1, duration: 0.7, ease: "expo.out" });
  }, [active]);

  // Mobile menu
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (open) {
      window.lenis?.stop();
      gsap.set(menu, { display: "flex" });
      gsap.fromTo(menu, { clipPath: "circle(0% at 100% 0%)" }, { clipPath: "circle(150% at 100% 0%)", duration: 0.9, ease: "expo.inOut" });
      gsap.fromTo(".m-link", { yPercent: 120 }, { yPercent: 0, stagger: 0.06, duration: 1, ease: "expo.out", delay: 0.3 });
    } else {
      if (window.__introDone) window.lenis?.start();
      gsap.to(menu, {
        clipPath: "circle(0% at 100% 0%)",
        duration: 0.7,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(menu, { display: "none" });
        },
      });
    }
  }, [open]);

  const go = (e: MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToTarget(target);
  };

  const tone = light
    ? "border-black/[0.06] bg-white/70 text-[#1d1d1f] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]"
    : "border-white/10 bg-black/55 text-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]";

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-4">
        <nav
          ref={navRef}
          className={`pointer-events-auto flex items-center gap-1 rounded-full border p-1.5 backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,border-color,color,box-shadow] duration-500 ${tone}`}
        >
          <a href="#top" onClick={(e) => go(e, "#top")} className="px-4 py-2 text-[15px] font-semibold tracking-[-0.03em]">
            David Cicery<span className="text-[#7C3AED]">.</span>
          </a>

          <div className="relative hidden items-center sm:flex">
            <span
              ref={pillRef}
              className={`absolute left-0 top-0 h-full w-0 rounded-full opacity-0 transition-colors duration-500 ${
                light ? "bg-black/[0.06]" : "bg-white/[0.12]"
              }`}
            />
            {LINKS.map((l, i) => (
              <a
                key={l.id}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                href={`#${l.id}`}
                onClick={(e) => go(e, `#${l.id}`)}
                className={`relative z-10 rounded-full px-4 py-2 text-[13px] font-medium transition-opacity duration-300 ${
                  active === i ? "opacity-100" : "opacity-60 hover:opacity-100"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={(e) => go(e, "#contact")}
            className={`ml-1 rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-500 ${
              light ? "bg-[#1d1d1f] text-white hover:bg-black" : "bg-white text-black hover:bg-white/85"
            }`}
          >
            Let&apos;s talk
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full sm:hidden"
          >
            <span
              className={`absolute h-[1.5px] w-4 bg-current transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[3px]"}`}
            />
            <span
              className={`absolute h-[1.5px] w-4 bg-current transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[3px]"}`}
            />
          </button>
        </nav>
      </div>

      <div
        ref={menuRef}
        className="fixed inset-0 z-[95] hidden flex-col justify-end bg-black px-6 pb-16 sm:hidden"
        style={{ clipPath: "circle(0% at 100% 0%)" }}
      >
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-[#7C3AED] opacity-25 blur-[100px]" />
        {[...LINKS, { id: "contact", label: "Contact" }].map((l) => (
          <div key={l.id} className="overflow-hidden">
            <a
              href={`#${l.id}`}
              onClick={(e) => go(e, `#${l.id}`)}
              className="m-link block py-1 text-[3.25rem] font-semibold leading-[1.1] tracking-[-0.05em] text-white"
            >
              {l.label}
            </a>
          </div>
        ))}
        <p className="mt-10 text-sm text-white/40">davidecicerys@gmail.com</p>
      </div>
    </>
  );
}
