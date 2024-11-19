"use client";
import { useEffect, useState } from "react";
import { Modal } from "./modal";
import { FormModal } from "../form/form-modal";
import { FormInput } from "../form/form-input";
import { useForm, useWatch } from "react-hook-form";
import { FormSelect } from "../form/form-select";
import { savingsTypes } from "@/lib/static";
import { postData } from "@/utils/api-calls";
import { errorNotification, successNotification } from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewSavingsSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { generateInstallments } from "@/utils/helpers";
import { SavingsInstallmentDetails } from "../savings-installment-details";

export function AddNewSavings({ member }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [installmentDetails, setInstallmentDetails] = useState({
    count: 0,
    totalAmount: 0,
    lastDate: "",
  });
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

  const { control } = form;

  // Watch form inputs
  const watchSavingsType = useWatch({ control, name: "savingsType" });
  const watchSavingsAmount = useWatch({ control, name: "savingsAmount" });
  const watchSavingsDuration = useWatch({ control, name: "savingsDuration" });
  const watchStartDate = useWatch({ control, name: "startDate" });

  useEffect(() => {
    if (
      watchSavingsType &&
      watchSavingsAmount &&
      watchSavingsDuration &&
      watchStartDate
    ) {
      const installments = generateInstallments(
        watchStartDate,
        watchSavingsType,
        parseInt(watchSavingsDuration),
        parseFloat(watchSavingsAmount)
      );

      setInstallmentDetails({
        count: installments.length,
        totalAmount: installments.reduce(
          (sum, installment) => sum + installment.amount,
          0
        ),
        lastDate: installments[installments.length - 1]?.date || "",
      });
    }
  }, [
    watchSavingsType,
    watchSavingsAmount,
    watchSavingsDuration,
    watchStartDate,
  ]);

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
          label="savings Duration / সঞ্চয়ের সময়কাল (মাসের সংখ্যা)"
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
      <SavingsInstallmentDetails
        installmentDetails={installmentDetails}
        className="static mt-4"
      />
    </Modal>
  );
}
