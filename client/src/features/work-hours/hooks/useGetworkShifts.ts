import { useQuery } from "@tanstack/react-query";
import { getWorkShifts } from "../services/workHoursServices";
import type { WorkShiftType } from "../types/WorkHoursTypes";

export function useGetWorkShifts() {
  const { data: workShiftsData = [], isLoading: isWorkShiftsDataLoading } =
    useQuery<WorkShiftType[]>({
      queryKey: ["WorkShifts"],
      queryFn: getWorkShifts,
    });
  return { workShiftsData, isWorkShiftsDataLoading };
}
