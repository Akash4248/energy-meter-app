import {
  EnergyReading,
  DailyUsage,
  MonthlyBill,
  AIInsight,
  DeviceUsage,
} from "@/types/energy";
import { getTariffType, calculateCost, getTariffRate } from "./pricing";

// Simulate real-time energy usage
export function generateCurrentUsage(): {
  currentPower: number;
  currentCost: number;
  tariffType: "peak" | "normal" | "off-peak";
} {
  const now = new Date();
  const hour = now.getHours();
  const tariffType = getTariffType(hour);

  // Simulate realistic usage patterns
  let basePower = 2.5; // kW

  // Higher usage during peak hours
  if (tariffType === "peak") {
    basePower += Math.random() * 2; // 2.5-4.5 kW
  } else if (tariffType === "normal") {
    basePower += Math.random() * 1.5; // 2.5-4 kW
  } else {
    basePower += Math.random() * 1; // 2.5-3.5 kW
  }

  const currentPower = Number(basePower.toFixed(2));
  const hourlyUsage = currentPower; // Assuming continuous usage for 1 hour
  const currentCost = calculateCost(hourlyUsage, tariffType);

  return {
    currentPower,
    currentCost: Number(currentCost.toFixed(2)),
    tariffType,
  };
}

// Generate hourly data for a day
export function generateDailyData(date: Date): EnergyReading[] {
  const readings: EnergyReading[] = [];

  for (let hour = 0; hour < 24; hour++) {
    const timestamp = new Date(date);
    timestamp.setHours(hour, 0, 0, 0);

    const tariffType = getTariffType(hour);
    let usage = 2 + Math.random() * 2; // Base 2-4 kWh per hour

    // Simulate realistic usage patterns
    if (hour >= 6 && hour <= 9) usage += 1; // Morning peak
    if (hour >= 18 && hour <= 21) usage += 1.5; // Evening peak
    if (hour >= 22 || hour <= 5) usage *= 0.7; // Night reduction

    usage = Number(usage.toFixed(2));
    const cost = calculateCost(usage, tariffType);

    readings.push({
      timestamp,
      usage,
      cost: Number(cost.toFixed(2)),
      tariffType,
    });
  }

  return readings;
}

// Generate daily usage summary for multiple days
export function generateWeeklyData(): DailyUsage[] {
  const data: DailyUsage[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const dailyReadings = generateDailyData(date);

    const peakUsage = dailyReadings
      .filter((r) => r.tariffType === "peak")
      .reduce((sum, r) => sum + r.usage, 0);

    const normalUsage = dailyReadings
      .filter((r) => r.tariffType === "normal")
      .reduce((sum, r) => sum + r.usage, 0);

    const offPeakUsage = dailyReadings
      .filter((r) => r.tariffType === "off-peak")
      .reduce((sum, r) => sum + r.usage, 0);

    const totalUsage = peakUsage + normalUsage + offPeakUsage;
    const totalCost = dailyReadings.reduce((sum, r) => sum + r.cost, 0);

    data.push({
      date: date.toISOString().split("T")[0],
      peakUsage: Number(peakUsage.toFixed(2)),
      normalUsage: Number(normalUsage.toFixed(2)),
      offPeakUsage: Number(offPeakUsage.toFixed(2)),
      totalUsage: Number(totalUsage.toFixed(2)),
      totalCost: Number(totalCost.toFixed(2)),
    });
  }

  return data;
}

