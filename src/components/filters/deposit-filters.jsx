"use client";

import { useForm } from "react-hook-form";
import { FormModal } from "../form/form-modal";
import { FormCalendar } from "../form/form-calendar";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { formatDate, translateDate } from "@/utils/helpers";
import { errorNotification } from "@/utils/toast";
import { AddNewDeposit } from "../modals/add-new-deposit";

export function DepositFilters() {
  const form = useForm({});
  const searchParams = useSearchParams();
  const router = useRouter();

  const placeholderText = searchParams.get("date")
    ? translateDate(new Date(searchParams.get("date")).toDateString())
    : translateDate(new Date(Date.now()).toDateString());

  const handleSubmit = (data) => {
    if (!data.date) return errorNotification("Please select date.");
    router.push(`?date=${formatDate(data.date)}`);
  };

  const handleClear = () => {
    router.push(`?`);
    form.reset();
  };

  return (
    <div>
      <section className="grid md:grid-cols-2 gap-2 md:gap-4">
        <div className="space-y-2">
          <FormModal
            form={form}
            onSubmit={handleSubmit}
            formLabel="খুজুন"
            icon="search"
          >
            <FormCalendar
              form={form}
              allowFuture
              name="date"
              placeholder={placeholderText}
            />
          </FormModal>
          <Button variant="destructive" onClick={handleClear}>
            Clear
          </Button>
        </div>
        <AddNewDeposit />
      </section>
    </div>
  );
}
