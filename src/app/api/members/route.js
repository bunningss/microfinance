import mongoose from "mongoose";
import User from "@/lib/models/User";
import Member from "@/lib/models/Member";
import Savings from "@/lib/models/Savings";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";
import { generateInstallments } from "@/utils/helpers";

export async function POST(request) {
  await connectDb();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { error, id } = await verifyToken(request);
    if (error)
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    const user = await User.findById(id);
    if (user.role !== "admin")
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    const body = await request.json();

    const newMember = new Member({
      name: body.name,
      fathersName: body.fathersName,
      mothersName: body.mothersName,
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
      nationality: body.nationality,
      age: body.age,
      occupation: body.occupation,
      religion: body.religion,
      nomineeName: body.nomineeName,
      relationWithNominee: body.relationWithNominee,
      nomineeBirthDate: body.nomineeBirthDate,
      nomineeNidNumber: body.nomineeNidNumber,
      introducersName: body.introducersName,
      memberImage: body.memberImage,
      nomineeImage: body.nomineeImage,
    });

    // Generate user installments
    const installments = generateInstallments(
      new Date(body.startDate).toISOString(),
      body.savingsType,
      parseInt(body.savingsDuration),
      parseInt(body.savingsAmount)
    );

    const newSavings = new Savings({
      savingsType: body.savingsType,
      savingsAmount: body.savingsAmount,
      savingsDuration: body.savingsDuration,
      startDate: body.startDate,
      endDate: installments.at(-1).date,
      owner: newMember._id,
      installments,
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
      { msg: "সদস্য তথ্য সফলভাবে সংরক্ষিত" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    return NextResponse.json({ msg: err.message }, { status: 400 });
  } finally {
    session.endSession();
  }
}

// Get all members
export async function GET(request) {
  try {
    const { error, id } = await verifyToken(request);
    if (error)
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

    await connectDb();

    const user = await User.findById(id);
    if (user.role !== "admin")
      return NextResponse.json({ msg: "আপনি অনুমোদিত নন।" }, { status: 401 });

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
      { msg: "Data found.", payload: members, isLastPage, totalPages },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
