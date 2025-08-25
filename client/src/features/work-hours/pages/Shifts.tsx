import Table from "../../../ui/Table";
import SetWorkShifts from "../components/SetWorkShifts";
import { dateToGRformat } from "../../../utils/helperFunctions";
import { useGetWorkShifts } from "../hooks/useGetworkShifts";
import { Plus } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export default function Shifts() {
  const { workShiftsData, isWorkShiftsDataLoading } = useGetWorkShifts();

  if (isWorkShiftsDataLoading) {
    return <div className="animate-bounce"> Loading ....</div>;
  }
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-4 md:w-1/2">
        <Table
          tableHeight="h-56"
          tableCols="grid-cols-[1fr_auto_1fr_1fr_1fr] gap-3 md:grid-cols-5 md:gap-8"
        >
          <Table.Header>
            <span>Created at</span>
            <span className="">Company</span>
            <span>Start of Shift</span>
            <span>End of Shift</span>

            <span>
              <Popover>
                <PopoverTrigger className="uppercase">
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
            </span>
          </Table.Header>
          <Table.Body>
            {workShiftsData.map((data) => (
              <Table.Row key={data.pkid}>
                <span>{dateToGRformat(data.created_at)}</span>
                <span>{data.company}</span>
                <span>{data.start_of_shift}</span>
                <span>{data.end_of_shift}</span>
                <span>test</span>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
