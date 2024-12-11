import mongoose from "mongoose";
import Member from "@/lib/models/Member";
import Savings from "@/lib/models/Savings";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";
import { generateInstallments, generateSavingsName } from "@/utils/helpers";

// Add new member
export async function POST(request) {
  await connectDb();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = await verifyToken(request, "add:member");

    const body = await request.json();

    const existingMember = await Member.findOne({ nidNumber: body.nidNumber });
    if (existingMember)
      return NextResponse.json(
        { msg: "এই এনআইডি নম্বর সহ একজন সদস্য আছেন" },
        { status: 400 }
      );

    const memberAge = 25;
    const nomineeAge =
      new Date().getFullYear() - new Date(body.nomineeBirthDate).getFullYear();

    const newMember = new Member({
      name: body.name,
      fathersName: body.fathersName,
      mothersName: body.mothersName,
      memberNumber: body.memberNumber,
      permVillage: body.permVillage,
      permPostOffice: body.permPostOffice,
      permPoliceStation: body.permPoliceStation,
      permDistrict: body.permDistrict,
      homePhone: body.homePhone,
      currVillage: body.currVillage,
      currPostOffice: body.currPostOffice,
      currArea: body.currArea,
      currPoliceStation: body.currPoliceStation,
      currDistrict: body.currDistrict,
      phone: body.phone,
      nidNumber: body.nidNumber,
      birthCertificateNumber: body.birthCertificateNumber,
      nationality: body.nationality ? body.nationality : "Bangladeshi",
      age: memberAge,
      occupation: body.occupation,
      religion: body.religion,
      introducersName: body.introducersName,
      memberImage: body.memberImage,
      totalSaved: 0,
    });

    // Generate user installments
    const installments = generateInstallments(
      new Date(body.startDate).toISOString(),
      body.savingsType,
      parseInt(body.savingsDuration),
      parseInt(body.savingsAmount)
    );

    const savingsName = generateSavingsName();

    const newSavings = new Savings({
      nomineeName: body.nomineeName,
      relationWithNominee: body.relationWithNominee,
      nomineeBirthDate: body.nomineeBirthDate,
      nomineeNidNumber: body.nomineeNidNumber,
      nomineeImage: body.nomineeImage,
      nomineeAge,
      savingsName,
      savingsStatus: "incomplete",
      savingsType: body.savingsType,
      savingsAmount: body.savingsAmount,
      savingsDuration: body.savingsDuration,
      startDate: body.startDate,
      endDate: installments.at(-1).date,
      owner: newMember._id,
      installments,
      amountSaved: 0,
      approvedBy: id,
    });

    await newMember.save({ session });
    await newSavings.save({ session });

    await Member.findByIdAndUpdate(
      newMember._id,
      {
        $push: { savings: newSavings },
      },
      {
        new: true,
        session,
      }
    );

    await session.commitTransaction();
    return NextResponse.json(
      { msg: "সদস্য তথ্য সফলভাবে সংরক্ষিত", payload: newMember.nidNumber },
      { status: 200 }
    );
  } catch (err) {
    await session.abortTransaction();
    return NextResponse.json({ msg: err.message }, { status: 400 });
  } finally {
    session.endSession();
  }
}

// Get all members
export async function GET(request) {
  try {
    await connectDb();
    await verifyToken(request, "view:members-list");

    const reqUrl = new URL(request.url);
    const page = reqUrl.searchParams.get("page");
    const per_page = reqUrl.searchParams.get("per_page");
    const searchKey = reqUrl.searchParams.get("searchKey");

    let queryFilter = {};

    if (searchKey) {
      const searchRegex = new RegExp(searchKey, "i");
      queryFilter = {
        $or: [
          { name: { $regex: searchRegex } },
          { nidNumber: { $regex: searchRegex } },
          { memberNumber: { $regex: searchRegex } },
        ],
      };
    }

    const skip = (parseInt(page) - 1) * parseInt(per_page);

    const totalMembers = await Member.countDocuments();
    const totalPages = Math.ceil(totalMembers / parseInt(per_page));
    const isLastPage = parseInt(page) >= totalPages;

    const members = await Member.find(queryFilter)
      .skip(skip)
      .limit(parseInt(per_page))
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { msg: "তথ্য পাওয়া গেছে।", payload: members, isLastPage, totalPages },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
