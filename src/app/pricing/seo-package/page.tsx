import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SeoPackagePage from "@/components/Pricing/SeoPackagePage";

export const metadata: Metadata = {
  title: "SEO Package",
  description:
    "Improve your visibility on Google with on-page SEO optimization. Add it to any Nexus website package.",
};

export default async function Page() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const cookieCurrency = cookieStore.get("currency")?.value;
  const headerCurrency = headerStore.get("x-currency");
  const currency =
    cookieCurrency === "PHP" || (cookieCurrency !== "USD" && headerCurrency === "PHP")
      ? "PHP"
      : "USD";

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="flex-1 bg-zinc-950">
        <SeoPackagePage currency={currency} />
      </main>
      <Footer />
    </>
  );
}
