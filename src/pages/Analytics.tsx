import { Navigation } from "@/components/Navigation";
import {
  UsageTrendsChart,
  DeviceBreakdownChart,
  TariffDistributionChart,
} from "@/components/energy/EnergyCharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";
import { generateWeeklyData, generateMonthlyBills } from "@/lib/energy-data";
import { useState } from "react";

export default function Analytics() {
  const [weeklyData] = useState(generateWeeklyData());
  const [monthlyBills] = useState(generateMonthlyBills());

  // Calculate analytics
  const totalWeeklyUsage = weeklyData.reduce(
    (sum, day) => sum + day.totalUsage,
    0,
  );
  const totalWeeklyCost = weeklyData.reduce(
    (sum, day) => sum + day.totalCost,
    0,
  );
  const avgDailyUsage = totalWeeklyUsage / 7;
  const avgDailyCost = totalWeeklyCost / 7;

  // Compare with previous week (simulated)
  const previousWeekUsage = totalWeeklyUsage * (0.9 + Math.random() * 0.2);
  const usageChange =
    ((totalWeeklyUsage - previousWeekUsage) / previousWeekUsage) * 100;

  const currentMonth = monthlyBills[monthlyBills.length - 1];
  const previousMonth = monthlyBills[monthlyBills.length - 2];
  const monthlyChange = previousMonth
    ? ((currentMonth.totalCost - previousMonth.totalCost) /
        previousMonth.totalCost) *
      100
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Energy Analytics</h1>
          <p className="text-gray-600 mt-2">
            Detailed insights into your energy consumption patterns and trends
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Weekly Usage
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalWeeklyUsage.toFixed(1)} kWh
              </div>
              <div className="flex items-center space-x-1 text-sm">
                {usageChange > 0 ? (
                  <TrendingUp className="h-3 w-3 text-red-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-green-500" />
                )}
                <span
                  className={
                    usageChange > 0 ? "text-red-500" : "text-green-500"
                  }
                >
                  {Math.abs(usageChange).toFixed(1)}%
                </span>
                <span className="text-muted-foreground">from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Cost</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{totalWeeklyCost.toFixed(0)}
              </div>
              <div className="text-sm text-muted-foreground">
                ₹{avgDailyCost.toFixed(0)} per day average
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Trend
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{currentMonth.totalCost.toFixed(0)}
              </div>
              <div className="flex items-center space-x-1 text-sm">
                {monthlyChange > 0 ? (
                  <TrendingUp className="h-3 w-3 text-red-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-green-500" />
                )}
                <span
                  className={
                    monthlyChange > 0 ? "text-red-500" : "text-green-500"
                  }
                >
                  {Math.abs(monthlyChange).toFixed(1)}%
                </span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Efficiency Score
              </CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">73%</div>
              <Progress value={73} className="mt-2" />
              <div className="text-sm text-muted-foreground mt-1">
                Based on optimal usage patterns
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trends">Usage Trends</TabsTrigger>
            <TabsTrigger value="devices">Device Analysis</TabsTrigger>
            <TabsTrigger value="tariffs">Tariff Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <UsageTrendsChart />

            {/* Monthly Bills History */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Bills History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyBills.slice(-6).map((bill, index) => (
                    <div
                      key={`analytics-${bill.month}-${bill.year}-${index}`}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">
                          {bill.month} {bill.year}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {bill.totalUsage.toFixed(0)} kWh total usage
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          ₹{bill.totalCost.toFixed(0)}
                        </div>
                        <div className="flex space-x-2 text-xs">
                          <Badge
                            variant="outline"
                            style={{ color: "#ef4444", borderColor: "#ef4444" }}
                          >
                            Peak: ₹{bill.peakCost.toFixed(0)}
                          </Badge>
                          <Badge
                            variant="outline"
                            style={{ color: "#f59e0b", borderColor: "#f59e0b" }}
                          >
                            Normal: ₹{bill.normalCost.toFixed(0)}
                          </Badge>
                          <Badge
                            variant="outline"
                            style={{ color: "#10b981", borderColor: "#10b981" }}
                          >
                            Off-peak: ₹{bill.offPeakCost.toFixed(0)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <DeviceBreakdownChart />

            {/* Device Efficiency Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Device Optimization Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="font-medium text-blue-800">
                      Air Conditioner
                    </div>
                    <div className="text-sm text-blue-600">
                      Set to 25°C to save ₹180/month. Use timer function during
                      sleep hours.
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="font-medium text-green-800">
                      Water Heater
                    </div>
                    <div className="text-sm text-green-600">
                      Heat water during off-peak hours (10 PM - 6 AM) for
                      maximum savings.
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="font-medium text-yellow-800">
                      Washing Machine
                    </div>
                    <div className="text-sm text-yellow-600">
                      Use cold water and run during off-peak hours to save
                      ₹45/month.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tariffs" className="space-y-6">
            <TariffDistributionChart />

            {/* Tariff Optimization */}
            <Card>
              <CardHeader>
                <CardTitle>Tariff Optimization Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-red-800 font-medium">Peak Usage</div>
                    <div className="text-2xl font-bold text-red-600">
                      {weeklyData
                        .reduce((sum, day) => sum + day.peakUsage, 0)
                        .toFixed(1)}{" "}
                      kWh
                    </div>
                    <div className="text-sm text-red-600">
                      35% of total usage at ₹9/kWh
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-yellow-800 font-medium">
                      Normal Usage
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {weeklyData
                        .reduce((sum, day) => sum + day.normalUsage, 0)
                        .toFixed(1)}{" "}
                      kWh
                    </div>
                    <div className="text-sm text-yellow-600">
                      25% of total usage at ₹5.5/kWh
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-green-800 font-medium">
                      Off-Peak Usage
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {weeklyData
                        .reduce((sum, day) => sum + day.offPeakUsage, 0)
                        .toFixed(1)}{" "}
                      kWh
                    </div>
                    <div className="text-sm text-green-600">
                      40% of total usage at ₹3.5/kWh
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-blue-800 font-medium mb-2">
                    Optimization Potential
                  </div>
                  <div className="text-sm text-blue-600">
                    By shifting 20% of peak usage to off-peak hours, you could
                    save approximately ₹65 per month. This equals ₹780 in annual
                    savings.
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
