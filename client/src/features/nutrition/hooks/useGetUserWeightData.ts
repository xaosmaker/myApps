import { useQuery } from "@tanstack/react-query";
import { getUserWeightStatus } from "../services/nutritionServices";
import { UserWeightStatusType } from "../types/NutritionTypes";

export function useGetUserWeightData() {
  const {
    data: userWeightData = [],
    isLoading: isUserWeightDataLoading,
    isError: isUserWeightDataError,
  } = useQuery<UserWeightStatusType[]>({
    queryFn: getUserWeightStatus,
    queryKey: ["userWeight"],
  });
  return { userWeightData, isUserWeightDataLoading, isUserWeightDataError };
}
