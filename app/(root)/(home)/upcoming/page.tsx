import CallList from '@/components/CallList';

const UpcomingPage = () => {
  return (
    <section className="flex size-full flex-col gap-10"> {/* Added background color for dark mode */}
      <h1 className="text-3xl font-bold text-lightAccentColor dark:text-darkAccentColor"> {/* Updated text color for better readability */}
        Upcoming Meeting
      </h1>

      <CallList type="upcoming" />
    </section>
  );
};

export default UpcomingPage;
