"use client";

import { useForm } from "react-hook-form";
import { FormModal } from "../form/form-modal";
import { FormCalendar } from "../form/form-calendar";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { translateDate } from "@/utils/helpers";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  date: z.date({
    message: "তারিখ নির্বাচন করুন",
  }),
});

export function DateFilter({ allowFuture }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
    },
  });
  const searchParams = useSearchParams();
  const router = useRouter();

  const placeholderText = searchParams.get("date")
    ? translateDate(new Date(searchParams.get("date")))
    : translateDate(new Date(Date.now()));

  const handleSubmit = (data) => {
    router.push(`?date=${new Date(data.date).toISOString()}`);
  };

  const handleClear = () => {
    router.push(`?`);
    form.reset();
  };

  return (
    <section className="space-y-2">
      <FormModal
        form={form}
        onSubmit={handleSubmit}
        formLabel="খুজুন"
        icon="search"
      >
        <FormCalendar
          form={form}
          name="date"
          placeholder={placeholderText}
          allowFuture={allowFuture}
        />
      </FormModal>
      <Button variant="destructive" onClick={handleClear}>
        Clear
      </Button>
    </section>
  );
}
