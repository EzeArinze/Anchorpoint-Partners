import Link from "next/link";
import { Anchor } from "lucide-react"; // Example icon

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
}

const sizeMap = {
  sm: { icon: "h-5 w-5", text: "text-base" },
  md: { icon: "h-7 w-7", text: "text-xl" },
  lg: { icon: "h-9 w-9", text: "text-2xl" },
};

export function Logo({ size = "md", href = "/" }: LogoProps) {
  const { icon, text } = sizeMap[size];

  return (
    <Link
      href={href}
      aria-label="home"
      className="flex items-center gap-2 font-bold text-primary hover:opacity-90 transition"
    >
      {/* Brand Icon */}
      <Anchor className={`${icon} text-primary`} />

      {/* Brand Name */}
      <span className={`${text} tracking-tight`}>
        Anchorpoint <span className="text-muted-foreground">Partners</span>
      </span>
    </Link>
  );
}
