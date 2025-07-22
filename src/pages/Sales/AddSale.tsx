
import { useState, useEffect } from 'react';
import api from '../../services/api';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import PageMeta from '../../components/common/PageMeta';
import Button from '../../components/ui/button/Button';
import Select from '../../components/form/Select';
import Input from '../../components/form/input/InputField';
import Label from '../../components/form/Label';
import { useNavigate } from 'react-router';

interface Customer {
  id: number;
  name: string;
}

interface Item {
  id: number;
  name: string;
}

interface SaleItem {
  item_id: string;
  quantity: number;
  unit_price: number;
}

export default function AddSale() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [customerId, setCustomerId] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [saleDate, setSaleDate] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('paid');
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
    fetchItems();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customer?perPage=all');
      setCustomers(response.data.results.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await api.get('/item?perPage=all');
      setItems(response.data.results.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItem = () => {
    setSaleItems([...saleItems, { item_id: '', quantity: 0, unit_price: 0 }]);
  };

  const handleItemChange = (index: number, field: keyof SaleItem, value: any) => {
    const newItems = [...saleItems];
    newItems[index][field] = value;
    setSaleItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/sale', {
        customer_id: customerId,
        invoice_number: invoiceNumber,
        sale_date: saleDate,
        payment_status: paymentStatus,
        items: saleItems,
      });
      navigate('/sales');
    } catch (error) {
      console.error('Error creating sale:', error);
    }
  };

  return (
    <>
      <PageMeta
        title="Add Sale | Pharmacy Manager"
        description="Add a new sale"
      />
      <PageBreadcrumb pageTitle="Add Sale" />
      <ComponentCard>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label>Customer</Label>
              <Select
                options={customers.map(c => ({ value: String(c.id), label: c.name }))}
                onChange={setCustomerId}
                defaultValue={customerId}
                placeholder="Select a customer"
              />
            </div>
            <div>
              <Label>Invoice Number</Label>
              <Input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
            </div>
            <div>
              <Label>Sale Date</Label>
              <Input type="date" value={saleDate} onChange={(e) => setSaleDate(e.target.value)} />
            </div>
            <div>
              <Label>Payment Status</Label>
              <Select
                options={[
                  { value: 'paid', label: 'Paid' },
                  { value: 'due', label: 'Due' },
                ]}
                onChange={setPaymentStatus}
                defaultValue={paymentStatus}
              />
            </div>
          </div>

          <h3 className="mt-6 mb-4 text-lg font-semibold">Items</h3>
          {saleItems.map((item, index) => (
            <div key={index} className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
              <div className="md:col-span-1">
                <Label>Item</Label>
                <Select
                  options={items.map(i => ({ value: String(i.id), label: i.name }))}
                  onChange={(value) => handleItemChange(index, 'item_id', value)}
                  defaultValue={item.item_id}
                  placeholder="Select an item"
                />
              </div>
              <div>
                <Label>Quantity</Label>
                <Input type="number" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))} />
              </div>
              <div>
                <Label>Unit Price</Label>
                <Input type="number" value={item.unit_price} onChange={(e) => handleItemChange(index, 'unit_price', Number(e.target.value))} />
              </div>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={handleAddItem} className="mt-4">
            Add Item
          </Button>

          <div className="flex justify-end mt-6">
            <Button type="submit">
              Save Sale
            </Button>
          </div>
        </form>
      </ComponentCard>
    </>
  );
}
