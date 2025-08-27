import type { ColumnDef } from "@tanstack/react-table";
import type { WorkShiftType } from "../types/WorkHoursTypes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Plus } from "lucide-react";
import SetWorkShifts from "./SetWorkShifts";

export const workShiftsTableCols: ColumnDef<WorkShiftType>[] = [
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "start_of_shift",
    header: "Start of Shift",
  },
  { accessorKey: "end_of_shift", header: "End of Shift" },
  {
    id: "action",
    header: () => (
      <Popover>
        <PopoverTrigger className="flex uppercase hover:cursor-pointer">
          <Plus /> Shift
        </PopoverTrigger>
        <PopoverContent
          sideOffset={5}
          side="bottom"
          align="center"
          className="bg-card rounded-lg border-2 p-6"
        >
          <SetWorkShifts />
        </PopoverContent>
      </Popover>
    ),
  },
];
