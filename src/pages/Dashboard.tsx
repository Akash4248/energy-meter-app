import { Navigation } from "@/components/Navigation";
import {
  CurrentUsageWidget,
  TodayUsageWidget,
  TariffStatusWidget,
  MonthlyCostWidget,
  AlertWidget,
} from "@/components/energy/DashboardWidgets";
import {
  AIInsightsWidget,
  QuickRecommendations,
} from "@/components/energy/AIInsights";
import { HourlyUsageChart } from "@/components/energy/EnergyCharts";
import { WelcomeModal } from "@/components/energy/WelcomeModal";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <WelcomeModal />
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Energy Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Monitor your real-time energy consumption and optimize your usage
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <CurrentUsageWidget />
          <TodayUsageWidget />
          <TariffStatusWidget />
          <MonthlyCostWidget />
        </div>

        {/* Alert Widget */}
        <div className="mb-8">
          <AlertWidget />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-8">
            <HourlyUsageChart />
          </div>

          {/* Sidebar Section */}
          <div className="space-y-8">
            <AIInsightsWidget />
            <QuickRecommendations />
          </div>
        </div>
      </div>
    </div>
  );
}
