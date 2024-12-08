import Loan from "@/lib/models/Loan";
import { connectDb } from "@/lib/db/connectDb";
import { generateLoanFineInstallments } from "@/utils/helpers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const today = new Date();

    // Find loans with endDate before today and status "incomplete"
    const overdueLoans = await Loan.find({
      endDate: { $lt: today },
      loanStatus: "incomplete",
    });

    for (const loan of overdueLoans) {
      // Calculate the amount left with a 10% fine
      const amountLeft = loan.repayAmount - loan.amountPaid;
      const newAmountLeft = amountLeft + Math.floor((amountLeft * 10) / 100);

      // Extend the endDate by one month
      const newEndDate = new Date(loan.endDate);
      newEndDate.setMonth(newEndDate.getMonth() + 1);

      // Generate new installments
      const newInstallments = generateLoanFineInstallments(
        loan.endDate,
        loan.loanType,
        1,
        newAmountLeft
      );

      loan.installments = loan.installments.filter(
        (installment) => installment.status !== "unpaid"
      );

      loan.installments.push(...newInstallments);

      loan.repayAmount += Math.floor((amountLeft * 10) / 100);
      loan.endDate = newEndDate;
      loan.fine += Math.floor((amountLeft * 10) / 100);
      loan.installmentAmount = newInstallments[0]?.amount;

      await loan.save();
    }

    return NextResponse.json({ msg: "Data Updated." }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
