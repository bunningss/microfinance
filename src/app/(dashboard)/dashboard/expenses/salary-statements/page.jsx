import { Block } from "@/components/block";
import { getData } from "@/utils/api-calls";

async function Salaries() {
  const res = await getData("expenses/salary");

  return <div></div>;
}

export default function Page() {
  return (
    <div>
      <Block title="salary statements" />
      <Salaries />
    </div>
  );
}
