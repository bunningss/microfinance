"use client";
import { useForm } from "react-hook-form";
import { FormModal } from "../form/form-modal";
import { FormCalendar } from "../form/form-calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterInstallmentsSchema } from "@/lib/schema";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

export function InstallmentsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm({
    resolver: zodResolver(filterInstallmentsSchema),
    defaultValues: {
      date: "",
    },
  });

  const placeholderText = searchParams.get("date")
    ? new Date(searchParams.get("date")).toDateString()
    : new Date(Date.now()).toDateString();

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
        <FormCalendar
          form={form}
          allowFuture
          name="date"
          placeholder={placeholderText}
        />
      </FormModal>
      <Button onClick={handleClear} variant="destructive">
        Clear
      </Button>
    </div>
  );
}
