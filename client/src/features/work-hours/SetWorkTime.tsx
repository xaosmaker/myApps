import { useState } from "react";
import SetWorkingHoursForm from "./SetWorkingHoursForm";
import Button from "../../ui/Button";
import AddHolidaysOffDays from "./AddHolidaysOffDays";
import Table from "../../ui/Table";
import { DATA } from "../../data/testData";

// TODO: form and handle submit
// TODO: onclick on list item pop up menu to delete shifts

export default function SetWorkTime() {
  const [addShift, setAddShift] = useState<string>("");
  function handleSetWorkTimeClick() {
    if (addShift === "setWorkTime") {
      setAddShift("");
    } else {
      setAddShift("setWorkTime");
    }
  }

  function handleHolidaysOffClick() {
    if (addShift === "holidaysOff") {
      setAddShift("");
    } else {
      setAddShift("holidaysOff");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Table
        tableHeight="h-56"
        tableCols="  grid-cols-[auto_1fr_1fr] gap-2 md:grid-cols-3 md:gap-6  "
      >
        <Table.Header>
          <span className="">Company</span>
          <span>Start of Shift</span>
          <span>End of Shift</span>
        </Table.Header>
        <Table.Body>
          {DATA.map((data) => (
            <Table.Row>
              <span>{data.company}</span>
              <span>{data.startOfShift}</span>
              <span>{data.endOfShift}</span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="mt-10 flex justify-between">
        <Button type="button" onClick={handleSetWorkTimeClick}>
          add Shift
        </Button>
        <Button type="button" onClick={handleHolidaysOffClick}>
          Add Holiday Days
        </Button>
      </div>

      {addShift === "setWorkTime" && <SetWorkingHoursForm />}
      {addShift === "holidaysOff" && <AddHolidaysOffDays />}
    </div>
  );
}
