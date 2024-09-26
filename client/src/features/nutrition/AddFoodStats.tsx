import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFoodApiCall } from "../../services/nutritionsApiCalls";
import { FoodDataTypes } from "../../types/nutritionTypes";
import { useContext } from "react";
import { ModalContext } from "../../components/modal/Modal";

export default function AddFoodStats() {
  const { close } = useContext(ModalContext);
  const querclient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createFoodApiCall,
    onSuccess: () => {
      querclient.invalidateQueries({
        queryKey: ["foodSelect"],
      });
      close();
    },
  });
  const submitHandle = (data: FoodDataTypes) => {
    mutate(data);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodDataTypes>();
  return (
    <form
      onSubmit={handleSubmit(submitHandle)}
      className="flex  flex-col gap-6 px-4 py-4"
    >
      <Input
        htmlType="text"
        name="food"
        displayName="Food Name"
        register={register("food_name")}
        error={errors.food_name?.message}
      />
      <Input
        htmlType="text"
        name="quantity2"
        displayName="quantity per calories"
        register={register("food_quantity")}
        error={errors.food_quantity?.message}
      />
      <Input
        name="calories"
        register={register("food_calories")}
        error={errors.food_calories?.message}
        htmlType="number"
      />
      <div className="mt-5">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
