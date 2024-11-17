"use client";
import { useState } from "react";
import { Modal } from "./modal";
import { CardView } from "../card-view";
import { SavingsCard } from "../cards/savings-card";

export function ViewSavings({ savings }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Modal
      title="view savings"
      description="View savings information here."
      triggerLabel="view savings"
      triggerIcon="view"
      className="w-full"
      childrenClassName="overflow-auto max-h-[80vh]"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
    >
      <CardView className="md:grid-cols-1">
        {savings?.map((saving, index) => (
          <SavingsCard data={saving} key={index} />
        ))}
      </CardView>
    </Modal>
  );
}