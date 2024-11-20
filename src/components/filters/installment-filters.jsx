"use client";
import { useForm } from "react-hook-form";
import { FormModal } from "../form/form-modal";
import { FormCalendar } from "../form/form-calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterInstallmentsSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function InstallmentsFilters() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(filterInstallmentsSchema),
    defaultValues: {
      date: "",
    },
  });

  const handleSubmit = (data) => {
    router.push(`?date=${new Date(data.date).toISOString()}`);
  };

  const handleClear = () => {
    router.push(`?`);
    form.reset();
  };

  return (
    <div className="space-y-2">
      <FormModal form={form} onSubmit={handleSubmit} formLabel="apply">
        <FormCalendar form={form} allowFuture name="date" />
      </FormModal>
      <Button onClick={handleClear} variant="destructive">
        Clear
      </Button>
    </div>
  );
}
