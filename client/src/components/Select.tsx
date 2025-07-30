import { type ChangeEventHandler } from "react";
import { type UseFormRegisterReturn } from "react-hook-form";

export default function Select({
  children,
  error,
  register,
  onchange,
  required = true,
}: {
  children: React.ReactNode;
  register?: UseFormRegisterReturn;
  onchange?: ChangeEventHandler<HTMLSelectElement> | undefined;
  error?: string | undefined;
  required?: boolean;
}) {
  return (
    <div className="relative  w-full">
      <select
        onChange={onchange}
        required={required}
        {...register}
        className={`peer block w-full transform border-b-2  bg-transparent px-0 py-2.5 caret-slate-100 outline-none`}
      >
        {children}
      </select>

      {error ? (
        <div className="absolute top-14 z-50 hidden  rounded-md border border-red-600 bg-slate-900 p-4 text-red-700 peer-focus:block">
          {error}
        </div>
      ) : undefined}
    </div>
  );
}
