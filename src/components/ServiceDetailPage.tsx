"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import { SERVICE_CONTENT, getServiceBySlug } from "@/lib/services";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ServiceDetailPageProps = {
  slug: string;
};

export default function ServiceDetailPage({ slug }: ServiceDetailPageProps) {
  const service = getServiceBySlug(slug);
  const serviceSlug = service?.slug;
  const isLongTitle = service ? service.title.length > 22 : false;
  const heroRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  useEffect(() => {
    const hero = heroRef.current;
    const highlights = highlightsRef.current;
    const process = processRef.current;
    const faq = faqRef.current;
    const related = relatedRef.current;

    if (hero) {
      const items = Array.from(
        hero.querySelectorAll<HTMLElement>(".animate-hero")
      );
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
        }
      );
    }

    const animateSection = (section: HTMLElement | null, selector: string) => {
      if (!section) return;
      const items = Array.from(
        section.querySelectorAll<HTMLElement>(selector)
      );
      gsap.fromTo(
        items,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        }
      );
    };

    animateSection(highlights, ".animate-highlights");
    animateSection(process, ".animate-process");
    animateSection(faq, ".animate-faq");
    animateSection(related, ".animate-related");
  }, [serviceSlug]);

  if (!service) {
    return null;
  }

  const relatedServices = SERVICE_CONTENT.filter(
    (item) => item.slug !== service.slug
  ).slice(0, 3);

  return (
    <>
      <CustomCursor />

      <main className="min-h-screen bg-zinc-950 text-white overflow-hidden">
        <header className="fixed top-4 left-1/2 z-40 w-[92%] max-w-7xl -translate-x-1/2">
          <div className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-zinc-950/80 px-5 py-4 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <Link href="/" className="flex items-center gap-2 group">
              <div className={`relative w-10 h-10 rounded-xl bg-linear-to-tr ${service.color} flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-transform duration-300 group-hover:scale-105`}>
                <service.icon className="w-5 h-5 text-white transition-transform duration-500 group-hover:rotate-180" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="font-sans font-black text-2xl tracking-wider bg-clip-text text-transparent bg-linear-to-r from-white via-zinc-200 to-zinc-400">
                NEXUS
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href="/services"
                className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-300 transition-colors duration-200 hover:bg-white/10 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
                Services
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition-colors duration-200 hover:bg-zinc-200"
              >
                
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </header>

        <section
          ref={heroRef}
          className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 pb-20 pt-32 sm:px-12 md:px-24"
        >
          <div className="absolute left-1/2 top-1/4 h-130 w-130 -translate-x-1/2 rounded-full bg-white/5 blur-[140px]" />
          <div className="absolute right-0 top-0 h-90 w-90 rounded-full bg-cyan-500/10 blur-[120px]" />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="flex flex-col gap-6">
              <div className="animate-hero inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-300 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                {service.detailEyebrow}
              </div>

              <h1
                className={`animate-hero font-sans text-balance font-black leading-[0.92] tracking-tight text-white ${
                  isLongTitle
                    ? "max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                    : "max-w-3xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                }`}
              >
                {service.title}
              </h1>

              <p className="animate-hero max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg md:text-xl">
                {service.heroDescription}
              </p>

              <div className="animate-hero flex flex-wrap gap-3 pt-2">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition-transform duration-300 hover:scale-[1.02]"
                >
                  Talk About This Service
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                >
                  See All Services
                </Link>
              </div>
            </div>

            <div className="animate-hero relative lg:self-start lg:pt-2">
              <div className={`absolute inset-0 rounded-4xl bg-linear-to-tr ${service.color} opacity-20 blur-2xl`} />
              <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-zinc-900/60 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md">
                <div className="absolute inset-0 opacity-70" style={{ background: `radial-gradient(circle at top left, ${service.glowColor}, transparent 55%)` }} />

                <div className="relative flex flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">
                      Service Profile
                    </div>
                    <div className="mt-1 max-w-[14ch] text-[1.05rem] font-black leading-[1.02] text-balance text-white sm:max-w-none sm:text-lg">
                      {service.title}
                    </div>
                  </div>
                  <div className="self-start rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-[0.25em] text-zinc-300 whitespace-nowrap">
                    Premium Build
                  </div>
                </div>

                <div className="relative grid gap-3 py-5 sm:grid-cols-3">
                  {service.stats.map((stat) => (
                    <div key={stat.label} className="min-w-0 rounded-2xl border border-white/10 bg-zinc-950/60 p-4">
                      <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                        {stat.label}
                      </div>
                      <div className="mt-2 text-[13px] font-semibold leading-snug text-white wrap-break-word text-balance sm:text-sm">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative rounded-2xl border border-white/10 bg-zinc-950/70 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                    Deliverables
                  </div>
                  <div className="mt-3 space-y-2">
                    {service.deliverables.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-sm text-zinc-200">
                        <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
                        <span className="min-w-0 wrap-break-word leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={highlightsRef} className="relative mx-auto w-full max-w-7xl px-6 pb-24 sm:px-12 md:px-24">
          <div className="mb-10 flex flex-col gap-4">
            <div className="animate-highlights text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
              Why this service works
            </div>
            <h2 className="animate-highlights max-w-3xl font-sans text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              Designed for emphasis, clarity, and a stronger next step.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {service.highlights.map((item) => (
              <div
                key={item.title}
                className="animate-highlights group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/35 p-6 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />
                <h3 className="relative text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm leading-relaxed text-zinc-300 backdrop-blur-sm">
            {service.shortDescription}
          </div>
        </section>

        <section ref={processRef} className="relative mx-auto w-full max-w-7xl px-6 pb-24 sm:px-12 md:px-24">
          <div className="mb-10 flex flex-col gap-4">
            <div className="animate-process text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
              Delivery flow
            </div>
            <h2 className="animate-process max-w-3xl font-sans text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              The work moves in a controlled sequence.
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {service.process.map((step, index) => (
              <div
                key={step.title}
                className="animate-process rounded-3xl border border-white/10 bg-zinc-900/30 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                    Step {index + 1}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-zinc-500" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section ref={faqRef} className="relative mx-auto w-full max-w-7xl px-6 pb-24 sm:px-12 md:px-24">
          <div className="mb-10 flex flex-col gap-4">
            <div className="animate-faq text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
              Questions
            </div>
            <h2 className="animate-faq max-w-3xl font-sans text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              The details people usually ask for.
            </h2>
          </div>

          <div className="space-y-3">
            {service.faq.map((item, index) => {
              const isOpen = openFAQIndex === index;
              return (
                <button
                  key={item.q}
                  type="button"
                  onClick={() => setOpenFAQIndex(isOpen ? null : index)}
                  className="animate-faq w-full rounded-3xl border border-white/10 bg-zinc-900/30 px-6 py-5 text-left backdrop-blur-sm transition-colors duration-200 hover:bg-zinc-900/45"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base font-semibold text-white sm:text-lg">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <p className="overflow-hidden pt-3 text-sm leading-relaxed text-zinc-400">
                      {item.a}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section ref={relatedRef} className="relative mx-auto w-full max-w-7xl px-6 pb-28 sm:px-12 md:px-24">
          <div className="mb-10 flex flex-col gap-4">
            <div className="animate-related text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
              Related services
            </div>
            <h2 className="animate-related max-w-3xl font-sans text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              Explore adjacent offers with the same level of polish.
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {relatedServices.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="animate-related group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/30 p-6 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />
                  <div className={`relative flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-tr ${item.color} shadow-[0_0_20px_rgba(0,0,0,0.2)]`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="relative mt-5 text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-zinc-400">
                    {item.shortDescription}
                  </p>
                  <div className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-200 transition-transform duration-300 group-hover:translate-x-1">
                    View service
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
