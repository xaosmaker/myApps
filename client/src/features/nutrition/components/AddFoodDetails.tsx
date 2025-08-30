import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type FoodDataType } from "../types/NutritionTypes";
import { postAddFoodDetails } from "../services/nutritionServices";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";
import { useState } from "react";
export default function AddFoodDetails() {
  const querclient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: postAddFoodDetails,
    onSuccess: () => {
      querclient.invalidateQueries({
        queryKey: ["foodSelect"],
      });
      setIsDialogOpen(false);
    },
  });

  const submitHandle = (data: FoodDataType) => {
    mutate(data);
  };
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodDataType>();
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="text-green-500 capitalize hover:cursor-pointer">
        <Tooltip>
          <TooltipTrigger asChild>
            <Plus />
          </TooltipTrigger>
          <TooltipContent className="uppercase">add gym machine</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle className="capitalize">Add gym machine</DialogTitle>
          <DialogDescription className="hidden">
            A form to register your gym machine
          </DialogDescription>
        </DialogHeader>
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
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
