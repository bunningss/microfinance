"use client";

import { useState } from "react";
import { FormModal } from "../form/form-modal";
import { Modal } from "./modal";
import { useForm } from "react-hook-form";

export function AddNewDeposit() {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm({});

  const handleSubmit = async () => {};

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
      ></FormModal>
    </Modal>
  );
}
