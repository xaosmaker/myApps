// TODO: filter data with location
// TODO: add search with date
// TODO: add react query and fetch data from api

import Table from "../../../ui/Table";
import { dateToGRformat } from "../../../utils/helperFunctions";
import { useGetWorkDayData } from "../hooks/useGetWorkDayData";

export default function ShowWorkDays() {
  const { workDayData, isWorkDayDataLoading } = useGetWorkDayData();
  if (isWorkDayDataLoading) {
    return <div className="animate-bounce"> Loading ....</div>;
  }
  return (
    <Table
      tableHeight="h-96"
      tableCols="grid-cols-[auto_1fr_1fr] gap-2 md:grid-cols-6 md:gap-6"
    >
      <Table.Header>
        <span className="">day</span>
        <span>date</span>
        <span>location</span>
        <span>start</span>
        <span>end</span>
        <span>comment</span>
      </Table.Header>

      <Table.Body>
        {workDayData.map((workday) => (
          <Table.Row key={workday.pkid}>
            <span>{workday.type_of_work_day}</span>
            <span>
              {workday.date_end
                ? `${dateToGRformat(workday.date_start)}-${dateToGRformat(
                    workday.date_end
                  )}`
                : `${dateToGRformat(workday.date_start)}`}
            </span>
            <span>{workday.location}</span>
            <span>{workday.start_of_work?.slice(0, -3)}</span>
            <span>{workday.end_of_work?.slice(0, -3)}</span>
            <span>{workday.comment}</span>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
