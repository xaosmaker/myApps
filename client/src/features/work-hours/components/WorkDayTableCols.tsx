import type { ColumnDef } from "@tanstack/react-table";
import type { WorkDayType } from "../types/WorkHoursTypes";
import { dateToGRformat } from "@/utils/helperFunctions";
import AddWorkHours from "./AddWorkHours";
import { EllipsisVertical, Pencil } from "lucide-react";
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
        <PopoverTrigger>
          <EllipsisVertical />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-4">
          <Delete
            titleMessage="a Work Day"
            mutFunc={() => deleteWorkDay(original.pkid.toString())}
            toURL="/work-hours"
            mainMessage={`Deleting the ${original.date_start} ${original.date_end || ""} work Day`}
          />
          <Pencil />
        </PopoverContent>
      </Popover>
    ),
  },
  {
    accessorKey: "type_of_work_day",
    header: "Day",
  },
  {
    accessorKey: "date_end",
    header: "date",
    cell: ({ row }) => {
      const date_start: string = row.original.date_start;
      const date_end: string = row.getValue("date_end");

      const date = date_end
        ? `${dateToGRformat(date_start)}-${dateToGRformat(date_end)}`
        : `${dateToGRformat(date_start)}`;

      return <div>{date}</div>;
    },
  },
  { accessorKey: "start_of_work", header: "start" },
  { accessorKey: "end_of_work", header: "End" },
  { accessorKey: "location", header: "Location" },
  { accessorKey: "comment", header: "Comment" },
];
