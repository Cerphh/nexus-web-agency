"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Check,
  Sparkles,
  Rocket,
  Building2,
  BriefcaseBusiness,
  ArrowRight,
} from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Currency = "USD" | "PHP";

interface PricingCardsProps {
  currency: Currency;
}

interface Plan {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  priceUSD?: number;
  pricePHP?: number;
  displayPrice?: string;
  subtitle: string;
  description: string;
  features: string[];
  button: string;
  popular: boolean;
}

const plans = [
  {
    icon: Rocket,
    title: "Launch",
    priceUSD: 100,
    pricePHP: 5000,
    subtitle: "Starting at",
    description:
      "Perfect for freelancers, startups, and businesses needing a professional online presence.",
    features: [
      "1 Responsive Landing Page",
      "Mobile Responsive",
      "Contact Form",
      "Basic SEO",
      "Fast Performance",
      "2 Revisions",
    ],
    button: "Get Started",
    popular: false,
  },
  {
    icon: Building2,
    title: "Grow",
    priceUSD: 250,
    pricePHP: 12000,
    subtitle: "Starting at",
    description:
      "Designed for local businesses that want to generate more customers.",
    features: [
      "Up to 5 Pages",
      "Custom UI Design",
      "Inquiry Form",
      "Google Maps",
      "Basic SEO",
      "Light Animations",
      "3 Revisions",
    ],
    button: "Most Popular",
    popular: true,
  },
  {
    icon: BriefcaseBusiness,
    title: "Scale",
    priceUSD: 500,
    pricePHP: 25000,
    subtitle: "Starting at",
    description:
      "For businesses ready to grow online with advanced functionality.",
    features: [
      "Up to 10 Pages",
      "CMS / Blog",
      "Analytics Setup",
      "Performance Optimization",
      "Advanced Animations",
      "Priority Support",
    ],
    button: "Let's Build",
    popular: false,
  },
  {
    icon: Sparkles,
    title: "Nexus Custom",
    displayPrice: "Custom Quote",
    subtitle: "",
    description:
      "Custom systems tailored specifically to your business requirements.",
    features: [
      "Booking Systems",
      "E-commerce",
      "Admin Dashboard",
      "Membership Systems",
      "Business Automation",
      "Unlimited Consultation",
    ],
    button: "Book Consultation",
    popular: false,
  },
 ] satisfies Plan[];

function formatPrice(plan: Plan, activeCurrency: Currency) {
  if (plan.displayPrice) {
    return plan.displayPrice;
  }

  const amount = activeCurrency === "PHP" ? plan.pricePHP : plan.priceUSD;

  if (typeof amount !== "number") {
    return "Custom Quote";
  }

  const symbol = activeCurrency === "PHP" ? "₱" : "$";
  const locale = activeCurrency === "PHP" ? "en-PH" : "en-US";

  return `${symbol}${amount.toLocaleString(locale)}`;
}

export default function PricingCards({ currency }: PricingCardsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".price-card", {
        y: 56,
        scale: 0.98,
        duration: 0.9,
        
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center md:mb-20">
          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300 backdrop-blur-xl">
            Packages
          </span>

          <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
            Pricing Packages
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-zinc-400 md:text-lg">
            Choose the package that fits today. Every project is customized
            after consultation, so the final scope stays aligned with your goals.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.title}
                className={`price-card group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[28px] border backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(59,130,246,.25)]
                ${
                  plan.popular
                    ? "border-blue-400/40 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_45%),rgba(255,255,255,0.06)] shadow-[0_0_0_1px_rgba(59,130,246,0.1)]"
                    : "border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_42%),rgba(255,255,255,0.03)]"
                }`}
              >
                {/* Top accent line */}
                <div
                  className={`absolute inset-x-0 top-0 h-0.5 ${
                    plan.popular
                      ? "bg-linear-to-r from-blue-500 via-cyan-400 to-blue-500"
                      : "bg-white/10"
                  }`}
                />

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.18),transparent_45%,rgba(34,211,238,0.08))] opacity-0 transition duration-500 group-hover:opacity-100" />

                {plan.popular && (
                  <div className="absolute right-5 top-6 rounded-full bg-linear-to-r from-blue-500 to-cyan-400 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/30">
                    Most Popular
                  </div>
                )}

                <div className="relative flex h-full min-w-0 flex-col p-7 sm:p-8">
                  <div className="mb-7 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="text-white" size={22} />
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {plan.title}
                  </h3>

                  <div className="mt-6 min-w-0 border-t border-white/5 pt-6">
                    {plan.subtitle && (
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
                        {plan.subtitle}
                      </p>
                    )}

                    <h4 className="mt-2 wrap-break-word bg-linear-to-r from-white to-blue-300 bg-clip-text text-3xl font-black leading-tight tracking-tight text-transparent sm:text-4xl">
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

                  <button
                    className={`group/btn mt-9 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all duration-300
                    ${
                      plan.popular
                        ? "bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-[0_10px_40px_rgba(59,130,246,.3)] hover:scale-[1.02] hover:shadow-[0_16px_50px_rgba(59,130,246,.4)]"
                        : "border border-white/15 bg-white/3 text-white hover:border-white/30 hover:bg-white/8"
                    }`}
                  >
                    {plan.button}
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}