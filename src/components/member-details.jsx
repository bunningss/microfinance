import { AddNewSavings } from "./modals/add-new-savings";

export function MemberDetails({ data }) {
  return (
    <>
      {/* Modal Buttons for new Savings and Loans */}
      <div className="grid grid-cols-2 gap-2">
        <AddNewSavings member={data} />
        <AddNewSavings />
      </div>
    </>
  );
}
