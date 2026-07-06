"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Mail, Phone, MapPin, Send, Sparkles, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState({
    name: "",
    business: "", // kept empty/optional here, API route only requires name+business+email
    website: "",
    email: "",
    challenge: "General inquiry via Contact Page",
    message: "",
  });

  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const form = formRef.current;

    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    if (hero) tl.fromTo(hero, { opacity: 0, y: 30 }, { opacity: 1, y: 0 });
    if (form) tl.fromTo(form, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, "-=0.7");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          business: formState.business || "Not specified",
          website: formState.website,
          email: formState.email,
          challenge: `${formState.challenge}\n\nMessage: ${formState.message}`,
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Something went wrong.");
      }

      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      setLoading(false);
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main
        ref={containerRef}
        className="flex-1 w-full bg-zinc-950 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-24">

          {/* Header */}
          <section ref={heroRef} className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-purple-300 font-semibold text-[11px] sm:text-xs tracking-wider uppercase backdrop-blur-sm mb-5 sm:mb-6">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              Let&apos;s Connect
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight mb-5 sm:mb-6 leading-tight break-words">
              Start Your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400">
                Digital Evolution
              </span>
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-2 sm:px-0">
              Ready to scale? Whether you have a clear vision or need us to build one, let&apos;s start the conversation.
            </p>
          </section>

          {/* Contact Layout */}
          <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">

            {/* Contact Info */}
            <div className="bg-zinc-900/30 border border-white/10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col gap-6 sm:gap-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Direct Channels</h2>
              <div className="space-y-5 sm:space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "nexuscreatives.dev@gmail.com" },
                  { icon: Phone, label: "Call/Text", value: "+63 992 629 6059" },
                  { icon: MapPin, label: "Base", value: "Batangas PH" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 sm:gap-4 group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-colors shrink-0">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-zinc-500 font-medium">{item.label}</p>
                      <p className="text-white font-semibold text-sm sm:text-base break-words">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="bg-zinc-900/30 border border-white/10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col gap-5 sm:gap-6"
              >
                {/* Honeypot field — hidden from real users, bots fill it automatically */}
                <input
                  type="text"
                  name="website_url"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="absolute -left-[9999px] w-px h-px opacity-0"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {error && (
                  <div className="rounded-xl border border-red-500/30 bg-red-950/20 px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full min-w-0 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm sm:text-base focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full min-w-0 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm sm:text-base focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <textarea
                  placeholder="Tell us about your project, business, or challenge. The more details, the better we can assist you."
                  rows={5}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm sm:text-base focus:outline-none focus:border-purple-500 transition-colors resize-none"
                ></textarea>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-bold py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Request <Send className="w-4 h-4 shrink-0" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="bg-zinc-900/30 border border-emerald-500/20 p-6 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Sent</h3>
                <p className="text-zinc-400 text-sm sm:text-base max-w-sm">
                  Thanks, {formState.name}! We&apos;ve received your request and will get back to you at{" "}
                  <span className="text-purple-300 font-semibold">{formState.email}</span> shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}