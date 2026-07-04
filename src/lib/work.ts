import type { LucideIcon } from "lucide-react";
import {
  Wrench,
  Stethoscope,
  ShoppingBag,
  Dumbbell,
  UtensilsCrossed,
  Scissors,
  PawPrint,
} from "lucide-react";

export interface WorkSample {
  slug: string;
  name: string;
  industry: string;
  tagline: string;
  description: string;
  stat: string;
  statLabel: string;
  url: string;
  tags: string[];
  color: string; // tailwind gradient classes
  glowColor: string; // rgba for radial hover glow
  accentText: string;
  accentBorder: string;
  accentBg: string;
  icon: LucideIcon;
  hasScreenshot: boolean; // flip to true once a real screenshot is dropped in /public/work
  image?: string; // path in /public/work once available
  featured?: boolean;
}

/**
 * PLACEHOLDER DATA
 * Replace name / industry / tagline / description / stat / url / tags with your
 * real project details. Once you have a screenshot for a sample, set
 * hasScreenshot: true and image: "/work/your-file.png" (drop the file in
 * /public/work/) — the card will automatically swap the mockup for the real image.
 */
export const WORK_SAMPLES: WorkSample[] = [
  {
    slug: "salon",
    name: "Celebrity Styles Hair Salon",
    industry: "Hair Salon",
    tagline: "High-Performance Smart Hair Salon Solutions",
    description:
      "A modern, conversion-focused site for a hair salon with online booking, service menus, and a fully digital new-patient flow.",
    stat: "+210%",
    statLabel: "Booking Increase",
    url: "https://salon-business-template.vercel.app",
    tags: ["Next.js", "Booking System", "Local SEO"],
    color: "from-purple-500 to-indigo-500",
    glowColor: "rgba(168, 85, 247, 0.15)",
    accentText: "text-purple-300",
    accentBorder: "border-purple-500/30",
    accentBg: "bg-purple-950/20",
    icon: Scissors,
    hasScreenshot: true,
    image: "/samples/salon1.png",
    featured: true,
  },
  {
    slug: "bantay",
    name: "Bantay Pet Grooming",
    industry: "Pet Grooming",
    tagline: "Modern Pet Grooming, Engineered for Comfort",
    description:
      "A calming, trust-building presence for a family pet grooming business with instant appointment booking and a fully digital new-patient flow.",
    stat: "3x",
    statLabel: "Online Appointments",
    url: "https://bantay-grooming.vercel.app",
    tags: ["Appointment Booking", "Next.js", "CMS"],
    color: "from-cyan-500 to-blue-500",
    glowColor: "rgba(34, 211, 238, 0.15)",
    accentText: "text-cyan-300",
    accentBorder: "border-cyan-500/30",
    accentBg: "bg-cyan-950/20",
    icon: PawPrint,
    hasScreenshot: true,
    image: "/samples/petgrooming1.png",
    featured: true,
  },
  {
    slug: "volt",
    name: "Volt.",
    industry: "Personal Training & Fitness",
    tagline: "Curated Sustainable Fitness Training",
    description:
      "A high-energy, conversion-focused site for a personal training business with online booking, membership tiers, and a full suite of fitness resources.",
    stat: "+84%",
    statLabel: "Trial Sign-Ups",
    url: "https://volt-ruby-five.vercel.app/",
    tags: ["Next.js", "Conversion Design"],
    color: "from-pink-500 to-rose-500",
    glowColor: "rgba(244, 63, 94, 0.15)",
    accentText: "text-rose-300",
    accentBorder: "border-rose-500/30",
    accentBg: "bg-rose-950/20",
    icon: Dumbbell,
    hasScreenshot: true,
    image: "/samples/volt3.png",
  },
  {
    slug: "dental",
    name: "Arch Dental Studio",
    industry: "Dental Practice",
    tagline: "Modern Dental Care, Engineered for Comfort",
    description:
      "A high-energy brand site for a boutique dental studio with class-schedule booking, membership tiers, and trainer profiles front and center.",
    stat: "+150%",
    statLabel: "Trial Sign-Ups",
    url: "https://arch-dental-studio.vercel.app/",
    tags: ["Next.js", "Conversion Design"],
    color: "from-amber-500 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.15)",
    accentText: "text-amber-300",
    accentBorder: "border-amber-500/30",
    accentBg: "bg-amber-950/20",
    icon: Stethoscope,
    hasScreenshot: true,
    image: "/samples/dental1.png",
  },
  {
    slug: "harbor-and-co",
    name: "Harbor & Co.",
    industry: "Restaurant & Hospitality",
    tagline: "Reservations, Menus & Ambience — In One Tap",
    description:
      "A moody, image-led site for a waterfront restaurant with live reservation availability, an interactive menu, and private-event inquiries.",
    stat: "+95%",
    statLabel: "Reservation Requests",
    url: "https://harborandco.example.com",
    tags: ["Reservations", "Menu CMS", "Next.js"],
    color: "from-emerald-500 to-teal-500",
    glowColor: "rgba(16, 185, 129, 0.15)",
    accentText: "text-emerald-300",
    accentBorder: "border-emerald-500/30",
    accentBg: "bg-emerald-950/20",
    icon: UtensilsCrossed,
    hasScreenshot: false,
  },
];
