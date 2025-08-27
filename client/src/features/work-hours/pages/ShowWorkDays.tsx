// TODO: filter data with location
// TODO: add search with date
// TODO: need to customize more this is the initial table

import { useGetWorkDayData } from "../hooks/useGetWorkDayData";
import { DataTable } from "@/components/dataTable/DataTable";
import { workDayTableCols } from "../components/WorkDayTableCols";

export default function ShowWorkDays() {
  const { workDayData } = useGetWorkDayData();
  return (
    <div className="w-full overflow-auto">
      <div className="mx-auto mt-10 w-fit">
        <DataTable columns={workDayTableCols} data={workDayData} />
      </div>
    </div>
  );
}
