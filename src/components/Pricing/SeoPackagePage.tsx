"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  Search,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Target,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Currency = "USD" | "PHP";

interface SeoPackagePageProps {
  currency: Currency;
}

interface SeoPlan {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  priceUSD?: number;
  pricePHP?: number;
  subtitle: string;
  description: string;
  features: string[];
  button: string;
  popular: boolean;
}

const seoPlans = [
  {
    icon: Search,
    title: "Basic",
    priceUSD: 120,
    pricePHP: 6000,
    subtitle: "Starting at",
    description:
      "Essential on-page SEO for small sites that need a solid search foundation.",
    features: [
      "Up to 5 pages optimized",
      "Title tags & meta descriptions",
      "Heading structure review",
      "Image alt text updates",
      "Google Search Console setup",
      "1 revision round",
    ],
    button: "Get Started",
    popular: false,
  },
  {
    icon: TrendingUp,
    title: "Standard",
    priceUSD: 220,
    pricePHP: 12000,
    subtitle: "Starting at",
    description:
      "Deeper optimization for growing businesses that want stronger local visibility.",
    features: [
      "Up to 10 pages optimized",
      "Everything in Basic",
      "Local SEO signals",
      "Internal linking strategy",
      "Performance & mobile check",
      "Schema markup basics",
      "2 revision rounds",
    ],
    button: "Most Popular",
    popular: true,
  },
  {
    icon: Target,
    title: "Advanced",
    priceUSD: 380,
    pricePHP: 20000,
    subtitle: "Starting at",
    description:
      "Full SEO enhancement for competitive markets and larger websites.",
    features: [
      "Up to 20 pages optimized",
      "Everything in Standard",
      "Advanced schema markup",
      "Content structure recommendations",
      "Competitor keyword review",
      "Monthly performance summary",
      "Priority support",
    ],
    button: "Let's Build",
    popular: false,
  },
 ] satisfies SeoPlan[];

function formatPrice(plan: SeoPlan, activeCurrency: Currency) {
  const amount = activeCurrency === "PHP" ? plan.pricePHP : plan.priceUSD;

  if (typeof amount !== "number") {
    return "Custom Quote";
  }

  const symbol = activeCurrency === "PHP" ? "₱" : "$";
  const locale = activeCurrency === "PHP" ? "en-PH" : "en-US";

  return `${symbol}${amount.toLocaleString(locale)}`;
}

const highlights = [
  {
    title: "Be found by the right people",
    description:
      "We optimize the pages that matter most so your business shows up when customers search for what you offer.",
  },
  {
    title: "Built on your existing site",
    description:
      "This add-on works with any Nexus website package. No rebuild required — we enhance what you already have.",
  },
  {
    title: "Clear, measurable improvements",
    description:
      "We focus on the on-page foundations search engines use to understand, index, and rank your content.",
  },
];

const process = [
  {
    title: "Audit your current setup",
    description:
      "We review your pages, metadata, structure, and search signals to identify the highest-impact fixes.",
  },
  {
    title: "Apply on-page optimizations",
    description:
      "We refine titles, descriptions, headings, links, and technical details across your key pages.",
  },
  {
    title: "Verify and hand off",
    description:
      "We confirm the changes are live, share a summary of what was done, and outline next steps if needed.",
  },
];

const faqs = [
  {
    question: "Which SEO plan should I choose?",
    answer:
      "Basic suits smaller sites with up to 5 pages. Standard is ideal for local businesses with more content. Advanced is best for larger sites or competitive niches that need deeper optimization.",
  },
  {
    question: "Do I need this if my website already includes basic SEO?",
    answer:
      "Our website packages include SEO foundations. These plans go deeper with a dedicated audit and targeted improvements based on the tier you choose.",
  },
  {
    question: "How long does it take?",
    answer:
      "Basic plans typically take 1 week, Standard 1–2 weeks, and Advanced 2–3 weeks depending on page count and content readiness.",
  },
  {
    question: "Can this help local businesses in the Philippines?",
    answer:
      "Yes. Standard and Advanced plans include local SEO signals — such as location-relevant metadata and structure — when they apply to your business.",
  },
];

