import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import Button from "../../../ui/Button";
import { type UserWeightStatusType } from "../types/NutritionTypes";
import { useMutation } from "@tanstack/react-query";
import { createUserWeight } from "../services/nutritionServices";
import { useNavigate } from "react-router-dom";

export default function SetWeight() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: createUserWeight,
    onSuccess: () => {
      navigate("/nutritions");
    },
  });
  function submitHandler(data: UserWeightStatusType) {
    mutate(data);
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserWeightStatusType>();
  return (
    <div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-6"
      >
        <Input
          htmlType="number"
          register={register("current_weight")}
          name="current_weight"
          displayName="Current User Weight"
          error={errors.current_weight}
          otherProps={{ step: 0.01 }}
        />
        <Input
          htmlType="number"
          register={register("daily_target_calories")}
          name="daily_target_calories"
          displayName="Daily Target Calories"
          error={errors.daily_target_calories}
        />
        <div>
          <Button type="submit">add weight</Button>
        </div>
      </form>
    </div>
  );
}
