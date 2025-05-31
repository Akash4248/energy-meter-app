export interface EnergyReading {
  timestamp: Date;
  usage: number; // kWh
  cost: number; // ₹
  tariffType: "peak" | "normal" | "off-peak";
}

export interface DailyUsage {
  date: string;
  peakUsage: number;
  normalUsage: number;
  offPeakUsage: number;
  totalUsage: number;
  totalCost: number;
}

export interface MonthlyBill {
  month: string;
  year: number;
  totalUsage: number;
  totalCost: number;
  peakCost: number;
  normalCost: number;
  offPeakCost: number;
  breakdown: {
    peakUnits: number;
    normalUnits: number;
    offPeakUnits: number;
  };
}

export interface AIInsight {
  id: string;
  type: "prediction" | "recommendation" | "alert";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  timestamp: Date;
  savings?: number; // Potential savings in ₹
}

export interface DeviceUsage {
  device: string;
  usage: number; // kWh
  cost: number; // ₹
  percentage: number; // % of total usage
}

export interface TariffRate {
  type: "peak" | "normal" | "off-peak";
  rate: number; // ₹ per kWh
  timeRange: string;
  color: string;
}
