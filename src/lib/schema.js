import { z } from "zod";
import { availableRoles } from "./static";

export const addMemberFormSchema = z.object({
  name: z.string().min(1, "Applicant Name is required"),
  memberNumber: z.string().min(1, "Member Number is required"),
  fathersName: z.string().optional().nullable(),
  husbandsName: z.string().optional().nullable(),
  mothersName: z.string().min(1, "Mother's Name is required"),
  permVillage: z.string().min(1, "Permanent village is required"),
  permPostOffice: z.string().min(1, "Permanent post office is required"),
  permPoliceStation: z.string().min(1, "Permanent police station is required"),
  permDistrict: z.string().min(1, "Permanent district is required"),
  homePhone: z.string().min(1, "Home phone is required"),
  currVillage: z.string().min(1, "Current village is required"),
  currPostOffice: z.string().min(1, "Current post office is required"),
  currArea: z.string().min(1, "Current area is required"),
  currPoliceStation: z.string().min(1, "Current police station is required"),
  currDistrict: z.string().min(1, "Current district is required"),
  phone: z.string().min(1, "Phone number is required"),
  nidNumber: z.string().min(1, "NID number is required"),
  birthCertificateNumber: z.string().nullable(),
  nationality: z.string().nullable(),
  occupation: z.string().min(1, "Occupation is required"),
  religion: z.string().min(1, "Religion is required"),
  savingsType: z.enum(["daily", "weekly", "monthly"], {
    message: "Invalid savings type",
  }),
  savingsAmount: z.string().min(1, "Savings amount is required"),
  savingsDuration: z.string().min(1, "Savings duration is required"),
  startDate: z
    .string()
    .min(1, "Start date is required")
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, "Invalid date format"),
  nomineeName: z.string().min(1, "Nominee name is required"),
  relationWithNominee: z.string().min(1, "Relation with nominee is required"),
  nomineeBirthDate: z.string().min(1, {
    message: "Nominee birth date is required",
  }),
  nomineeNidNumber: z.string().min(1, {
    message: "Nominee NID number is required",
  }),
  introducersName: z.string().min(1, {
    message: "Introducer's name is required",
  }),
});

// Add staff schema
export const addStaffFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").min(1, "Email address is required"),
  phone: z.string().min(11, "Phone number is required"),
  password: z.string().min(1, "Password is required"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
  role: z.enum(availableRoles, {
    message: "Invalid role",
  }),
  salary: z.string().min(1, "Salary is required"),
});

// Add salary Schema
export const addSalarySchema = z.object({
  staff: z.string().min(1, {
    message: "Please select staff.",
  }),
  month: z.string().min(3, {
    message: "Please select month.",
  }),
  amount: z.string().min(2, {
    message: "Please select amount.",
  }),
  paymentDate: z.date({
    message: "তারিখ নির্বাচন করুন",
  }),
});

// Add savings schema
export const addNewSavingsSchema = z.object({
  savingsType: z.enum(["daily", "weekly", "monthly"], {
    message: "Invalid savings type",
  }),
  savingsAmount: z.string().min(1, "Savings amount is required"),
  savingsDuration: z.string().min(1, "Savings duration is required"),
  startDate: z
    .string()
    .min(1, "Start date is required")
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, "Invalid date format"),
});

// Add loan schema
export const addNewLoanSchema = z.object({
  loanType: z.enum(["daily", "weekly", "monthly"], {
    message: "Invalid loan type",
  }),
  loanAmount: z.string().min(1, "Loan amount is required"),
  loanDuration: z.string().min(1, "Loan duration is required"),
  startDate: z
    .string()
    .min(1, "Start date is required")
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, "Invalid date format"),
});

// search installment schema
export const savingInstallmentSchema = z.object({
  nidNumber: z.string().min(1, {
    message: "সদস্য নম্বর অথবা জাতীয় পরিচয়পত্র নম্বর প্রদান করুন",
  }),
});

// Pay installment schema
export const payInstallmentSchema = z.object({
  installmentId: z.string(),
  date: z.date({
    message: "তারিখ নির্বাচন করুন",
  }),
});

// Add expense schema
export const addExpenseSchema = z.object({
  name: z.string().min(3, {
    message: "Name is required.",
  }),
  amount: z.string().min(1, {
    message: "Amount is required.",
  }),
  description: z.string().optional().nullable(),
  date: z.date({
    message: "Please select date.",
  }),
});

// Filter installments by date schema
export const filterInstallmentsSchema = z.object({
  date: z.date({
    message: "Please select date.",
  }),
});

// Add new deposit schema
export const addDepositSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  amount: z.string({
    message: "Please enter amount.",
  }),
  date: z.date({
    message: "Please select date.",
  }),
  description: z.string().optional().nullable(),
});
