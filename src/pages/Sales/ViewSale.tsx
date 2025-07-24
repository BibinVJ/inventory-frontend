
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import PageMeta from '../../components/common/PageMeta';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui/table';
import Badge from '../../components/ui/badge/Badge';

interface Sale {
  id: number;
  invoice_number: string;
  sale_date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: {
    item: {
      name: string;
    };
    quantity: number;
    unit_price: number;
    total_price: number;
  }[];
  total_amount: number;
  payment_status: string;
}

export default function ViewSale() {
  const { id } = useParams();
  const [sale, setSale] = useState<Sale | null>(null);

  useEffect(() => {
    fetchSale();
  }, [id]);

  const fetchSale = async () => {
    try {
      const response = await api.get(`/sale/${id}`);
      setSale(response.data.results);
    } catch (error) {
      console.error('Error fetching sale:', error);
    }
  };

  if (!sale) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageMeta
        title={`Sale ${sale.invoice_number} | Pharmacy Manager`}
        description={`Details for sale ${sale.invoice_number}`}
      />
      <PageBreadcrumb
        pageTitle="Sale Details"
        breadcrumbs={[
          { label: 'Sales', path: '/sales' },
          { label: sale.invoice_number },
        ]}
        backButton={true}
      />

      <ComponentCard>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold">Customer Details</h3>
              <p><strong>Name:</strong> {sale.customer.name}</p>
              <p><strong>Email:</strong> {sale.customer.email}</p>
              <p><strong>Phone:</strong> {sale.customer.phone}</p>
              <p><strong>Address:</strong> {sale.customer.address}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Sale Information</h3>
              <p><strong>Invoice Number:</strong> {sale.invoice_number}</p>
              <p><strong>Sale Date:</strong> {sale.sale_date}</p>
              <p><strong>Payment Status:</strong> <Badge color={sale.payment_status === 'paid' ? 'success' : 'warning'}>{sale.payment_status}</Badge></p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Items</h3>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableCell isHeader>Item</TableCell>
                            <TableCell isHeader>Quantity</TableCell>
                            <TableCell isHeader>Unit Price</TableCell>
                            <TableCell isHeader>Total Price</TableCell>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {sale.items.map((item, index) => (
                            <TableRow key={index}>
                            <TableCell>{item.item.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.unit_price}</TableCell>
                            <TableCell>{item.total_price}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <div className="text-right">
              <p className="text-lg font-semibold">Total Amount: {sale.total_amount}</p>
            </div>
          </div>
        </div>
      </ComponentCard>
    </>
  );
}
