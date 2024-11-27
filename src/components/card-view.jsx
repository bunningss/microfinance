import { cn } from "@/lib/utils";

export function CardView({ children, className }) {
  return (
    <div className={cn("grid md:grid-cols-2 xl:grid-cols-3 gap-4", className)}>
      {children}
    </div>
  );
}
