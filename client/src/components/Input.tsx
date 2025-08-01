import { zodErrormessages } from "@/utils/utils";
import { type InputTypes } from "../types/componentTypes/InputTypes";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
export default function Input({
  htmlType,
  name,
  error,
  register,
  otherProps,
  required = true,
  displayName = null,
  text = "text",
}: InputTypes) {
  const errors = zodErrormessages(error);
  const input = (
    <input
      type={htmlType}
      id={name}
      {...register}
      {...otherProps}
      placeholder=""
      className={`peer block w-full transform border-b-2 px-0 pt-2 pb-0.5 outline-none ${
        error
          ? "border-red-600 focus:border-red-600"
          : "autofill:duration-[50000s] focus:border-blue-600"
      }`}
      required={required}
    />
  );
  const textarea = (
    <textarea
      id={name}
      {...register}
      placeholder=""
      className={`peer block w-full transform border-b-2 px-0 py-2.5 outline-none ${
        error
          ? "border-red-600 focus:border-red-600"
          : "autofill:duration-[50000s] focus:border-blue-600"
      }`}
      required={required}
    />
  );

  return (
    <div className="relative w-full">
      {text === "text" ? input : textarea}
      <label
        htmlFor={name}
        className="absolute top-1 left-0 origin-[0] -translate-y-6 capitalize peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-150 peer-placeholder-shown:text-slate-300 peer-focus:-translate-y-6 peer-focus:scale-100 peer-focus:text-blue-600"
      >
        {displayName ? displayName : name}
      </label>

      {errors ? (
        <>
          {/* <div className="absolute top-14 z-50 hidden rounded-md border border-red-600 bg-slate-200 p-4 text-red-700 peer-focus:block"> */}
          {/*   {error} */}
          {/* </div> */}
          <div className="top-1, absolute right-0 w-full">
            <Alert variant="destructive" className="z-10 mt-1.5">
              <AlertTitle className="uppercase">
                {displayName ? displayName : name}
              </AlertTitle>
              <AlertDescription>
                <ul className="list-inside list-disc pl-4">
                  {errors.map((data) => (
                    <li key={data}>{data}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </>
      ) : undefined}
    </div>
  );
}
