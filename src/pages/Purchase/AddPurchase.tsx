
import { useState, useEffect } from 'react';
import api from '../../services/api';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import PageMeta from '../../components/common/PageMeta';
import Button from '../../components/ui/button/Button';
import Select from '../../components/form/Select';
import Input from '../../components/form/input/InputField';
import Label from '../../components/form/Label';
import TextArea from '../../components/form/input/TextArea';
import { useNavigate } from 'react-router';

interface Vendor {
  id: number;
  name: string;
}

interface Item {
  id: number;
  name: string;
}

interface PurchaseItem {
  item_id: string;
  description: string;
  batch_number: string;
  expiry_date: string;
  manufacture_date: string;
  quantity: number;
  unit_cost: number;
}

export default function AddPurchase() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [vendorId, setVendorId] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVendors();
    fetchItems();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await api.get('/vendor?perPage=all');
      setVendors(response.data.results.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
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
    setPurchaseItems([...purchaseItems, { item_id: '', description: '', batch_number: '', expiry_date: '', manufacture_date: '', quantity: 0, unit_cost: 0 }]);
  };

  const handleItemChange = (index: number, field: keyof PurchaseItem, value: any) => {
    const newItems = [...purchaseItems];
    newItems[index][field] = value;
    setPurchaseItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/purchase', {
        vendor_id: vendorId,
        invoice_number: invoiceNumber,
        purchase_date: purchaseDate,
        items: purchaseItems,
      });
      navigate('/purchases');
    } catch (error) {
      console.error('Error creating purchase:', error);
    }
  };

  return (
    <>
      <PageMeta
        title="Add Purchase | Pharmacy Manager"
        description="Add a new purchase"
      />
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <PageBreadcrumb pageTitle="Add Purchase" breadcrumbs={[{ label: 'Purchases', path: '/purchases' }]} />

      <ComponentCard>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label>Vendor</Label>
              <Select
                options={vendors.map(v => ({ value: String(v.id), label: v.name }))}
                onChange={setVendorId}
                defaultValue={vendorId}
                placeholder="Select a vendor"
              />
            </div>
            <div>
              <Label>Invoice Number</Label>
              <Input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
            </div>
            <div>
              <Label>Purchase Date</Label>
              <Input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 mb-4">
            <h3 className="text-lg font-semibold">Items</h3>
            <Button type="button" variant="outline" onClick={handleAddItem}>
              Add Item
            </Button>
          </div>

          {purchaseItems.map((item, index) => (
            <div key={index} className="p-4 mb-4 border rounded-lg">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                <div className="md:col-span-2">
                  <Label>Item</Label>
                  <Select
                    options={items.map(i => ({ value: String(i.id), label: i.name }))}
                    onChange={(value) => handleItemChange(index, 'item_id', value)}
                    defaultValue={item.item_id}
                    placeholder="Select an item"
                  />
                </div>
                <div>
                  <Label>Batch #</Label>
                  <Input type="text" value={item.batch_number} onChange={(e) => handleItemChange(index, 'batch_number', e.target.value)} />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input type="number" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))} />
                </div>
                <div>
                  <Label>Unit Cost</Label>
                  <Input type="number" value={item.unit_cost} onChange={(e) => handleItemChange(index, 'unit_cost', Number(e.target.value))} />
                </div>
              </div>
              <div className="mt-4">
                <Label>Description</Label>
                <TextArea value={item.description} onChange={(value) => handleItemChange(index, 'description', value)} />
              </div>
            </div>
          ))}

          <div className="flex justify-end mt-6">
            <Button type="submit">
              Save Purchase
            </Button>
          </div>
        </form>
      </ComponentCard>
    </>
  );
}

