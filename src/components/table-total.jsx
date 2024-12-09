import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { translateCurrency } from "@/utils/helpers";

export function TableTotal({ text = "মোট", total, colspan = 3 }) {
  return (
    <TableFooter className="bg-transparent">
      <TableRow className="hover:bg-transparent">
        <TableCell colSpan={colspan} className="font-bold">
          {text}
        </TableCell>
        <TableCell className="text-center font-bold">
          {translateCurrency(total)}
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}
