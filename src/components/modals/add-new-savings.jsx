"use client";
import { useState } from "react";
import { Modal } from "./modal";
import { FormModal } from "../form/form-modal";
import { FormInput } from "../form/form-input";
import { useForm } from "react-hook-form";
import { FormSelect } from "../form/form-select";
import { savingsTypes } from "@/lib/static";
import { postData } from "@/utils/api-calls";
import { errorNotification, successNotification } from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewSavingsSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";

export function AddNewSavings({ member }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(addNewSavingsSchema),
    defaultValues: {
      savingsType: "",
      savingsAmount: "",
      savingsDuration: "",
      startDate: "",
    },
  });

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { error, response } = await postData("savings", {
        ...data,
        owner: member?._id,
      });
      if (error) return errorNotification(response.msg);

      successNotification(response.msg);
      setIsModalOpen(false);
      form.reset();
      router.refresh();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="add savings"
      description="Add savings information here. Click save when you're done."
      triggerLabel="নতুন সঞ্চয়"
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
        loading={isLoading}
        disabled={isLoading}
        setIsModalOpen={setIsModalOpen}
        withCancelButton
      >
        <FormInput
          form={form}
          name="savingsAmount"
          label="savings amount / সঞ্চয়ের পরিমাণ"
          placeholder=""
          required
        />
        <FormInput
          form={form}
          name="savingsDuration"
          label="savings Duration / সঞ্চয়ের সময়কাল"
          placeholder=""
          required
        />
        <FormSelect
          form={form}
          label="Savings type / সঞ্চয়ের ধরণ"
          name="savingsType"
          placeholder="select type"
          options={savingsTypes}
          required
        />
        <FormInput
          form={form}
          name="startDate"
          label="start date / শুরুর তারিখ"
          placeholder=""
          required
          type="date"
        />
      </FormModal>
    </Modal>
  );
}
