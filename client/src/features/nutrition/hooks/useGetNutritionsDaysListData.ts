import { useQuery } from "@tanstack/react-query";
import { type NutritionsDaysListType } from "../types/NutritionTypes";
import { getNutritionsDaysList } from "../services/nutritionServices";

export function useGetNutritionsDaysListData(pageParams: string) {
  const {
    data: nutritionDaysListData,
    isLoading: isNutritionDaysLoading,
    isError: isNutritionDaysError,
  } = useQuery<NutritionsDaysListType>({
    queryKey: ["nutritionData", pageParams],
    queryFn: () => getNutritionsDaysList(pageParams),
  });
  return {
    nutritionDaysListData,
    isNutritionDaysLoading,
    isNutritionDaysError,
  };
}
