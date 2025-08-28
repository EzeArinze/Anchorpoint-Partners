// components/UserAvatar.tsx
"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  image?: string | null;
  email: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "size-6",
  md: "size-8",
  lg: "size-12",
};

export function UserAvatar({ image, email, size = "md" }: UserAvatarProps) {
  return (
    <Avatar className={sizeMap[size]}>
      <AvatarImage src={image ?? ""} alt={email} />
      <AvatarFallback>{email.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
