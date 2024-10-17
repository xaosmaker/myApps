import { useQuery } from "@tanstack/react-query";
import { getFoodData } from "../services/nutritionServices";

export function useGetFoodData() {
  const {
    data: foodData,
    isLoading: isFoodDataLoading,
    isError: isFoodDataError,
  } = useQuery({
    queryKey: ["foodSelect"],
    queryFn: getFoodData,
  });
  return { foodData, isFoodDataError, isFoodDataLoading };
}
