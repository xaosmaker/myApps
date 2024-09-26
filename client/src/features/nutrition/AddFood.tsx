interface FoodDataType {
  food: string;
  quantity: string;
  callories: number;
  pkid: number;
}
interface FormType {
  eat_time: string;
  quantity: string;
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
        options={foodOptionsData.map((item: FoodDataType) => ({
          label: `${item.food} (${item.quantity})`,
          value: item.callories,
          pkid: item.pkid,
        }))}
        onChange={setFood}
      />
      <div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
