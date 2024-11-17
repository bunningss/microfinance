"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

export function FormModal({
  form,
  onSubmit,
  children,
  formLabel,
  icon,
  loading,
  disabled,
  setIsModalOpen,
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {children}
        <div className="grid grid-cols-2 gap-2">
          <Button
            icon={icon}
            type="submit"
            className="w-full"
            loading={loading}
            disabled={disabled}
          >
            {formLabel}
          </Button>
          <Button
            icon="close"
            type="button"
            variant="destructive"
            className="w-full"
            loading={loading}
            disabled={disabled}
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
