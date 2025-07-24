
import { useState, useEffect } from 'react';
import api from '../../services/api';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import PageMeta from '../../components/common/PageMeta';
import Button from '../../components/ui/button/Button';
import Select from '../../components/form/Select';
import Input from '../../components/form/input/InputField';
import Label from '../../components/form/Label';
import { useNavigate, useParams } from 'react-router';
import DatePicker from '../../components/form/date-picker';
import { toast } from 'sonner';
import TextArea from '../../components/form/input/TextArea';

interface Customer {
  id: number;
  name: string;
}

interface Item {
    id: number;
    name: string;
    description: string;
    stock_on_hand: number;
    non_expired_stock: number;
    is_expired_sale_enabled: boolean;
  }

interface SaleItem {
  id?: number;
  item_id: string;
  quantity: number;
  unit_price: number;
  description: string;
  available_stock: number;
}

interface ApiError {
  [key: string]: string[];
}

export default function EditSale() {
  const { id } = useParams();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [customerId, setCustomerId] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [saleDate, setSaleDate] = useState('');
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [errors, setErrors] = useState<ApiError>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
    fetchItems();
    fetchSale();
  }, [id]);

  const fetchSale = async () => {
    try {
      const response = await api.get(`/sale/${id}`);
      const { customer, invoice_number, sale_date, items } = response.data.results;
      setCustomerId(String(customer.id));
      setInvoiceNumber(invoice_number);
      setSaleDate(sale_date);

      const saleItemsPromises = items.map(async (item: any) => {
        const itemDetailsResponse = await api.get(`/item/${item.item.id}`);
        const itemDetails: Item = itemDetailsResponse.data.results;
        return {
          id: item.id,
          item_id: String(item.item.id),
          quantity: item.quantity,
          unit_price: item.unit_price,
          description: itemDetails.description,
          available_stock: itemDetails.is_expired_sale_enabled
            ? itemDetails.stock_on_hand
            : itemDetails.non_expired_stock,
        };
      });

      const resolvedSaleItems = await Promise.all(saleItemsPromises);
      setSaleItems(resolvedSaleItems);

    } catch (error) {
      console.error('Error fetching sale:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customer?unpaginated=1');
      setCustomers(response.data.results);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await api.get('/item?unpaginated=1');
      setItems(response.data.results);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItem = () => {
    setSaleItems([...saleItems, { item_id: '', quantity: 1, unit_price: 0, description: '', available_stock: 0 }]);
  };

  const handleItemChange = async (index: number, field: keyof SaleItem, value: any) => {
    const newItems = [...saleItems];
    newItems[index] = { ...newItems[index], [field]: value };

    if (field === 'item_id') {
        if (value) {
            try {
              const response = await api.get(`/item/${value}`);
              const itemDetails: Item = response.data.results;
              newItems[index].description = itemDetails.description;
              newItems[index].available_stock = itemDetails.is_expired_sale_enabled
                ? itemDetails.stock_on_hand
                : itemDetails.non_expired_stock;
            } catch (error) {
              console.error('Error fetching item details:', error);
              newItems[index].description = '';
              newItems[index].available_stock = 0;
            }
        } else {
            newItems[index].description = '';
            newItems[index].available_stock = 0;
        }
    }

    setSaleItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...saleItems];
    newItems.splice(index, 1);
    setSaleItems(newItems);
  };

  const validateForm = () => {
    const newErrors: ApiError = {};

    if (!customerId) {
      newErrors.customer_id = ['Customer is required.'];
    }
    if (!invoiceNumber.trim()) {
      newErrors.invoice_number = ['Invoice number is required.'];
    }
    if (!saleDate) {
      newErrors.sale_date = ['Sale date is required.'];
    }
    if (saleItems.length === 0) {
      newErrors.items = ['At least one item is required.'];
    }

    saleItems.forEach((item, index) => {
      if (!item.item_id) {
        newErrors[`items.${index}.item_id`] = ['Item is required.'];
      }
      if (item.quantity <= 0) {
        newErrors[`items.${index}.quantity`] = ['Quantity must be greater than 0.'];
      }
      if (item.quantity > item.available_stock) {
        newErrors[`items.${index}.quantity`] = [`Quantity cannot exceed available stock of ${item.available_stock}.`];
      }
      if (item.unit_price < 0) {
        newErrors[`items.${index}.unit_price`] = ['Unit price cannot be negative.'];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please correct the errors in the form');
      return;
    }

    const payload = {
      customer_id: customerId,
      invoice_number: invoiceNumber,
      sale_date: saleDate,
      payment_status: 'paid',
      items: saleItems.map(({ description, available_stock, ...item }) => item),
    };

    try {
      await api.put(`/sale/${id}`, payload);
      toast.success('Sale updated successfully');
      navigate('/sales');
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
        toast.error('Please correct the errors in the form');
      } else {
        console.error('Error updating sale:', error);
        toast.error('Failed to update sale');
      }
    }
  };

  const getErrorMessage = (field: string) => {
    return errors[field] ? errors[field][0] : '';
  }

  return (
    <>
      <PageMeta
        title="Edit Sale | Pharmacy Manager"
        description="Edit an existing sale"
      />
      <PageBreadcrumb pageTitle="Edit Sale" breadcrumbs={[{ label: 'Sales', path: '/sales' }]} backButton={true} />

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
                error={!!getErrorMessage('customer_id')}
                hint={getErrorMessage('customer_id')}
              />
            </div>
            <div>
              <Label>Invoice Number</Label>
              <Input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                error={!!getErrorMessage('invoice_number')}
                hint={getErrorMessage('invoice_number')}
              />
            </div>
            <div>
              <DatePicker
                id="sale_date"
                label="Sale Date"
                onChange={(_, dateStr) => setSaleDate(dateStr)}
                defaultDate={saleDate}
                error={!!getErrorMessage('sale_date')}
                hint={getErrorMessage('sale_date')}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 mb-4">
            <h3 className="text-lg font-semibold dark:text-gray-400">Items</h3>
            <Button type="button" variant="outline" onClick={handleAddItem}>
              Add Item
            </Button>
          </div>
          {getErrorMessage('items') && <p className="text-sm text-red-500 mb-4">{getErrorMessage('items')}</p>}

          {saleItems.map((item, index) => (
            <div key={item.id || index} className="relative p-4 mb-4 border rounded-lg">
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="absolute p-1 text-red-500 bg-white rounded-full -top-2 -right-2 hover:bg-red-100"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="md:col-span-1">
                  <Label>Item</Label>
                  <Select
                    options={items.map(i => ({ value: String(i.id), label: i.name }))}
                    onChange={(value) => handleItemChange(index, 'item_id', value)}
                    defaultValue={item.item_id}
                    placeholder="Select an item"
                    error={!!getErrorMessage(`items.${index}.item_id`)}
                    hint={getErrorMessage(`items.${index}.item_id`)}
                  />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                    error={!!getErrorMessage(`items.${index}.quantity`)}
                    hint={getErrorMessage(`items.${index}.quantity`)}
                  />
                  {item.item_id && <p className="text-sm text-gray-500 mt-1">Available: {item.available_stock}</p>}
                </div>
                <div>
                  <Label>Unit Price</Label>
                  <Input
                    type="number"
                    value={item.unit_price}
                    onChange={(e) => handleItemChange(index, 'unit_price', Number(e.target.value))}
                    error={!!getErrorMessage(`items.${index}.unit_price`)}
                    hint={getErrorMessage(`items.${index}.unit_price`)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mt-4">
                <div>
                    <Label>Description</Label>
                    <TextArea
                        value={item.description}
                        readOnly
                        className="bg-gray-100 dark:bg-gray-800"
                    />
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end mt-6">
            <Button type="submit">
              Update Sale
            </Button>
          </div>
        </form>
      </ComponentCard>
    </>
  );
}
