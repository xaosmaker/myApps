import type { ColumnDef } from "@tanstack/react-table";
import type { GymWorkoutType } from "../types/GymTypes";
export const workoutTableCols: ColumnDef<GymWorkoutType>[] = [
  {
    accessorKey: "gym_machine.machine_name",
    header: "Machine",
  },
  {
    accessorKey: "gym_sets",
    header: "sets/time",
    cell: ({ row: { original } }) => {
      if (original.gym_sets) {
        return `${original.gym_sets} sets`;
      } else {
        return `${original.gym_workout_time} mins`;
      }
    },
  },
  {
    accessorKey: "gym_reps",
    header: "reps/diff",
    cell: ({ row: { original } }) => {
      if (original.gym_reps) {
        return `${original.gym_reps} reps`;
      } else {
        return `${original.gym_dificulty} diff`;
      }
    },
  },
  {
    accessorKey: "gym_weight",
    header: "weight",
    cell: ({ row }) => {
      const val = row.getValue("gym_weight");
      if (val) {
        return `${val || ""} kg`;
      }
    },
  },
];
