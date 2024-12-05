"use client";

import { useState } from "react";
import { FormModal } from "../form/form-modal";
import { Modal } from "./modal";
import { useForm } from "react-hook-form";
import { FormInput } from "../form/form-input";
import { FormTextarea } from "../form/form-textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDepositSchema } from "@/lib/schema";
import { FormCalendar } from "../form/form-calendar";
import { errorNotification, successNotification } from "@/utils/toast";
import { postData } from "@/utils/api-calls";
import { useRouter } from "next/navigation";

export function AddNewDeposit() {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(addDepositSchema),
    defaultValues: {
      title: "",
      amount: "",
      date: "",
      description: "",
    },
  });

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);

      const { error, response } = await postData("deposits", data);
      if (error) return errorNotification(response.msg);

      successNotification(response.msg);
      router.refresh();
      setIsModalOpen(false);
    } catch (err) {
      errorNotification(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="add deposit"
      description="Add deposit information here. Click save when you're done."
      triggerLabel="জমা করুন"
      triggerIcon="plus"
      className="w-full"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
    >
      <FormModal
        form={form}
        onSubmit={handleSubmit}
        formLabel="save"
        icon="save"
        loading={isLoading}
        disabled={isLoading}
        setIsModalOpen={setIsModalOpen}
        withCancelButton
      >
        <FormInput
          form={form}
          name="title"
          placeholder=""
          required
          label="Title"
        />
        <FormInput
          form={form}
          name="amount"
          placeholder=""
          required
          label="Amount"
        />
        <FormCalendar
          form={form}
          name="date"
          placeholder="Select Date"
          required
          label="Date"
        />
        <FormTextarea
          form={form}
          name="description"
          placeholder=""
          label="Description"
        />
      </FormModal>
    </Modal>
  );
}
