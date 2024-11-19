"use client";
import { useForm, useWatch } from "react-hook-form";
import { FormModal } from "../form/form-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../form/form-input";
import { ImageDropzone } from "../dropzone";
import { useEffect, useState } from "react";
import { FormSelect } from "../form/form-select";
import { addMemberFormSchema } from "@/lib/schema";
import {
  errorNotification,
  successNotification,
  warningNotification,
} from "@/utils/toast";
import { postData } from "@/utils/api-calls";
import { savingsTypes } from "@/lib/static";
import { useEdgeStore } from "@/lib/edgestore";
import { useRouter } from "next/navigation";
import { SavingsInstallmentDetails } from "../savings-installment-details";
import { generateInstallments } from "@/utils/helpers";

export function AddMember() {
  const [userImage, setUserImage] = useState(null);
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
    resolver: zodResolver(addMemberFormSchema),
    defaultValues: {
      name: "",
      fathersName: "",
      mothersName: "",
      permVillage: "",
      permPostOffice: "",
      permPoliceStation: "",
      permDistrict: "",
      homePhone: "",
      currVillage: "",
      currPostOffice: "",
      currArea: "",
      currPoliceStation: "",
      currDistrict: "",
      phone: "",
      nidNumber: "",
      birthCertificateNumber: "",
      nationality: "",
      age: "",
      occupation: "",
      religion: "",
      savingsType: "",
      savingsAmount: "",
      savingsDuration: "",
      startDate: "",
      nomineeName: "",
      relationWithNominee: "",
      nomineeBirthDate: "",
      nomineeNidNumber: "",
      introducersName: "",
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
      if (!userImage || !nomineeImage)
        return warningNotification("ছবি যোগ করুন");

      const res = await postData("members", {
        ...data,
        memberImage: userImage,
        nomineeImage,
      });
      if (res.error) return errorNotification(res.response.msg);

      await Promise.all([
        edgestore.publicImages.confirmUpload({
          url: userImage,
        }),
        edgestore.publicImages.confirmUpload({
          url: nomineeImage,
        }),
      ]);

      router.push(`/dashboard/members/${res.response.payload}`);
      successNotification(res.response.msg);
    } catch (err) {
      errorNotification(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <SavingsInstallmentDetails installmentDetails={installmentDetails} />
      <FormModal
        form={form}
        loading={isLoading}
        disabled={isLoading}
        formLabel="Add"
        onSubmit={handleSubmit}
      >
        <ImageDropzone
          file={userImage}
          setFile={setUserImage}
          label="Applicant photo / আবেদনকারীর ছবি"
        />
        <FormInput
          form={form}
          name="name"
          label="Applicant Name / আবেদনকারীর নাম"
          placeholder=""
          required
        />
        <div className="flex flex-col lg:flex-row gap-2">
          <FormInput
            form={form}
            name="fathersName"
            label="Fathers Name / পিতা/স্বামীর নাম"
            placeholder=""
            required
          />
          <FormInput
            form={form}
            name="mothersName"
            label="Mothers name / মাতার নাম"
            placeholder=""
            required
          />
        </div>
        {/* Permanent address */}
        <div className="space-y-4 bg-accent p-2 rounded-md">
          <span className="capitalize border-b border-b-input w-full block pb-2 font-bold">
            Permanent address / স্থায়ী ঠিকানা
          </span>

          <div className="grid lg:grid-cols-3 gap-2">
            <FormInput
              form={form}
              name="permVillage"
              label="village / গ্রাম"
              placeholder=""
              required
            />
            <FormInput
              form={form}
              name="permPostOffice"
              label="post office / পোস্ট অফিস"
              placeholder=""
              required
            />
            <FormInput
              form={form}
              name="permPoliceStation"
              label="police station / থানা"
              placeholder=""
              required
            />
          </div>
          <div className="flex gap-2">
            <FormInput
              form={form}
              name="permDistrict"
              label="District / জেলা"
              placeholder=""
              required
            />
            <FormInput
              form={form}
              name="homePhone"
              label="Home phone / বাসায় ফোন"
              placeholder=""
              required
            />
          </div>
        </div>
        {/* Present address */}
        <div className="space-y-4 bg-accent p-2 rounded-md">
          <span className="capitalize border-b border-b-input w-full block pb-2 font-bold">
            present address / বর্তমান ঠিকানা
          </span>
          <div className="grid lg:grid-cols-3 gap-2 gap-y-4">
            <FormInput
              form={form}
              name="currVillage"
              label="village / গ্রাম"
              placeholder=""
              required
            />
            <FormInput
              form={form}
              name="currPostOffice"
              label="post office / পোস্ট অফিস"
              placeholder=""
              required
            />
            <FormInput
              form={form}
              name="currArea"
              label="area / এলাকা"
              placeholder=""
              required
            />
            <FormInput
              form={form}
              name="currPoliceStation"
              label="police station / থানা"
              placeholder=""
              required
            />
            <FormInput
              form={form}
              name="currDistrict"
              label="district / জেলা"
              placeholder=""
              required
            />
            <FormInput
              form={form}
              name="phone"
              label="phone number / ফোন নম্বর"
              placeholder=""
              required
            />
          </div>
        </div>
        <div className="flex gap-2">
          <FormInput
            form={form}
            name="nidNumber"
            label="NID Number / জাতীয় পরিচয় পত্র নং"
            placeholder=""
            required
          />
          <FormInput
            form={form}
            name="birthCertificateNumber"
            label="birth certificate number / জন্ম সনদ নং"
            placeholder=""
          />
        </div>
        <div className="flex gap-2">
          <FormInput
            form={form}
            name="nationality"
            label="nationality / জাতীয়তা"
            placeholder=""
            required
          />
          <FormInput
            form={form}
            name="age"
            label="age / বয়স"
            placeholder=""
            required
          />
        </div>
        <div className="flex gap-2">
          <FormInput
            form={form}
            name="occupation"
            label="occupation / পেশা"
            placeholder=""
            required
          />
          <FormInput
            form={form}
            name="religion"
            label="religion / ধর্ম"
            placeholder=""
            required
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
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
        </div>
        <FormInput
          form={form}
          name="startDate"
          label="start date / শুরুর তারিখ"
          placeholder=""
          required
          type="date"
        />

        <div className="space-y-4 bg-accent p-2 rounded-md">
          <span className="capitalize border-b border-b-input w-full block pb-2 font-bold">
            Nominee information / নমিনির তথ্য
          </span>
          <ImageDropzone
            className="bg-background"
            setFile={setNomineeImage}
            file={nomineeImage}
            label="Nominee's photo / মনোনীত ব্যক্তির ছবি"
          />
          <div className="flex flex-col lg:flex-row gap-2">
            <FormInput
              form={form}
              name="nomineeName"
              label="Nominee Name / নমিনির নাম"
              placeholder=""
              required
            />
            <FormInput
              form={form}
              name="relationWithNominee"
              label="relation with nominee / নমিনির সাথে সম্পর্ক"
              placeholder=""
              required
            />
          </div>
          <FormInput
            form={form}
            name="nomineeBirthDate"
            label="birth date / জন্ম তারিখ"
            placeholder=""
            required
            type="date"
          />
          <div className="flex flex-col lg:flex-row gap-2">
            <FormInput
              form={form}
              name="nomineeNidNumber"
              label="nominee NID number / নমিনির জাতীয় পরিচয় পত্র নং"
              placeholder=""
              required
            />
            <FormInput
              form={form}
              name="introducersName"
              label="Introducers Name / পরিচয়কারীর নাম"
              placeholder=""
              required
            />
          </div>
        </div>
      </FormModal>
    </div>
  );
}
