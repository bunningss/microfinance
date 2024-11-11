"use client";
import { useState } from "react";
import { Modal } from "./modal";
import { FormModal } from "../form/form-modal";
import { useForm } from "react-hook-form";
import { FormSelect } from "../form/form-select";
import { FormInput } from "../form/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { addSalarySchema } from "@/lib/schema";

export function AddSalary({ staffs }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(addSalarySchema),
    defaultValues: {
      staffName: "",
      month: "",
      amount: "",
    },
  });

  const handleSubmit = async () => {};

  return (
    <Modal
      title="add salary"
      description="add salary information here. Click save when you're done."
      triggerLabel="add salary"
      triggerIcon="plus"
      className="w-full"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
    >
      <FormModal
        form={form}
        loading={isLoading}
        disabled={setIsLoading}
        formLabel="add salary"
      >
        <FormSelect
          form={form}
          name="staffName"
          label="select staff"
          placeholder="select staff"
          required
          options={staffs}
          keyName="name"
          keyValue="_id"
        />
        <FormSelect
          form={form}
          name="month"
          label="select month"
          placeholder="select month"
          required
        />
        <FormInput form={form} name="amount" label="amount" required />
      </FormModal>
    </Modal>
  );
}
