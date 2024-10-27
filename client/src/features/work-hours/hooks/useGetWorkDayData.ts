import { useQuery } from "@tanstack/react-query";
import { getWorkDays } from "../services/workHoursServices";
import { WorkDayType } from "../types/WorkHoursTypes";

export function useGetWorkDayData() {
  const { data: workDayData = [], isLoading: isWorkDayDataLoading } = useQuery<
    WorkDayType[]
  >({
    queryKey: ["workDay"],
    queryFn: getWorkDays,
  });
  return { workDayData, isWorkDayDataLoading };
}
