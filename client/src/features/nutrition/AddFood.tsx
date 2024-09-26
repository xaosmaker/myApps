interface FormType {
  eat_time: string;
  quantity: string;
  test: { value: number; pkid: number; label: string };
}
type SelectValuesTypes = {
  label: string;
  value: number;
  pkid: number;
};
export interface SubmitDataType extends FormType {
  food: number;
}

import { useMutation, useQuery } from "@tanstack/react-query";
import Select from "react-select";
import {
  apiNutritionDateCreate,
  apiNutritionsFoods,
} from "../../services/nutritionsApiCalls";
import { useState } from "react";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { timeToHumanReadable } from "../../utils/helperFunctions";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import { FaPlus } from "react-icons/fa6";
import AddFoodStats from "./AddFoodStats";
import { FoodDataTypes } from "../../types/nutritionTypes";
export default function AddFood() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: apiNutritionDateCreate,
    onSuccess: () => {
      navigate("/nutritions");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      eat_time: timeToHumanReadable(),
    },
  });
  const { data: foodOptionsData, isLoading } = useQuery({
    queryKey: ["foodSelect"],
    queryFn: apiNutritionsFoods,
  });
  const [food, setFood] = useState<SelectValuesTypes | null>(null);
  if (isLoading) {
    return <div className="bg-slate-800">Loading</div>;
  }

  function submitHandler(data: FormType) {
    if (food?.pkid) {
      const submit_data: SubmitDataType = {
        ...data,
        food: food.pkid,
      };
      mutate(submit_data);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex w-1/2 flex-col gap-10"
    >
      <Input
        htmlType="time"
        error={errors.eat_time?.message}
        name="eat time"
        register={register("eat_time")}
      />
      <Input
        name="quantity"
        error={errors.quantity?.message}
        htmlType="text"
        register={register("quantity")}
      />
      <div className="grid grid-cols-[1fr_auto] items-center justify-center gap-2">
        <Select
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#334155",
              primary25: "#0f172a",
              neutral0: "#1e293b",
              neutral80: "#f8fafc",
            },
          })}
          options={foodOptionsData.map((item: FoodDataTypes) => ({
            label: `${item.food_name} (${item.food_quantity})`,
            value: item.food_calories,
            pkid: item.pkid,
          }))}
          onChange={setFood}
        />

        <Modal>
          <Modal.Open opens="test">
            <div className="group/message relative cursor-pointer p-2 text-xl  text-green-500">
              <FaPlus />
              <span className="text-nowrap invisible absolute right-1/2 top-9 translate-x-1/2 rounded-md border-2 border-slate-950 bg-slate-800 px-4 py-2 text-slate-50 transition-all duration-500 group-hover/message:visible">
                Add Food
              </span>
            </div>
          </Modal.Open>
          <Modal.Window name="test">
            <AddFoodStats />
          </Modal.Window>
        </Modal>
      </div>
      <div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
