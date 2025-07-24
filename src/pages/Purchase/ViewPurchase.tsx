
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import api from '../../services/api';
import PageMeta from '../../components/common/PageMeta';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import Button from '../../components/ui/button/Button';
import Badge from '../../components/ui/badge/Badge';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui/table';
import VoidPurchaseModal from '../../components/purchase/VoidPurchaseModal';

interface Purchase {
  id: number;
  invoice_number: string;
  purchase_date: string;
  vendor: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: {
    item: {
      sku: string;
      name: string;
    };  
    batch: {
      batch_number: string,
      manufacture_date: string,
      expiry_date: string,
    };
    quantity: number;
    unit_cost: number;
    total_cost: number;
  }[];
  total_amount: number;
  payment_status: string;
}

export default function ViewPurchase() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [isVoidModalOpen, setIsVoidModalOpen] = useState(false);

  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const response = await api.get(`/purchase/${id}`);
        setPurchase(response.data.results);
      } catch (error) {
        console.error('Error fetching purchase details:', error);
      }
    };
    fetchPurchase();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleVoidSuccess = () => {
    navigate('/purchases');
  };

  if (!purchase) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageMeta
        title={`Purchase #${purchase.invoice_number} | Pharmacy Manager`}
        description="View purchase details"
      />
      <PageBreadcrumb
        pageTitle="Purchase Details"
        breadcrumbs={[
          { label: 'Purchases', path: '/purchases' },
        ]}
        backButton={true}
      />

      <div className="flex justify-end gap-2 mb-4">
        <Button variant="outline" onClick={() => navigate(`/purchases/edit/${id}`)}>Edit</Button>
        <Button variant="outline" onClick={handlePrint}>Print</Button>
        <Button variant="outline" onClick={() => setIsVoidModalOpen(true)}>Void</Button>
      </div>

      <ComponentCard title={`Purchase #${purchase.invoice_number}`}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 dark:text-gray-400">Vendor Details</h3>
              <p className="dark:text-gray-400"><strong>Name:</strong> {purchase.vendor.name}</p>
              <p className="dark:text-gray-400"><strong>Email:</strong> {purchase.vendor.email}</p>
              <p className="dark:text-gray-400"><strong>Phone:</strong> {purchase.vendor.phone}</p>
              <p className="dark:text-gray-400"><strong>Address:</strong> {purchase.vendor.address}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 dark:text-gray-400">Purchase Details</h3>
              <p className="dark:text-gray-400"><strong>Invoice #:</strong> {purchase.invoice_number}</p>
              <p className="dark:text-gray-400"><strong>Purchase Date:</strong> {purchase.purchase_date}</p>
              <p className="dark:text-gray-400"><strong>Payment Status:</strong>
                <Badge size="sm" color={purchase.payment_status === 'paid' ? 'success' : 'warning'}>
                  {purchase.payment_status}
                </Badge>
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Item</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Batch #</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">MFG Date</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Expiry Date</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">Quantity</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">Unit Cost</TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">Total Cost</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {purchase.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="px-5 py-4 text-gray-800 text-start text-theme-sm dark:text-gray-400">{item.item.name}</TableCell>
                      <TableCell className="px-5 py-4 text-gray-800 text-start text-theme-sm dark:text-gray-400">{item.batch.batch_number}</TableCell>
                      <TableCell className="px-5 py-4 text-gray-800 text-start text-theme-sm dark:text-gray-400">{item.batch.manufacture_date || '-'}</TableCell>
                      <TableCell className="px-5 py-4 text-gray-800 text-start text-theme-sm dark:text-gray-400">{item.batch.expiry_date || '-'}</TableCell>
                      <TableCell className="px-5 py-4 text-gray-800 text-end text-theme-sm dark:text-gray-400">{item.quantity}</TableCell>
                      <TableCell className="px-5 py-4 text-gray-800 text-end text-theme-sm dark:text-gray-400">{item.unit_cost}</TableCell>
                      <TableCell className="px-5 py-4 text-gray-800 text-end text-theme-sm dark:text-gray-400">{item.total_cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <tfoot className="border-t border-gray-100 dark:border-white/[0.05]">
                  <TableRow className="font-semibold">
                    <TableCell colSpan={6} className="px-5 py-4 text-end text-gray-800 dark:text-white/90">Total Amount:</TableCell>
                    <TableCell className="px-5 py-4 text-end text-gray-800 dark:text-white/90">{purchase.total_amount}</TableCell>
                  </TableRow>
                </tfoot>
              </Table>
            </div>
          </div>
        </div>
      </ComponentCard>

      {purchase && (
        <VoidPurchaseModal
          isOpen={isVoidModalOpen}
          onClose={() => setIsVoidModalOpen(false)}
          onPurchaseVoided={handleVoidSuccess}
          purchase={purchase}
        />
      )}
    </>
  );
}