// Generate monthly bills
export function generateMonthlyBills(): MonthlyBill[] {
  const bills: MonthlyBill[] = [];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);

    // Ensure we don't have duplicate month-year combinations
    const monthKey = `${months[date.getMonth()]}-${date.getFullYear()}`;
    const existingBill = bills.find(
      (bill) => `${bill.month}-${bill.year}` === monthKey,
    );

    if (existingBill) {
      continue; // Skip if we already have this month-year combination
    }

    const peakUnits = 150 + Math.random() * 100;
    const normalUnits = 200 + Math.random() * 150;
    const offPeakUnits = 300 + Math.random() * 200;

    const peakCost = peakUnits * getTariffRate("peak");
    const normalCost = normalUnits * getTariffRate("normal");
    const offPeakCost = offPeakUnits * getTariffRate("off-peak");

    bills.push({
      id: `bill-${date.getFullYear()}-${date.getMonth()}-${Date.now()}-${Math.random()}`,
      month: months[date.getMonth()],
      year: date.getFullYear(),
      totalUsage: Number((peakUnits + normalUnits + offPeakUnits).toFixed(2)),
      totalCost: Number((peakCost + normalCost + offPeakCost).toFixed(2)),
      peakCost: Number(peakCost.toFixed(2)),
      normalCost: Number(normalCost.toFixed(2)),
      offPeakCost: Number(offPeakCost.toFixed(2)),
      breakdown: {
        peakUnits: Number(peakUnits.toFixed(2)),
        normalUnits: Number(normalUnits.toFixed(2)),
        offPeakUnits: Number(offPeakUnits.toFixed(2)),
      },
    });
  }

  return bills;
}

// Generate AI insights
export function generateAIInsights(): AIInsight[] {
  const insights: AIInsight[] = [
    {
      id: "1",
      type: "prediction",
      title: "Monthly Bill Prediction",
      description:
        "Based on current usage, your bill will be ₹2,847 this month. This is 12% higher than last month.",
      priority: "medium",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "recommendation",
      title: "Optimal Laundry Time",
      description:
        "Run your washing machine after 10 PM to save ₹45/month. Off-peak rates are 61% cheaper.",
      priority: "high",
      timestamp: new Date(),
      savings: 45,
    },
    {
      id: "3",
      type: "alert",
      title: "Unusual Spike Detected",
      description:
        "Energy usage was 3x higher than normal at 2 PM yesterday. Check for appliances left on.",
      priority: "high",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
    {
      id: "4",
      type: "recommendation",
      title: "AC Optimization",
      description:
        "Setting AC to 25°C instead of 22°C can save ₹180/month during peak hours.",
      priority: "medium",
      timestamp: new Date(),
      savings: 180,
    },
    {
      id: "5",
      type: "prediction",
      title: "Peak Hour Alert",
      description:
        "Peak hours start in 30 minutes (6 PM). Consider completing high-power tasks now.",
      priority: "low",
      timestamp: new Date(),
    },
  ];

  return insights;
}

// Generate device usage breakdown
export function generateDeviceUsage(): DeviceUsage[] {
  const devices = [
    { device: "Air Conditioner", baseUsage: 35, baseCost: 280 },
    { device: "Water Heater", baseUsage: 15, baseCost: 120 },
    { device: "Refrigerator", baseUsage: 12, baseCost: 95 },
    { device: "Washing Machine", baseUsage: 8, baseCost: 65 },
    { device: "Lights & Fans", baseUsage: 10, baseCost: 80 },
    { device: "TV & Electronics", baseUsage: 6, baseCost: 48 },
    { device: "Other Appliances", baseUsage: 14, baseCost: 112 },
  ];

  const totalUsage = devices.reduce((sum, d) => sum + d.baseUsage, 0);

  return devices
    .map((device) => ({
      device: device.device,
      usage: device.baseUsage + (Math.random() - 0.5) * 5,
      cost: device.baseCost + (Math.random() - 0.5) * 40,
      percentage: Math.round((device.baseUsage / totalUsage) * 100),
    }))
    .map((device) => ({
      ...device,
      usage: Number(device.usage.toFixed(1)),
      cost: Number(device.cost.toFixed(0)),
    }));
}

// Get current usage stats for dashboard
export function getCurrentUsageStats() {
  const current = generateCurrentUsage();
  const today = generateDailyData(new Date());
  const todayTotal = today.reduce((sum, r) => sum + r.usage, 0);
  const todayCost = today.reduce((sum, r) => sum + r.cost, 0);

  // Calculate progress through the day
  const currentHour = new Date().getHours();
  const usageUpToNow = today
    .slice(0, currentHour + 1)
    .reduce((sum, r) => sum + r.usage, 0);

  return {
    current,
    today: {
      totalUsage: Number(todayTotal.toFixed(2)),
      totalCost: Number(todayCost.toFixed(2)),
      usageUpToNow: Number(usageUpToNow.toFixed(2)),
      progressPercent: Math.round((currentHour / 24) * 100),
    },
  };
}
