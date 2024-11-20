"use client";
import { useForm } from "react-hook-form";
import { FormModal } from "../form/form-modal";
import { FormCalendar } from "../form/form-calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterInstallmentsSchema } from "@/lib/schema";

export function TodaysSavingsInstallmentsFilters() {
  const form = useForm({
    resolver: zodResolver(filterInstallmentsSchema),
    defaultValues: {
      date: "",
    },
  });

  const handleSubmit = async (data) => {};

  return (
    <FormModal form={form} onSubmit={handleSubmit} formLabel="apply">
      <FormCalendar form={form} allowFuture name="date" />
    </FormModal>
  );
}
