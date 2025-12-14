"use client";
import { useEffect, useRef, useState } from "react";

type Direction = "up" | "down";

interface ScrollOptions {
  threshold?: number;
  debounce?: number;
}

export function useScroll({
  threshold = 100,
  debounce = 0,
}: ScrollOptions = {}) {
  const lastY = useRef(0);
  const lastTime = useRef(Date.now());

  const [y, setY] = useState(0);
  const [direction, setDirection] = useState<Direction>("up");
  const [isPastThreshold, setIsPastThreshold] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const now = Date.now();

      const deltaY = currentY - lastY.current;
      const deltaTime = now - lastTime.current || 1;

      // Direction
      setDirection(deltaY > 0 ? "down" : "up");

      // Velocity (px/ms)
      setVelocity(Math.abs(deltaY / deltaTime));

      // Threshold
      setIsPastThreshold(currentY > threshold);

      // Progress
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? currentY / docHeight : 0);

      setY(currentY);
      lastY.current = currentY;
      lastTime.current = now;
    };

    const listener = () => {
      if (debounce === 0) {
        handleScroll();
        return;
      }

      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(handleScroll, debounce);
    };

    window.addEventListener("scroll", listener, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", listener);
      if (timeout) clearTimeout(timeout);
    };
  }, [threshold, debounce]);

  return {
    y,
    direction,
    isPastThreshold,
    velocity,
    progress,
  };
}
