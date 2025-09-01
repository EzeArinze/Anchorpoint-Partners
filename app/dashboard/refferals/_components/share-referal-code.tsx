"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Mail, Instagram, Share2 } from "lucide-react";
import { toast } from "sonner";

export default function ReferralShare({
  referralCode,
}: {
  referralCode: string | null | undefined;
}) {
  if (!referralCode) return null;

  const message = `🎉 Join me and use my referral code: ${referralCode} when making a deposit!`;

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: <IconBrandWhatsapp className="w-5 h-5" />,
      url: `https://wa.me/?text=${encodeURIComponent(message)}`,
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      url: `https://www.instagram.com/direct/new/?text=${encodeURIComponent(
        message
      )}`,
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      url: `mailto:?subject=My Referral Code&body=${encodeURIComponent(
        message
      )}`,
    },
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Referral Code",
          text: message,
        });
      } catch {
        // ignore cancel
      }
    } else {
      toast.error("Native share is not supported in your browser");
    }
  };

  return (
    <Card className="max-w-full p-4 rounded-2xl shadow-md">
      <CardContent className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Share your code</h2>
          <p className="text-sm text-muted-foreground">
            Share your referral code and earn bonuses 🎉
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {shareOptions.map((option) => (
            <Button
              key={option.name}
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => window.open(option.url, "_blank")}
            >
              {option.icon}
              {option.name}
            </Button>
          ))}

          <Button
            variant="outline"
            className="flex items-center gap-2 col-span-1"
            onClick={handleNativeShare}
          >
            <Share2 className="w-5 h-5" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
