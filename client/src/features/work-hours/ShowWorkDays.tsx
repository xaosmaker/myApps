// TODO: filter data with location
// TODO: add search with date
// TODO: add react query and fetch data from api

import { DATA } from "../../data/testData";
import Table from "../../ui/Table";

export default function ShowWorkDays() {
  const data = DATA;
  return (
    <Table
      tableHeight="h-96"
      tableCols="  grid-cols-[auto_1fr_1fr] gap-2 md:grid-cols-6 md:gap-6  "
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
        {data.map((workday, index) => (
          <Table.Row key={index}>
            <span>{workday.day}</span>
            <span>{workday.date}</span>
            <span>{workday.location}</span>
            <span>{workday.startOfWork}</span>
            <span>{workday.endOfWork}</span>
            <span>{workday.comment}</span>
          </Table.Row>
        ))}

        {data.map((workday, index) => (
          <Table.Row key={index + index}>
            <span>{workday.day}</span>
            <span>{workday.date}</span>
            <span>{workday.location}</span>
            <span>{workday.startOfWork}</span>
            <span>{workday.endOfWork}</span>
            <span>{workday.comment}</span>
          </Table.Row>
        ))}
        {data.map((workday, index) => (
          <Table.Row key={index}>
            <span>{workday.day}</span>
            <span>{workday.date}</span>
            <span>{workday.location}</span>
            <span>{workday.startOfWork}</span>
            <span>{workday.endOfWork}</span>
            <span>{workday.comment}</span>
          </Table.Row>
        ))}
        {data.map((workday, index) => (
          <Table.Row key={index}>
            <span>{workday.day}</span>
            <span>{workday.date}</span>
            <span>{workday.location}</span>
            <span>{workday.startOfWork}</span>
            <span>{workday.endOfWork}</span>
            <span>{workday.comment}</span>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
