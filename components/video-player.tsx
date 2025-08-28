// import { cn } from "@/lib/utils";
// import React from "react";

// interface VideoSource {
//   src: string;
//   type: string; // e.g. "video/mp4", "video/avi", "video/webm"
// }

// interface VideoPlayerProps {
//   poster?: string;
//   width?: number | string;
//   controls?: boolean;
//   autoPlay?: boolean;
//   loop?: boolean;
//   muted?: boolean;
//   sources: VideoSource[];
//   className?: string;
//   videoClassName?: string;
// }

// function VideoPlayer({
//   poster,
//   width = 640,
//   controls = true,
//   autoPlay = false,
//   loop = false,
//   muted = false,
//   sources,
//   className,
//   videoClassName,
// }: VideoPlayerProps) {
//   return (
//     <section className={cn(className)}>
//       <video
//         width={width}
//         controls={controls}
//         autoPlay={autoPlay}
//         loop={loop}
//         muted={muted}
//         poster={poster}
//         className={cn("rounded-lg shadow", videoClassName)}
//       >
//         {sources.map((source, index) => (
//           <source key={index} src={source.src} type={source.type} />
//         ))}
//         Sorry, your browser doesn&apos;t support embedded videos.
//       </video>
//     </section>
//   );
// }

// export default VideoPlayer;

import React from "react";

interface VideoPlayerProps {
  src: string;
  className?: string;
  title?: string;
}

export default function VideoPlayer({
  src,
  className,
  title,
}: VideoPlayerProps) {
  return (
    <div className={className}>
      <iframe
        src={src}
        title={title || "Embedded Video"}
        className="w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
      />
    </div>
  );
}
