import { useQuery } from "@tanstack/react-query";

async function fetchCryptoData(): Promise<Coin[]> {
  const res = await fetch("/api/coingecko");
  if (!res.ok) {
    throw new Error("Failed to fetch crypto data");
  }
  return res.json();
}

export function CryptoBy7days() {
  return useQuery<Coin[]>({
    queryKey: ["cryptoData"],
    queryFn: fetchCryptoData,
    staleTime: 1000 * 60 * 5, // cache for 5 min
    refetchOnWindowFocus: false,
  });
}
