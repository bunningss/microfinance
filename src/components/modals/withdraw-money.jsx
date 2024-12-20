"use client";
import { useState } from "react";
import { Modal } from "./modal";
import { FormModal } from "../form/form-modal";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormInput } from "../form/form-input";
import { FormTextarea } from "../form/form-textarea";
import { postData } from "@/utils/api-calls";
import { errorNotification, successNotification } from "@/utils/toast";
import { FormCalendar } from "../form/form-calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { withdrawMoneySchema } from "@/lib/schema";

export function WithdrawMoney({ id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(withdrawMoneySchema),
    defaultValues: {
      amount: "",
      date: new Date(),
      comment: "",
    },
  });

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);

      const { error, response } = await postData("expenses/withdraw", {
        ...data,
        userId: id,
      });
      if (error) return errorNotification(response.msg);

      form.reset();
      setIsModalOpen(false);
      router.refresh();
      return successNotification(response.msg);
    } catch (err) {
      errorNotification(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="টাকা উত্তোলন"
      description="একাউন্ট থেকে টাকা তুলুন।"
      triggerLabel="টাকা উত্তোলন"
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
      >
        <FormInput
          form={form}
          name="amount"
          label="Amount / টাকার পরিমান"
          placeholder=""
          required
        />
        <FormCalendar
          name="date"
          form={form}
          required
          label="Withdrawal date / টাকা উত্তোলনের তারিখ"
        />
        <FormTextarea
          form={form}
          name="comment"
          label="Comment / মতামত"
          placeholder=""
        />
      </FormModal>
    </Modal>
  );
}
