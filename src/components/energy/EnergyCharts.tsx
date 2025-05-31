import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  generateWeeklyData,
  generateDailyData,
  generateDeviceUsage,
} from "@/lib/energy-data";
import { TARIFF_RATES } from "@/lib/pricing";
import { useState } from "react";

export function UsageTrendsChart() {
  const [weeklyData] = useState(generateWeeklyData());

  const chartData = weeklyData.map((day) => ({
    date: new Date(day.date).toLocaleDateString("en-US", { weekday: "short" }),
    peak: day.peakUsage,
    normal: day.normalUsage,
    "off-peak": day.offPeakUsage,
    total: day.totalUsage,
    cost: day.totalCost,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="usage" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="usage">Energy Usage</TabsTrigger>
            <TabsTrigger value="cost">Cost Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="mt-4">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [`${value} kWh`, name]}
                  labelFormatter={(label) => `Day: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="off-peak"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.8}
                />
                <Area
                  type="monotone"
                  dataKey="normal"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.8}
                />
                <Area
                  type="monotone"
                  dataKey="peak"
                  stackId="1"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.8}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="cost" className="mt-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`₹${value}`, "Cost"]}
                  labelFormatter={(label) => `Day: ${label}`}
                />
                <Bar dataKey="cost" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export function HourlyUsageChart() {
  const [todayData] = useState(() => {
    const readings = generateDailyData(new Date());
    return readings.map((reading) => ({
      hour: reading.timestamp.getHours(),
      usage: reading.usage,
      cost: reading.cost,
      tariff: reading.tariffType,
    }));
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Hourly Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={todayData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" tickFormatter={(hour) => `${hour}:00`} />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [
                name === "usage" ? `${value} kWh` : `₹${value}`,
                name === "usage" ? "Usage" : "Cost",
              ]}
              labelFormatter={(hour) => `Time: ${hour}:00`}
            />
            <Line
              type="monotone"
              dataKey="usage"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function DeviceBreakdownChart() {
  const [deviceData] = useState(generateDeviceUsage());

  const COLORS = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#06b6d4",
    "#84cc16",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Usage Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="usage"
                  label={({ device, percentage }) =>
                    `${device}: ${percentage}%`
                  }
                  labelLine={false}
                >
                  {deviceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} kWh`, "Usage"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {deviceData.map((device, index) => (
              <div
                key={device.device}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm font-medium">{device.device}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">₹{device.cost}</div>
                  <div className="text-xs text-muted-foreground">
                    {device.usage} kWh
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TariffDistributionChart() {
  const [weeklyData] = useState(generateWeeklyData());

  const tariffData = TARIFF_RATES.map((tariff) => {
    const totalUsage = weeklyData.reduce((sum, day) => {
      if (tariff.type === "peak") return sum + day.peakUsage;
      if (tariff.type === "normal") return sum + day.normalUsage;
      return sum + day.offPeakUsage;
    }, 0);

    const totalCost = totalUsage * tariff.rate;

    return {
      name: `${tariff.type.charAt(0).toUpperCase() + tariff.type.slice(1)} (₹${tariff.rate})`,
      usage: totalUsage.toFixed(1),
      cost: totalCost.toFixed(0),
      percentage: 0, // Will calculate after
    };
  });

  // Calculate percentages
  const totalUsage = tariffData.reduce(
    (sum, data) => sum + parseFloat(data.usage),
    0,
  );
  tariffData.forEach((data) => {
    data.percentage = Math.round((parseFloat(data.usage) / totalUsage) * 100);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Tariff Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={tariffData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={120} />
            <Tooltip
              formatter={(value, name) => [
                name === "usage" ? `${value} kWh` : `₹${value}`,
                name === "usage" ? "Usage" : "Cost",
              ]}
            />
            <Bar dataKey="usage" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
