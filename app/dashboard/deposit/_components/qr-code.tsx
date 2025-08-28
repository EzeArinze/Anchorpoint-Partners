"use client";

import { useCryptoPrices } from "@/hooks/use-crypto-price";
import QRCode from "react-qr-code";

type QRWalletProps = {
  address: string;
  amount: number; // optional
  currency: "bitcoin" | "ethereum";
};

export default function QRWallet({ address, amount, currency }: QRWalletProps) {
  const { isFetching, data: prices } = useCryptoPrices();

  const btcPrice = prices?.bitcoin?.usd ?? 0;
  const ethPrice = prices?.ethereum?.usd ?? 0;

  const btcAmount = btcPrice ? amount / btcPrice : 0;
  const ethAmount = ethPrice ? amount / ethPrice : 0;
  // Build crypto URI
  const uri =
    currency === "bitcoin"
      ? `bitcoin:${address}${amount ? `?amount=${btcAmount}` : ""}`
      : `ethereum:${address}${amount ? `?amount=${ethAmount}` : ""}`;

  return (
    <div className="flex flex-col items-center space-y-2 p-2 rounded-xl border bg-muted">
      <QRCode value={uri} size={140} />
      <p className="font-mono text-sm break-all">{address}</p>
      {isFetching && (
        <p className="text-sm text-muted-foreground">Loading rates...</p>
      )}
      {btcAmount && !isFetching && (
        <p className="text-sm text-muted-foreground">
          Amount: {currency === "bitcoin" ? btcAmount : ethAmount}{" "}
          {currency === "bitcoin" ? "BTC" : "ETH"}
        </p>
      )}
    </div>
  );
}
