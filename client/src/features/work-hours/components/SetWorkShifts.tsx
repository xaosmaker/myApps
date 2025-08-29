import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import { Button } from "@/components/ui/button";
import type { WorkShiftFormType } from "../types/WorkHoursTypes";
import { useMutation } from "@tanstack/react-query";
import { createWorkShift } from "../services/workHoursServices";
import { queryClient } from "../../../queryClient";
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
import { useState } from "react";

export default function SetWorkShifts() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { mutate } = useMutation({
    mutationFn: createWorkShift,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["WorkShifts"],
      });
      setIsDialogOpen(false);
    },
  });
  function sumbitHandler(data: WorkShiftFormType) {
    mutate(data);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkShiftFormType>();
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger
            className="text-green-500 uppercase hover:cursor-pointer"
            asChild
          >
            <Plus />
          </TooltipTrigger>
          <TooltipContent className="uppercase">Add Shift</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle>ADD SHIFT</DialogTitle>
          <DialogDescription className="hidden">
            a form to register your work shifts
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(sumbitHandler)}
          className="flex flex-col gap-10"
        >
          <Input
            htmlType="text"
            register={register("company")}
            name="company"
            error={errors.company}
          />
          <Input
            htmlType="time"
            register={register("start_of_shift")}
            name="start of shift"
            error={errors.start_of_shift}
          />
          <Input
            htmlType="time"
            register={register("end_of_shift")}
            name="end of shift"
            error={errors.end_of_shift}
          />
          <Button type="submit">Add Shift</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
