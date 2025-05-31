import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  TrendingUp,
  Clock,
  DollarSign,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { getCurrentTariff, getOptimalUsageTime } from "@/lib/pricing";
import { getCurrentUsageStats } from "@/lib/energy-data";
import { useEffect, useState } from "react";

export function CurrentUsageWidget() {
  const [stats, setStats] = useState(getCurrentUsageStats());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(getCurrentUsageStats());
      setCurrentTime(new Date());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentTariff = getCurrentTariff();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Usage</CardTitle>
        <Zap className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {stats.current.currentPower} kW
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: currentTariff.color }}
          />
          <span className="capitalize">{stats.current.tariffType} Rate</span>
          <span>₹{currentTariff.rate}/kWh</span>
        </div>
        <div className="text-sm font-medium text-green-600 mt-1">
          ₹{stats.current.currentCost}/hour
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Last updated: {currentTime.toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
}

export function TodayUsageWidget() {
  const [stats] = useState(getCurrentUsageStats());

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Today's Usage</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stats.today.usageUpToNow} kWh</div>
        <div className="text-sm text-muted-foreground">
          of {stats.today.totalUsage} kWh projected
        </div>
        <Progress value={stats.today.progressPercent} className="mt-2" />
        <div className="text-sm font-medium text-blue-600 mt-1">
          ₹
          {(
            (stats.today.totalCost * stats.today.progressPercent) /
            100
          ).toFixed(0)}{" "}
          spent so far
        </div>
      </CardContent>
    </Card>
  );
}

export function TariffStatusWidget() {
  const currentTariff = getCurrentTariff();
  const optimalTime = getOptimalUsageTime();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Tariff</CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Badge
            variant="secondary"
            style={{
              backgroundColor: `${currentTariff.color}20`,
              color: currentTariff.color,
              border: `1px solid ${currentTariff.color}40`,
            }}
          >
            {currentTariff.type.toUpperCase()}
          </Badge>
          <span className="text-lg font-bold">₹{currentTariff.rate}/kWh</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {currentTariff.timeRange}
        </div>
        <div className="text-sm mt-2 p-2 bg-blue-50 rounded text-blue-700">
          💡 {optimalTime}
        </div>
      </CardContent>
    </Card>
  );
}

export function MonthlyCostWidget() {
  const [stats] = useState(getCurrentUsageStats());
  const projectedMonthlyCost = stats.today.totalCost * 30;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Projected Monthly Cost
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          ₹{projectedMonthlyCost.toFixed(0)}
        </div>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <TrendingUp className="h-3 w-3" />
          <span>+12% from last month</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Based on current usage patterns
        </div>
      </CardContent>
    </Card>
  );
}

export function AlertWidget() {
  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-orange-800">
          Usage Alert
        </CardTitle>
        <AlertTriangle className="h-4 w-4 text-orange-600" />
      </CardHeader>
      <CardContent>
        <div className="text-sm text-orange-800">
          High energy usage detected at 2 PM yesterday (8.5 kWh vs normal 3.2
          kWh)
        </div>
        <div className="text-xs text-orange-600 mt-1">
          Check for appliances left running
        </div>
      </CardContent>
    </Card>
  );
}
