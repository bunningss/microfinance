import { formatNumber } from "@/utils/helpers";

export function LoanInstallmentsTable({ installments }) {
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
              ঋণের নাম
            </th>
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              ঋণের ধরন
            </th>
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              ঋণের পরিমাণ
            </th>
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              কিস্তির পরিমাণ
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
                {installment?.loanName}
              </td>
              <td className="p-2 border-r border-primary md:border-secondary">
                {installment?.loanType}
              </td>
              <td className="p-2 border-r border-primary md:border-secondary">
                {formatNumber(installment?.loanAmount)}
              </td>
              <td className="p-2 border-r border-primary md:border-secondary">
                {formatNumber(
                  installment?.installments[0].amountPerInstallment
                )}
              </td>
              <td className="p-2 border-r border-primary md:border-secondary">
                {new Date(installment?.installments[0]?.date).toDateString()}
              </td>
              <td className="p-2 md:border-0">
                {/* <PaySavingsInstallment
                  label="pay"
                  installments={installment?.installments}
                /> */}
                pay btn
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
