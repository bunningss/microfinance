import { Block } from "@/components/block";
import { getData } from "@/utils/api-calls";

export default async function Page({ params }) {
  const { response } = await getData(`members/${params.id}`);

  return (
    <div>
      <Block title="Member details" />
    </div>
  );
}
