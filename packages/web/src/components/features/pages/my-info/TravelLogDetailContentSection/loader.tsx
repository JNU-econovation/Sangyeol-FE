import Spacing from "@shared/layout/Spacing";

const TravelLogDetailContentSectionLoader = () => {
  return (
    <section>
      <div className="px-6">
        <div className="flex items-center justify-between">
          <div className="bg-gray-200 h-6 w-1/2 rounded" />
          <div className="bg-gray-200 h-6 w-4 rounded" />
        </div>
        <div className="bg-gray-200 h-4 w-1/3 rounded mt-2" />
      </div>
      <Spacing size={3.5} />
      <div className="h-80 bg-gray-100"></div>
      <div className="flex">
        <div className="grow p-3.5">
          <div className="bg-gray-200 h-8 w-32 rounded mx-auto" />
          <Spacing size={3} />
          <div className="bg-gray-200 h-4 w-20 rounded mx-auto" />
        </div>
        <div className="h-10 w-0.5 rounded-2xl my-auto bg-gray-300" />
        <div className="grow p-3.5">
          <div className="bg-gray-200 h-8 w-32 rounded mx-auto" />
          <Spacing size={3} />
          <div className="bg-gray-200 h-4 w-20 rounded mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default TravelLogDetailContentSectionLoader;
