import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    memberNumber: {
      type: String,
      required: true,
    },
    fathersName: {
      type: String,
      required: false,
    },
    husbandsName: {
      type: String,
      required: false,
    },
    mothersName: {
      type: String,
      required: true,
    },
    permVillage: {
      type: String,
      required: true,
    },
    permPostOffice: {
      type: String,
      required: true,
    },
    permPoliceStation: {
      type: String,
      required: true,
    },
    permDistrict: {
      type: String,
      required: true,
    },
    homePhone: {
      type: String,
      required: true,
    },
    currVillage: {
      type: String,
      required: true,
    },
    currPostOffice: {
      type: String,
      required: true,
    },
    currArea: {
      type: String,
      required: true,
    },
    currPoliceStation: {
      type: String,
      required: true,
    },
    currDistrict: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    nidNumber: {
      type: String,
      required: true,
    },
    birthCertificateNumber: {
      type: String,
    },
    nationality: {
      type: String,
      required: true,
      default: "Bangladeshi",
    },
    age: {
      type: Number,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    savings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "savings",
      },
    ],
    loans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "loan",
      },
    ],
    withdrawals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "withdrawal",
      },
    ],
    totalSaved: {
      type: Number,
      required: true,
    },
    nomineeName: {
      type: String,
      required: true,
    },
    relationWithNominee: {
      type: String,
      required: true,
    },
    nomineeBirthDate: {
      type: Date,
      required: true,
    },
    nomineeNidNumber: {
      type: String,
      required: true,
    },
    introducersName: {
      type: String,
      required: true,
    },
    memberImage: {
      type: String,
      required: true,
    },
    nomineeImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.models.member || mongoose.model("member", memberSchema);

export default Member;
