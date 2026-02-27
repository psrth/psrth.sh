"use client";

export default function Header() {
  return (
    <div className="flex flex-row justify-between items-start">
      <div>
        <h1 className="text-[28px]/8 md:text-[32px]/12 font-tiempos tracking-tight text-(--color-black)">
          vim.psrth.sh
        </h1>
        <p className="text-[18px] text-(--color-light-gray) mt-1">
          a minimalist, local storage scribbling app.
        </p>
      </div>
    </div>
  );
}
