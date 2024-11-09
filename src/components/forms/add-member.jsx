"use client";
import { useForm } from "react-hook-form";
import { FormModal } from "../form/form-modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../form/form-input";
import { ImageDropzone } from "../dropzone";
import { useState } from "react";

const formSchema = z.object({});

export function AddMember() {
  const [file, setFile] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (data) => {};

  return (
    <FormModal form={form} formLabel="Add" onSubmit={handleSubmit}>
      <ImageDropzone file={file} setFile={setFile} />
      <FormInput form={form} label="Full Name" />
    </FormModal>
  );
}
