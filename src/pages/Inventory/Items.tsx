
import { useEffect, useState } from 'react';
import api from '../../services/api';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import PageMeta from '../../components/common/PageMeta';
import ItemTable from '../../components/inventory/items/ItemTable';
import AddItemModal from '../../components/inventory/items/AddItemModal';
import { useModal } from '../../hooks/useModal';
import Pagination from '../../components/common/Pagination';

interface Item {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}

export default function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const { isOpen, openModal, closeModal } = useModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchItems = async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/item?perPage=${limit}&page=${page}&is_active=1&unpaginated=0`);
      setItems(response.data.results.data);
      setTotalPages(response.data.results.last_page);
      setCurrentPage(response.data.results.current_page);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems(currentPage, perPage);
  }, [currentPage, perPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to first page when per page changes
  };

  return (
    <>
      <PageMeta
        title="Items | Pharmacy Manager"
        description="List of items"
      />
      <PageBreadcrumb pageTitle="Items" />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="perPage" className="text-sm font-medium text-gray-700">Per Page:</label>
          <select
            id="perPage"
            value={perPage}
            onChange={handlePerPageChange}
            className="block w-full px-2 py-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <button onClick={openModal} className="px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add Item
        </button>
      </div>
      <div className="space-y-6">
        <ComponentCard title="Items">
          <ItemTable data={items} onAction={() => fetchItems(currentPage, perPage)} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </ComponentCard>
      </div>
      <AddItemModal isOpen={isOpen} onClose={closeModal} onItemAdded={() => fetchItems(1, perPage)} />
    </>
  );
}
