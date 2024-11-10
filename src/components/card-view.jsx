import { cn } from "@/lib/utils";

export function CardView({ children, className }) {
  return (
    <div
      className={cn(
        "grid md:grid-cols-[repeat(auto-fit,_minmax(400px,_.5fr))] gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}
