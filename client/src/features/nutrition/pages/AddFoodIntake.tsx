import Input from "../../../components/Input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import AddFoodDetails from "../components/AddFoodDetails";
import { useGetFoodData } from "../hooks/useGetFoodData";
import type { AddFoodIntakeType, FoodDataType } from "../types/NutritionTypes";
import { usePostFoodIntake } from "../hooks/usePostFoodIntake";
import { timeTo24Format } from "../../../utils/helperFunctions";
import SelectSearch from "@/components/selectSearch/SelectSearch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
    };
  });

  //TODO: need error messages
  if (isFoodDataLoading) {
    return <div className="bg-slate-800">Loading</div>;
  }

  function submitHandler(data: AddFoodIntakeType) {
    postFoodIntake(data);
  }
  return (
    <Card className="mx-auto mt-10 h-fit">
      <CardHeader>
        <CardTitle>Add meal</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="mt-10 flex flex-col gap-10"
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
            <SelectSearch
              control={control}
              name="food"
              required={true}
              label="select food..."
              data={selectFoodData}
            />
            <AddFoodDetails />
          </div>

          {errors.food && (
            <Alert variant="destructive" className="z-10 mt-1.5">
              <AlertDescription className="capitalize">
                food: {errors.food?.message}
              </AlertDescription>
            </Alert>
          )}
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
