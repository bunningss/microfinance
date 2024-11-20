import { formatNumber } from "@/utils/helpers";
import { PaySavingsInstallment } from "./modals/pay-savings-installment";

export function SavingsInstallmentsTable({ installments }) {
  return (
    <div className="overflow-x-auto md:rounded-md">
      <table className="w-full rounded-md border border-primary md:border-secondary text-xs md:text-base">
        <thead>
          <tr className="text-center bg-input">
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              SN
            </th>
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              সদস্যের নাম
            </th>
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              ফোন নম্বর
            </th>
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              সদস্য নম্বর
            </th>
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              সঞ্চয়ের নাম
            </th>
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              সঞ্চয়ের ধরন
            </th>
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              সঞ্চয় পরিমাণ
            </th>
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              কিস্তির তারিখ
            </th>
            <th scope="col" className="p-2 md:border-0"></th>
          </tr>
        </thead>
        <tbody>
          {installments?.map((installment, index) => (
            <tr key={index} className="text-center even:bg-secondary">
              <td className="p-2 border-r border-primary md:border-secondary">
                {index + 1}
              </td>
              <th
                scope="row"
                className="p-2 border-r border-primary md:border-secondary"
              >
                {installment?.memberDetails?.name}
              </th>
              <td className="p-2 border-r border-primary md:border-secondary">
                {installment?.memberDetails?.phone}
              </td>
              <td className="p-2 border-r border-primary md:border-secondary">
                {installment?.memberDetails?.nidNumber}
              </td>
              <td className="p-2 border-r border-primary md:border-secondary">
                {installment?.savingsName}
              </td>
              <td className="p-2 border-r border-primary md:border-secondary">
                {installment?.savingsType}
              </td>
              <td className="p-2 border-r border-primary md:border-secondary">
                {formatNumber(installment?.savingsAmount)}
              </td>
              <td className="p-2 border-r border-primary md:border-secondary">
                {new Date(installment?.installments[0]?.date).toDateString()}
              </td>
              <td className="p-2 md:border-0">
                <PaySavingsInstallment
                  label="pay"
                  installments={installment?.installments}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
