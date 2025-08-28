"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

interface Price {
  symbol: string;
  price: number;
  previousPrice?: number;
}

export default function CryptoTicker() {
  const [prices, setPrices] = useState<Price[]>([]);
  const [mounted, setMounted] = useState(false);
  const [speed, setSpeed] = useState(40);

  useEffect(() => {
    setMounted(true);

    // Adjust speed after mount (hydration safe)
    if (window.innerWidth < 640) {
      setSpeed(30);
    }

    const symbols = [
      "btcusdt",
      "ethusdt",
      "adausdt",
      "bnbusdt",
      "solusdt",
      "xrpusdt",
    ];
    const streams = symbols.map((s) => `${s}@ticker`).join("/");
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`
    );

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.stream) {
        const { s, c } = msg.data;
        const priceNum = parseFloat(c);

        setPrices((prev) => {
          const updated = [...prev];
          const index = updated.findIndex((p) => p.symbol === s);
          if (index > -1) {
            updated[index] = {
              symbol: s,
              price: priceNum,
              previousPrice: updated[index].price,
            };
          } else {
            updated.push({ symbol: s, price: priceNum });
          }
          return updated;
        });
      }
    };

    return () => ws.close();
  }, []);

  // Helper: BTCUSDT → BTC/USDT
  const formatSymbol = (sym: string) =>
    `${sym.slice(0, -4).toUpperCase()}/${sym.slice(-4).toUpperCase()}`;

  // Avoid SSR mismatch by rendering nothing until mounted
  if (!mounted) return null;

  return (
    <div className="max-w-[80%] mx-auto mt-10 pt-6">
      <Marquee gradient={false} speed={speed}>
        {prices.map((coin) => {
          let color = "text-muted-foreground";
          let arrow = "";
          if (coin.previousPrice) {
            if (coin.price > coin.previousPrice) {
              color = "text-green-400";
              arrow = "▲";
            } else if (coin.price < coin.previousPrice) {
              color = "text-red-400";
              arrow = "▼";
            }
          }

          return (
            <span
              key={coin.symbol}
              className={`mx-4 font-semibold ${color} text-sm sm:text-base md:text-lg transition-all duration-500 ease-in-out`}
            >
              {formatSymbol(coin.symbol)}:{" "}
              <span className="inline-block transition-all duration-500 ease-in-out">
                ${coin.price.toLocaleString()}
              </span>{" "}
              {arrow}
            </span>
          );
        })}
      </Marquee>
    </div>
  );
}
