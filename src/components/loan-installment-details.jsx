import { cn } from "@/lib/utils";
import { formatNumber } from "@/utils/helpers";

export function LoanInstallmentDetails({ installmentDetails, className }) {
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
          {installmentDetails.count}
        </li>
        <li>
          <span className="text-muted-foreground">মোট পরিশোধ করবে:</span>{" "}
          {formatNumber(installmentDetails.totalAmount)}
        </li>
        <li>
          <span className="text-muted-foreground">কিস্তিতে পরিমাণ:</span>{" "}
          {formatNumber(installmentDetails.amountPerInstallment)}
        </li>
        <li>
          <span className="text-muted-foreground">শেষ কিস্তির তারিখ:</span>{" "}
          {new Date(installmentDetails.lastDate).toDateString()}
        </li>
      </ul>
    </div>
  );
}
