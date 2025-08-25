import { useForm } from "react-hook-form";
import { useGetGymMachine } from "../hooks/useGetGymMachineList";
import type { GymWorkoutPostType } from "../types/GymTypes";
import Modal from "../../../components/modal/Modal";
import Input from "../../../components/Input";
import AddGymMachine from "../components/AddGymMachine";
import { usePostGymWorkout } from "../hooks/usePostGymWorkout";
import Button from "../../../ui/Button";
import SelectSearch from "@/components/selectSearch/SelectSearch";
import { Plus } from "lucide-react";

//TODO: need refactor and rething indo step card

export default function AddGymWorkout() {
  const { gymMachineList, isGymMachineLoading } = useGetGymMachine();
  const { gymWorkoutMutate } = usePostGymWorkout();

  const gymMachinedata = gymMachineList.map((item) => {
    return { value: item.pkid.toString(), label: item.machine_name };
  });
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<GymWorkoutPostType>();
  function submitForm(data: GymWorkoutPostType) {
    gymWorkoutMutate(data);
  }

  if (isGymMachineLoading) {
    return <div className="animate-bounce"> Loading ....</div>;
  }
  const machine_id = Number(watch("gym_machine_id"));
  const is_timed_machine = gymMachineList.find(
    (item) => item.pkid === machine_id,
  )?.is_tracked_by_time;
  console.log(machine_id, is_timed_machine);

  return (
    <div>
      <h2 className="mb-4">AddGymWorkout</h2>
      <Modal>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <SelectSearch<GymWorkoutPostType>
              name="gym_machine_id"
              control={control}
              data={gymMachinedata}
            />
            <Modal.Open opens="gym">
              <div className="group/message relative cursor-pointer p-2 text-xl text-green-500">
                <Plus />
                <span className="invisible absolute top-9 right-1/2 z-10 translate-x-1/2 rounded-md border-2 border-slate-950 bg-slate-800 px-4 py-2 text-nowrap text-slate-50 transition-all duration-500 group-hover/message:visible">
                  Add Gym Machine
                </span>
              </div>
            </Modal.Open>
          </div>
          <div className="mt-4">
            {is_timed_machine === true && (
              <>
                <Input
                  htmlType="number"
                  name="gym_dificulty"
                  error={errors.gym_dificulty}
                  register={register("gym_dificulty")}
                />
                <Input
                  htmlType="number"
                  name="gym_workout_time"
                  error={errors.gym_workout_time}
                  register={register("gym_workout_time")}
                />
              </>
            )}

            {!is_timed_machine && is_timed_machine !== undefined && (
              <>
                <Input
                  htmlType="number"
                  name="gym_sets"
                  error={errors.gym_sets}
                  register={register("gym_sets")}
                />
                <Input
                  htmlType="number"
                  name="gym_reps"
                  error={errors.gym_reps}
                  register={register("gym_reps")}
                />
                <Input
                  htmlType="number"
                  name="gym_weight"
                  error={errors.gym_weight}
                  register={register("gym_weight")}
                />
              </>
            )}
          </div>
          <Button type="submit">Add Workout</Button>
        </form>
        <Modal.Window name="gym">
          <AddGymMachine />
        </Modal.Window>
      </Modal>
    </div>
  );
}
