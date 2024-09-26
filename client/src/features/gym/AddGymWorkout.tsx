import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { GymMachineTypes, GymWorkoutTypes } from "./gymTypes";
import SelectSearch from "../../components/selectSearch/SelectSearch";
import Modal from "../../components/modal/Modal";
import { FaPlus } from "react-icons/fa6";
import AddGymMachine from "./AddGymMachine";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addGymWorkout, gymMachineGetList } from "../../services/gym";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

export default function AddGymWorkout() {
  const navigate = useNavigate();
  const { data: machineData = [], isLoading } = useQuery<GymMachineTypes[]>({
    queryKey: ["machineData"],
    queryFn: gymMachineGetList,
  });
  const { mutate } = useMutation({
    mutationFn: (data: GymWorkoutTypes) => addGymWorkout(data),
    onSuccess: () => navigate("/gym"),
  });
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<GymWorkoutTypes>();
  function submitForm(data: GymWorkoutTypes) {
    console.log("data", data);
    mutate(data);
  }

  if (isLoading) {
    return <div className="animate-bounce"> Loading ....</div>;
  }
  const is_timed_machine = watch("gym_machine")?.is_tracked_by_time;

  return (
    <div>
      <h2 className="mb-4">AddGymWorkout</h2>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <SelectSearch
            control={control}
            name="gym_machine"
            options={machineData?.map((data: GymMachineTypes) => ({
              value: data,
              label: data.machine_name,
            }))}
          />
          <Modal>
            <Modal.Open opens="gym">
              <div className="group/message relative cursor-pointer p-2 text-xl  text-green-500">
                <FaPlus />
                <span className="text-nowrap invisible absolute right-1/2 top-9 z-10 translate-x-1/2 rounded-md border-2 border-slate-950 bg-slate-800 px-4 py-2 text-slate-50 transition-all duration-500 group-hover/message:visible">
                  Add Gym Machine
                </span>
              </div>
            </Modal.Open>
            <Modal.Window name="gym">
              <AddGymMachine />
            </Modal.Window>
          </Modal>
        </div>
        <div className=" mt-4">
          {is_timed_machine === true && (
            <>
              <Input
                htmlType="number"
                name="gym_dificulty"
                error={errors.gym_dificulty?.message}
                register={register("gym_dificulty")}
              />
              <Input
                htmlType="number"
                name="gym_workout_time"
                error={errors.gym_workout_time?.message}
                register={register("gym_workout_time")}
              />
            </>
          )}

          {!is_timed_machine && is_timed_machine !== undefined && (
            <>
              <Input
                htmlType="number"
                name="gym_sets"
                error={errors.gym_sets?.message}
                register={register("gym_sets")}
              />
              <Input
                htmlType="number"
                name="gym_reps"
                error={errors.gym_reps?.message}
                register={register("gym_reps")}
              />
              <Input
                htmlType="number"
                name="gym_weight"
                error={errors.gym_weight?.message}
                register={register("gym_weight")}
              />
            </>
          )}
        </div>
        <Button type="submit">Add Workout</Button>
      </form>
    </div>
  );
}
