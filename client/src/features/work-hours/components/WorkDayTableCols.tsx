import type { ColumnDef } from "@tanstack/react-table";
import type { WorkDayType } from "../types/WorkHoursTypes";
import { dateToGRformat } from "@/utils/helperFunctions";

export const workDayTableCols: ColumnDef<WorkDayType>[] = [
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
  { id: "action", header: "Action" },
];
