import { useNavigate } from "react-router-dom";
import { postAddFoodIntake } from "../services/nutritionServices";
import { useMutation } from "@tanstack/react-query";

export function usePostFoodIntake() {
  const navigate = useNavigate();
  const { mutate: postFoodIntake } = useMutation({
    mutationFn: postAddFoodIntake,
    onSuccess: () => {
      navigate("/nutritions");
    },
  });
  return { postFoodIntake };
}
