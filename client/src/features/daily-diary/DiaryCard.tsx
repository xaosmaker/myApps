import { useQuery } from "@tanstack/react-query";
import usePagePaginationParams from "../../utils/UsePagePaginationParams";
import Pagination from "../../components/Pagination";
import {
  DiaryChoicesData,
  DiaryDateData,
  DiaryList,
} from "../../types/dataTypes";
import { apiDiaryList } from "../../services/diaryApi";
import Select from "../../components/Select";
import { useLoaderData } from "react-router-dom";
import React, { useState } from "react";
import CardLayout from "../../components/card/CardLayout";
import Card from "../../components/card/Card";
import { dateToGRformat } from "../../utils/helperFunctions";

export default function DiaryCard() {
  const [filterWord, setFilter] = useState<string>("all");
  const choices = useLoaderData() as [DiaryChoicesData];
  const pageParams = usePagePaginationParams();

  const { data: diaryData, isLoading } = useQuery<DiaryList>({
    queryKey: ["diaryList", pageParams],
    queryFn: () => apiDiaryList(pageParams),
  });

  if (isLoading) {
    return <div className="animate-bounce"> Loading ....</div>;
  }
  return (
    <CardLayout>
      <CardLayout.Header className="">
        <CardLayout.Title>Daily diary</CardLayout.Title>
        <div className="justify-betweena flex items-center">
          <p className="uppercase">Sort by type:</p>
          <Select
            onchange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFilter(e.target.value)
            }
          >
            <option key="someKey" value="all">
              All
            </option>
            {choices.map((data) => (
              <option key={data.value} value={data.value}>
                {data.display_name}
              </option>
            ))}
          </Select>
        </div>
      </CardLayout.Header>

      <CardLayout.Body className="h-3/5 md:h-4/6 md:grid-cols-3">
        {diaryData?.results?.map((data: DiaryDateData) => (
          <Card key={data.pkid} link="#">
            <Card.Title className=" text-center">
              {dateToGRformat(data.date)}
            </Card.Title>
            <Card.Body>
              {data?.diary_date
                ?.filter((data) =>
                  filterWord === "all" ? true : data.note_type === filterWord
                )
                .map((data) => (
                  <div className="grid grid-cols-3" key={data.pkid}>
                    <p>{data.note_type}</p>
                    <p>{data.time.slice(0, -3)}</p>
                    <p>{data.note}</p>
                  </div>
                ))}
            </Card.Body>
          </Card>
        ))}
      </CardLayout.Body>
      <Pagination
        currentPage={diaryData?.current_page || 1}
        totalPages={diaryData?.total_pages || 1}
      />
    </CardLayout>
  );
}
