import { useQuery } from "@tanstack/react-query";
import { GetPaginationDataType } from "../../../types/baseTypes";
import { GymDayType } from "../types/GymTypes";
import { getGymDayList } from "../services/gymServices";

export function useGetGymDay(pageParams: string) {
  const {
    data: gymListData,
    isLoading: isGymListDataLoading,
    isError: isGymListDataError,
  } = useQuery<GetPaginationDataType<GymDayType>>({
    queryKey: ["gym-day"],
    queryFn: () => getGymDayList(pageParams),
  });
  return { gymListData, isGymListDataLoading, isGymListDataError };
}
