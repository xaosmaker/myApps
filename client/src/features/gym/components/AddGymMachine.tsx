import { useForm } from "react-hook-form";
import { GymMachineType } from "../types/GymTypes";
import { usePostGymMachine } from "../hooks/usePostGymMachine";
import Input from "../../../components/Input";
import Button from "../../../ui/Button";

export default function AddGymMachine() {
  function submitFunction(machineData: GymMachineType) {
    postGymMachineMutate(machineData);
  }
  const { postGymMachineMutate, isPostGymMachineError, postGymMachineError } =
    usePostGymMachine();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GymMachineType>();
  const error = (
    <div className="whitespace-pre-wrap rounded-md bg-red-600 px-2 font-semibold capitalize">
      {postGymMachineError?.message}
    </div>
  );

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
      {isPostGymMachineError && error}

      <div className="self-start">
        <Button type="submit">Add Machine</Button>
      </div>
    </form>
  );
}
