import { type SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Input from "../../../components/Input";
import type { AddWorkDayData, WorkDayFormType } from "../types/WorkHoursTypes";
import { useMutation } from "@tanstack/react-query";
import { addWorkDays } from "../services/workHoursServices";
import { useGetWorkShifts } from "../hooks/useGetworkShifts";
import SelectSearch from "@/components/selectSearch/SelectSearch";
import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { dateToUtcYYYYMMDD } from "../helpers/utils";
import { selectDayData } from "../data/selectDayData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

// TODO: validation of form and for every time on form
// TODO: make workday start from last inport add the shift to the data

export default function AddWorkHours() {
  const { workShiftsData, isWorkShiftsDataLoading } = useGetWorkShifts();
  const workDayShiftDataSelect = workShiftsData.map((data) => ({
    label: `${data.company} ( ${data.start_of_shift} - ${data.end_of_shift} )`,
    value: data.pkid.toString(),
  }));

  const navigate = useNavigate();
  const [souldRender, setShouldRender] = useState<boolean>(true);
  const { mutate, error } = useMutation({
    mutationFn: addWorkDays,
    onSuccess: () => navigate("/work-hours"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    control,
    watch,
  } = useForm<AddWorkDayData>({
    mode: "onChange",
    defaultValues: { date: new Date(), day: "Work Day" },
  });

  const day = watch("day");
  useEffect(() => {
    if (error && typeof error === "object") {
      const values = Object.values(error);

      if (Array.isArray(values[0])) {
        setError("root", { message: values[0][0] });
      } else {
        setError("root", { message: values[0] });
      }
    }
  }, [error, setError]);

  const onHandleSubmit: SubmitHandler<AddWorkDayData> = (data) => {
    const from = dateToUtcYYYYMMDD(data.date);

    const postData: WorkDayFormType = {
      type_of_work_day: data.day,
      comment: data.comment || null,
      location: data.location || null,
      start_of_work: data.startOfWork || null,
      work_day_shift: data.work_day_shift,
      end_of_work: data.endOfWork || null,
      date: from!,
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

  if (isWorkShiftsDataLoading) {
    return <div className="animate-bounce"> Loading ....</div>;
  }

  return (
    <Dialog>
      <DialogTrigger className="text-green-500 capitalize hover:cursor-pointer">
        <Tooltip>
          <TooltipTrigger asChild>
            <Plus />
          </TooltipTrigger>
          <TooltipContent className="uppercase">add work day</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle>Add Work Day</DialogTitle>
          <DialogDescription className="hidden">
            A form to register your work day
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-10"
          onSubmit={handleSubmit(onHandleSubmit)}
        >
          <SelectSearch<AddWorkDayData>
            label="Select Day..."
            name="day"
            data={selectDayData}
            control={control}
            error={errors.day}
          />

          <DatePicker<AddWorkDayData> control={control} name="date" />
          {day === "Travel" && (
            <>
              <Input
                htmlType="text"
                name="location"
                register={register("location")}
                error={errors.location}
              />
            </>
          )}
          {souldRender && (
            <>
              <SelectSearch<AddWorkDayData>
                control={control}
                required={true}
                name="work_day_shift"
                data={workDayShiftDataSelect}
                label="Select Shift..."
                error={errors.work_day_shift}
              />
              <Input
                htmlType="time"
                name="start of work"
                error={errors.startOfWork}
                register={register("startOfWork")}
              />
              <Input
                htmlType="time"
                name="end of work"
                register={register("endOfWork")}
                error={errors.endOfWork}
              />

              <Input
                htmlType="text"
                name="comment"
                register={register("comment")}
                error={errors.comment}
                required={false}
              />
            </>
          )}

          {errors.root && (
            <Alert variant="destructive" className="z-10 mt-1.5">
              <AlertDescription className="capitalize">
                {errors.root.message}
              </AlertDescription>
            </Alert>
          )}

          <Button type="submit">Add Work Day</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
