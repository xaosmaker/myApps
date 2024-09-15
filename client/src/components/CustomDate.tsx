import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseFormSetValue } from "react-hook-form";
import { AddWorkDayData } from "../types/dataTypes";

// TODO: when i have time i will fix the date any

export default function CustomDate({
  startDate = new Date(),
  selectedDate,
  dateRange = true,
}: {
  startDate: Date;
  dateRange?: boolean;
  selectedDate?: UseFormSetValue<AddWorkDayData>;
}) {
  const [dates, setDates] = useState<Date[]>([startDate]);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const onChange = (date: any) => {
    if (Array.isArray(date)) {
      setDates(date);
    } else {
      setDates([date || new Date()]);
    }
  };

  useEffect(
    function () {
      if (selectedDate) {
        const newArray = [];
        for (const date of dates) {
          newArray.push(
            date?.toLocaleString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          );
        }
        const strArray = newArray.join("-");

        selectedDate("date", strArray);
      }
    },
    [dates, selectedDate]
  );
  return (
    <div className="flex flex-col border-b-2 border-slate-800 py-2  ">
      <span>Date</span>
      {dateRange ? (
        <DatePicker
          className="appearance-none border-none bg-transparent outline-none"
          selected={dates[0]}
          onChange={onChange}
          startDate={dates[0]}
          endDate={dates[1]}
          selectsRange
          selectsDisabledDaysInRange
        />
      ) : (
        <DatePicker
          className="appearance-none border-none bg-transparent outline-none"
          selected={dates[0]}
          onChange={onChange}
          startDate={dates[0]}
        />
      )}
    </div>
  );
}
