import { useForm } from "react-hook-form";
import { useGetGymMachine } from "../hooks/useGetGymMachineList";
import type { GymWorkoutPostType } from "../types/GymTypes";
import Input from "../../../components/Input";
import AddGymMachine from "../components/AddGymMachine";
import { usePostGymWorkout } from "../hooks/usePostGymWorkout";
import { Button } from "@/components/ui/button";
import SelectSearch from "@/components/selectSearch/SelectSearch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  return (
    <div className="mx-auto mt-10 w-fit">
      <Card>
        <CardHeader>
          <CardTitle>Add Workout</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(submitForm)}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-[1fr_auto] gap-2">
              <SelectSearch<GymWorkoutPostType>
                name="gym_machine_id"
                label="select gym machine"
                control={control}
                data={gymMachinedata}
              />
              <AddGymMachine />
            </div>
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
            <Button type="submit">Add Workout</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
