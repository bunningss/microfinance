"use client";
import { useState } from "react";
import { Modal } from "./modal";
import { FormModal } from "../form/form-modal";
import { useForm } from "react-hook-form";
import { FormInput } from "../form/form-input";
import { FormTextarea } from "../form/form-textarea";
import { FormCalendar } from "../form/form-calendar";

export function AddOtherExpense() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm();

  const handleSubmit = async (data) => {};

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
        setIsModalOpen={setIsModalOpen}
        withCancelButton
      >
        <FormInput form={form} name="name" label="Name / নাম" />
        <FormCalendar form={form} name="date" label="Date / তারিখ" />
        <FormTextarea
          form={form}
          name="description"
          label="description / বর্ণনা"
        />
      </FormModal>
    </Modal>
  );
}
