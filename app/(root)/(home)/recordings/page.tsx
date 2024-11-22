import CallList from '@/components/CallList';

const PreviousPage = () => {
  return (
    <section className="flex size-full flex-col gap-10"> {/* Added background color for dark mode */}
      <h1 className="text-3xl font-bold text-lightAccentColor dark:text-darkAccentColor"> {/* Updated text color for better readability */}
        Recordings
      </h1>

      <CallList type="recordings" />
    </section>
  );
};

export default PreviousPage;
