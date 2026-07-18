import { cookies, headers } from "next/headers";
import PricingPage from "@/components/Pricing/PricingPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

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
        <PricingPage currency={currency} />
      </main>
      <Footer />
    </>
  );
}