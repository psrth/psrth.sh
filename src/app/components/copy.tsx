import { FiChevronRight } from "react-icons/fi";

export const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="text-[28px]/10 md:text-[32px]/12 w-[90%] md:w-[620px] font-tiempos tracking-tight text-(--color-black)">
      {children}
    </h1>
  );
};

export const BodyText = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-[16px]/7 md:text-[18px]/8 font-regular w-[90%] md:w-[600px] mt-10 text-(--color-gray)">
      {children}
    </p>
  );
};

export const BodyTextBold = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-[16px]/7 md:text-[18px]/8 font-medium w-[90%] md:w-[600px] mt-10 text-(--color-gray)">
      {children}
    </p>
  );
};

export const ListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row gap-2 mt-4">
      <FiChevronRight className="text-(--color-light-gray) mt-2" />
      <div className="text-[16px]/7 md:text-[18px]/8 font-regular w-[90%] md:w-[600px] text-(--color-gray)">
        {children}
      </div>
    </div>
  );
};

export const ExperienceListItem = ({
  children,
  status,
}: {
  children: React.ReactNode;
  status: string | "current" | "past";
}) => {
  return (
    <div className="flex flex-row gap-2 mt-2">
      <FiChevronRight
        className={`${
          status === "current"
            ? "text-(--color-gray)"
            : "text-(--color-light-gray)"
        } mt-2 opacity-75`}
      />
      <div
        className={`text-[16px]/7 md:text-[18px]/8 ${
          status === "current"
            ? "font-medium text-(--color-gray)"
            : "font-regular text-(--color-light-gray)"
        } w-[600px]`}
      >
        {children}
      </div>
    </div>
  );
};

export default Heading;
