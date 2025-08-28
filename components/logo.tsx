import Image from "next/image";
import Link from "next/link";
import React from "react";

interface iAppProps {
  width?: number;
  height?: number;
  href?: string;
}

export function Logo({ height = 100, width = 50, href = "/" }: iAppProps) {
  return (
    <>
      <Link
        href={href}
        aria-label="home"
        className="flex items-center space-x-2"
      >
        <Image
          src={"/upc.png"}
          alt="Logo image"
          width={width}
          height={height}
          className="object-cover"
        />
      </Link>
    </>
  );
}
