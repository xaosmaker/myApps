import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import Button from "../../../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { ModalContext } from "../../../components/modal/Modal";
import { type FoodDataType } from "../types/NutritionTypes";
import { postAddFoodDetails } from "../services/nutritionServices";
export default function AddFoodDetails() {
  const { close } = useContext(ModalContext);
  const querclient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: postAddFoodDetails,
    onSuccess: () => {
      querclient.invalidateQueries({
        queryKey: ["foodSelect"],
      });
      close();
    },
  });

  const submitHandle = (data: FoodDataType) => {
    mutate(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodDataType>();
  return (
    <form
      onSubmit={handleSubmit(submitHandle)}
      className="flex flex-col gap-6 px-4 py-4"
    >
      <Input
        htmlType="text"
        name="food_name"
        displayName="Food Name"
        register={register("food_name")}
        error={errors.food_name}
      />
      <Input
        htmlType="text"
        name="food_quantity"
        displayName="quantity per calories"
        register={register("food_quantity")}
        error={errors.food_quantity}
      />
      <Input
        otherProps={{ step: 0.01 }}
        name="food_calories"
        register={register("food_calories")}
        error={errors.food_calories}
        htmlType="number"
      />
      <div className="mt-5">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
