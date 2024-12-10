"use client";
import { useState } from "react";
import { Modal } from "./modal";
import { FormModal } from "../form/form-modal";
import { useForm } from "react-hook-form";
import { FormInput } from "../form/form-input";
import { FormTextarea } from "../form/form-textarea";
import { FormCalendar } from "../form/form-calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { addExpenseSchema } from "@/lib/schema";
import { errorNotification, successNotification } from "@/utils/toast";
import { postData } from "@/utils/api-calls";
import { useRouter } from "next/navigation";

export function AddOtherExpense() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(addExpenseSchema),
    defaultValues: {
      name: "",
      description: "",
      date: new Date(),
      amount: "",
    },
  });

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);

      const { error, response } = await postData("expenses", data);
      if (error) return errorNotification(response.msg);

      form.reset();
      router.refresh();
      successNotification(response.msg);
      setIsModalOpen(false);
    } catch (err) {
      errorNotification(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="add expense"
      description="Add expense information here. Click save when you're done."
      triggerLabel="অন্যান্য"
      triggerIcon="plus"
      className="w-full"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
    >
      <FormModal
        form={form}
        onSubmit={handleSubmit}
        loading={isLoading}
        disabled={isLoading}
        formLabel="save"
        icon="save"
        setIsModalOpen={setIsModalOpen}
        withCancelButton
      >
        <FormInput form={form} name="name" label="Title / নাম" required />
        <FormInput
          form={form}
          name="amount"
          label="Amount / টাকার পরিমাণ"
          required
        />
        <FormCalendar form={form} name="date" label="Date / তারিখ" required />
        <FormTextarea
          form={form}
          name="description"
          label="description / বর্ণনা"
        />
      </FormModal>
    </Modal>
  );
}
