import Sidebar from "@/components/sidebar";
import { Label } from "@/components/ui/label";

export default function AdminDashboard() {
  return (
    <main className="flex-1 bg-gray-100 p-6 overflow-y-scroll h-screen mb-2">
      <h2 className="text-2xl font-bold mb-6">Dashboard Metrics</h2>

      {/* Grid of Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sales */}
        <MetricCard title="Total Sales" value="$25,000" />
        <MetricCard title="Revenue Growth" value="12%" />
        <MetricCard title="Avg Order Value" value="$75" />
        <MetricCard title="Conversion Rate" value="3.5%" />

        {/* Customers */}
        <MetricCard title="Total Customers" value="1,200" />
        <MetricCard title="New Customers" value="150" />
        <MetricCard title="Repeat Purchase Rate" value="40%" />
        <MetricCard title="Customer Lifetime Value" value="$500" />

        {/* Orders */}
        <MetricCard title="Total Orders" value="980" />
        <MetricCard title="Pending Orders" value="45" />
        <MetricCard title="Avg Fulfillment Time" value="2 days" />
        <MetricCard title="Return Rate" value="5%" />

        {/* Marketing */}
        <MetricCard title="Cart Abandonment" value="68%" />
        <MetricCard title="Top Product" value="Wireless Headphones" />
        <MetricCard title="ROAS" value="3.2x" />
      </div>
    </main>
  );
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
