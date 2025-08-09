import Input from "../../../components/Input";
import { useForm } from "react-hook-form";
import Button from "../../../ui/Button";
import Modal from "../../../components/modal/Modal";
import AddFoodDetails from "../components/AddFoodDetails";
import { useGetFoodData } from "../hooks/useGetFoodData";
import type { AddFoodIntakeType, FoodDataType } from "../types/NutritionTypes";
import { usePostFoodIntake } from "../hooks/usePostFoodIntake";
import { timeTo24Format } from "../../../utils/helperFunctions";
import SelectSearch2 from "@/components/selectSearch/SelectSearch2";
import { Plus } from "lucide-react";
export default function AddFoodIntake() {
  const { postFoodIntake } = usePostFoodIntake();
  const { foodData, isFoodDataLoading } = useGetFoodData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddFoodIntakeType>({
    defaultValues: {
      eat_time: timeTo24Format(),
    },
  });
  const selectFoodData = foodData?.map((item: FoodDataType) => {

    return {
      label: `${item.food_name} (${item.food_quantity})`,
      value: item.pkid.toString(),
    }
  })

  //TODO: need error messages
  if (isFoodDataLoading) {
    return <div className="bg-slate-800">Loading</div>;
  }

  function submitHandler(data: AddFoodIntakeType) {
    postFoodIntake(data);
  }
  return (
    <Modal>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex w-1/2 flex-col gap-10"
      >
        <Input
          htmlType="time"
          error={errors.eat_time}
          name="eat time"
          register={register("eat_time")}
        />
        <Input
          name="quantity"
          error={errors.quantity}
          htmlType="text"
          register={register("quantity")}
        />
        <div className="grid grid-cols-[1fr_auto] items-center justify-center gap-2">
          <SelectSearch2 control={control} name="food" data={selectFoodData} />
          <Modal.Open opens="test">
            <div className="group/message relative cursor-pointer p-2 text-xl text-green-500">
              <Plus />
              <span className="invisible absolute top-9 right-1/2 translate-x-1/2 rounded-md border-2 border-slate-950 bg-slate-800 px-4 py-2 text-nowrap text-slate-50 transition-all duration-500 group-hover/message:visible">
                Add Food
              </span>
            </div>
          </Modal.Open>
        </div>
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>

      <Modal.Window name="test">
        <AddFoodDetails />
      </Modal.Window>
    </Modal>
  );
}
