import React, { type HTMLInputTypeAttribute } from "react";
import { type UseFormRegisterReturn } from "react-hook-form";

export interface InputTypes {
  htmlType: HTMLInputTypeAttribute;
  name: string;
  error: string | undefined;
  otherProps?: React.InputHTMLAttributes<HTMLInputElement>;
  required?: boolean;
  displayName?: string | null;
  text?: "text" | "textarea";

  register: UseFormRegisterReturn;
}
