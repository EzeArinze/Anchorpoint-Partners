// app/api/crypto/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,cardano&order=market_cap_desc&per_page=3&page=1&sparkline=true",
    {
      // Important: make sure fetch runs server-side
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
