import type { ColumnDef } from "@tanstack/react-table";
import type { UserWeightStatusType } from "../types/NutritionTypes";
import SetWeight from "./SetWeight";
export const userWeightTableCols: ColumnDef<UserWeightStatusType>[] = [
  { id: "action", header: () => SetWeight() },
  {
    accessorKey: "created_at",
    header: "date",
    cell: ({ row: { original } }) => {
      if (original.created_at) {
        return original.created_at.toString().slice(0, 10);
      }
    },
  },
  {
    accessorKey: "current_weight",
    header: "Weight",
  },
  {
    accessorKey: "daily_target_calories",
    header: "Target Callories",
  },
];
