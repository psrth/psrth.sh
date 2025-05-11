import Wrapper from "./wrapper";

export default function Footer() {
  return (
    <Wrapper>
      <div className="flex flex-row justify-between mb-10 mt-40">
        <div className="flex flex-row gap-3 items-center">
          <div className="w-[10px] h-[10px] rounded-full bg-red-400"></div>
          <div className="text-[18px]/8 font-medium text-[var(--color-gray)]">
            live from los angeles, ca
          </div>
        </div>
        <div className="text-[18px]/8 font-regular text-[var(--color-light-gray)]">
          @psrth / 2025
        </div>
      </div>
    </Wrapper>
  );
}
