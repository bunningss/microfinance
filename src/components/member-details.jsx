import { MemberFinancialDetails } from "./member-financial-details";
import { MemberForm } from "./member-form";
import { AddNewLoan } from "./modals/add-new-loan";
import { AddNewSavings } from "./modals/add-new-savings";
import { ViewLoans } from "./modals/view-loans";
import { ViewSavings } from "./modals/view-savings";

export function MemberDetails({ data }) {
  return (
    <>
      {/* Modal Buttons for new Savings and Loans */}
      <div className="grid grid-cols-2 gap-2">
        <ViewSavings savings={data.savings} />
        <ViewLoans loans={data.loans} />
        <AddNewSavings member={data} />
        <AddNewLoan member={data} />
      </div>
      <MemberFinancialDetails data={data} />
      <MemberForm member={data} />
    </>
  );
}
