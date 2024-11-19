"use client";
import { useForm } from "react-hook-form";
import { FormModal } from "../form/form-modal";
import { FormSelect } from "../form/form-select";

const months = [
  {
    name: "January",
    value: "january",
  },
  {
    name: "February",
    value: "february",
  },
  {
    name: "March",
    value: "march",
  },
  {
    name: "April",
    value: "april",
  },
  {
    name: "May",
    value: "may",
  },
  {
    name: "June",
    value: "june",
  },
  {
    name: "July",
    value: "july",
  },
  {
    name: "August",
    value: "august",
  },
  {
    name: "September",
    value: "september",
  },
  {
    name: "October",
    value: "october",
  },
  {
    name: "November",
    value: "november",
  },
  {
    name: "December",
    value: "december",
  },
];

export function SalaryFilters({ staffs }) {
  const form = useForm({});

  const handleSubmit = async (data) => {};

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = 2024; year <= currentYear; year++) {
    years.push({ name: year, value: year.toString() });
  }

  return (
    <div className="print:hidden">
      <FormModal form={form} onSubmit={handleSubmit} formLabel="apply">
        <div className="grid grid-cols-2 gap-2">
          <FormSelect form={form} placeholder="select month" options={months} />
          <FormSelect form={form} placeholder="select year" options={years} />
          <FormSelect form={form} placeholder="select staff" options={[]} />
        </div>
      </FormModal>
    </div>
  );
}
