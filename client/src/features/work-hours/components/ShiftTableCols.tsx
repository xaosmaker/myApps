import type { ColumnDef } from "@tanstack/react-table";
import type { WorkShiftType } from "../types/WorkHoursTypes";
import { EllipsisVertical } from "lucide-react";
import SetWorkShifts from "./SetWorkShifts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Delete from "@/components/Delete";
import { deleteWorkShift } from "../services/workHoursServices";

export const workShiftsTableCols: ColumnDef<WorkShiftType>[] = [
  {
    id: "action",
    header: () => SetWorkShifts(),
    cell: ({ row: { original } }) => (
      <Popover>
        <PopoverTrigger className="hover:cursor-pointer">
          <EllipsisVertical />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-4">
          <Delete
            titleMessage="a Work Shift"
            queryName="WorkShifts"
            mutFunc={() => deleteWorkShift(original.pkid.toString())}
            toURL="/work-hours/work-shifts"
            mainMessage={`Deleting the ${original.company} ( ${original.start_of_shift} ${original.end_of_shift}) work Day`}
          />
        </PopoverContent>
      </Popover>
    ),
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "start_of_shift",
    header: "Start of Shift",
  },
  { accessorKey: "end_of_shift", header: "End of Shift" },
];
