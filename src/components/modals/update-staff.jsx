"use client";
import { putData } from "@/utils/api-calls";
import { errorNotification, successNotification } from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Modal } from "./modal";
import { FormModal } from "../form/form-modal";
import { FormInput } from "../form/form-input";
import { FormSelect } from "../form/form-select";

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters.",
    })
    .max(50),
  role: z.enum(["admin", "staff", "marketing officer"], {
    required_error: "Please select a role.",
    message: "Please select a role.",
  }),
  salary: z.union([z.string(), z.number()]),
});

const roleOptions = [
  {
    name: "admin",
    value: "admin",
  },
  {
    name: "marketing officer",
    value: "marketing officer",
  },
  {
    name: "staff",
    value: "staff",
  },
];

export function UpdateStaff({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name,
      role: data?.role,
      salary: data?.salary,
    },
  });

  const handleSubmit = async (formData) => {
    setIsLoading(true);

    try {
      const res = await putData(`staffs/${data?._id}`, formData);

      if (res.error) {
        return errorNotification(res.response.msg);
      }

      successNotification(res.response.msg);
      setIsModalOpen(false);
      form.reset();
      router.refresh();
    } catch (err) {
      errorNotification(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Edit staff"
      description="Make changes here. Click save when you're done."
      triggerIcon="edit"
      className="rounded-full"
      triggerSize="icon"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
    >
      <FormModal
        onSubmit={handleSubmit}
        form={form}
        loading={isLoading}
        disabled={isLoading}
        formLabel="update"
      >
        <FormInput form={form} name="name" placeholder="" label="name" />
        <FormSelect
          form={form}
          options={roleOptions}
          placeholder="select role"
          name="role"
          label="role"
        />
        <FormInput form={form} name="salary" placeholder="" label="salary" />
      </FormModal>
    </Modal>
  );
}
