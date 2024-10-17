import usePagePaginationParams from "../../../hooks/usePagePaginationParams";
import CardLayout from "../../../components/card/CardLayout";
import Card from "../../../components/card/Card";
import Pagination from "../../../components/Pagination";
import { dateToGRformat } from "../../../utils/helperFunctions";
import { useGetNutritionsDaysListData } from "../hooks/useGetNutritionsDaysListData";
import { useGetUserWeightData } from "../hooks/useGetUserWeightData";

export default function NutritionList() {
  const pageParams = usePagePaginationParams();
  const { userWeightData, isUserWeightDataLoading } = useGetUserWeightData();
  const { nutritionDaysListData, isNutritionDaysLoading } =
    useGetNutritionsDaysListData(pageParams);

  if (isNutritionDaysLoading || isUserWeightDataLoading) {
    return <div className="animate-bounce"> Loading ....</div>;
  }
  return (
    <CardLayout>
      <CardLayout.Header>
        <CardLayout.Title>
          <div className="flex flex-col">
            Nutritions
            <div className="flex items-center justify-center gap-4 text-lg font-normal capitalize">
              <span>
                Current Weight:{" "}
                {userWeightData?.length > 0
                  ? userWeightData[0].current_weight
                  : 0}
              </span>
              <span>
                Daily Calories:
                {userWeightData?.length > 0
                  ? userWeightData[0].daily_target_calories
                  : 0}
              </span>
            </div>
          </div>
        </CardLayout.Title>
      </CardLayout.Header>
      <CardLayout.Body className="h-3/5 md:h-4/6 md:grid-cols-3">
        {nutritionDaysListData?.results?.map((item) => (
          <Card key={item.created_at} link="#">
            <Card.Title className="text-center">
              <div className="flex flex-col">
                <span>{dateToGRformat(item.created_at)}</span>
                <span>
                  Remaining Calories:{" "}
                  {userWeightData?.length > 0
                    ? userWeightData[0].daily_target_calories -
                      item.total_foods_calories
                    : 0}
                </span>
              </div>
            </Card.Title>
            <Card.Body>
              {item.nutrition_day.map((day, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[auto_auto_1fr_0.2fr] items-center gap-4 justify-self-start"
                >
                  <p>{day.eat_time.split(":").slice(0, -1).join(":")}</p>
                  <p>{day.quantity}</p>
                  <p>{day.food_name}</p>
                  <p className="justify-self-start">{day.total_calories}</p>
                </div>
              ))}
            </Card.Body>
          </Card>
        ))}
      </CardLayout.Body>

      <Pagination
        currentPage={nutritionDaysListData?.current_page || 1}
        totalPages={nutritionDaysListData?.total_pages || 1}
      />
    </CardLayout>
  );
}
