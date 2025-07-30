import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import Select from "react-select";

// Define the BaseOption type to match the structure required by react-select
export interface BaseOption {
  value: string | number | object; // The value for the option
  label: string; // The display label for the option
}

// Interface for the SelectSearch component
interface SelectSearchProps<T extends FieldValues> {
  name: Path<T>; // Ensures the name matches the form structure
  control: Control<T>; // The control object from react-hook-form
  options: BaseOption[]; // Array of options, typed based on BaseOption
}

export default function SelectSearch<T extends FieldValues>({
  name,
  control,
  options,
}: SelectSearchProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, ref } }) => (
        <Select
          // Handle the selected option change
          onChange={(selectedOption) => {
            onChange(selectedOption?.value); // Pass the selected option back to react-hook-form
          }}
          onBlur={onBlur}
          ref={ref}
          options={options} // Directly pass the options
          // Customizing the Select theme colors
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#334155",
              primary25: "#0f172a",
              neutral0: "#1e293b",
              neutral80: "#f8fafc",
            },
          })}
        />
      )}
    />
  );
}
