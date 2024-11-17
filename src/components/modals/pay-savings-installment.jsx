"use client";

import { useState } from "react";
import { Modal } from "./modal";
import { FormSelect } from "../form/form-select";
import { FormModal } from "../form/form-modal";
import { useForm } from "react-hook-form";
import { FormInput } from "../form/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { payInstallmentSchema } from "@/lib/schema";

export function PaySavingsInstallment({ installments }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(payInstallmentSchema),
    defaultValues: {
      installment: "",
      amount: installments[0].amount,
    },
  });

  return (
    <Modal
      title="pay installment"
      description="Add installment information here. Click save when you're done."
      triggerIcon="plus"
      triggerSize="icon"
      className="rounded-full"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
    >
      <div className="space-y-4">
        <span>Remaining installments / বাকি কিস্তি: {installments.length}</span>

        <FormModal form={form} formLabel="pay installment">
          <FormSelect
            form={form}
            options={installments}
            label="select installment"
            name="installment"
            keyName="date"
            keyValue="_id"
            keyType="date"
            placeholder="select installment"
          />
          <FormInput form={form} label="amount" name="amount" disabled />
        </FormModal>
      </div>
    </Modal>
  );
}
