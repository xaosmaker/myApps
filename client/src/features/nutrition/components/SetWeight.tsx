import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import { Button } from "@/components/ui/button";
import { type UserWeightStatusType } from "../types/NutritionTypes";
import { useMutation } from "@tanstack/react-query";
import { createUserWeight } from "../services/nutritionServices";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";

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
    <Dialog>
      <DialogTrigger className="text-green-500 capitalize hover:cursor-pointer">
        <Tooltip>
          <TooltipTrigger asChild>
            <Plus />
          </TooltipTrigger>
          <TooltipContent className="uppercase">add User Weight</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle className="capitalize">
            Add current user weight
          </DialogTitle>
          <DialogDescription className="hidden">
            A form to register your weight
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-6"
        >
          <Input
            htmlType="number"
            register={register("current_weight")}
            name="current_weight"
            displayName="Current User Weight (kg)"
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
      </DialogContent>
    </Dialog>
  );
}
