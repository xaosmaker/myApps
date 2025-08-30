import usePagePaginationParams from "../../../hooks/usePagePaginationParams";
import { useGetGymDay } from "../hooks/useGetGymDay";
import WorkoutCard from "../components/WorkoutCard";

export default function GymCard() {
  const pageParams = usePagePaginationParams();
  const { gymListData, isGymListDataLoading } = useGetGymDay(pageParams);

  if (isGymListDataLoading) {
    return <div className="animate-bounce"> Loading ....</div>;
  }
  return (
    <div className="h-full overflow-y-auto">
      <p className="sticky top-0 z-10 bg-slate-900 p-10 text-center text-4xl uppercase">
        gym WorkOuts
      </p>
      <div className="mb-4 grid w-full auto-rows-min grid-cols-[repeat(auto-fill,_minmax(19rem,_1fr))] gap-4 p-4">
        {gymListData?.results.map((workouts) => (
          <WorkoutCard data={workouts} />
        ))}
      </div>
    </div>
  );
}
