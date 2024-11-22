import CallList from "@/components/CallList";

const PreviousPage = () => {
  return (
    <section className="flex size-full flex-col gap-10"> {/* Adding a background color for dark mode */}
      <h1 className="text-3xl font-bold text-darkBgColor dark:text-lightBgColor"> {/* Updated text color for better readability */}
        Previous Calls
      </h1>

      <CallList type="ended" />
    </section>
  );
};

export default PreviousPage;
