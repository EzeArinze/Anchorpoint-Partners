import { useInView } from "react-intersection-observer";
import { useState, useRef } from "react";

export function Counter({
  value,
  duration = 2000,
}: {
  value: number;
  duration?: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  if (inView && !started.current) {
    started.current = true;

    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}
    </span>
  );
}
