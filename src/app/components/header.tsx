"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full font-soehne">
      <div className="bg-[var(--color-teal)] h-4 w-full" />
      <div className="flex flex-col md:flex-row w-[95vw] md:w-[740px] mx-auto justify-between align-bottom mt-10">
        <Link href="/">
          <div className="flex flex-row items-center gap-3 ml-3 md:ml-0">
            <Image src="/psrth.png" alt="logo" width={24} height={24} />
            <div className="text-md font-medium">psrth</div>
          </div>
        </Link>
        <div className="flex flex-row items-center mt-4 md:mt-0">
          <HeaderItem href="/" label="home" currentPath={pathname} />
          <HeaderItem
            href="/projects"
            label="projects"
            currentPath={pathname}
          />
          <HeaderItem href="/notes" label="notes" currentPath={pathname} />
          <HeaderItem href="/contact" label="contact" currentPath={pathname} />
        </div>
      </div>
    </div>
  );
}

interface HeaderItemProps {
  href: string;
  label: string;
  currentPath: string;
}

function HeaderItem({ href, label, currentPath }: HeaderItemProps) {
  const isActive = currentPath === href;

  return (
    <Link
      href={href}
      prefetch={true}
      className={`px-3 py-1 cursor-pointer ${
        isActive ? "bg-gray-50" : "bg-transparent"
      }`}
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
