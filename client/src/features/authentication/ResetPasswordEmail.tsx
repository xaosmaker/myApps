import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import type { RegSchema } from "./schema/registerSchema";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordApi } from "./services/authApiServices";
import { toast } from "sonner";

export default function ResetPasswordEmail() {
  const { register, handleSubmit } = useForm<Pick<RegSchema, "email">>();
  const { mutate } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () =>
      toast("An Email have been sent to your Email Account", {
        description: "Please go to you email and follow the instuctions",
        closeButton: true,
        duration: 15000,
      }),
  });

  function onHandleSubmit(data: Pick<RegSchema, "email">) {
    mutate(data);

    //
  }
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-900 text-slate-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">VHMS</CardTitle>
          <CardDescription className="capitalize md:text-xl">
            reset your password
          </CardDescription>
          <CardAction>
            <Button variant="link" asChild className="capitalize">
              <NavLink to={"/login"}>log in</NavLink>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form
            className="mt-4 flex flex-col gap-10"
            onSubmit={handleSubmit(onHandleSubmit)}
          >
            <Input
              error={undefined}
              htmlType="email"
              name="email"
              required={true}
              register={register("email")}
            />

            <Button
              type="submit"
              className="w-full uppercase hover:bg-inherit/10 md:text-xl"
            >
              reset password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
