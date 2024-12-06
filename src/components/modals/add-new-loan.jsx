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
import { addNewLoanSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { generateLoanInstallments } from "@/utils/helpers";
import { LoanInstallmentDetails } from "../loan-installment-details";

export function AddNewLoan({ member }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [installmentDetails, setInstallmentDetails] = useState({
    count: 0,
    totalAmount: 0,
    lastDate: "",
    amountPerInstallment: "",
  });

  const form = useForm({
    resolver: zodResolver(addNewLoanSchema),
    defaultValues: {
      loanType: "",
      loanAmount: "",
      loanDuration: "",
      startDate: "",
    },
  });

  const { control } = form;

  // Watch form inputs
  const watchLoanType = useWatch({ control, name: "loanType" });
  const watchLoanAmount = useWatch({ control, name: "loanAmount" });
  const watchLoanDuration = useWatch({ control, name: "loanDuration" });
  const watchStartDate = useWatch({ control, name: "startDate" });

  useEffect(() => {
    if (
      watchLoanType &&
      watchLoanAmount &&
      watchLoanDuration &&
      watchStartDate
    ) {
      const installments = generateLoanInstallments(
        watchStartDate,
        watchLoanType,
        parseInt(watchLoanDuration),
        parseFloat(watchLoanAmount)
      );

      setInstallmentDetails({
        count: installments.length,
        totalAmount: installments[0].totalAmount,
        amountPerInstallment: installments[0].amount,
        lastDate: installments.at(-1)?.date || "",
      });
    }
  }, [watchLoanType, watchLoanAmount, watchLoanDuration, watchStartDate]);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { error, response } = await postData("loan", {
        ...data,
        owner: member?._id,
      });
      if (error) return errorNotification(response.msg);

      successNotification(response.msg);
      setIsModalOpen(false);
      form.reset();
      router.push(`/dashboard/members/loan/${response.payload}`);
    } catch (err) {
      errorNotification(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="add loan"
      description="Add loan information here. Click save when you're done."
      triggerLabel="নতুন ঋণ"
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
          name="loanAmount"
          label="loan amount / ঋণের পরিমাণ"
          placeholder=""
          required
        />
        <FormInput
          form={form}
          name="loanDuration"
          label="loan Duration / ঋণের সময়কাল (মাসের সংখ্যা)"
          placeholder=""
          required
        />
        <FormSelect
          form={form}
          label="loan type / ঋণের ধরণ"
          name="loanType"
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
      <LoanInstallmentDetails
        installmentDetails={installmentDetails}
        className="static mt-4"
      />
    </Modal>
  );
}
