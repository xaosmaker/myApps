import { useQuery } from "@tanstack/react-query";
import usePagePaginationParams from "../../utils/UsePagePaginationParams";
import Pagination from "../../components/Pagination";
import {
  DiaryChoicesData,
  DiaryDateData,
  DiaryList,
} from "../../types/dataTypes";
import { apiDiaryList } from "../../services/diaryApi";
import DiaryCard from "./DiaryCard";
import Select from "../../components/Select";
import { useLoaderData } from "react-router-dom";
import React, { useState } from "react";

export default function ShowDailyDiary() {
  const [filter, setFilter] = useState<string>("all");
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
    <div className=" h-[80svh] w-11/12">
      <p className="text-center text-4xl font-bold uppercase">Daily diary</p>
      <div className=" my-4 grid uppercase md:grid-cols-4 "></div>
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

      <div className="grid h-3/5 gap-4 overflow-y-scroll rounded-md md:h-4/5 md:grid-cols-3 ">
        {diaryData?.results.map((data: DiaryDateData) => (
          <DiaryCard key={data.pkid} diaryList={data} filterWord={filter} />
        ))}
      </div>
      <Pagination
        currentPage={diaryData?.current_page || 1}
        totalPages={diaryData?.total_pages || 1}
      />
    </div>
  );
}
