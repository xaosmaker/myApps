import { useGetUserWeightData } from "../hooks/useGetUserWeightData";
import { DataTable } from "@/components/dataTable/DataTable";
import { userWeightTableCols } from "../components/userWeightTableCols";

export default function UserWeightData() {
  const { userWeightData } = useGetUserWeightData();
  return (
    <div className="w-full overflow-auto">
      <h2 className="my-6 text-center text-3xl font-semibold">
        User Weight Data
      </h2>
      <div className="mx-auto mt-10 w-fit">
        <DataTable
          data={userWeightData}
          showChangeCollumns={false}
          columns={userWeightTableCols}
        />
      </div>
    </div>
  );
}
