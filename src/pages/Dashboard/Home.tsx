import { useEffect, useState } from "react";
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import PageMeta from "../../components/common/PageMeta";
import { getDashboardData } from "../../services/DashboardService";
import TopItems from "../../components/ecommerce/TopItems";
import StockAlerts from "../../components/ecommerce/StockAlerts";
import CustomersTable from "../../components/ecommerce/CustomersTable";
import ExpiryItems from "../../components/ecommerce/ExpiryItems";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardData()
      .then((res) => {
        setData(res.data.results);
      })
      .catch((err) => {
        console.error("Dashboard fetch failed", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Ecommerce Dashboard | Pharmacy Manager"
        description="This is the ecommerce dashboard page for Pharmacy Manager"
      />
      <div className="p-4 space-y-6 md:p-6 2xl:p-10">
        {/* Top Row: Key Metrics */}
        <EcommerceMetrics data={data?.metrics} />

        {/* Main Content Area */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Left Side: Main Charts and Tables */}
          <div className="col-span-12 space-y-6 xl:col-span-8">
            <MonthlySalesChart data={data?.charts?.sales} />
            <StatisticsChart data={data?.charts} />
            <CustomersTable title="Top Customers" customers={data?.customers?.best_customers} />
          </div>

          {/* Right Side: Alerts and Lists */}
          <div className="col-span-12 space-y-6 xl:col-span-4">
            <StockAlerts
              title="Out of Stock Items"
              items={data?.stock_alerts?.out_of_stock_items}
              color="error"
            />
            <StockAlerts
              title="Low Stock Items"
              items={data?.stock_alerts?.low_stock_items}
              color="warning"
            />
            <ExpiryItems items={data?.stock_alerts?.expiring_items} />
            <TopItems title="Top Sold Items" items={data?.top_items?.sold} />
            <TopItems
              title="Top Purchased Items"
              items={data?.top_items?.purchased}
            />
            <StockAlerts
              title="Dead Stock Items"
              items={data?.stock_alerts?.dead_stock_items}
              color="secondary"
            />
          </div>
        </div>
      </div>
    </>
  );
}