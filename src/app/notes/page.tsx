import Link from "next/link";
import Heading from "../components/copy";
import Wrapper from "../components/wrapper";

const notes = [
  {
    title: "you can just self-host next.js",
    link: "/notes/you-can-just-self-host-nextjs",
    date: "2025-05-11",
  },
  {
    title: "a mental framework for vibe coding",
    link: "/notes/a-mental-framework-for-vibe-coding",
    date: "2025-04-11",
  },
  {
    title: "b2b saas interfaces of the future",
    link: "/notes/b2b-saas-interfaces-of-the-future",
    date: "2025-03-11",
  },
  {
    title:
      "stop being an ai doomer stop being an ai doomer stop being an ai doomer stop being an ai doomer ",
    link: "/notes/stop-being-an-ai-doomer",
    date: "2024-12-30",
  },
  {
    title: "the case for saying yes to everything",
    link: "/notes/the-case-for-saying-yes-to-everything",
    date: "2024-11-30",
  },
  {
    title: "fitness is an engineering problem",
    link: "/notes/fitness-is-an-engineering-problem",
    date: "2024-10-30",
  },
  {
    title: "a random article",
    link: "/notes/a-random-article",
    date: "2024-09-30",
  },
];

function Notes() {
  return (
    <Wrapper>
      <Heading>Notes</Heading>

      {/* notes table - header */}
      <div className="flex flex-row gap-16 mt-10">
        <p className="text-[16px]/7 md:text-[18px]/8 font-regular text-[var(--color-light-gray)] w-[50px]">
          date
        </p>
        <p className="text-[16px]/7 md:text-[18px]/8 font-regular text-[var(--color-light-gray)]">
          title
        </p>
      </div>
      <div className="w-full h-[2px] bg-[var(--color-light-gray)] opacity-20 mt-3" />

      {/* notes table - core */}
      {(() => {
        const shownYears = new Set();
        return notes.map((note) => {
          const year = note.date.split("-")[0];
          const shouldShowYear = !shownYears.has(year);
          if (shouldShowYear) {
            shownYears.add(year);
          }
          return (
            <div className="flex flex-col" key={note.date}>
              <Link href={note.link}>
                <div className="flex flex-row gap-16 py-3">
                  <p className="text-[16px]/7 md:text-[18px]/8 font-regular text-[var(--color-light-gray)] w-[50px]">
                    {shouldShowYear ? year : ""}
                  </p>
                  <p className="text-[16px]/7 md:text-[18px]/8 font-regular text-[var(--color-gray)] overflow-hidden text-ellipsis whitespace-nowrap max-w-[300px] md:max-w-[500px]">
                    {note.title}
                  </p>
                </div>
              </Link>
              <div className="w-full h-[2px] bg-[var(--color-light-gray)] opacity-20" />
            </div>
          );
        });
      })()}
    </Wrapper>
  );
}

export default Notes;
