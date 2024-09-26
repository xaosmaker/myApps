import { UseFormRegisterReturn } from "react-hook-form";

interface loginInput {
  htmlType: "text" | "password" | string;
  name: string;
  error: string | undefined;
  required?: boolean;
  displayName?: string | null;
  text?: "text" | "textarea";

  register: UseFormRegisterReturn;
}

export default function Input({
  htmlType,
  name,
  error,
  register,
  required = true,
  displayName = null,
  text = "text",
}: loginInput) {
  if (text === "text") {
    return (
      <div className="relative  w-full">
        <input
          type={htmlType}
          id={name}
          {...register}
          placeholder=""
          className={`peer block w-full transform border-b-2  bg-transparent px-0 py-2.5 caret-slate-100 outline-none  ${
            error
              ? "border-red-600 focus:border-red-600"
              : "border-slate-800 autofill:duration-[50000s] focus:border-blue-600"
          }`}
          required={required}
        />
        <label
          htmlFor={name}
          className="absolute left-0 top-3 origin-[0] -translate-y-7 capitalize peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-150 peer-placeholder-shown:text-slate-700 peer-focus:-translate-y-6 peer-focus:scale-100 peer-focus:text-blue-600"
        >
          {displayName ? displayName : name}
        </label>

        {error ? (
          <div className="absolute top-14 z-50 hidden  rounded-md border border-red-600 bg-slate-900 p-4 text-red-700 peer-focus:block">
            {error}
          </div>
        ) : undefined}
      </div>
    );
  }
  if (text === "textarea") {
    return (
      <div className="relative  w-full">
        <textarea
          id={name}
          {...register}
          placeholder=""
          className={`peer block w-full transform border-b-2  bg-transparent px-0 py-2.5 caret-slate-100 outline-none  ${
            error
              ? "border-red-600 focus:border-red-600"
              : "border-slate-800 autofill:duration-[50000s] focus:border-blue-600"
          }`}
          required={required}
        />
        <label
          htmlFor={name}
          className="absolute left-0 top-3 origin-[0] -translate-y-7 bg-slate-900 capitalize peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-150 peer-placeholder-shown:text-slate-700 peer-focus:-translate-y-6 peer-focus:scale-100 peer-focus:text-blue-600"
        >
          {displayName ? displayName : name}
        </label>

        {error ? (
          <div className="absolute top-14 z-50 hidden  rounded-md border border-red-600 bg-slate-900 p-4 text-red-700 peer-focus:block">
            {error}
          </div>
        ) : undefined}
      </div>
    );
  }
}
