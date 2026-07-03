"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Palette, Code2, Rocket, LifeBuoy, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "We learn about your business, goals, and target audience to build a strategy.",
    icon: Search,
    color: "from-purple-500 to-indigo-500",
    glowColor: "rgba(168, 85, 247, 0.15)",
  },
  {
    number: "02",
    title: "Strategy & Design",
    description: "We create a custom, high-converting design tailored to your brand identity.",
    icon: Palette,
    color: "from-indigo-500 to-blue-500",
    glowColor: "rgba(99, 102, 241, 0.15)",
  },
  {
    number: "03",
    title: "Development",
    description: "We build a lightning-fast, responsive, and SEO-optimized website.",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    number: "04",
    title: "Launch",
    description: "We rigorously test, optimize, and deploy your site with zero downtime.",
    icon: Rocket,
    color: "from-cyan-500 to-teal-500",
    glowColor: "rgba(6, 182, 212, 0.15)",
  },
  {
    number: "05",
    title: "Support",
    description: "We provide ongoing maintenance, security updates, and performance monitoring.",
    icon: LifeBuoy,
    color: "from-teal-500 to-emerald-500",
    glowColor: "rgba(20, 184, 166, 0.15)",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineProgressDesktopRef = useRef<HTMLDivElement>(null);
  const lineProgressMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const timeline = timelineRef.current;
    const lineProgressDesktop = lineProgressDesktopRef.current;
    const lineProgressMobile = lineProgressMobileRef.current;

    if (!header || !timeline) return;

    // Header reveal
    gsap.fromTo(
      header,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
        },
      }
    );

    // Responsive timeline animations using GSAP matchMedia
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop layout: Horizontal line and cards stagger
      mm.add("(min-width: 1024px)", () => {
        if (lineProgressDesktop) {
          // Draw progress line horizontally
          gsap.fromTo(
            lineProgressDesktop,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: timeline,
                start: "top 70%",
                end: "bottom 60%",
                scrub: 0.5,
              },
            }
          );
        }

        // Cards fade-up stagger
        gsap.fromTo(
          ".process-card-wrapper",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timeline,
              start: "top 75%",
            },
          }
        );
      });

      // Tablet and Mobile layout: Vertical line and individual card slide-in
      mm.add("(max-width: 1023px)", () => {
        if (lineProgressMobile) {
          // Draw progress line vertically
          gsap.fromTo(
            lineProgressMobile,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: timeline,
                start: "top 75%",
                end: "bottom 75%",
                scrub: 0.5,
              },
            }
          );
        }

        // Cards fade-in slide-right
        const wrappers = Array.from(
          document.querySelectorAll<HTMLElement>(".process-card-wrapper")
        );
        wrappers.forEach((wrapper) => {
          gsap.fromTo(
            wrapper,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: wrapper,
                start: "top 85%",
              },
            }
          );
        });
      });
    }, containerRef);

    // Interactive mouse glow positioning
    const handleMouseMove = (e: MouseEvent, card: HTMLDivElement) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    const cardElements = document.querySelectorAll(".process-card") as NodeListOf<HTMLDivElement>;
    cardElements.forEach((card) => {
      card.addEventListener("mousemove", (e) => handleMouseMove(e, card));
    });

    return () => {
      ctx.revert();
      cardElements.forEach((card) => {
        card.removeEventListener("mousemove", (e) => handleMouseMove(e, card));
      });
    };
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative bg-zinc-950 py-24 px-6 sm:px-12 md:px-24 overflow-hidden border-b border-white/5"
    >
      {/* Premium ambient glows */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-purple-300 font-semibold text-xs tracking-wider uppercase backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Our Process
          </div>
          <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            How We Build Your Digital Engine.
          </h2>
          <p className="text-zinc-400 font-medium sm:text-lg">
            A transparent, structured approach to taking your online presence from outdated to high-converting.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative mt-16 lg:mt-24">
          {/* Timeline Background & Progress Line (Desktop) */}
          <div className="absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-zinc-900 z-0 hidden lg:block">
            <div
              ref={lineProgressDesktopRef}
              className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 origin-left scale-x-0"
            />
          </div>

          {/* Timeline Background & Progress Line (Mobile/Tablet) */}
          <div className="absolute left-[28px] top-[28px] bottom-[28px] w-[2px] bg-zinc-900 z-0 lg:hidden">
            <div
              ref={lineProgressMobileRef}
              className="w-full bg-gradient-to-b from-purple-500 via-indigo-500 to-cyan-500 origin-top scale-y-0"
              style={{ height: "100%" }}
            />
          </div>

          {/* Steps List */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-6 relative z-10">
            {PROCESS_STEPS.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={index}
                  className="process-card-wrapper flex flex-col items-start lg:items-center relative pl-20 lg:pl-0"
                >
                  {/* Timeline Hub / Circle */}
                  <div className="absolute left-0 top-0 lg:relative lg:left-auto lg:top-auto lg:mx-auto z-10 shrink-0">
                    <div className="group/hub relative w-14 h-14 rounded-full bg-zinc-950 border-2 border-zinc-800 hover:border-purple-500/50 flex items-center justify-center shadow-lg transition-all duration-300">
                      {/* Active pulsing glow ring */}
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-purple-500/10 to-cyan-500/10 blur-sm opacity-0 group-hover/hub:opacity-100 transition-opacity duration-300" />
                      <IconComponent className="w-5 h-5 text-zinc-400 group-hover/hub:text-purple-400 transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Card Content Box */}
                  <div className="w-full mt-2 lg:mt-8">
                    <div
                      className="process-card group relative p-6 rounded-2xl bg-zinc-900/20 border border-white/5 hover:border-purple-500/20 hover:bg-zinc-900/40 overflow-hidden backdrop-blur-sm shadow-xl transition-all duration-300"
                      style={{
                        minHeight: "160px",
                        "--mouse-x": "0px",
                        "--mouse-y": "0px",
                      } as React.CSSProperties}
                    >
                      {/* Radial hover glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                        style={{
                          background: `radial-gradient(250px circle at var(--mouse-x) var(--mouse-y), ${step.glowColor}, transparent 80%)`,
                        }}
                      />

                      {/* Card Content */}
                      <div className="relative z-10 flex flex-col gap-3">
                        {/* Step Number Badge */}
                        <div className="flex justify-between items-center">
                          <span className={`text-xs font-bold font-mono bg-gradient-to-r ${step.color} bg-clip-text text-transparent uppercase tracking-wider`}>
                            Step {step.number}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                          {step.description}
                        </p>
                      </div>

                      {/* Card Subtle shine border */}
                      <div className="absolute inset-0 border border-transparent rounded-2xl pointer-events-none z-10 group-hover:border-white/10 transition-colors duration-500" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
