"use client";
import { useState } from "react";
import { Modal } from "./modal";

export function ViewLoans() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Modal
      title="view loans"
      description="view loan information here."
      triggerLabel="ঋণ দেখুন"
      triggerIcon="view"
      className="w-full"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
    >
      <div>view Loans</div>
    </Modal>
  );
}
