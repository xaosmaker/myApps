import { useQuery } from "@tanstack/react-query";
import Card from "../../components/card/Card";
import CardLayout from "../../components/card/CardLayout";
import usePagePaginationParams from "../../utils/UsePagePaginationParams";
import Pagination from "../../components/Pagination";
import { dateToGRformat } from "../../utils/helperFunctions";
import { gymDayGetList } from "../../services/gym";
import { apiPaginationTypes } from "../../types/generalTypes";
import { GymDayTypes } from "./gymTypes";

export default function GymCard() {
  const pageParams = usePagePaginationParams();
  const { data: gymData, isLoading: isGymDataLoading } = useQuery<
    apiPaginationTypes<GymDayTypes>
  >({
    queryKey: ["gym-day"],
    queryFn: () => gymDayGetList(pageParams),
  });

  if (isGymDataLoading) {
    return <div className="animate-bounce"> Loading ....</div>;
  }
  return (
    <CardLayout>
      <CardLayout.Header>
        <CardLayout.Title>Gym</CardLayout.Title>
      </CardLayout.Header>
      <CardLayout.Body className="h-3/5 md:h-4/6 md:grid-cols-3">
        {gymData?.results?.map((item) => (
          <Card key={item.created_at} link="#">
            <Card.Title className="text-center">
              {dateToGRformat(item.created_at)}
            </Card.Title>
            <Card.Body>
              {item.gym_day.map((gym_day, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1.5fr_1fr_auto_1fr] items-center gap-4 justify-self-start"
                >
                  {gym_day.gym_machine.is_tracked_by_time ? (
                    <>
                      <p className="text-sm font-semibold uppercase">
                        {gym_day.gym_machine.machine_name}
                      </p>
                      <p>dificulty: {gym_day.gym_dificulty} </p>
                      <p>mins: {gym_day.gym_workout_time} </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-semibold uppercase">
                        {gym_day.gym_machine.machine_name}
                      </p>
                      <p>sets: {gym_day.gym_sets}</p>
                      <p>reps: {gym_day.gym_reps}</p>
                      <p>weight: {gym_day.gym_weight}</p>
                    </>
                  )}
                </div>
              ))}
            </Card.Body>
          </Card>
        ))}
      </CardLayout.Body>

      <Pagination
        currentPage={gymData?.current_page || 1}
        totalPages={gymData?.total_pages || 1}
      />
    </CardLayout>
  );
}
