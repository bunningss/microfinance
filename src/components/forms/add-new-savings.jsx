"use client";
import { useEffect, useState } from "react";
import { FormModal } from "../form/form-modal";
import { FormInput } from "../form/form-input";
import { useForm, useWatch } from "react-hook-form";
import { FormSelect } from "../form/form-select";
import { savingsTypes } from "@/lib/static";
import { postData } from "@/utils/api-calls";
import {
  errorNotification,
  successNotification,
  warningNotification,
} from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewSavingsSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { generateInstallments } from "@/utils/helpers";
import { SavingsInstallmentDetails } from "../savings-installment-details";
import { FormCalendar } from "../form/form-calendar";
import { ImageDropzone } from "../dropzone";
import { useEdgeStore } from "@/lib/edgestore";

export function AddNewSavings({ member }) {
  const [nomineeImage, setNomineeImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [installmentDetails, setInstallmentDetails] = useState({
    count: 0,
    totalAmount: 0,
    lastDate: "",
  });
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const form = useForm({
    resolver: zodResolver(addNewSavingsSchema),
    defaultValues: {
      savingsType: "",
      savingsAmount: "",
      savingsDuration: "",
      startDate: "",
      nomineeName: "",
      relationWithNominee: "",
      nomineeBirthDate: "",
      nomineeNidNumber: "",
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
      if (!nomineeImage) return warningNotification("ছবি যোগ করুন");
      const { error, response } = await postData("savings", {
        ...data,
        nomineeImage,
        owner: member?._id,
      });
      if (error) return errorNotification(response.msg);

      await edgestore.publicImages.confirmUpload({
        url: nomineeImage,
      });

      successNotification(response.msg);
      form.reset();
      router.push(`/dashboard/members/savings/${response.payload}`);
    } catch (err) {
      errorNotification(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <FormModal
        form={form}
        onSubmit={handleSubmit}
        formLabel="save"
        icon="save"
        loading={isLoading}
        disabled={isLoading}
      >
        <ImageDropzone
          className="bg-background"
          setFile={setNomineeImage}
          file={nomineeImage}
          label="Nominee's photo / মনোনীত ব্যক্তির ছবি"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <FormInput
            form={form}
            name="savingsAmount"
            label="savings amount / সঞ্চয়ের পরিমাণ"
            required
          />
          <FormInput
            form={form}
            name="savingsDuration"
            label="savings Duration / সঞ্চয়ের সময়কাল (মাসের সংখ্যা)"
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
          <FormCalendar
            form={form}
            name="startDate"
            label="start date / শুরুর তারিখ"
            required
          />

          <FormInput
            form={form}
            name="nomineeName"
            label="Nominee Name / নমিনির নাম"
            required
          />
          <FormInput
            form={form}
            name="relationWithNominee"
            label="relation with nominee / নমিনির সাথে সম্পর্ক"
            required
          />
          <FormInput
            form={form}
            name="nomineeNidNumber"
            label="nominee NID number / নমিনির জাতীয় পরিচয় পত্র নং"
            required
          />
          <FormCalendar
            form={form}
            name="nomineeBirthDate"
            label="birth date / জন্ম তারিখ"
            required
          />
        </div>
      </FormModal>
      <SavingsInstallmentDetails
        installmentDetails={installmentDetails}
        className="static mt-4"
      />
    </div>
  );
}
