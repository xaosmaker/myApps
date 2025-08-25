// TODO: filter data with location
// TODO: add search with date
// TODO: need to customize more this is the initial table

import { useGetWorkDayData } from "../hooks/useGetWorkDayData";
import { DataTable } from "@/components/dataTable/DataTable";
import { workDayTableCols } from "../components/WorkDayTableCols";

export default function ShowWorkDays() {
  const { workDayData } = useGetWorkDayData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={workDayTableCols} data={workDayData} />
    </div>
  );
}
