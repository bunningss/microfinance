import { AddLoan } from "./modals/add-loan";
import { AddNewSavings } from "./modals/add-new-savings";
import { ViewLoans } from "./modals/view-loans";
import { ViewSavings } from "./modals/view-savings";

export function MemberDetails({ data }) {
  return (
    <>
      {/* Modal Buttons for new Savings and Loans */}
      <div className="grid grid-cols-2 gap-2">
        <ViewSavings savings={data.savings} />
        <ViewLoans />
        <AddNewSavings member={data} />
        <AddLoan />
      </div>
    </>
  );
}
