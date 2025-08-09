import Modal from "../../../components/modal/Modal";
import Table from "../../../ui/Table";
import { dateToGRformat } from "../../../utils/helperFunctions";
import { useGetUserWeightData } from "../hooks/useGetUserWeightData";
import SetWeight from "../components/SetWeight";
import { Plus } from "lucide-react";

export default function UserWeightData() {
  const { userWeightData } = useGetUserWeightData();
  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-semibold">
        User Weight Data
      </h2>
      <Modal>
        <Modal.Open opens="userWeightData">
          <div className="group/message relative cursor-pointer p-2 text-xl  text-green-500">
            <Plus />
            <span className="text-nowrap invisible absolute right-1/2 top-9 translate-x-1/2 rounded-md border-2 border-slate-950 bg-slate-800 px-4 py-2 text-slate-50 transition-all duration-500 group-hover/message:visible">
              Add user Data
            </span>
          </div>
        </Modal.Open>
        <Modal.Window name="userWeightData">
          <SetWeight />
        </Modal.Window>
      </Modal>
      <Table tableHeight="h-96" tableCols=" grid-cols-3 gap-6  ">
        <Table.Header>
          <span>date</span>
          <span>weight</span>
          <span>calories</span>
        </Table.Header>
        <Table.Body>
          {userWeightData.map((userdata) => {
            return (
              <Table.Row key={userdata.pkid}>
                <span>{dateToGRformat(userdata.created_at?.toString())}</span>
                <span>{userdata.current_weight}</span>
                <span>{userdata.daily_target_calories}</span>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
