import { useQuery } from "@tanstack/react-query";
import { GymMachineType } from "../types/GymTypes";
import { getGymMachineList } from "../services/gymServices";

export function useGetGymMachine() {
  const { data: gymMachineList = [], isLoading: isGymMachineLoading } =
    useQuery<GymMachineType[]>({
      queryKey: ["machineData"],
      queryFn: getGymMachineList,
    });
  return { gymMachineList, isGymMachineLoading };
}
