import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { NutritionDayType } from "../types/NutritionTypes";
import { nutritionsTableCols } from "./NutritionsTableCols";
import { DataTable } from "@/components/dataTable/DataTable";

export default function NutritionsCard({ data }: { data: NutritionDayType }) {
  console.log(data);

  return (
    <Card className={`min-h-48 w-full bg-slate-800 p-2`}>
      <CardHeader className="pt-2">
        <CardTitle className="text-center">
          {data.created_at.slice(0, 10)}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full rounded-md bg-slate-700">
        <DataTable
          showSearch={false}
          showChangeCollumns={false}
          columns={nutritionsTableCols}
          data={data.nutrition_day}
        />
      </CardContent>
    </Card>
  );
}
