import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../ui/Button";
import { AddWorkDayData } from "../../types/dataTypes";
import CustomDate from "./CustomDate";

// TODO: validation of form and for every time on form
// WARN: the date should be a string

export default function AddWorkHours() {
  const [souldRender, setShouldRender] = useState<boolean>(true);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<AddWorkDayData>({ mode: "onChange" });
  const day = watch("day");

  const onHandleSubmit: SubmitHandler<AddWorkDayData> = (data, event) => {
    event?.preventDefault();
    console.log("work hours data", data);
  };
  useEffect(() => {
    if (["weekend", "timesOff", "sickLeave", "publicHoliday"].includes(day)) {
      setShouldRender(false);
    } else {
      setShouldRender(true);
    }
  }, [day]);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-20 ">
      <h3 className="text-xl">Add work Day</h3>
      <form
        className="flex w-3/4 flex-col gap-10 sm:w-2/3 md:w-1/4"
        onSubmit={handleSubmit(onHandleSubmit)}
      >
        <select
          {...register("day")}
          className="appearance-none  border-0 bg-slate-900 "
        >
          <option value="normal">Normal Day</option>
          <option value="weekend">Weekend</option>
          <option value="timesOff">Times Off</option>
          <option value="sickLeave">Sick Leave</option>
          <option value="publicHoliday">Public Holiday</option>
          <option value="travel">Travel</option>
        </select>

        <CustomDate
          startDate={new Date()}
          dateRange={day === "travel"}
          selectedDate={setValue}
        />
        <input type="hidden" {...register("date")} />
        {day === "travel" && (
          <Input
            htmlType="text"
            name="location"
            register={register("location")}
            error={errors.location?.message}
          />
        )}

        {souldRender && (
          <>
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
