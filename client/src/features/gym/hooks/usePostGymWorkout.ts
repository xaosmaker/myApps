import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { GymWorkoutType } from "../types/GymTypes";
import { postGymWorkout } from "../services/gymServices";

export function usePostGymWorkout() {
  const navigate = useNavigate();
  const { mutate: gymWorkoutMutate } = useMutation({
    mutationFn: (data: GymWorkoutType) => postGymWorkout(data),
    onSuccess: () => navigate("/gym"),
  });
  return { gymWorkoutMutate };
}
