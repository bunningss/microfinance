import { Block } from "@/components/block";
import { AddNewSavings } from "@/components/forms/add-new-savings";
import { getData } from "@/utils/api-calls";

export default async function Page({ params }) {
  const { response } = await getData(`members/${params.id}`, 0);

  return (
    <div className="space-y-4">
      <Block title="নতুন সঞ্চয় যোগ করুন" />

      <AddNewSavings member={response.payload} />
    </div>
  );
}
