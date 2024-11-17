"use client";
import { useState } from "react";
import { Modal } from "./modal";

export function ViewSavings({ savings }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Modal
      title="view savings"
      description="view savings information here."
      triggerLabel="view savings"
      triggerIcon="view"
      className="w-full"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
    >
      <div>view</div>
    </Modal>
  );
}
