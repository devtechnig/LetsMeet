'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import HomeCard from './HomeCard';
import MeetingModal from './MeetingModal';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import Loader from './Loader';
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';
import { useToast } from './ui/use-toast';
import { Input } from './ui/input';
import { useTheme } from '../app/ThemeContext'; // Import ThemeContext

const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();
  const { theme } = useTheme(); // Access theme from ThemeContext

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({ title: 'Please select a date and time' });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create meeting');
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: 'Meeting Created',
      });
    } catch (error) {
      console.error(error);
      toast({ title: 'Failed to create Meeting' });
    }
  };

  if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  // Dynamic styles based on theme
  const cardShadowColor = theme === 'dark' ? 'shadow-darkAccentColor/40' : 'shadow-lightAccentColor/40';
  // Card background color based on the theme
  const cardBgColors = {
    'isInstantMeeting': theme === 'dark' ? 'bg-[#0F4C5C]' : 'bg-[#6FCF97]',
    'isJoiningMeeting': theme === 'dark' ? 'bg-[#5A3ECA]' : 'bg-[#FF6F61]',
    'isScheduleMeeting': theme === 'dark' ? 'bg-[#E76F51]' : 'bg-[#56CCF2]',
    'default': theme === 'dark' ? 'bg-[#A29BFE]' : 'bg-[#F2C94C]',
  };

  // Icon paths based on theme
  const iconPaths = {
    newMeeting: theme === 'dark' ? '/icons/add-meeting-dark.svg' : '/icons/add-meeting.svg',
    joinMeeting: theme === 'dark' ? '/icons/join-meeting-dark.svg' : '/icons/join-meeting.svg',
    scheduleMeeting: theme === 'dark' ? '/icons/schedule-dark.svg' : '/icons/schedule.svg',
    recordings: theme === 'dark' ? '/icons/recordings-dark.svg' : '/icons/recordings.svg',
    checked: theme === 'dark' ? '/icons/checked-dark.svg' : '/icons/checked.svg',
    copy: theme === 'dark' ? '/icons/copy-dark.svg' : '/icons/copy.svg',
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img={iconPaths.newMeeting} // Dynamic icon based on theme
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
        className={`${cardBgColors.isInstantMeeting} border border-lightAccentColor dark:border-darkAccentColor ${cardShadowColor}`}
      />
      <HomeCard
        img={iconPaths.joinMeeting} // Dynamic icon based on theme
        title="Join Meeting"
        description="via invitation link"
        className={`${cardBgColors.isJoiningMeeting} border border-lightAccentColor dark:border-darkAccentColor ${cardShadowColor}`}
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        img={iconPaths.scheduleMeeting} // Dynamic icon based on theme
        title="Schedule Meeting"
        description="Plan your meeting"
        className={`${cardBgColors.isScheduleMeeting} border border-lightAccentColor dark:border-darkAccentColor ${cardShadowColor}`}
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img={iconPaths.recordings} // Dynamic icon based on theme
        title="View Recordings"
        description="Meeting Recordings"
        className={`${cardBgColors.default} border border-lightAccentColor dark:border-darkAccentColor ${cardShadowColor}`}
        handleClick={() => router.push('/recordings')}
      />

      {/* Modal for scheduling meetings */}
      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link Copied' });
          }}
          image={iconPaths.checked} // Dynamic icon based on theme
          buttonIcon={iconPaths.copy} // Dynamic icon based on theme
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}

      {/* Modal for joining meeting */}
      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>

      {/* Modal for instant meeting */}
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
