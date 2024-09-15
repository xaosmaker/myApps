import { Link } from "react-router-dom";
import { DiaryDateData } from "../../types/dataTypes";

export default function DiaryCard({
  diaryList,
  filterWord = "all",
}: {
  diaryList: DiaryDateData;
  filterWord: string;
}) {
  return (
    <Link to="#">
      <div className="">
        <div className={`flex items-center justify-center px-2 py-2 `}>
          <div className=" flex w-full flex-col items-center justify-center   gap-2 ">
            <h3 className="mx-auto text-xl font-semibold capitalize">
              {diaryList.date}
            </h3>
          </div>
        </div>
        <div className="flex flex-col gap-2  bg-slate-700 px-4 pt-2 h-64 overflow-y-scroll ">
          {/*{diaryList?.diary_date?.slice(0, 10).map(() => ( */}
          {diaryList?.diary_date
            ?.filter((data) =>
              filterWord === "all" ? true : data.note_type === filterWord
            )
            .map((data) => (
              <div className="grid grid-cols-3" key={data.pkid}>
                <p>{data.note_type}</p>
                <p>{data.time}</p>
                <p>{data.note}</p>
              </div>
            ))}
        </div>
      </div>
    </Link>
  );
}
