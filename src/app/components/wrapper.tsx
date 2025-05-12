export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-[90vw] md:w-[740px] max-w-[740px mx-auto font-soehne animate-fade-in">
      {children}
    </div>
  );
}
