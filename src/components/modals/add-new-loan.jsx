"use client";
import { useState } from "react";
import { FormModal } from "../form/form-modal";
import { Modal } from "./modal";
import { useForm } from "react-hook-form";

export function AddNewLoan() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm();

  return (
    <Modal
      title="add loan"
      description="Add loan here. Click save when you're done."
      triggerLabel="নতুন ঋণ"
      triggerIcon="plus"
      className="w-full"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
    >
      <FormModal form={form}></FormModal>
    </Modal>
  );
}
