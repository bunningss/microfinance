"use client";
import { useState } from "react";
import { Modal } from "./modal";

export function WithdrawMoneyModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Modal
      title="টাকা উত্তোলন"
      description="একাউন্ট থেকে টাকা তুলুন।"
      triggerLabel="টাকা উত্তোলন"
      triggerIcon="plus"
      className="w-full"
      modalClassName="p-2 md:p-6"
      childrenClassName="overflow-auto max-h-[80vh]"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
    >
      withdraw-money-modal
    </Modal>
  );
}
