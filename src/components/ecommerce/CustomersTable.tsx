import TableSection from "../ui/table/TableSection";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  total_spent: number;
}

interface Props {
  customers: Customer[];
  title?: string;
}

export default function CustomersTable({ customers, title = "Customers" }: Props) {
      if (!customers || customers.length === 0) {
    return (
      <TableSection title={title}>
        <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          No data available.
        </div>
      </TableSection>
    );
  }
  
  return (
    <TableSection title={title}>
      <Table>
        {/* Table Header */}
        <TableHeader className="border-y border-gray-100 dark:border-gray-800">
          <TableRow>
            <TableCell
              isHeader
              className="py-3 text-start font-medium text-theme-xs text-gray-500 dark:text-gray-400"
            >
              Name
            </TableCell>
            <TableCell
              isHeader
              className="py-3 text-start font-medium text-theme-xs text-gray-500 dark:text-gray-400"
            >
              Email
            </TableCell>
            <TableCell
              isHeader
              className="py-3 text-start font-medium text-theme-xs text-gray-500 dark:text-gray-400"
            >
              Phone
            </TableCell>
            <TableCell
              isHeader
              className="py-3 text-start font-medium text-theme-xs text-gray-500 dark:text-gray-400"
            >
              Total Spent
            </TableCell>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                {customer.name}
              </TableCell>
              <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                {customer.email}
              </TableCell>
              <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                {customer.phone}
              </TableCell>
              <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                {customer.total_spent}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableSection>
  );
}
