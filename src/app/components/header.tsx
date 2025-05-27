"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (pathname && container) {
      const activeItem = activeItemRef.current;

      if (activeItem) {
        const { offsetLeft, offsetWidth } = activeItem;

        const clipLeft = offsetLeft;
        const clipRight = offsetLeft + offsetWidth;
        container.style.clipPath = `inset(0 ${Number(
          100 - (clipRight / container.offsetWidth) * 100
        ).toFixed()}% 0 ${Number(
          (clipLeft / container.offsetWidth) * 100
        ).toFixed()}%)`;
      } else {
        container.style.clipPath = `inset(0 100% 0 0%)`;
      }
    }
  }, [pathname]);
  // shoutout to https://emilkowal.ski/ for this animation

  return (
    <div className="flex flex-col w-full font-soehne">
      <div className="bg-[var(--color-teal)] h-4 w-full" />
      <div className="flex flex-col md:flex-row w-[95vw] md:w-[740px] mx-auto justify-between align-bottom mt-10">
        <Link href="/">
          <div className="flex flex-row items-center gap-3 ml-3 md:ml-0">
            <Image src="/psrth.png" alt="logo" width={24} height={24} />
            <div className="text-md font-medium text-[var(--color-black)]">
              psrth
            </div>
          </div>
        </Link>
        <div className="flex flex-row items-center mt-4 md:mt-0 relative">
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 w-full h-full bg-gray-50 transition-all duration-300 ease-in-out z-0"
            style={{ clipPath: "inset(0 100% 0 0%)" }}
            ref={containerRef}
          />
          <div className="flex flex-row items-center relative z-10">
            <HeaderItem
              href="/"
              label="home"
              currentPath={pathname}
              ref={pathname === "/" ? activeItemRef : null}
            />
            <HeaderItem
              href="/projects"
              label="projects"
              currentPath={pathname}
              ref={pathname === "/projects" ? activeItemRef : null}
            />
            <HeaderItem
              href="/notes"
              label="notes"
              currentPath={pathname}
              ref={pathname.includes("/notes") ? activeItemRef : null}
              isActive={pathname.includes("/notes")}
            />
            <HeaderItem
              href="/contact"
              label="contact"
              currentPath={pathname}
              ref={pathname === "/contact" ? activeItemRef : null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface HeaderItemProps {
  href: string;
  label: string;
  currentPath: string;
  ref?: React.Ref<HTMLAnchorElement>;
  isActive?: boolean;
}

const HeaderItem = React.forwardRef<HTMLAnchorElement, HeaderItemProps>(
  function HeaderItem(
    { href, label, currentPath, isActive: propIsActive },
    ref
  ) {
    const isActive =
      propIsActive !== undefined ? propIsActive : currentPath === href;

    return (
      <Link
        href={href}
        prefetch={true}
        ref={ref}
        className="px-3 py-1 cursor-pointer"
      >
        <p
          className={`text-md ${
            isActive
              ? "text-[var(--color-gray)] font-medium"
              : "text-[var(--color-light-gray)] font-regular"
          }`}
        >
          {label}
        </p>
      </Link>
    );
  }
);
