import { type SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/Input";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/authApiCalls";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { regSchema, type RegSchema } from "./schema/registerSchema";
//TODO: Sign up page and reset Password

export default function LoginRegPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLoginPage = pathname === "/login";

  const { mutate } = useMutation({
    mutationFn: (payload: RegSchema) => login(payload),
    onSuccess: (data) => {
      if (data.message === "Login Successful.") {
        navigate("/work-hours");
      }
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegSchema>({
    mode: "onChange",
    resolver: isLoginPage ? undefined : zodResolver(regSchema),
    criteriaMode: "all",
  });

  const onHandleSubmit: SubmitHandler<RegSchema> = (data) => {
    console.log(data);

    mutate(data);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-900 text-slate-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">VHMS</CardTitle>
          <CardDescription className="md:text-xl">
            {isLoginPage ? "Login to your account" : "Create a new account"}
          </CardDescription>
          <CardAction>
            <Button variant="link" asChild>
              {isLoginPage ? (
                <NavLink to={"/register"}>Sign Up</NavLink>
              ) : (
                <NavLink to={"/login"}>Sign In</NavLink>
              )}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form
            className="mt-4 flex flex-col gap-10 md:text-2xl"
            onSubmit={handleSubmit(onHandleSubmit)}
          >
            <Input
              error={errors.email}
              htmlType="text"
              name="email"
              register={register("email")}
              required={true}
            />

            <Input
              htmlType="password"
              name="password"
              error={errors.password}
              register={register("password")}
              required={true}
            />
            {!isLoginPage && (
              <Input
                htmlType="password"
                name="confirmPassword"
                error={errors.confirmPassword}
                register={register("confirmPassword")}
                required={true}
              />
            )}
            <Button
              type="submit"
              className="w-full hover:bg-inherit/10 md:text-xl"
            >
              {isLoginPage ? "Login" : "Register"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          {isLoginPage && (
            <CardDescription className="flex w-full items-center justify-between capitalize">
              forgot you password ?
              <Button variant="link" asChild>
                <NavLink to={"#"}>reset Password</NavLink>
              </Button>
            </CardDescription>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
