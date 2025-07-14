import { useEffect, useState } from "react";
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
// import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
// import RecentOrders from "../../components/ecommerce/RecentOrders";
// import DemographicCard from "../../components/ecommerce/DemographicCard";
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
      <div className="text-center text-gray-500">Loading dashboard...</div>
    );
  }

  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics data={data?.metrics} />

          <MonthlySalesChart data={data?.charts?.sales} />
        </div>

                {/* top customers */}
        <div className="col-span-12 xl:col-span-5">
          <CustomersTable title="Top Customers" customers={data?.customers?.best_customers} />
        </div>

        {/* top items: sold and purchase */}
        <div className="col-span-12 xl:col-span-4">
          <TopItems title="Top Sold Items" items={data?.top_items?.sold} />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <TopItems
            title="Top Purchased Items"
            items={data?.top_items?.purchased}
          />
        </div>

        {/* expiry items */}
        <div className="col-span-12 xl:col-span-4">
          <ExpiryItems items={data?.stock_alerts?.expiring_items} />
        </div>

        {/* stock alerts */}
        <div className="col-span-12 xl:col-span-4">
          <StockAlerts
            title="Out of Stock Items"
            items={data?.stock_alerts?.out_of_stock_items}
          />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <StockAlerts
            title="Low Stock Items"
            items={data?.stock_alerts?.low_stock_items}
          />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <StockAlerts
            title="Dead Stock Items"
            items={data?.stock_alerts?.dead_stock_items}
          />
        </div>

        {/* <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div> */}

        <div className="col-span-12">
          <StatisticsChart data={data?.charts} />
        </div>

        {/* <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div> */}

        {/* <div className="col-span-12 xl:col-span-6">
          <RecentOrders />
        </div> */}
      </div>
    </>
  );
}
