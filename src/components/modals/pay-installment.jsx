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
import { translateCurrency } from "@/utils/helpers";

export function PayInstallment({ installments, label, type }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(payInstallmentSchema),
    defaultValues: {
      installmentId: "",
    },
  });

  let urls = {
    requestUrl: "",
    redirectUrl: "",
  };

  switch (type) {
    case "loan":
      urls.redirectUrl = "/dashboard/loan-installments/receipt";
      urls.requestUrl = "loan/loan-installments";
      break;
    case "savings":
      urls.redirectUrl = "/dashboard/savings-installments/receipt";
      urls.requestUrl = "savings-installments";
      break;
    default:
      break;
  }

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);

      const { error, response } = await putData(urls.requestUrl, data);
      if (error) return errorNotification(response.msg);

      router.push(`${urls.redirectUrl}/${data.installmentId}`);
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
      className={label ? "h-6 text-xs" : "rounded-full"}
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
          {translateCurrency(installments ? installments[0]?.amount : "")}
        </p>
      </FormModal>
    </Modal>
  );
}
