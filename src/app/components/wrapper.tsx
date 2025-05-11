export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-[740px] mx-auto font-soehne">
      {children}
    </div>
  );
}
