"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormModal } from "../form/form-modal";
import { FormInput } from "../form/form-input";
import { Button } from "../ui/button";

const formSchema = z.object({
  searchKey: z.string().optional().nullable(),
});

export function MembersFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchKey: "",
      sortBy: "",
    },
  });

  const handleSubmit = useCallback(
    (data) => {
      const params = new URLSearchParams(searchParams);
      params.set("searchKey", data.searchKey || "");
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const handleClear = useCallback(() => {
    form.reset({
      searchKey: "",
    });

    router.push(`${pathname}`);
  }, [form, router, pathname]);

  return (
    <div className="space-y-2 print:hidden">
      <FormModal form={form} formLabel="search" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <FormInput
            form={form}
            name="searchKey"
            placeholder="সদস্যের নাম বা NID নম্বর"
          />
        </div>
      </FormModal>
      <Button variant="destructive" icon="delete" onClick={handleClear}>
        Clear
      </Button>
    </div>
  );
}
