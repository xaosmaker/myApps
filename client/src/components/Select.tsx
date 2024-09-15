import { ChangeEventHandler } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export default function Select({
  children,
  register,
  onchange,
  required = true,
}: {
  children: React.ReactNode;
  register?: UseFormRegisterReturn;
  onchange?: ChangeEventHandler<HTMLSelectElement> | undefined;
  required?: boolean;
}) {
  return (
    <select
      onChange={onchange}
      required={required}
      {...register}
      className={`peer block w-full transform border-b-2  bg-transparent px-0 py-2.5 caret-slate-100 outline-none`}
    >
      {children}
    </select>
  );
}
