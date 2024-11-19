import { savingsNames } from "@/lib/static";

export function generateInstallments(
  startDate,
  type,
  durationInMonths,
  amount
) {
  // Parse the start date
  const start = new Date(startDate);
  const installments = [];

  // Calculate the end date based on duration in months
  const endDate = new Date(start);
  endDate.setMonth(start.getMonth() + durationInMonths);

  let currentDate = new Date(start);

  while (currentDate <= endDate - 1) {
    let installment = {
      date: currentDate.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      status: "unpaid",
      amount: amount,
    };
    installments.push(installment);

    // Update the current date based on the savings type
    if (type === "daily") {
      currentDate.setDate(currentDate.getDate() + 1); // Increment by 1 day
    } else if (type === "weekly") {
      currentDate.setDate(currentDate.getDate() + 7); // Increment by 7 days
    } else if (type === "monthly") {
      currentDate.setMonth(currentDate.getMonth() + 1); // Increment by 1 month
    }
  }

  return installments;
}

export function getMonthNamesWithYear() {
  const year = new Date().getFullYear();
  const monthsWithYear = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(year, i, 1);
    const monthNameWithYear = {
      name: `${date.toLocaleString("default", {
        month: "long",
      })} ${year}`,
      value: `${date.toLocaleString("default", {
        month: "long",
      })} ${year}`,
    };

    monthsWithYear.push(monthNameWithYear);
  }
  return monthsWithYear;
}

export function generateSavingsName() {
  const randomItem =
    savingsNames[Math.floor(Math.random() * savingsNames.length)];

  return randomItem;
}

export function formatNumber(number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "BDT",
  }).format(number);
}
