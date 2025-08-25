import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface DataType {
  value: string;
  label: string;
}

export default function SelectSearch<T extends FieldValues>({
  data,
  name,
  control,
}: {
  data: DataType[];
  name: Path<T>;
  control: Control<T>;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? data.find((item) => item.value === value)?.label
                : "Select framework..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command
              filter={(val, search) => {
                //TODO: this code is a little overhead but is good for now
                //need refactor
                const item = data.find((item) => item.value === val);
                return item?.label.includes(search) ? 1 : 0;
              }}
            >
              <CommandInput placeholder="Search..." className="h-9" />
              <CommandList>
                <CommandEmpty>Not found.</CommandEmpty>
                <CommandGroup>
                  {data.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={onChange}
                    >
                      {item.label}
                      {value === item.value ? true : false}

                      <Check
                        className={`ml-auto ${value === item.value ? "opacity-100" : "opacity-0"}`}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    />
  );
}
