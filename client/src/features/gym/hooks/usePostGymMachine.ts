import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ModalContext } from "../../../components/modal/Modal";
import { GymMachineType } from "../types/GymTypes";
import { useContext } from "react";
import { postGymMachine } from "../services/gymServices";

export function usePostGymMachine() {
  const queryclient = useQueryClient();
  const { close } = useContext(ModalContext);
  const {
    mutate: postGymMachineMutate,
    error: postGymMachineError,
    isError: isPostGymMachineError,
  } = useMutation({
    mutationFn: (data: GymMachineType) => postGymMachine(data),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["machineData"] });
      close();
    },
  });
  return { postGymMachineMutate, isPostGymMachineError, postGymMachineError };
}
