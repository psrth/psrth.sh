import Heading, { BodyText } from "./components/copy";
import Wrapper from "./components/wrapper";

export default function Error() {
  return (
    <div className="flex flex-col items-center">
      <Wrapper>
        <Heading>four oh four</Heading>
        <BodyText>
          Are you sure you&apos;re in the right place? Here&apos;s a video of{" "}
          <span className="font-medium">Fred again </span>
          while you find out where you&apos;re headed.
        </BodyText>
        <div className="w-full h-[315px] mx-auto mt-10 mb-20">
          <iframe
            width="740"
            height="415"
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
