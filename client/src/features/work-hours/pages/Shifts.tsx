import { useGetWorkShifts } from "../hooks/useGetworkShifts";
import { DataTable } from "@/components/dataTable/DataTable";
import { workShiftsTableCols } from "../components/ShiftTableCols";

export default function Shifts() {
  const { workShiftsData, isWorkShiftsDataLoading } = useGetWorkShifts();

  if (isWorkShiftsDataLoading) {
    return <div className="animate-bounce"> Loading ....</div>;
  }
  return (
    <div className="w-full overflow-auto">
      <div className="mx-auto mt-10 w-fit">
        <DataTable columns={workShiftsTableCols} data={workShiftsData} />
      </div>
    </div>
  );
}
