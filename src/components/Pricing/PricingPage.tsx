"use client";

import PricingHero from "./PricingHero";
import PricingCards from "./PricingCards";
import PricingNotice from "./PricingNotice";
import AddOns from "./AddOns";
import WhyChooseUs from "./WhyChooseUs";
import FAQ from "./FAQ";
import PricingCTA from "./PricingCTA";

type Currency = "USD" | "PHP";

interface PricingPageProps {
  currency: Currency;
}

export default function PricingPage({ currency }: PricingPageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-80 left-1/2 h-180 w-180 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[180px]" />
        <div className="absolute bottom-0 left-0 h-130 w-130 rounded-full bg-purple-600/10 blur-[170px]" />
        <div className="absolute top-1/3 right-0 h-115 w-115 rounded-full bg-cyan-500/10 blur-[160px]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[56px_56px]" />

      <div className="relative z-10">

        <PricingHero />

        <PricingCards currency={currency} />

        <PricingNotice />

        <AddOns currency={currency} />

        <WhyChooseUs />

        <FAQ />

        <PricingCTA />

      </div>

    </div>
  );
}