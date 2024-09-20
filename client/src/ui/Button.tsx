import React from "react";

export default function Button({
  children,
  buttonType = "primary",
  type,
  onClick,
}: {
  buttonType?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
  type: "submit" | "reset" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  let style;
  if (buttonType === "primary") {
    style =
      "bg-slate-950  outline-offset-2 outline-slate-500 hover:outline  active:bg-slate-900 active:outline-slate-300";
  } else if (buttonType === "danger") {
    style =
      "bg-red-700 outline-offset-2 outline-red-500 hover:outline  active:bg-red-900 active:outline-red-300";
  }

  return (
    <button
      onClick={onClick}
      className={`rounded-md px-4 py-2 uppercase transition-all duration-300 ${style}  `}
      type={type}
    >
      {children}
    </button>
  );
}
