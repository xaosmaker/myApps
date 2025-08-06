import { type SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/Input";
import { useMutation } from "@tanstack/react-query";
import { login, registerUserApi } from "../../services/authApiCalls";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect } from "react";
//TODO: Sign up page and reset Password

export default function LoginRegPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLoginPage = pathname === "/login";

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<RegSchema>({
    mode: "onChange",
    resolver: isLoginPage ? undefined : zodResolver(regSchema),
    criteriaMode: "all",
  });

  useEffect(() => {
    if (isLoginPage || !isLoginPage) {
      reset();
    }
  }, [reset, isLoginPage]);

  const { mutate } = useMutation({
    mutationFn: isLoginPage
      ? (payload: RegSchema) => login(payload)
      : (payload: RegSchema) => registerUserApi(payload),
    onError: (e) => {
      if (e.message === "No active account found with the given credentials") {
        setError("root", { message: e.message });
        return;
      }
      const errMessage = e.message.split("\n");
      for (const mess of errMessage) {
        const [key, val] = mess.split(": ");
        if (key === "email" || key === "username") {
          setError(key, { message: val });
        }
      }
    },
    onSuccess: (data) => {
      if (data.message === "Login Successful.") {
        navigate("/work-hours");
      } else {
        toast("Your account created succesfully", {
          description: "check your email to activate it",
          closeButton: true,
          duration: 15000,
        });
        navigate("/login");
      }
    },
  });

  const onHandleSubmit: SubmitHandler<RegSchema> = (data) => {
    mutate(data);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-900 text-slate-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">VHMS</CardTitle>
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
            className="mt-4 flex flex-col gap-10"
            onSubmit={handleSubmit(onHandleSubmit)}
          >
            {!isLoginPage && (
              <>
                <Input
                  htmlType="username"
                  name="username"
                  error={errors.username}
                  register={register("username")}
                  required={true}
                />
                <div className="flex gap-10">
                  <Input
                    htmlType="firstName"
                    name="firstName"
                    displayName="first name"
                    error={errors.first_name}
                    register={register("first_name")}
                    required={true}
                  />
                  <Input
                    htmlType="lastName"
                    name="lastName"
                    displayName="last name"
                    error={errors.last_name}
                    register={register("last_name")}
                    required={true}
                  />
                </div>
              </>
            )}
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
                displayName="confirm Password"
                error={errors.re_password}
                register={register("re_password")}
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

          {errors.root && (
            <Alert variant="destructive" className="z-10 mt-1.5">
              <AlertDescription>{errors.root.message}</AlertDescription>
            </Alert>
          )}
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
