import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-col w-full font-soehne">
      <div className="bg-[var(--color-teal)] h-4 w-full" />
      <div className="flex flex-row w-[90vw] md:w-[740px] mx-auto justify-between align-bottom">
        <Link href="/">
          <div className="flex flex-row items-center gap-3 mt-10">
            <Image src="/psrth.png" alt="logo" width={24} height={24} />
            <div className="text-md font-medium">psrth</div>
          </div>
        </Link>
        <div className="hidden md:flex flex-row items-center gap-4 mt-10">
          <Link href="/">
            <div className="text-md font-medium cursor-pointer">home</div>
          </Link>
          <Link href="/projects">
            <div className="text-md text-[var(--color-light-gray)] font-regular cursor-pointer">
              projects
            </div>
          </Link>
          <Link href="/notes">
            <div className="text-md text-[var(--color-light-gray)] font-regular cursor-pointer">
              notes
            </div>
          </Link>
          <Link href="/contact">
            <div className="text-md text-[var(--color-light-gray)] font-regular cursor-pointer">
              contact
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
