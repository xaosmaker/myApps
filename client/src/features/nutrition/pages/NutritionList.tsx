import usePagePaginationParams from "../../../hooks/usePagePaginationParams";
import { useGetNutritionsDaysListData } from "../hooks/useGetNutritionsDaysListData";
import { useGetUserWeightData } from "../hooks/useGetUserWeightData";
import NutritionsCard from "../components/NutritionsCard";

export default function NutritionList() {
  const pageParams = usePagePaginationParams();
  const { userWeightData, isUserWeightDataLoading } = useGetUserWeightData();
  const { nutritionDaysListData, isNutritionDaysLoading } =
    useGetNutritionsDaysListData(pageParams);

  if (isNutritionDaysLoading || isUserWeightDataLoading) {
    return <div className="animate-bounce"> Loading ....</div>;
  }
  return (
    <div className="h-full overflow-y-auto">
      <div className="sticky top-0 z-10 bg-slate-900 p-10 text-center text-4xl uppercase">
        Nutritions
        <div className="flex items-center justify-center gap-4 text-lg font-normal capitalize">
          <span>
            Current Weight:{" "}
            {userWeightData?.length > 0 ? userWeightData[0].current_weight : 0}
          </span>
          <span>
            Daily Calories:
            {userWeightData?.length > 0
              ? userWeightData[0].daily_target_calories
              : 0}
          </span>
        </div>
      </div>
      <div className="mb-4 grid w-full auto-rows-min grid-cols-[repeat(auto-fill,_minmax(19rem,_1fr))] gap-4 p-4">
        {nutritionDaysListData?.results.map((nutritions) => (
          <NutritionsCard data={nutritions} />
        ))}
      </div>
    </div>
  );
}
