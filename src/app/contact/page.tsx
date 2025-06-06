import Image from "next/image";
import { Metadata } from "next";

import Wrapper from "../components/wrapper";
import Heading from "../components/copy";

export const metadata: Metadata = {
  title: "contact / psrth.sh",
  description: "Generated by create next app",
};

function Contact() {
  return (
    <Wrapper>
      <Heading>Contact</Heading>
      <div className="flex flex-col-reverse md:flex-row w-full gap-10 justify-between mt-10">
        <div className="flex flex-col w-full md:w-[370px] md:min-w-[370px] relative h-[600px] md:h-[480px]">
          <Image src="/hi.png" alt="hi" fill style={{ objectFit: "cover" }} />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-[16px]/7 md:text-[18px]/8 mt-0 font-regular text-[var(--color-gray)]">
              hmu if you&apos;d like to work together — i&apos;m p good with
              next / go / js / python / ai or design / product / growth.
            </p>
            <p className="text-[16px]/7 md:text-[18px]/8 font-regular mt-10 text-[var(--color-gray)]">
              or if you just want to chat.
            </p>
          </div>
          <div className="mt-10 md:mt-0">
            <a
              href="mailto:psrthsharma@gmail.com"
              className="text-[16px]/7 md:text-[18px]/8 font-medium text-[var(--color-gray)] cursor-pointer"
            >
              psrthsharma@gmail.com
            </a>
            <p className="text-[16px]/7 md:text-[18px]/8 font-regular mt-1 text-[var(--color-gray)]">
              four 2 four four 7 1 three seven five too
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Contact;
