import { type SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../ui/Button";
import CustomDate from "../../../components/CustomDate";
import type { AddWorkDayData, WorkDayFormType } from "../types/WorkHoursTypes";
import { useGetWorkDayData } from "../hooks/useGetWorkDayData";
import { useMutation } from "@tanstack/react-query";
import { addWorkDays } from "../services/workHoursServices";
import { useGetWorkShifts } from "../hooks/useGetworkShifts";

// TODO: validation of form and for every time on form
// TODO: make workday start from last inport add the shift to the data
// TODO: make search from date to date
// WARN: the date should be a string

export default function AddWorkHours() {
  const { isWorkDayDataLoading } = useGetWorkDayData();
  const { workShiftsData, isWorkShiftsDataLoading } = useGetWorkShifts();
  const [souldRender, setShouldRender] = useState<boolean>(true);
  const { mutate } = useMutation({
    mutationFn: addWorkDays,
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<AddWorkDayData>({
    mode: "onChange",
    defaultValues: {},
  });
  const day = watch("day");

  const onHandleSubmit: SubmitHandler<AddWorkDayData> = (data, event) => {
    event?.preventDefault();
    const date = data.date.split("-");

    const date0 = date[0].split("/");
    const start_date = `${date0[2]}-${date0[0]}-${date0[1]}`;
    let end_date = null;

    if (date.length === 2) {
      const date1 = date[1].split("/");
      end_date = `${date1[2]}-${date1[0]}-${date1[1]}`;
    }

    const postData: WorkDayFormType = {
      type_of_work_day: data.day,
      comment: data.comment || null,
      location: data.location || null,
      start_of_work: data.startOfWork || null,
      work_day_shift: data.work_day_shift,
      end_of_work: data.endOfWork || null,
      date_start: start_date,
      date_end: end_date,
    };
    mutate(postData);
  };

  useEffect(() => {
    if (
      ["Weekend", "Times off", "Sick Leave", "Public Holiday"].includes(day)
    ) {
      setShouldRender(false);
    } else {
      setShouldRender(true);
    }
  }, [day]);

  if (isWorkDayDataLoading || isWorkShiftsDataLoading) {
    return <div className="animate-bounce"> Loading ....</div>;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-20">
      <h3 className="text-xl">Add work Day</h3>
      <form
        className="flex w-3/4 flex-col gap-10 sm:w-2/3 md:w-1/4"
        onSubmit={handleSubmit(onHandleSubmit)}
      >
        <select
          {...register("day")}
          className="appearance-none border-0 bg-slate-900"
        >
          <option value="Work Day">Work Day</option>
          <option value="Weekend">Weekend</option>
          <option value="Times off">Times Off</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Public Holiday">Public Holiday</option>
          <option value="Travel">Travel</option>
        </select>

        <CustomDate
          startDate={new Date()}
          dateRange={day === "Travel"}
          selectedDate={setValue}
        />
        <input type="hidden" {...register("date")} />
        {day === "Travel" && (
          <Input
            htmlType="text"
            name="location"
            register={register("location")}
            error={errors.location?.message}
          />
        )}

        {souldRender && (
          <>
            <select
              {...register("work_day_shift")}
              className="appearance-none border-0 bg-slate-900"
            >
              {workShiftsData.map((workShift) => {
                return (
                  <option
                    key={workShift.pkid}
                    className="uppercase"
                    value={workShift.pkid}
                  >{`${workShift.company}(${workShift.start_of_shift.slice(
                    0,
                    -3
                  )}-${workShift.end_of_shift.slice(0, -3)})`}</option>
                );
              })}
            </select>
            <Input
              htmlType="time"
              name="start of work"
              error={errors.startOfWork?.message}
              register={register("startOfWork")}
            />
            <Input
              htmlType="time"
              name="end of work"
              register={register("endOfWork")}
              error={errors.endOfWork?.message}
            />

            <Input
              htmlType="text"
              name="comment"
              register={register("comment")}
              error={errors.comment?.message}
              required={false}
            />
          </>
        )}

        <Button type="submit">Add Work Day</Button>
      </form>
    </div>
  );
}
