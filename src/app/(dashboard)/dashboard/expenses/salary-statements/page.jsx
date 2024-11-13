import { Block } from "@/components/block";
import { getData } from "@/utils/api-calls";

async function Salaries() {
  const res = await getData("expenses/salary", 0);
  const salaries = res.response.payload;

  return (
    <table className="w-full">
      <thead>
        <tr className="text-center bg-input">
          <th scope="col" className="p-2 border-r border-primary md:border-0">
            Serial Number
          </th>
          <th scope="col" className="p-2 border-r border-primary md:border-0">
            Name
          </th>
          <th scope="col" className="p-2 border-r border-primary md:border-0">
            Month
          </th>
          <th scope="col" className="p-2 border-r border-primary md:border-0">
            Date
          </th>
          <th scope="col" className="p-2 border-r border-primary md:border-0">
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {salaries?.map((salary, index) => (
          <tr key={index} className="text-center even:bg-input">
            <td className="p-2 border-r border-primary md:border-0">
              {index + 1}
            </td>
            <th scope="row" className="p-2 border-r border-primary md:border-0">
              {salary.staff?.name}
            </th>
            <td className="p-2 border-r border-primary md:border-0">
              {salary?.month}
            </td>
            <td className="p-2 border-r border-primary md:border-0">
              {salary.createdAt}
            </td>
            <td className="p-2 border-r border-primary md:border-0">
              ৳ {salary.amount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Page() {
  return (
    <div className="space-y-4">
      <Block title="salary statements" />
      <Salaries />
    </div>
  );
}
