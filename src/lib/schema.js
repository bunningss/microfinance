import { z } from "zod";

export const addMemberFormSchema = z.object({
  name: z.string().min(1, "Applicant Name is required"),
  fathersName: z.string().min(1, "Father's Name is required"),
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
  nationality: z.string().min(1, "Nationality is required"),
  age: z.string().min(1, "Age is required"),
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
