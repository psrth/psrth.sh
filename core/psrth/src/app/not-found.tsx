import { Heading, BodyText, Wrapper } from "@repo/ui";

export default function Error() {
  return (
    <div className="flex flex-col items-center">
      <Wrapper>
        <Heading>404 :/</Heading>
        <BodyText>
          Are you sure you&apos;re in the right place? Here&apos;s a video of{" "}
          <span className="font-medium">Fred again </span>
          while you figure out where you&apos;re headed.
        </BodyText>
        <div className="flex flex-col w-full h-auto mx-auto mt-10 mb-20 justify-center items-center">
          <iframe
            width="100%"
            height="420"
            className="max-w-[740px] w-full"
            src="https://www.youtube-nocookie.com/embed/6MAzUT1YhWE?si=LobOypCN79e6Nl4r&amp;controls=0"
            title="YouTube video player"
            style={{ border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </Wrapper>
    </div>
  );
}
