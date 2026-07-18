import { geolocation } from "@vercel/functions";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const existingCurrency = request.cookies.get("currency")?.value;

  if (existingCurrency) {
    return NextResponse.next();
  }

  const countryCode = geolocation(request).country;
  const currency = countryCode === "PH" ? "PHP" : "USD";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-currency", currency);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.cookies.set("currency", currency, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

export const config = {
  matcher: ["/pricing/:path*"],
};