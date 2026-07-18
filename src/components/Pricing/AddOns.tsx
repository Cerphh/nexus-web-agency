"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FileText,
  CalendarCheck2,
  Search,
  PenTool,
  Wrench,
  ArrowUpRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Currency = "USD" | "PHP";

interface AddOnsProps {
  currency: Currency;
}

interface AddOn {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  priceUSD?: number;
  pricePHP?: number;
  displayPrice?: string;
  subtitle?: string;
  suffix?: string;
  description: string;
  showLearnMore: boolean;
  learnMoreHref?: string;
}

const addons = [
  {
    icon: FileText,
    title: "Extra Page",
    priceUSD: 35,
    pricePHP: 1800,
    subtitle: "Starting at",
    description:
      "Need more pages? Expand your website anytime without rebuilding it.",
    showLearnMore: false,
  },
  {
    icon: CalendarCheck2,
    title: "Booking System",
    priceUSD: 150,
    pricePHP: 8000,
    subtitle: "Starting at",
    description:
      "Allow customers to schedule appointments directly from your website.",
    showLearnMore: false,
  },
  {
    icon: PenTool,
    title: "Logo Design",
    priceUSD: 75,
    pricePHP: 4000,
    subtitle: "Starting at",
    description:
      "Create a professional brand identity that matches your business.",
    showLearnMore: false,
  },
  {
    icon: Search,
    title: "SEO Package",
    priceUSD: 120,
    pricePHP: 6000,
    subtitle: "Starting at",
    description:
      "Improve your visibility on Google with on-page SEO optimization.",
    showLearnMore: true,
    learnMoreHref: "/pricing/seo-package",
  },
  {
    icon: Wrench,
    title: "Website Maintenance",
    priceUSD: 30,
    pricePHP: 1500,
    subtitle: "Starting at",
    suffix: "/mo",
    description:
      "Keep your website updated, secure, and running at peak performance.",
    showLearnMore: true,
    learnMoreHref: undefined,
  },
 ] satisfies AddOn[];

function formatPrice(addon: AddOn, activeCurrency: Currency) {
  if (addon.displayPrice) {
    return addon.displayPrice;
  }

  const amount = activeCurrency === "PHP" ? addon.pricePHP : addon.priceUSD;

  if (typeof amount !== "number") {
    return "Custom Quote";
  }

  const symbol = activeCurrency === "PHP" ? "₱" : "$";
  const locale = activeCurrency === "PHP" ? "en-PH" : "en-US";
  const suffix = addon.suffix ?? "";

  return `${addon.subtitle ?? ""} ${symbol}${amount.toLocaleString(locale)}${suffix}`.trim();
}

export default function AddOns({ currency }: AddOnsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainAddons = addons.slice(0, 3);
  const featuredAddons = addons.slice(3);

  const renderAddonCard = (addon: (typeof addons)[number]) => {
    const Icon = addon.icon;

    return (
      <div
        className="addon-card group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/40 hover:bg-white/10 hover:shadow-[0_20px_80px_rgba(59,130,246,.18)]"
      >
        <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r from-blue-500 to-cyan-500 shadow-lg">
            <Icon size={26} className="text-white" />
          </div>

          <h3 className="mt-6 text-2xl font-bold text-white">{addon.title}</h3>

          <p className="mt-2 font-semibold text-blue-300">{formatPrice(addon, currency)}</p>

          <p className="mt-5 leading-7 text-zinc-400">{addon.description}</p>

          {addon.showLearnMore &&
            (addon.learnMoreHref ? (
              <Link
                href={addon.learnMoreHref}
                className="mt-8 inline-flex items-center gap-2 font-semibold text-white transition group-hover:text-blue-300"
              >
                Learn More
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            ) : (
              <button className="mt-8 inline-flex items-center gap-2 font-semibold text-white transition group-hover:text-blue-300">
                Learn More
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            ))}
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="relative px-6 py-28">

      <div className="mx-auto max-w-7xl">

        <div className="text-center">

          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
            Optional Enhancements
          </span>

          <h2 className="mt-6 break-words text-3xl font-black text-white sm:text-4xl md:text-5xl">
            Customize Your Website
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-zinc-400">
            Add extra functionality whenever your business needs it.
            These services can be added to any package.
          </p>

        </div>

        <div className="mt-16 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {mainAddons.map((addon) => (
            <div key={addon.title}>{renderAddonCard(addon)}</div>
          ))}
        </div>

        <div className="mt-7 grid gap-7 md:mx-auto md:max-w-3xl md:grid-cols-2 xl:max-w-none xl:grid-cols-6">
          {featuredAddons.map((addon, index) => (
            <div
              key={addon.title}
              className={index === 0 ? "xl:col-span-2 xl:col-start-2" : "xl:col-span-2"}
            >
              {renderAddonCard(addon)}
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}