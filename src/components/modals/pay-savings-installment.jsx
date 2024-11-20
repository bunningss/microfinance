"use client";
import { useState } from "react";
import { Modal } from "./modal";
import { FormSelect } from "../form/form-select";
import { FormModal } from "../form/form-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { payInstallmentSchema } from "@/lib/schema";
import { errorNotification, successNotification } from "@/utils/toast";
import { putData } from "@/utils/api-calls";
import { useRouter } from "next/navigation";
import { formatNumber } from "@/utils/helpers";

export function PaySavingsInstallment({ installments, label }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(payInstallmentSchema),
    defaultValues: {
      installmentId: "",
    },
  });

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);

      const { error, response } = await putData("savings-installments", data);
      if (error) return errorNotification(response.msg);

      router.push(
        `/dashboard/savings-installments/receipt/${data.installmentId}`
      );
      successNotification(response.msg);
      form.reset();
      setIsModalOpen(false);
    } catch (err) {
      errorNotification(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="pay installment"
      description="Add installment information here. Click save when you're done."
      triggerIcon={label ? "" : "plus"}
      triggerSize={label ? "" : "icon"}
      className={label ? "" : "rounded-full"}
      triggerLabel={label}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
    >
      <FormModal
        form={form}
        onSubmit={handleSubmit}
        loading={isLoading}
        disabled={isLoading}
        formLabel="pay installment"
        icon="save"
      >
        <FormSelect
          form={form}
          options={installments}
          label="select installment"
          name="installmentId"
          keyName="date"
          keyValue="_id"
          keyType="date"
          placeholder="select installment"
        />
        <p>
          <span className="text-muted-foreground">Amount:</span>{" "}
          {formatNumber(installments ? installments[0]?.amount : "")}
        </p>
      </FormModal>
    </Modal>
  );
}
