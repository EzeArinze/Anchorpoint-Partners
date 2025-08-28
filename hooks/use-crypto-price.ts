import { useQuery } from "@tanstack/react-query";

type PriceData = {
  bitcoin?: { usd: number };
  ethereum?: { usd: number };
};

async function fetchPrices(): Promise<PriceData> {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
  );
  if (!res.ok) throw new Error("Failed to fetch crypto prices");
  return res.json();
}

export function useCryptoPrices() {
  return useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: fetchPrices,
    refetchInterval: 60000,
    staleTime: 30000,
  });
}
