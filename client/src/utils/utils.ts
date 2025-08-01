import type { FieldError } from "react-hook-form";

export function zodErrormessages(error: FieldError | undefined) {
  if (error === undefined) {
    return undefined;
  }
  if (error.types) {
    return Object.values(error.types)
      .flat()
      .filter((data) => typeof data === "string");
  } else if (error.message) {
    return [error.message];
  }
}
