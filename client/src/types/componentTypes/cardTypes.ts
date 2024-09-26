import React from "react";

export interface CardTypes {
  link: string;
  children: React.ReactNode;
}

export interface CardTitleTypes {
  children: React.ReactNode;
  className: React.ComponentProps<"div">["className"];
}

export interface CardBodyTypes {
  children: React.ReactNode;
}

export interface CardLayoutTypes {
  children: React.ReactNode;
}

export interface CardLayoutBodyTypes {
  children: React.ReactNode;
  className: React.ComponentProps<"div">["className"];
}

export interface CardLayoutTitleTypes {
  children: string | React.ReactElement;
}

export interface CardLayoutHeaderTypes {
  children: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
}
