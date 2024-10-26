// TODO: form and handle submit
// TODO: onclick on list item pop up menu to delete shifts

import Modal from "../../../components/modal/Modal";
import Button from "../../../ui/Button";
import Table from "../../../ui/Table";
import SetWorkShifts from "../components/SetWorkShifts";
import { dateToGRformat } from "../../../utils/helperFunctions";
import { useGetWorkShifts } from "../hooks/useGetworkShifts";

export default function WorkShifts() {
  const { workShiftsData, isWorkShiftsDataLoading } = useGetWorkShifts();

  if (isWorkShiftsDataLoading) {
    return <div className="animate-bounce"> Loading ....</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      <Table
        tableHeight="h-56"
        tableCols="grid-cols-[1fr_auto_1fr_1fr] gap-2 md:grid-cols-4 md:gap-6"
      >
        <Table.Header>
          <span>Created at</span>
          <span className="">Company</span>
          <span>Start of Shift</span>
          <span>End of Shift</span>
        </Table.Header>
        <Table.Body>
          {workShiftsData.map((data) => (
            <Table.Row key={data.pkid}>
              <span>{dateToGRformat(data.created_at)}</span>
              <span>{data.company}</span>
              <span>{data.start_of_shift}</span>
              <span>{data.end_of_shift}</span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal>
        <Modal.Open opens="setWorkHours">
          <div className="mt-10 flex justify-between">
            <Button type="button"> add Shift</Button>
          </div>
        </Modal.Open>
        <Modal.Window name="setWorkHours">
          <SetWorkShifts />
        </Modal.Window>
      </Modal>
    </div>
  );
}
