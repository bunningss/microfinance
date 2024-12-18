import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export function FormInput({
  form,
  name,
  label,
  placeholder,
  description,
  required,
  disabled,
  type = "text",
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
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder || ""}
              {...field}
              disabled={disabled}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
