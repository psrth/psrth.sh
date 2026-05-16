"use client";

import { ReactNode } from "react";

const SCROLL_DURATION_MS = 320;
const SCROLL_OFFSET_PX = 32;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function smoothScrollTo(targetY: number) {
  const startY = window.scrollY;
  const distance = targetY - startY;

  if (Math.abs(distance) < 1) {
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    window.scrollTo({ top: targetY, behavior: "instant" });
    return;
  }

  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / SCROLL_DURATION_MS, 1);
    window.scrollTo({
      top: startY + distance * easeOutCubic(progress),
      behavior: "instant",
    });

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

interface ScrollLinkProps {
  target: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function ScrollLink({
  target,
  children,
  className,
  ariaLabel,
}: ScrollLinkProps) {
  const handleClick = () => {
    if (target === "top") {
      smoothScrollTo(0);
      return;
    }

    const element = document.getElementById(target);

    if (!element) {
      return;
    }

    const targetY =
      element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX;
    smoothScrollTo(targetY);
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={className}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
