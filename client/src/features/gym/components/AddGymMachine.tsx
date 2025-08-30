import { useForm } from "react-hook-form";
import { type GymMachineType } from "../types/GymTypes";
import { usePostGymMachine } from "../hooks/usePostGymMachine";
import Input from "../../../components/Input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";
import { DialogHeader } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AddGymMachine() {
  function submitFunction(machineData: GymMachineType) {
    postGymMachineMutate(machineData);
  }
  const { postGymMachineMutate, isPostGymMachineError, postGymMachineError } =
    usePostGymMachine();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GymMachineType>();

  const error = (
    <Alert variant="destructive" className="z-10 mt-1.5">
      <AlertDescription className="capitalize">
        {postGymMachineError?.message}
      </AlertDescription>
    </Alert>
  );

  return (
    <Dialog>
      <DialogTrigger className="text-green-500 capitalize hover:cursor-pointer">
        <Tooltip>
          <TooltipTrigger asChild>
            <Plus />
          </TooltipTrigger>
          <TooltipContent className="uppercase">add gym machine</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle className="capitalize">Add gym machine</DialogTitle>
          <DialogDescription className="hidden">
            A form to register your gym machine
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(submitFunction)}
          className="flex flex-col items-center justify-center gap-4"
        >
          <Input
            htmlType="text"
            name="machine_name"
            register={register("machine_name")}
            displayName="Machine Name"
            error={errors?.machine_name}
          />
          <div className="flex items-center justify-between gap-4 self-start">
            <label className="uppercase">Track by Time</label>
            <input {...register("is_tracked_by_time")} type="checkbox" />
          </div>
          {isPostGymMachineError && error}

          <div className="self-start">
            <Button type="submit">Add Machine</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
