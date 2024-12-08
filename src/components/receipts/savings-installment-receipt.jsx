import {
  translateCurrency,
  translateDate,
  translateNumber,
} from "@/utils/helpers";
import { Receipt } from "./receipt";

export function SavingsInstallmentReceipt({ data }) {
  return (
    <Receipt>
      <p>
        সদস্যের নাম: <b>{data?.owner?.name}</b>
      </p>
      <p>
        ফোন নম্বর: <b>{data?.owner?.phone}</b>
      </p>
      <p>
        মোট সঞ্চয়: <b>{translateCurrency(data?.owner?.totalSaved)}</b>
      </p>

      <p>
        সঞ্চয়ের নাম: <b>{data?.savings?.savingsName}</b>
      </p>
      <p>
        কিস্তির পরিমাণ: <b>{translateCurrency(data.savings?.savingsAmount)}</b>
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
        <b>{data?.savings?.savingsName}</b> এর অধীনে সঞ্চয়:{" "}
        <b>{translateCurrency(data?.savings?.amountSaved)}</b>
      </p>
    </Receipt>
  );
}
