import Deposit from "@/lib/models/Deposit";
import Expense from "@/lib/models/Expense";
import Withdrawal from "@/lib/models/Withdrawal";
import Savings from "@/lib/models/Savings";
import Loan from "@/lib/models/Loan";
import DailyBalance from "@/lib/models/DailyBalance";
import Salary from "@/lib/models/Salary";
import { connectDb } from "@/lib/db/connectDb";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";

// Get daily report
export async function GET(request) {
  try {
    await connectDb();
    await verifyToken(request, "view:daily-report");

    const reqUrl = new URL(request.url);
    const date = reqUrl.searchParams.get("date");

    const currentDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(
      Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate(),
        0,
        0,
        0,
        0
      )
    );
    const endOfDay = new Date(
      Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate(),
        23,
        59,
        59,
        999
      )
    );

    const [
      depositsData,
      savingsInstallments,
      loanInstallments,
      expensesData,
      withdrawalsData,
      dailyBalances,
      salariesData,
    ] = await Promise.all([
      Deposit.aggregate([
        {
          $match: {
            date: { $gte: startOfDay, $lte: endOfDay },
          },
        },
        {
          $lookup: {
            from: "staffs",
            localField: "addedBy",
            foreignField: "_id",
            as: "addedBy",
          },
        },
        {
          $unwind: "$addedBy",
        },
        {
          $group: {
            _id: null,
            deposits: { $push: "$$ROOT" },
            totalAmount: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: 0,
            deposits: {
              $map: {
                input: "$deposits",
                as: "deposit",
                in: {
                  _id: "$$deposit._id",
                  title: "$$deposit.title",
                  amount: "$$deposit.amount",
                  date: "$$deposit.date",
                  description: "$$deposit.description",
                  addedBy: { name: "$$deposit.addedBy.name" },
                },
              },
            },
            totalAmount: 1,
            count: 1,
          },
        },
      ]),
      Savings.aggregate([
        {
          $match: {
            installments: {
              $elemMatch: {
                status: "paid",
                paymentDate: {
                  $gte: startOfDay,
                  $lte: endOfDay,
                },
              },
            },
          },
        },
        {
          $unwind: "$installments",
        },
        {
          $match: {
            "installments.status": "paid",
            "installments.paymentDate": {
              $gte: startOfDay,
              $lte: endOfDay,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$installments.amount" },
            count: { $sum: 1 },
          },
        },
      ]),
      Loan.aggregate([
        {
          $match: {
            installments: {
              $elemMatch: {
                status: "paid",
                paymentDate: {
                  $gte: startOfDay,
                  $lte: endOfDay,
                },
              },
            },
          },
        },
        {
          $unwind: "$installments",
        },
        {
          $match: {
            "installments.status": "paid",
            "installments.paymentDate": {
              $gte: startOfDay,
              $lte: endOfDay,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$installments.amount" },
            count: { $sum: 1 },
          },
        },
      ]),
      Expense.aggregate([
        {
          $match: {
            date: { $gte: startOfDay, $lte: endOfDay },
          },
        },
        {
          $lookup: {
            from: "staffs",
            localField: "addedBy",
            foreignField: "_id",
            as: "addedBy",
          },
        },
        {
          $unwind: "$addedBy",
        },
        {
          $group: {
            _id: null,
            expenses: { $push: "$$ROOT" },
            totalAmount: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: 0,
            expenses: {
              $map: {
                input: "$expenses",
                as: "expense",
                in: {
                  _id: "$$expense._id",
                  name: "$$expense.name",
                  amount: "$$expense.amount",
                  date: "$$expense.date",
                  description: "$$expense.description",
                  addedBy: { name: "$$expense.addedBy.name" },
                },
              },
            },
            totalAmount: 1,
            count: 1,
          },
        },
      ]),
      Withdrawal.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfDay, $lte: endOfDay },
          },
        },
        {
          $lookup: {
            from: "members",
            localField: "owner",
            foreignField: "_id",
            as: "owner",
          },
        },
        {
          $unwind: "$owner",
        },
        {
          $lookup: {
            from: "staffs",
            localField: "approvedBy",
            foreignField: "_id",
            as: "approvedBy",
          },
        },
        {
          $unwind: "$approvedBy",
        },
        {
          $group: {
            _id: null,
            withdrawals: { $push: "$$ROOT" },
            totalAmount: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: 0,
            withdrawals: {
              $map: {
                input: "$withdrawals",
                as: "withdrawal",
                in: {
                  _id: "$$withdrawal._id",
                  amount: "$$withdrawal.amount",
                  createdAt: "$$withdrawal.createdAt",
                  owner: {
                    name: "$$withdrawal.owner.name",
                    memberNumber: "$$withdrawal.owner.memberNumber",
                    phone: "$$withdrawal.owner.phone",
                  },
                  approvedBy: { name: "$$withdrawal.approvedBy.name" },
                  comment: "$$withdrawal.comment",
                },
              },
            },
            totalAmount: 1,
            count: 1,
          },
        },
      ]),
      DailyBalance.aggregate([
        {
          $match: {
            date: {
              $lt: startOfDay,
            },
          },
        },
        {
          $group: {
            _id: null,
            cashAtHand: { $sum: "$balance" },
          },
        },
      ]),
      Salary.aggregate([
        {
          $match: {
            paymentDate: {
              $gte: startOfDay,
              $lte: endOfDay,
            },
          },
        },
        {
          $lookup: {
            from: "staffs",
            localField: "staff",
            foreignField: "_id",
            as: "staff",
          },
        },
        {
          $unwind: "$staff",
        },
        {
          $lookup: {
            from: "staffs",
            localField: "addedBy",
            foreignField: "_id",
            as: "addedBy",
          },
        },
        {
          $unwind: "$addedBy",
        },
        {
          $group: {
            _id: null,
            salaries: { $push: "$$ROOT" },
            totalAmount: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: 0,
            salaries: {
              $map: {
                input: "$salaries",
                as: "salary",
                in: {
                  _id: "$$salary._id",
                  amount: "$$salary.amount",
                  paymentDate: "$$salary.paymentDate",
                  staff: {
                    name: "$$salary.staff.name",
                    _id: "$$salary.staff._id",
                  },
                  addedBy: {
                    name: "$$salary.addedBy.name",
                  },
                  month: "$$salary.month",
                },
              },
            },
            totalAmount: 1,
            count: 1,
          },
        },
      ]),
    ]);

    const cashAtHand = dailyBalances[0] ? dailyBalances[0].cashAtHand : 0;

    const deposits = depositsData[0] ? depositsData[0].deposits : [];
    const depositTotal = depositsData[0] ? depositsData[0].totalAmount : 0;

    const savingsTotal = savingsInstallments[0]
      ? savingsInstallments[0].totalAmount
      : 0;
    const savingsCount = savingsInstallments[0]
      ? savingsInstallments[0].count
      : 0;

    const loanTotal = loanInstallments[0] ? loanInstallments[0].totalAmount : 0;
    const loanCount = loanInstallments[0] ? loanInstallments[0].count : 0;

    const expenses = expensesData[0] ? expensesData[0].expenses : [];
    const expenseTotal = expensesData[0] ? expensesData[0].totalAmount : 0;

    const salaries = salariesData[0] ? salariesData[0].salaries : [];
    const salaryTotal = salariesData[0] ? salariesData[0].totalAmount : 0;

    const withdrawals = withdrawalsData[0]
      ? withdrawalsData[0].withdrawals
      : [];
    const withdrawalTotal = withdrawalsData[0]
      ? withdrawalsData[0].totalAmount
      : 0;

    return NextResponse.json(
      {
        msg: "Data Found.",
        payload: {
          cashAtHand,
          deposits,
          expenses,
          withdrawals,
          salaries,
          totalDeposits: depositTotal,
          totalWithdrawals: withdrawalTotal,
          totalExpenses: expenseTotal,
          totalSalaries: salaryTotal,
          paidInstallments: {
            savings: {
              total: savingsTotal,
              count: savingsCount,
            },
            loans: {
              total: loanTotal,
              count: loanCount,
            },
          },
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err.message }, { status: 400 });
  }
}
