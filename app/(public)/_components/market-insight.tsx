"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { LineChart, Line, CartesianGrid, XAxis } from "recharts";

// ---- Types ----
interface Coin {
  id: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

interface ChartPoint {
  day: string;
  price: number;
}

export default function MarketInsightsSection() {
  const [cryptoData, setCryptoData] = useState<Coin[]>([]);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);

  const chartConfig = {
    price: {
      label: "BTC Price",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  // Fetch top coins
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,cardano&order=market_cap_desc&per_page=3&page=1&sparkline=true"
        );
        const data: Coin[] = await res.json();
        setCryptoData(data);

        // Format Bitcoin sparkline for chart
        if (data[0]?.sparkline_in_7d?.price) {
          const formatted: ChartPoint[] = data[0].sparkline_in_7d.price.map(
            (val, idx) => ({
              day: `Day ${idx + 1}`,
              price: val,
            })
          );
          setChartData(formatted);
        }
      } catch (err) {
        console.error("Error fetching crypto data:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="py-16 bg-muted/40" id="insight">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Market Insights</h2>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
            Stay updated with the latest trends in crypto markets. Live prices
            and performance to guide your investment decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chart */}
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Bitcoin 7-Day Performance</CardTitle>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <ChartContainer
                  config={chartConfig}
                  className="h-[260px] md:h-[360px] w-full"
                >
                  <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={24}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Line
                      dataKey="price"
                      type="natural"
                      stroke={"var(--color-price)"}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              ) : (
                <p className="text-muted-foreground">Loading chart...</p>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-4">
            {cryptoData.length > 0 ? (
              cryptoData.map((coin) => (
                <Card key={coin.id}>
                  <CardHeader>
                    <CardTitle>{coin.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">
                      ${coin.current_price.toLocaleString()}
                    </p>
                    <p
                      className={`text-sm font-medium ${
                        coin.price_change_percentage_24h >= 0
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}% (24h)
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground">Loading prices...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
