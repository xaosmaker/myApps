import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { useGetGymMachine } from "../hooks/useGetGymMachineList";
import type { GymMachineType, GymWorkoutPostType } from "../types/GymTypes";
import SelectSearch from "../../../components/selectSearch/SelectSearch";
import Modal from "../../../components/modal/Modal";
import Input from "../../../components/Input";
import AddGymMachine from "../components/AddGymMachine";
import { usePostGymWorkout } from "../hooks/usePostGymWorkout";
import Button from "../../../ui/Button";

export default function AddGymWorkout() {
  const { gymMachineList, isGymMachineLoading } = useGetGymMachine();
  const { gymWorkoutMutate } = usePostGymWorkout();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<GymWorkoutPostType>();
  function submitForm(data: GymWorkoutPostType) {
    const id = data.gym_machine.pkid;
    data["gym_machine_id"] = id;
    gymWorkoutMutate(data);
  }

  if (isGymMachineLoading) {
    return <div className="animate-bounce"> Loading ....</div>;
  }
  const is_timed_machine = watch("gym_machine")?.is_tracked_by_time;

  return (
    <div>
      <h2 className="mb-4">AddGymWorkout</h2>
      <Modal>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <SelectSearch
              control={control}
              name="gym_machine"
              options={gymMachineList?.map((data: GymMachineType) => ({
                value: data,
                label: data.machine_name,
              }))}
            />
            <Modal.Open opens="gym">
              <div className="group/message relative cursor-pointer p-2 text-xl text-green-500">
                <FaPlus />
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
