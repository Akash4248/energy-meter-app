import { TariffRate } from "@/types/energy";

export const TARIFF_RATES: TariffRate[] = [
  {
    type: "peak",
    rate: 9,
    timeRange: "6 AM-10 AM & 6 PM-10 PM",
    color: "#ef4444", // red
  },
  {
    type: "normal",
    rate: 5.5,
    timeRange: "10 AM-2 PM",
    color: "#f59e0b", // amber
  },
  {
    type: "off-peak",
    rate: 3.5,
    timeRange: "10 PM-6 AM",
    color: "#10b981", // emerald
  },
];

export function getTariffType(hour: number): "peak" | "normal" | "off-peak" {
  if ((hour >= 6 && hour < 10) || (hour >= 18 && hour < 22)) {
    return "peak";
  } else if (hour >= 10 && hour < 14) {
    return "normal";
  } else {
    return "off-peak";
  }
}

export function getTariffRate(
  tariffType: "peak" | "normal" | "off-peak",
): number {
  const tariff = TARIFF_RATES.find((t) => t.type === tariffType);
  return tariff?.rate || 5.5;
}

export function calculateCost(
  usage: number,
  tariffType: "peak" | "normal" | "off-peak",
): number {
  return usage * getTariffRate(tariffType);
}

export function getCurrentTariff(): TariffRate {
  const now = new Date();
  const currentHour = now.getHours();
  const tariffType = getTariffType(currentHour);
  return TARIFF_RATES.find((t) => t.type === tariffType)!;
}

export function getOptimalUsageTime(): string {
  const now = new Date();
  const currentHour = now.getHours();

  if (currentHour >= 22 || currentHour < 6) {
    return "Great time! You're in off-peak hours (₹3.5/unit)";
  } else if (currentHour >= 6 && currentHour < 10) {
    return "Peak hours! Consider delaying non-essential usage. Off-peak starts at 10 PM";
  } else if (currentHour >= 18 && currentHour < 22) {
    return "Peak hours! Wait until 10 PM for off-peak rates (₹3.5/unit)";
  } else if (currentHour >= 10 && currentHour < 14) {
    return "Normal rates. For best savings, wait until 10 PM";
  } else {
    return "Normal rates. Off-peak hours (₹3.5/unit) start at 10 PM";
  }
}
