"use server";

import DailyBalance from "@/lib/models/DailyBalance";
import { formatDate } from "./helpers";

export async function updateDailyBalance(type, amount, date) {
  if (type !== "plus" && type !== "minus") {
    throw new Error("Invalid type");
  }

  const transactionDate = formatDate(date).setHours(0, 0, 0, 0);

  try {
    if (type === "plus") {
      await DailyBalance.findOneAndUpdate(
        {
          date: formatDate(transactionDate),
        },
        {
          $inc: { balance: amount },
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );
    } else {
      await DailyBalance.findOneAndUpdate(
        {
          date: formatDate(transactionDate),
        },
        {
          $inc: { balance: -amount },
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );
    }
  } catch (err) {
    throw new Error("Soemthing went wrong. Please try Again.");
  }
}
