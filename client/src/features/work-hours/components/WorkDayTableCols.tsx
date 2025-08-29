import type { ColumnDef } from "@tanstack/react-table";
import type { WorkDayType } from "../types/WorkHoursTypes";
import AddWorkHours from "./AddWorkHours";
import { EllipsisVertical } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import Delete from "@/components/Delete";
import { deleteWorkDay } from "../services/workHoursServices";

export const workDayTableCols: ColumnDef<WorkDayType>[] = [
  {
    id: "action",
    header: () => AddWorkHours(),
    cell: ({ row: { original } }) => (
      <Popover>
        <PopoverTrigger className="hover:cursor-pointer">
          <EllipsisVertical />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-4">
          <Delete
            titleMessage="a Work Day"
            mutFunc={() => deleteWorkDay(original.pkid.toString())}
            toURL="/work-hours"
            mainMessage={`Deleting the ${original.date} work Day`}
          />
        </PopoverContent>
      </Popover>
    ),
  },
  {
    accessorKey: "type_of_work_day",
    header: "Day",
  },
  {
    accessorKey: "date",
    header: "date",
  },
  {
    accessorKey: "start_of_work",
    header: "start",
    cell: ({ row }) => {
      return <div>{row.original.start_of_work?.slice(0, 5)}</div>;
    },
  },
  {
    accessorKey: "end_of_work",
    header: "End",
    cell: ({ row }) => {
      return <div>{row.original.end_of_work?.slice(0, 5)}</div>;
    },
  },
  { accessorKey: "location", header: "Location" },
  { accessorKey: "comment", header: "Comment" },
];
