"use client";
import { useForm } from "react-hook-form";
import { FormInput } from "../form/form-input";
import { FormModal } from "../form/form-modal";
import { useState } from "react";
import { errorNotification, successNotification } from "@/utils/toast";
import { getData } from "@/utils/api-calls";
import { zodResolver } from "@hookform/resolvers/zod";
import { savingInstallmentSchema } from "@/lib/schema";

export function SearchMemberInstallments({ setSavingsData }) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(savingInstallmentSchema),
    defaultValues: {
      nidNumber: "",
    },
  });

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);

      const res = await getData(`/savings-installments/${data.nidNumber}`, 0);
      if (res.error) {
        setSavingsData(null);
        return errorNotification(res.response.msg);
      }

      successNotification(res.response.msg);
      setSavingsData(res.response.payload);
    } catch (err) {
      errorNotification(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormModal
      form={form}
      onSubmit={handleSubmit}
      icon="search"
      formLabel="search"
      loading={isLoading}
      disabled={isLoading}
    >
      <FormInput form={form} name="nidNumber" />
    </FormModal>
  );
}
