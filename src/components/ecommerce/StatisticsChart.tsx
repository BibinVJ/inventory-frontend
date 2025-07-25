import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";
import { useState } from "react";

type Period = "monthly" | "quarterly" | "annually";

export default function StatisticsChart({ data }: { data: any }) {
  const [period, setPeriod] = useState<Period>("monthly");

  const filterDataByPeriod = (items: any[], period: Period) => {
    const now = new Date();
    return items.filter(item => {
      const itemDate = new Date(item.date);
      switch (period) {
        case "monthly":
          return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
        case "quarterly":
          const currentQuarter = Math.floor(now.getMonth() / 3);
          const itemQuarter = Math.floor(itemDate.getMonth() / 3);
          return itemQuarter === currentQuarter && itemDate.getFullYear() === now.getFullYear();
        case "annually":
          return itemDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  };

  const filteredSales = filterDataByPeriod(data?.sales || [], period);
  const filteredPurchases = filterDataByPeriod(data?.purchases || [], period);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
  };

  const allDates = [
    ...filteredSales.map((s: any) => s.date),
    ...filteredPurchases.map((p: any) => p.date),
  ];

  const uniqueSortedDates = [...new Set(allDates)].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const categories = uniqueSortedDates.map(date => formatDate(date));

  const salesMap = new Map(filteredSales.map((s: any) => [formatDate(s.date), s.total]));
  const purchasesMap = new Map(filteredPurchases.map((p: any) => [formatDate(p.date), p.total]));

  const salesData = categories.map(date => salesMap.get(date) || 0);
  const purchasesData = categories.map(date => purchasesMap.get(date) || 0);

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit, sans-serif",
      markers: {
        radius: 12,
      }
    },
    colors: ["#465FFF", "#9CB9FF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: [2, 2],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      x: {
        format: "dd MMM yyyy",
      },
    },
    xaxis: {
      type: "category",
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
      title: {
        text: "",
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const series = [
    {
      name: "Sales",
      data: salesData,
    },
    {
      name: "Purchases",
      data: purchasesData,
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Statistics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Sale and purchase comparison chart
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab selectedPeriod={period} onSelectPeriod={setPeriod} />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <Chart options={options} series={series} type="area" height={310} />
        </div>
      </div>
    </div>
  );
}
