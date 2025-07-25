import { SubmitHandler, useForm } from "react-hook-form";
import { validateEmail } from "../../utils/valitators";
import Button from "../../ui/Button";
import Input from "../../components/Input";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/authApiCalls";
import { logIn } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { LoginFormValues } from "../../types/dataTypes";

export default function LoginRegPage() {


  const dispatch = useDispatch();
  const { mutate, error, isError } = useMutation({
    mutationFn: (payload: LoginFormValues) => login(payload),
    onSuccess: (data) => {
      if (data.message === "Login Successful.") {
        dispatch(logIn());
      }
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ mode: "onChange" });
  const onHandleSubmit: SubmitHandler<LoginFormValues> = (data, event) => {
    event?.preventDefault();
    mutate(data);
  };

  const hasErrors = Object.entries(errors).length !== 0;

  return (
    <div className="h-screen w-full  bg-slate-900  text-slate-100">
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className="mx-auto flex h-full w-3/4 flex-col items-center justify-center gap-10 sm:w-2/4 md:w-1/4"
      >
        <h2 className="text-2xl font-bold ">VHMS</h2>
        <h3 className="text-lg"> Login</h3>
        <Input
          error={errors.email?.message}
          htmlType="text"
          name="email"
          register={register("email", {
            validate: {
              email: (v) => validateEmail(v) || "Enter a Valid Email Address",
            },
          })}
          required={true}
        />

        <Input
          htmlType="password"
          name="password"
          error={errors.password?.message}
          register={register("password", {
            // minLength: {
            //   value: 8,
            //   message: "password should be 8 or more chars",
            // },
            // validate: {
            //   password: (v) =>
            //     validatePassword(v)?.type || validatePassword(v)?.message,
            // },
          })}
          required={true}
        />
        {isError ? <div className="text-red-500">{error.message}</div> : null}
        <div className="flex w-full items-center justify-between">
          {!hasErrors ? <Button type="submit">Login</Button> : <div></div>}
          {/* TODO: add register functionality */}
          <button type="reset"></button>
        </div>
      </form>
    </div>
  );
}
