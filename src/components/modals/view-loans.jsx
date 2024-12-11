"use client";
import { useState } from "react";
import { Modal } from "./modal";
import { LoanCard } from "../cards/loan-card";
import { CardView } from "../card-view";

export function ViewLoans({ loans }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Modal
      title="view loans"
      description="view loan information here."
      triggerLabel="ঋণ দেখুন"
      triggerIcon="view"
      className="w-full"
      modalClassName="p-2 md:p-6"
      childrenClassName="overflow-y-auto max-h-[70vh]"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
    >
      <CardView className="md:grid-cols-1 xl:grid-cols-1">
        {loans?.map((loan, index) => (
          <LoanCard key={index} data={loan} />
        ))}
      </CardView>
    </Modal>
  );
}
