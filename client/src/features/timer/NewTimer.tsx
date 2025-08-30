import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import CircularProgress from "@/components/CircularProgress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";
import Input from "@/components/Input";
import z from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Timer {
  laps: number;
  timersList: number[];
  currentTimer: number;
  currentLap: number;
  timerFinish: boolean;
  isPaused: boolean;
}
const initialTimer = {
  laps: 2,
  timersList: [2, 3, 2, 1],
  currentTimer: 0,
  currentLap: 1,
  timerFinish: false,
  isPaused: true,
};

const timerSchema = z.object({
  laps: z
    .string()
    .refine((val) => Number(val) >= 1, { error: "only integer allowed" }),
  timers: z
    .string()
    .trim()
    .refine((val) => val.match(/^([1-9]+(,)?)+$/), {
      error: "the format sould be 1 or 1,2,3,4,5 no space allowed",
    }),
});
type TimersType = z.infer<typeof timerSchema>;

export default function NewTimer() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [timer, setTimer] = useState<Timer>(initialTimer);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<TimersType>({
    mode: "onChange",
    resolver: zodResolver(timerSchema),
    criteriaMode: "all",
    defaultValues: {
      laps: initialTimer.laps.toString(),
      timers: initialTimer.timersList.toString(),
    },
  });
  const [countDown, setCountDown] = useState<number>(
    timer.timersList[timer.currentTimer],
  );

  function setNextTimer() {
    let nextTimer = timer.currentTimer + 1;
    let isFinishTimer = false;

    if (nextTimer >= timer.timersList.length) {
      nextTimer = -1;
      isFinishTimer = true;
    }

    setTimer((timer) => ({
      ...timer,
      currentTimer: nextTimer,
      timerFinish: isFinishTimer,
    }));

    if (!isFinishTimer) {
      setCountDown(() => timer.timersList[nextTimer]);
    }
  }

  function setNextLap() {
    if (timer.currentLap < timer.laps) {
      setTimer((timer) => ({
        ...timer,
        timerFinish: false,
        currentLap: timer.currentLap + 1,
      }));
    }
  }

  function submitTimer() {
    resetSetTimer();
  }
  function resetSetTimer() {
    const laps = Number(getValues("laps"));
    const timers = getValues("timers")
      .split(",")
      .map((num) => Number(num));

    setTimer(() => ({ ...initialTimer, laps: laps, timersList: timers }));

    setCountDown(timers[0]);
    setIsDialogOpen(false);
  }

  if (countDown <= -1 && !timer.timerFinish) {
    setNextTimer();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (countDown < 0) {
        return () => clearInterval(interval);
      }
      if (!timer.isPaused) {
        setCountDown((item) => (item -= 1));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      // console.log("clear called");
      // console.log(timer.currentLap, timer.currentTimer, timer.timerFinish);
    };
    // pls dont add here the countDown dep it want
    // i leave it like this because if i put the countdown the useEffect run alway and know is it good
  }, [timer]);

  const progres = 100 / timer.timersList[timer.currentTimer];
  const val = (countDown * progres) | 0;

  const addTimer = (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="text-green-500 capitalize hover:cursor-pointer">
        <Tooltip>
          <TooltipTrigger asChild>
            <Plus />
          </TooltipTrigger>
          <TooltipContent className="uppercase">set timer</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle className="capitalize">Set timer and laps</DialogTitle>
          <DialogDescription className="hidden">
            A form to register your timers and laps
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(submitTimer)}
          className="flex flex-col gap-6"
        >
          <Input
            htmlType="number"
            name="laps"
            register={register("laps")}
            error={errors.laps}
          />
          <Input
            htmlType="text"
            register={register("timers")}
            name="timers"
            error={errors.timers}
          />
          <Button type="submit">Set Timer</Button>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="">
        <div className="flex gap-5">
          <p className="capitalize">
            laps {timer.currentLap}: {timer.laps}
          </p>

          <p>{timer.timersList.toString()}</p>
          {addTimer}
        </div>
        <div>
          <CircularProgress
            progress={val}
            progressVal={countDown === -1 ? 0 : countDown}
          />
          <div className="flex justify-between">
            <Button
              disabled={countDown === -1 && timer.currentLap === timer.laps}
              onClick={
                countDown === -1
                  ? setNextLap
                  : () =>
                      setTimer((data) => ({
                        ...data,
                        isPaused: !data.isPaused,
                      }))
              }
            >
              {timer.isPaused
                ? "start"
                : countDown === -1
                  ? "start next round"
                  : "pause"}
            </Button>
            <Button onClick={resetSetTimer}>reset</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
