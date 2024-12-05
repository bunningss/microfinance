import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { translateDate } from "@/utils/helpers";

export function FormCalendar({
  name,
  form,
  label,
  placeholder = "Pick a date / তারিখ নির্বাচন করুন",
  allowFuture,
}) {
  return (
    <FormField
      control={form.control}
      name={name || ""}
      render={({ field }) => (
        <FormItem className="flex flex-col" gap={label}>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    translateDate(field.value, "PPP")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={
                  !allowFuture
                    ? (date) =>
                        date > new Date() || date < new Date("1900-01-01")
                    : undefined
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
