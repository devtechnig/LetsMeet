"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";
import { useToast } from "./ui/use-toast";
import { useTheme } from "@/app/ThemeContext";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast();
  const { theme } = useTheme(); // Access the current theme

  // Correct icon paths based on the theme
  const dynamicButtonIcon1 = theme === "light" ? "/icons/previous.svg" : "/icons/previous-dark.svg";
  const dynamicCopyIcon = theme === "light" ? "/icons/copy.svg" : "/icons/dark-copy.svg";

  return (
    <section className="flex min-h-[258px] w-full flex-col border border-lightAccentColor dark:border-darkAccentColor justify-between rounded-[14px] 1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <Image src={dynamicButtonIcon1} alt="upcoming" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-darkBgColor dark:text-lightBgColor">
              {title}
            </h1>
            <p className="text-base font-normal text-black dark:text-white">
              {date}
            </p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative", {})}>
        <div className="relative flex w-full items-center max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn("rounded-full", { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex-center absolute left-[136px] size-8 rounded-full border-[5px] border-lightAccentColor bg-black text-white dark:border-darkAccentColor dark:bg-white dark:text-black">
            +5
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
              {buttonIcon1 && (
                <Image
                  src={dynamicButtonIcon1} // Corrected path
                  alt="feature"
                  width={20}
                  height={20}
                />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied",
                });
              }}
              className="bg-dark-4 dark:bg-darkAccentColor px-6"
            >
              <Image
                src={dynamicCopyIcon} // Corrected path
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
