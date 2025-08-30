import type { ColumnDef } from "@tanstack/react-table";
import type { NutritionType } from "../types/NutritionTypes";
export const nutritionsTableCols: ColumnDef<NutritionType>[] = [
  {
    accessorKey: "eat_time",
    header: "Machine",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "food_name",
    header: "Food name",
  },
  {
    accessorKey: "total_calories",
    header: "Total Cal",
  },
];
