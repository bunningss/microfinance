"use client";

import { useForm } from "react-hook-form";
import { FormModal } from "../form/form-modal";
import { FormInput } from "../form/form-input";
import { FormSelect } from "../form/form-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { addStaffFormSchema } from "@/lib/schema";
import { useState } from "react";
import { postData } from "@/utils/api-calls";
import { errorNotification, successNotification } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { designations } from "@/lib/static";

export function AddStaff() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(addStaffFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      salary: "",
    },
  });

  const handleSubmit = async (data) => {
    setIsLoading(true);

    try {
      const res = await postData("staffs", data);
      if (res.error) return errorNotification(res.response.msg);

      successNotification(res.response.msg);
      router.push("/dashboard/staffs");
    } catch (err) {
      errorNotification("something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormModal
      form={form}
      loading={isLoading}
      disabled={isLoading}
      formLabel="add staff member"
      icon="save"
      onSubmit={handleSubmit}
    >
      <FormInput
        form={form}
        label="name / নাম"
        placeholder=""
        name="name"
        required
      />
      <FormInput
        form={form}
        label="email / ইমেইল"
        placeholder=""
        name="email"
        required
      />
      <div className="md:flex space-y-4 md:space-y-0 gap-2">
        <FormInput
          form={form}
          label="password / পাসওয়ার্ড"
          placeholder=""
          name="password"
          type="password"
          required
        />
        <FormInput
          form={form}
          label="confirm password / পাসওয়ার্ড নিশ্চিত করুন"
          placeholder=""
          type="password"
          name="confirmPassword"
          required
        />
      </div>
      <div className="flex gap-2">
        <FormSelect
          form={form}
          label="designation / পদবী"
          placeholder="select designation / পদবী নির্বাচন করুন"
          name="role"
          required
          options={designations}
        />
        <FormInput
          form={form}
          label="salary / বেতন"
          placeholder=""
          name="salary"
          required
        />
      </div>
    </FormModal>
  );
}
