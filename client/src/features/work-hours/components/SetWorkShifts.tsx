import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import Button from "../../../ui/Button";
import type { WorkShiftFormType } from "../types/WorkHoursTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkShift } from "../services/workHoursServices";
import { useContext } from "react";
import { ModalContext } from "../../../components/modal/Modal";

export default function SetWorkShifts() {
  const querClient = useQueryClient();
  const { close } = useContext(ModalContext);
  const { mutate } = useMutation({
    mutationFn: createWorkShift,
    onSuccess: () => {
      querClient.invalidateQueries({
        queryKey: ["WorkShifts"],
      });
      close();
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
      className="mt-10 flex flex-col gap-6"
    >
      <span className="text-center text-2xl uppercase">Add Shift</span>
      <Input
        htmlType="text"
        register={register("company")}
        name="company"
        error={errors.company?.message}
      />
      <Input
        htmlType="time"
        register={register("start_of_shift")}
        name="start of shift"
        error={errors.start_of_shift?.message}
      />
      <Input
        htmlType="time"
        register={register("end_of_shift")}
        name="end of shift"
        error={errors.end_of_shift?.message}
      />
      <Button type="submit">Add Shift</Button>
    </form>
  );
}
