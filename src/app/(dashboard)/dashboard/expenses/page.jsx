import { Block } from "@/components/block";
import { getData } from "@/utils/api-calls";

export default function Page() {
  return (
    <div className="space-y-4">
      <Block title="view expenses" />
    </div>
  );
}
