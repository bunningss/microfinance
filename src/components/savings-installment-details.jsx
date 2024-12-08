import { cn } from "@/lib/utils";
import {
  translateCurrency,
  translateDate,
  translateNumber,
} from "@/utils/helpers";

export function SavingsInstallmentDetails({ installmentDetails, className }) {
  return (
    <div
      className={cn(
        "h-fit p-2 bg-background rounded-md shadow-md border border-input fixed top-20 right-0 m-auto z-20",
        className
      )}
    >
      <ul>
        <li>
          <span className="text-muted-foreground">কিস্তির সংখ্যা:</span>{" "}
          {translateNumber(installmentDetails?.count)}
        </li>
        <li>
          <span className="text-muted-foreground">মোট সঞ্চয়ের পরিমাণ:</span> ৳
          {translateCurrency(installmentDetails?.totalAmount)}
        </li>
        <li>
          <span className="text-muted-foreground">শেষ কিস্তির তারিখ:</span>{" "}
          {translateDate(installmentDetails?.lastDate)}
        </li>
      </ul>
    </div>
  );
}
