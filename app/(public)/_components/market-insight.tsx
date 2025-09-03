"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { LineChart, Line, CartesianGrid, XAxis } from "recharts";
import { CryptoBy7days } from "@/hooks/use-crypto-by-7days";

interface ChartPoint {
  day: string;
  price: number;
}

export default function MarketInsightsSection() {
  const { data: cryptoData, isLoading, error } = CryptoBy7days();

  // Prepare chart data directly from query
  const chartData: ChartPoint[] =
    cryptoData?.[0]?.sparkline_in_7d?.price?.map((val, idx) => ({
      day: `Day ${idx + 1}`,
      price: val,
    })) ?? [];

  const chartConfig = {
    price: {
      label: "BTC Price",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

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
              {isLoading ? (
                <p className="text-muted-foreground">Loading chart...</p>
              ) : error ? (
                <p className="text-red-600">Error loading chart</p>
              ) : chartData.length > 0 ? (
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
                <p className="text-muted-foreground">No chart data</p>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-4">
            {isLoading ? (
              <p className="text-muted-foreground">Loading prices...</p>
            ) : error ? (
              <p className="text-red-600">Error loading prices</p>
            ) : (
              cryptoData?.map((coin) => (
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
