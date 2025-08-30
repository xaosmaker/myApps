import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { GymDayType } from "../types/GymTypes";
import { DataTable } from "@/components/dataTable/DataTable";
import { workoutTableCols } from "./workoutTablecols";

export default function WorkoutCard({ data }: { data: GymDayType }) {
  const { gym_day, created_at } = data;
  console.log(gym_day);

  return (
    <Card className={`min-h-48 w-full bg-slate-800 p-2`}>
      <CardHeader className="pt-2">
        <CardTitle className="text-center">{created_at.slice(0, 10)}</CardTitle>
        <CardDescription className="flex items-center justify-between pt-2">
          Workouts
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full rounded-md bg-slate-700">
        <DataTable
          showSearch={false}
          showChangeCollumns={false}
          columns={workoutTableCols}
          data={gym_day}
        />
        {/* {todo_tasks.slice(0, 10).map((item) => ( */}
        {/*   <TodoCardItem key={item.pkid} todo={item} /> */}
        {/* ))} */}
      </CardContent>
    </Card>
  );
}
