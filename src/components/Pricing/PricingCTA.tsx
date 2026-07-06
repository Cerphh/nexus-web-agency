"use client";

import { ArrowRight, CalendarDays } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function PricingCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-32"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[220px]" />

        <div className="absolute right-0 bottom-0 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[180px]" />

      </div>

      <div className="relative mx-auto max-w-6xl">

        <div className="cta-content relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl md:p-16">

          {/* Decorative Glow */}

          <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />

          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />

          <div className="relative text-center">

            <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              Ready to Get Started?
            </span>

            <h2 className="mt-8 break-words text-3xl font-black leading-tight text-white sm:text-4xl md:text-6xl">

              Let's Build a Website
              <br />

              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Your Clients Will Love
              </span>

            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-400">

              Whether you're launching a brand-new business or upgrading an
              existing website, we'll help create a fast, modern, and
              conversion-focused website tailored to your goals.

            </p>

            {/* Buttons */}

            <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">
 
              <Link
                href="/contact"
                className="group rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 font-semibold text-white shadow-[0_10px_50px_rgba(59,130,246,.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_60px_rgba(59,130,246,.5)]"
              >
 
                <span className="flex items-center justify-center gap-2">
 
                  Get a Free Quote
 
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
 
                </span>
 
              </Link>
 
            </div>

            {/* Bottom Stats */}

            <div className="mt-16 grid gap-6 border-t border-white/10 pt-10 text-center md:grid-cols-3">

              <div>

                <h3 className="text-4xl font-black text-blue-400">
                  100%
                </h3>

                <p className="mt-2 text-sm text-zinc-400">
                  Mobile Responsive
                </p>

              </div>

              <div>

                <h3 className="text-4xl font-black text-cyan-400">
                  Fast
                </h3>

                <p className="mt-2 text-sm text-zinc-400">
                  Optimized Performance
                </p>

              </div>

              <div>

                <h3 className="text-4xl font-black text-purple-400">
                  Ongoing
                </h3>

                <p className="mt-2 text-sm text-zinc-400">
                  Support Available
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}