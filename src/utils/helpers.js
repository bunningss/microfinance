import { savingsNames } from "@/lib/static";

// Savings installments
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

export function translateCurrency(number) {
  return new Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
}

// Loan installments
export function generateLoanInstallments(
  startDate,
  type,
  durationInMonths,
  amount
) {
  let repayAmount;

  // Calculate repay amount based on savings type
  if (type === "daily") {
    repayAmount = amount + (amount * 20) / 100;
  } else if (type === "weekly") {
    repayAmount = amount + (amount * 32) / 100;
  } else if (type === "monthly") {
    repayAmount = amount + (amount * 32) / 100;
  } else {
    console.error("Invalid type provided.");
    return [];
  }

  // Parse the start date
  const start = new Date(startDate);
  if (isNaN(start)) {
    console.error("Invalid startDate provided.");
    return [];
  }

  const installments = [];

  // Calculate total number of installments and max daily installments 120
  let totalInstallments;
  if (type === "daily") {
    totalInstallments = Math.min(durationInMonths * 30, 120);
  } else if (type === "weekly") {
    totalInstallments = durationInMonths * 4;
  } else if (type === "monthly") {
    totalInstallments = durationInMonths;
  }

  const amountPerInstallment = parseFloat(
    (repayAmount / totalInstallments).toFixed(2)
  );

  let currentDate = new Date(start);

  for (let i = 0; i < totalInstallments; i++) {
    installments.push({
      date: currentDate.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      status: "unpaid",
      totalAmount: repayAmount,
      amount: amountPerInstallment,
    });

    // Increment the currentDate based on the type
    if (type === "daily") {
      currentDate.setDate(currentDate.getDate() + 1);
    } else if (type === "weekly") {
      currentDate.setDate(currentDate.getDate() + 7);
    } else if (type === "monthly") {
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  }

  return installments;
}

export function translateDate(date) {
  if (!date) return;

  let formatter = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedDate = formatter.format(new Date(date));

  return formattedDate;
}

export function translateNumber(number) {
  return new Intl.NumberFormat("bn-BD").format(number);
}

// Loan installments
export function generateLoanFineInstallments(
  startDate,
  type,
  durationInMonths,
  amount
) {
  // Parse the start date
  const start = new Date(startDate);
  if (isNaN(start)) {
    console.error("Invalid startDate provided.");
    return [];
  }

  const installments = [];

  // Calculate total number of installments and max daily installments 120
  let totalInstallments;
  if (type === "daily") {
    totalInstallments = Math.min(durationInMonths * 30, 120);
  } else if (type === "weekly") {
    totalInstallments = durationInMonths * 4;
  } else if (type === "monthly") {
    totalInstallments = durationInMonths;
  }

  const amountPerInstallment = parseFloat(
    (amount / totalInstallments).toFixed(2)
  );

  let currentDate = new Date(start);

  for (let i = 0; i < totalInstallments; i++) {
    installments.push({
      date: currentDate.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      status: "unpaid",
      totalAmount: amount,
      amount: amountPerInstallment,
    });

    // Increment the currentDate based on the type
    if (type === "daily") {
      currentDate.setDate(currentDate.getDate() + 1);
    } else if (type === "weekly") {
      currentDate.setDate(currentDate.getDate() + 7);
    } else if (type === "monthly") {
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  }

  return installments;
}

export function formatDate(date) {
  const currentDate = date ? new Date(date) : new Date();
  currentDate.setDate(currentDate.getDate() - 1);

  const startOfDay = new Date(currentDate);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(currentDate);
  endOfDay.setUTCHours(23, 59, 59, 999);

  return { startOfDay, endOfDay };
}
