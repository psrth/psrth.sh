import Wrapper from "./wrapper";

export default function Footer() {
  return (
    <Wrapper>
      <div className="flex flex-col md:flex-row justify-between mb-10 mt-40">
        <div className="flex flex-row gap-2 md:gap-3 items-center">
          <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
            <span className="relative inline-flex w-2 h-2 md:w-[10px] md:h-[10px] rounded-full bg-red-500" />
          </div>

          <div className="text-[16px]/8 md:text-[18px]/8 font-medium text-[var(--color-gray)]">
            live from los angeles, ca
          </div>
        </div>
        <div className="text-[14px]/8 md:text-[18px]/8 font-regular text-[var(--color-light-gray)]">
          @psrth / 2025
        </div>
      </div>
    </Wrapper>
  );
}
