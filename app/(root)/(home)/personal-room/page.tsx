"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Table component for displaying meeting details
const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-lightAccentColor dark:text-darkAccentColor lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-bold text-lightTextColor dark:text-darkTextColor max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const meetingId = user?.id;
  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className="flex size-full flex-col gap-10 text-lightTextColor dark:text-darkTextColor">
      <h1 className="text-xl font-bold text-lightHeadingColor dark:text-darkHeadingColor lg:text-3xl">
        Personal Meeting Room
      </h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button
          className="bg-lightAccentColor hover:border-lightAccentColor dark:hover:border-darkAccentColor text-white hover:bg-transparent dark:hover:bg-transparent dark:hover:text-darkAccentColor hover:text-lightAccentColor dark:bg-darkAccentColor dark:text-white shadow-lightShadow dark:shadow-darkShadow"
          onClick={startRoom}
        >
          Start Meeting
        </Button>
        <Button
          className="border bg-transparent border-lightAccentColor dark:bg-transparent dark:border-darkAccentColor shadow-lightShadow dark:shadow-darkShadow text-lightAccentColor dark:text-darkAccentColor hover:text-white dark:hover:text-black"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
