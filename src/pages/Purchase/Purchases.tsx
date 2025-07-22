
import { useEffect, useState } from 'react';
import api from '../../services/api';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import PageMeta from '../../components/common/PageMeta';
import PurchaseTable from '../../components/purchase/PurchaseTable';
import Pagination from '../../components/common/Pagination';
import Button from '../../components/ui/button/Button';
import { Link } from 'react-router';

interface Purchase {
  id: number;
  invoice_number: string;
  purchase_date: string;
  vendor: {
    name: string;
  };
  total: number;
}

export default function Purchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');

  const fetchPurchases = async (page = 1, limit = 10, sortCol = 'created_at', sortDir = 'desc') => {
    try {
      const response = await api.get(`/purchase?perPage=${limit}&page=${page}&sort_by=${sortCol}&sort_direction=${sortDir}`);
      const { data, last_page, current_page, from, to, total } = response.data.results;
      setPurchases(data);
      setTotalPages(last_page);
      setCurrentPage(current_page);
      setFrom(from);
      setTo(to);
      setTotal(total);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };

  useEffect(() => {
    fetchPurchases(currentPage, perPage, sortBy, sortDirection);
  }, [currentPage, perPage, sortBy, sortDirection]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  return (
    <>
      <PageMeta
        title="Purchases | Pharmacy Manager"
        description="List of purchases"
      />
      <PageBreadcrumb pageTitle="Purchases" />
      <div className="flex items-center justify-end mb-4">
        <Link to="/purchases/add">
          <Button>
            Add Purchase
          </Button>
        </Link>
      </div>
      <div className="space-y-6">
        <ComponentCard title="Purchases">
          <PurchaseTable
            data={purchases}
            onSort={handleSort}
            sortBy={sortBy}
            sortDirection={sortDirection}
            currentPage={currentPage}
            perPage={perPage}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            from={from}
            to={to}
            total={total}
          />
        </ComponentCard>
      </div>
    </>
  );
}
