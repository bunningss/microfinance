"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { translateDate } from "@/utils/helpers";

export function FormSelect({
  form,
  name,
  label,
  placeholder,
  description,
  options,
  required,
  keyName = "name",
  keyValue = "value",
  keyType,
}) {
  return (
    <FormField
      control={form.control}
      name={name || ""}
      render={({ field }) => (
        <FormItem className="grid gap-3">
          {label && (
            <FormLabel
              className={`capitalize relative ${
                required
                  ? "after:content-['*'] after:absolute after:text-destructive after:text-lg after:-bottom-1"
                  : ""
              }`}
            >
              {label}
            </FormLabel>
          )}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="capitalize">
                <SelectValue placeholder={placeholder || ""} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.map((option, index) => {
                return (
                  <SelectItem
                    value={option[keyValue]}
                    key={index}
                    className="capitalize"
                  >
                    {keyType === "date"
                      ? translateDate(option[keyName])
                      : option[keyName]}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