export default function SeoPackagePage({ currency }: SeoPackagePageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  useEffect(() => {
    const animateSection = (section: HTMLElement | null, selector: string) => {
      if (!section) return;
      const items = Array.from(section.querySelectorAll<HTMLElement>(selector));
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

    if (heroRef.current) {
      const items = Array.from(
        heroRef.current.querySelectorAll<HTMLElement>(".animate-hero")
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

    if (pricingRef.current) {
      gsap.fromTo(
        pricingRef.current.querySelectorAll(".seo-price-card"),
        { y: 56, scale: 0.98, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pricingRef.current,
            start: "top 75%",
          },
        }
      );
    }

    animateSection(highlightsRef.current, ".animate-section");
    animateSection(processRef.current, ".animate-section");
    animateSection(faqRef.current, ".animate-section");
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-80 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[180px]" />
        <div className="absolute bottom-0 left-0 h-[520px] w-[520px] rounded-full bg-purple-600/10 blur-[170px]" />
        <div className="absolute top-1/3 right-0 h-[460px] w-[460px] rounded-full bg-cyan-500/10 blur-[160px]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className="relative z-10">
        <section
          ref={heroRef}
          className="relative mx-auto max-w-7xl px-6 pb-12 pt-32 sm:px-12 md:px-24 md:pt-40"
        >
          <Link
            href="/pricing"
            className="animate-hero mb-10 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Pricing
          </Link>

          <div className="animate-hero mx-auto max-w-3xl text-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              <Sparkles className="h-3.5 w-3.5" />
              Optional Add-On
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              SEO Package
            </h1>

            <p className="mt-6 text-lg leading-8 text-zinc-400 md:text-xl">
              Improve your visibility on Google with focused on-page SEO
              optimization. Choose the plan that fits your site size and goals.
            </p>
          </div>
        </section>

        <section ref={pricingRef} className="relative px-6 pb-24 sm:px-12 md:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300 backdrop-blur-xl">
                SEO Plans
              </span>
              <h2 className="mt-6 text-3xl font-black text-white md:text-4xl">
                Choose Your SEO Tier
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-zinc-400 md:text-lg">
                Every plan is tailored after consultation. Final scope depends on
                your page count, industry, and growth goals.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {seoPlans.map((plan) => {
                const Icon = plan.icon;

                return (
                  <div
                    key={plan.title}
                    className={`seo-price-card group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[28px] border backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(59,130,246,.25)] ${
                      plan.popular
                        ? "border-blue-400/40 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_45%),rgba(255,255,255,0.06)] shadow-[0_0_0_1px_rgba(59,130,246,0.1)]"
                        : "border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_42%),rgba(255,255,255,0.03)]"
                    }`}
                  >
                    <div
                      className={`absolute inset-x-0 top-0 h-[2px] ${
                        plan.popular
                          ? "bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"
                          : "bg-white/10"
                      }`}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.18),transparent_45%,rgba(34,211,238,0.08))] opacity-0 transition duration-500 group-hover:opacity-100" />

                    {plan.popular && (
                      <div className="absolute right-5 top-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/30">
                        Most Popular
                      </div>
                    )}

                    <div className="relative flex h-full min-w-0 flex-col p-7 sm:p-8">
                      <div className="mb-7 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Icon className="text-white" size={22} />
                      </div>

                      <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                        {plan.title}
                      </h3>

                      <div className="mt-6 min-w-0 border-t border-white/5 pt-6">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
                          {plan.subtitle}
                        </p>
                        <h4 className="mt-2 break-words bg-gradient-to-r from-white to-blue-300 bg-clip-text text-3xl font-black leading-tight tracking-tight text-transparent sm:text-4xl">
                          {formatPrice(plan, currency)}
                        </h4>
                      </div>

                      <p className="mt-5 text-[15px] leading-relaxed text-zinc-400">
                        {plan.description}
                      </p>

                      <div className="mt-8 flex-1 space-y-3.5">
                        {plan.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/20">
                              <Check size={12} className="text-blue-300" />
                            </div>
                            <span className="text-sm leading-relaxed text-zinc-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Link
                        href="/contact"
                        className={`group/btn mt-9 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all duration-300 ${
                          plan.popular
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-[0_10px_40px_rgba(59,130,246,.3)] hover:scale-[1.02] hover:shadow-[0_16px_50px_rgba(59,130,246,.4)]"
                            : "border border-white/15 bg-white/[0.03] text-white hover:border-white/30 hover:bg-white/[0.08]"
                        }`}
                      >
                        {plan.button}
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover/btn:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section
          ref={highlightsRef}
          className="relative mx-auto max-w-7xl px-6 pb-24 sm:px-12 md:px-24"
        >
          <div className="animate-section mb-10 text-center">
            <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              Why It Matters
            </span>
            <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl md:text-5xl">
              Search visibility that supports real growth
            </h2>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="animate-section group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/40 hover:bg-white/10"
              >
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />
                <h3 className="relative text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="relative mt-4 leading-7 text-zinc-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          ref={processRef}
          className="relative mx-auto max-w-7xl px-6 pb-24 sm:px-12 md:px-24"
        >
          <div className="animate-section mb-10 text-center">
            <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              How It Works
            </span>
            <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl md:text-5xl">
              A focused, three-step process
            </h2>
          </div>

          <div className="grid gap-7 lg:grid-cols-3">
            {process.map((step, index) => (
              <div
                key={step.title}
                className="animate-section rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                    Step {index + 1}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-zinc-500" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-4 leading-7 text-zinc-400">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          ref={faqRef}
          className="relative mx-auto max-w-5xl px-6 pb-32 sm:px-12 md:px-24"
        >
          <div className="animate-section mb-10 text-center">
            <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              Common Questions
            </span>
            <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl md:text-5xl">
              SEO Package FAQ
            </h2>
          </div>

          <div className="space-y-5">
            {faqs.map((faq, index) => {
              const isOpen = openFAQIndex === index;

              return (
                <div
                  key={faq.question}
                  className="animate-section overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/30"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFAQIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between px-8 py-6 text-left"
                  >
                    <h3 className="text-lg font-semibold text-white md:text-xl">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      size={24}
                      className={`shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-blue-400" : "text-zinc-400"
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-500 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-8 pb-8 leading-8 text-zinc-400">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="animate-section mt-16 text-center">
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl md:p-14">
              <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />
              <div className="relative">
                <h2 className="text-3xl font-black text-white sm:text-4xl">
                  Ready to improve your search visibility?
                </h2>
                <p className="mx-auto mt-5 max-w-2xl leading-8 text-zinc-400">
                  Pick a plan or tell us about your site — we&apos;ll recommend
                  the right tier and send a custom quote.
                </p>
                <Link
                  href="/contact"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 font-semibold shadow-[0_10px_50px_rgba(59,130,246,.35)] transition-all duration-300 hover:scale-105"
                >
                  Get a Free Quote
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
