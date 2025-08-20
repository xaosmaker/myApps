
import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Controller } from "react-hook-form"
import type { Control, FieldValues, Path } from "react-hook-form"

export function DateRange<T extends FieldValues>({
  control,
  name,
  className,
}: { className?: React.HTMLAttributes<HTMLDivElement>, control: Control<T>, name: Path<T> }) {

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (

        <div className={cn("grid gap-2", className)}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !value && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {value?.from ? (
                  value.to ? (
                    <>
                      {value.from.toLocaleDateString()} - {" "}
                      {value.to.toLocaleDateString()}
                    </>
                  ) : (
                    value.from.toLocaleDateString()
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={value?.from}
                selected={value}
                onSelect={onChange}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>
        </div>
      )
      }
    />
  )
}
