import { cn } from "@/lib/utils";

export const Heading = ({ className, ...props }) => {
  return (
    <h3
      className={cn(
        "capitalize text-2xl font-bold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
};
