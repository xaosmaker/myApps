import type { ColumnDef } from "@tanstack/react-table";
import type { WorkShiftType } from "../types/WorkHoursTypes";
import { Plus } from "lucide-react";
import SetWorkShifts from "./SetWorkShifts";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export const workShiftsTableCols: ColumnDef<WorkShiftType>[] = [
  {
    id: "action",
    header: () => (
      <Dialog>
        <DialogTrigger>
          <Tooltip>
            <TooltipTrigger
              className="text-green-500 uppercase hover:cursor-pointer"
              asChild
            >
              <Plus />
            </TooltipTrigger>
            <TooltipContent className="uppercase">Add Shift</TooltipContent>
          </Tooltip>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="mb-5">
            <DialogTitle>ADD SHIFT</DialogTitle>
            <DialogDescription className="hidden">
              a form to register your work shifts
            </DialogDescription>
          </DialogHeader>
          <SetWorkShifts />
        </DialogContent>
      </Dialog>
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
