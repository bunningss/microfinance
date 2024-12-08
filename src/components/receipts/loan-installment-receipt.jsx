import {
  translateCurrency,
  translateDate,
  translateNumber,
} from "@/utils/helpers";
import { Receipt } from "./receipt";

export function LoanInstallmentReceipt({ data }) {
  return (
    <Receipt>
      <p>
        সদস্যের নাম: <b>{data?.owner?.name}</b>
      </p>
      <p>
        ফোন নম্বর: <b>{data?.owner?.phone}</b>
      </p>
      <p>
        ঋণের নাম: <b>{data?.loan?.loanName}</b>
      </p>
      <p>
        মোট ঋণ: <b>{translateCurrency(data?.loan.repayAmount)}</b>
      </p>

      <p>
        জরিমানা: <b>{translateCurrency(data.loan?.fine)}</b>
      </p>

      <p>
        কিস্তির পরিমাণ: <b>{translateCurrency(data.installment?.amount)}</b>
      </p>
      <p>
        কিস্তির তারিখ: <b>{translateDate(data?.installment?.date)}</b>
      </p>
      <p>
        কিস্তি পরিশোধের তারিখ:{" "}
        <b>{translateDate(data?.installment?.paymentDate)}</b>
      </p>
      <p>
        কিস্তি গ্রহণকারী কর্মকর্তা: <b>{data?.installment?.receivedBy?.name}</b>
      </p>

      <p>
        মোট কিস্তি: <b>{translateNumber(data.totalInstallments)} টি</b>
      </p>
      <p>
        কিস্তি পরিশোধ করা হয়েছে:{" "}
        <b>{translateNumber(data.paidInstallments)} টি</b>
      </p>
      <p>
        কিস্তি বাকি:{" "}
        <b>
          {translateNumber(data.totalInstallments - data.paidInstallments)} টি
        </b>
      </p>
      <p>
        মোট পরিশোধিত টাকা: <b>{translateCurrency(data?.loan?.amountPaid)}</b>
      </p>
      <p>
        টাকা পরিশোধ বাকি:{" "}
        <b>
          {translateCurrency(data?.loan?.repayAmount - data?.loan?.amountPaid)}
        </b>
      </p>
    </Receipt>
  );
}
