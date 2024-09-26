import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../ui/Button";
import { GymMachineTypes } from "../../types/gym/gymMachineTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGymMachinePost } from "../../services/gym";
import { useContext } from "react";
import { ModalContext } from "../../components/modal/Modal";

export default function AddGymMachine() {
  const queryclient = useQueryClient();
  const { close } = useContext(ModalContext);
  const { mutate } = useMutation({
    mutationFn: (data: GymMachineTypes) => createGymMachinePost(data),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["machineData"] });
      close();
    },
  });

  function submitFunction(machineData: GymMachineTypes) {
    mutate(machineData);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GymMachineTypes>();
  return (
    <form
      onSubmit={handleSubmit(submitFunction)}
      className="flex flex-col items-center justify-center gap-4"
    >
      <h2 className="">Add Gym Machine</h2>
      <Input
        htmlType="text"
        name="machine_name"
        register={register("machine_name")}
        displayName="Machine Name"
        error={errors?.machine_name?.message}
      />
      <div className="flex items-center justify-between gap-4 self-start">
        <label className="uppercase">Track by Time</label>
        <input {...register("is_tracked_by_time")} type="checkbox" />
      </div>

      <div className="self-start">
        <Button type="submit">Add Machine</Button>
      </div>
    </form>
  );
}
