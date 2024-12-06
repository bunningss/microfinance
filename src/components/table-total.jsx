import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { translateCurrency } from "@/utils/helpers";

export function TableTotal({ text = "মোট", total, colspan = 5 }) {
  return (
    <TableFooter>
      <TableRow>
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
