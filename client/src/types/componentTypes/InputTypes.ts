import { HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputTypes {
  htmlType: HTMLInputTypeAttribute;
  name: string;
  error: string | undefined;
  required?: boolean;
  displayName?: string | null;
  text?: "text" | "textarea";

  register: UseFormRegisterReturn;
}
