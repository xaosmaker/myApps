import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { resetPasswordSchema } from "./schema/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  ResetPasswordConfirmType,
  ResetPasswordSchema,
} from "./types/authTypes";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordConfirmApi } from "./services/authApiServices";
import { toast } from "sonner";

export default function ResetPasswordEmailConfirm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    mode: "onChange",
    resolver: zodResolver(resetPasswordSchema),
    criteriaMode: "all",
  });

  const { mutate } = useMutation({
    mutationFn: resetPasswordConfirmApi,
    onError: () => {
      toast("Please try again to reset your password", {
        duration: 15000,
        closeButton: true,
      });
      navigate("/login");
    },
    onSuccess: () => {
      toast("Your password has been succesfully reseted", {
        duration: 15000,
        closeButton: true,
      });
      navigate("/login");
    },
  });

  const params = useParams();
  function onHandleSubmit(data: ResetPasswordSchema) {
    const fullData: ResetPasswordConfirmType = {
      re_new_password: data.re_new_password,
      new_password: data.new_password,
      uid: params.uid || "",
      token: params.token || "",
    };

    mutate(fullData);
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-900 text-slate-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">VHMS</CardTitle>
          <CardDescription className="capitalize md:text-xl">
            Password Reset <br />
            Enter your new password
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
              error={errors.new_password}
              htmlType="password"
              name="new_password"
              displayName="new password"
              required={true}
              register={register("new_password")}
            />

            <Input
              error={errors.re_new_password}
              htmlType="password"
              name="re_new_password"
              displayName={"confirm new password"}
              required={true}
              register={register("re_new_password")}
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
