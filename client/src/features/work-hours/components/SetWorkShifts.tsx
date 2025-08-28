import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import { Button } from "@/components/ui/button";
import type { WorkShiftFormType } from "../types/WorkHoursTypes";
import { useMutation } from "@tanstack/react-query";
import { createWorkShift } from "../services/workHoursServices";
import { queryClient } from "../../../queryClient";

export default function SetWorkShifts() {
  const { mutate } = useMutation({
    mutationFn: createWorkShift,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["WorkShifts"],
      });
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
  );
}
