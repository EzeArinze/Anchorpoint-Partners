import { Facebook, Instagram, Linkedin, Send } from "lucide-react";

export const Products: iAppProps[] = [
  {
    id: 1,
    image:
      "https://1ylyxif5c1.ufs.sh/f/gdr7UdKsnxktpWQDPLq1BakmRSMoK6XhVsqvZzfY2Jgyx3cP",
    title: "Real Estate",
    slug: "real-estate",
    link: "/product/real-estate",
    small_description:
      "Stable returns through property investments. Build wealth with residential and commercial opportunities.",
    description:
      "Invest in residential and commercial properties with strong growth potential and steady rental yields. Diversify your portfolio with real assets that appreciate over time.",
  },
  {
    id: 2,
    image:
      "https://1ylyxif5c1.ufs.sh/f/gdr7UdKsnxktHHBsv9f7deVtub6q5C3gzyshSEpZILxYA4FX",
    title: "Retirement Plans",
    slug: "retirement-plans",
    link: "/investments/retirement-plans",
    small_description:
      "Plan for a secure future. Flexible options to ensure long-term financial stability.",
    description:
      "Tailored retirement investment options to ensure you have financial stability for your golden years. Flexible plans designed for your long-term goals.",
  },
  {
    id: 3,
    image:
      "https://1ylyxif5c1.ufs.sh/f/gdr7UdKsnxkt8mxfIjopObG3RHQiVCUeS2BJcWErF8a7vqm9",
    title: "Cannabis",
    slug: "cannabis",
    link: "/investments/cannabis",
    small_description:
      "High-growth emerging sector. Invest in cultivation, distribution, and related markets.",
    description:
      "Participate in the fast-growing cannabis industry. Access opportunities in cultivation, distribution, and related sectors to maximize potential returns.",
  },
  {
    id: 4,
    image:
      "https://1ylyxif5c1.ufs.sh/f/gdr7UdKsnxktF634ZNVeTd0miKV8tNXR9SkrDs4UlW1v5nw6",
    title: "Crypto",
    slug: "crypto",
    link: "/investments/crypto",
    small_description:
      "Blockchain-powered growth. Gain exposure to digital assets with high potential.",
    description:
      "Gain exposure to top cryptocurrencies and blockchain projects. Benefit from digital assets with high growth potential and portfolio diversification.",
  },
  {
    id: 5,
    image:
      "https://1ylyxif5c1.ufs.sh/f/gdr7UdKsnxkt8uEHOqopObG3RHQiVCUeS2BJcWErF8a7vqm9",
    title: "Oil & Gas",
    slug: "oil-gas",
    link: "/investments/oil-gas",
    small_description:
      "Energy sector investments. Hedge your portfolio with essential global resources.",
    description:
      "Invest in oil and gas resources, infrastructure, and energy projects. Capture steady returns and hedge your portfolio against market volatility.",
  },
  {
    id: 6,
    image:
      "https://1ylyxif5c1.ufs.sh/f/gdr7UdKsnxktQrQG8uFEbwFYxZSCUoptraXGk7ifzvh1WBAj",
    title: "Financial Planning",
    slug: "financial-planning",
    link: "/investments/financial-planning",
    small_description:
      "Expert guidance for your wealth. Tailored strategies for growth and protection.",
    description:
      "Comprehensive financial advisory services to manage, grow, and protect your wealth. Customized strategies for investments, taxes, and long-term planning.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Real Estate Investor",
    quote:
      "Investing in property through this platform has been seamless. The returns on my portfolio exceeded traditional real estate deals.",
  },
  {
    name: "David Kim",
    role: "Crypto Enthusiast",
    quote:
      "I’ve tried other crypto platforms, but none were as transparent and rewarding as this. The insights and growth opportunities are unmatched.",
  },
  {
    name: "Emily Carter",
    role: "Retirement Planner",
    quote:
      "I never imagined retirement planning could be this straightforward. Now I have peace of mind knowing my future is financially secured.",
  },
  {
    name: "James Rodriguez",
    role: "Oil & Gas Entrepreneur",
    quote:
      "Diversifying into oil and gas investments here has been a game-changer. The professionalism and market expertise are top-notch.",
  },
];

export const plans: Plan[] = [
  {
    name: "Basic",
    tagline: "Perfect to get started",
    rate: "2",
    period: "daily",
    features: [
      {
        minimum: "200",
        maximum: "1,999",
        ReferralBonus: "10%",
        Support: "7 Days Contract",
      },
    ],
    includes: "Beginners",
  },
  {
    name: "Edge",
    tagline: "Best for basic investors",
    rate: "2.5",
    period: "daily",
    features: [
      {
        minimum: "2,000",
        maximum: "4,999",
        ReferralBonus: "10%",
        Support: "7 Days Contract",
      },
    ],
    includes: "Basics",
  },
  {
    name: "Silver",
    tagline: "Best for mid-range investors",
    rate: "3.5",
    period: "daily",
    features: [
      {
        minimum: "5,000",
        maximum: "49,999",
        ReferralBonus: "10%",
        Support: "7 Days Contract",
      },
    ],
    includes: "Basics",
  },
  {
    name: "Diamond",
    tagline: "Best for Professionals",
    rate: "5",
    period: "daily",
    features: [
      {
        minimum: "50,000",
        maximum: "100,000",
        ReferralBonus: "15%",
        Support: "7 Days Contract",
      },
    ],
    includes: "Professional",
  },
];

export const address: Record<PaymentMethod, string> = {
  bitcoin: "bc1qnv99m08st4usvzp4t3wncv0l5gkwf",
  ethereum: "0x443250763303e71cd245ddf",
};

export const socials = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "#",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "#",
  },
  {
    name: "Telegram",
    icon: Send,
    url: "#",
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "#",
  },
];
