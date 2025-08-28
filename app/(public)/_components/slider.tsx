"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";

const images = [
  "/slider/canabis.jpg",
  "/slider/gold.jpg",
  "/slider/digital-asset.jpg",
  "/slider/crude-oil.jpg",
  "/slider/real-estate.jpg",
  "/slider/ruby.jpg",
];

export default function ImageSlider() {
  return (
    <div className="relative mt-8 overflow-hidden px-2 sm:mt-12 md:mt-20 ">
      {/* gradient overlay */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/20 to-black/40"
      />

      {/* container */}
      <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          centeredSlides
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop
          speed={900}
          className="rounded-2xl"
        >
          {images.map((src, idx) => (
            <SwiperSlide key={idx}>
              {/* <div className="relative aspect-square sm:aspect-[4/3] md:aspect-video w-full">
                <Image
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  fill
                  className="rounded-2xl object-cover"
                  priority={idx === 0}
                />
              </div> */}
              <div className="relative aspect-video w-full">
                <Image
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  width={1200}
                  height={100}
                  className="rounded-2xl object-contain"
                  priority={idx === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
