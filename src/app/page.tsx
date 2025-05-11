import { FiChevronRight } from "react-icons/fi";
import Wrapper from "./components/wrapper";
import Image from "next/image";
import GitHubCalendarCard from "./components/github-calendar";
import {
  Heading,
  BodyText,
  ListItem,
  BodyTextBold,
  ExperienceListItem,
} from "./components/copy";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Wrapper>
        <Heading>
          Hey, I&apos;m Parth. I&apos;m a designer and engineer, and I build
          products for the internet.
        </Heading>
        <BodyText>
          I&apos;m pretty good at taking complex problems and one-shotting a
          tech solution for them in a weekend. While that might sound cool,
          it&apos;s led me into some pretty interesting situations:
        </BodyText>
        <ListItem>
          getting <i>lost</i> on a midnight hike with only a can of celsius and
          Llama-3B on a battery-powered RPi
        </ListItem>
        <ListItem>
          accidentally setting fire to my friend&apos;s 2012 Alienware because
          the entire Cannes Film Festival was pinging our server.
        </ListItem>
        <ListItem>
          that time Virat Kohli tweeted something I&apos;d built
        </ListItem>
        <BodyTextBold>
          I&apos;m currently splitting my time leading tech for a consulting
          firm in New York, and surfing at Point Dume State Beach.
        </BodyTextBold>
      </Wrapper>
      <Image
        src="/life.png"
        alt="a picture of life right now"
        width={1024}
        height={550}
        className="my-10"
      />
      <Wrapper>
        <ExperienceListItem status="current">
          founding engineer at pulse ai (2024 - present)
        </ExperienceListItem>
        <ExperienceListItem status="current">
          tech lead at fischer jordan (2023 - present)
        </ExperienceListItem>
        <ExperienceListItem status="past">
          graduated from bits pilani, india (2024)
        </ExperienceListItem>
        <ExperienceListItem status="past">
          sold the tech ip for doubltap, an influencer marketing startup (2023)
        </ExperienceListItem>
        <ExperienceListItem status="past">
          built software for sequoia, lightspeed, and more at orange yak (2021 -
          23)
        </ExperienceListItem>
        <GitHubCalendarCard />
        <BodyText>
          If you&apos;re just hanging out here, feel free to check out some of
          the things I&apos;ve worked on{" "}
          <Link href="/projects">
            <span className="font-medium text-[var(--color-light-gray)]">
              (projects)
            </span>
          </Link>
          , or some of my moderately opinionated takes{" "}
          <Link href="/notes">
            <span className="font-medium text-[var(--color-light-gray)]">
              (notes)
            </span>
          </Link>
          . Alternatively, feel free to reach out — I&apos;m always on the
          lookout for interesting problems to work on / cool people to work with{" "}
          <Link href="/contact">
            <span className="font-medium text-[var(--color-light-gray)]">
              (contact)
            </span>
          </Link>
          .
        </BodyText>
      </Wrapper>
    </div>
  );
}
