import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Chip,
  SegmentedButtons,
  Surface,
  DataTable,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BarChart, PieChart, LineChart } from "react-native-chart-kit";

import {
  generateWeeklyData,
  generateMonthlyBills,
  generateDeviceUsage,
} from "../utils/energyData";
import { TARIFF_RATES, formatCurrency, formatUsage } from "../utils/pricing";
import { theme, spacing, shadows } from "../theme/theme";

const screenWidth = Dimensions.get("window").width;

const AnalyticsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [weeklyData] = useState(generateWeeklyData());
  const [monthlyBills] = useState(generateMonthlyBills());
  const [deviceUsage] = useState(generateDeviceUsage());

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  // Weekly usage chart data
  const weeklyChartData = {
    labels: weeklyData.map((day) =>
      new Date(day.date).toLocaleDateString("en-US", { weekday: "short" }),
    ),
    datasets: [
      {
        data: weeklyData.map((day) => day.totalUsage),
        color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  // Monthly bills chart data
  const monthlyChartData = {
    labels: monthlyBills.map((bill) => bill.month),
    datasets: [
      {
        data: monthlyBills.map((bill) => bill.totalCost),
      },
    ],
  };

  // Device usage pie chart data
  const devicePieData = deviceUsage.slice(0, 6).map((device, index) => ({
    name: device.device,
    usage: device.usage,
    color: [
      "#3b82f6",
      "#ef4444",
      "#10b981",
      "#f59e0b",
      "#8b5cf6",
      "#06b6d4",
      "#84cc16",
    ][index],
    legendFontColor: "#6b7280",
    legendFontSize: 12,
  }));

  // Tariff distribution data
  const tariffDistribution = TARIFF_RATES.map((tariff) => {
    const totalUsage = weeklyData.reduce((sum, day) => {
      if (tariff.type === "peak") return sum + day.peakUsage;
      if (tariff.type === "normal") return sum + day.normalUsage;
      return sum + day.offPeakUsage;
    }, 0);

    return {
      name: tariff.type,
      usage: totalUsage,
      color: tariff.color,
      legendFontColor: "#6b7280",
      legendFontSize: 12,
    };
  });

  const totalWeeklyUsage = weeklyData.reduce(
    (sum, day) => sum + day.totalUsage,
    0,
  );
  const totalWeeklyCost = weeklyData.reduce(
    (sum, day) => sum + day.totalCost,
    0,
  );
  const avgDailyUsage = totalWeeklyUsage / 7;

  return (
    <ScrollView style={styles.container}>
      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <Card style={[styles.summaryCard, shadows.medium]}>
          <Card.Content style={styles.summaryContent}>
            <Icon name="bar-chart" size={24} color={theme.colors.primary} />
            <View>
              <Paragraph style={styles.summaryValue}>
                {formatUsage(totalWeeklyUsage)}
              </Paragraph>
              <Paragraph style={styles.summaryLabel}>Weekly Usage</Paragraph>
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.summaryCard, shadows.medium]}>
          <Card.Content style={styles.summaryContent}>
            <Icon name="trending-up" size={24} color={theme.colors.success} />
            <View>
              <Paragraph style={styles.summaryValue}>
                {formatCurrency(totalWeeklyCost)}
              </Paragraph>
              <Paragraph style={styles.summaryLabel}>Weekly Cost</Paragraph>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Period Selector */}
      <Card style={[styles.card, shadows.medium]}>
        <Card.Content>
          <SegmentedButtons
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
            buttons={[
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
              { value: "devices", label: "Devices" },
            ]}
          />
        </Card.Content>
      </Card>

      {/* Charts based on selected period */}
      {selectedPeriod === "week" && (
        <>
          <Card style={[styles.card, shadows.medium]}>
            <Card.Content>
              <Title style={styles.cardTitle}>Weekly Usage Trends</Title>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <LineChart
                  data={weeklyChartData}
                  width={screenWidth - 40}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chart}
                />
              </ScrollView>
            </Card.Content>
          </Card>

          <Card style={[styles.card, shadows.medium]}>
            <Card.Content>
              <Title style={styles.cardTitle}>Tariff Distribution</Title>
              <PieChart
                data={tariffDistribution}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
                accessor="usage"
                backgroundColor="transparent"
                paddingLeft="15"
              />

              <View style={styles.tariffLegend}>
                {TARIFF_RATES.map((tariff) => {
                  const usage =
                    tariffDistribution.find((t) => t.name === tariff.type)
                      ?.usage || 0;
                  const percentage = ((usage / totalWeeklyUsage) * 100).toFixed(
                    1,
                  );

                  return (
                    <Surface key={tariff.type} style={styles.tariffItem}>
                      <View
                        style={[
                          styles.colorDot,
                          { backgroundColor: tariff.color },
                        ]}
                      />
                      <View style={styles.tariffInfo}>
                        <Paragraph style={styles.tariffName}>
                          {tariff.type.charAt(0).toUpperCase() +
                            tariff.type.slice(1)}
                        </Paragraph>
                        <Paragraph style={styles.tariffDetails}>
                          {formatUsage(usage)} ({percentage}%)
                        </Paragraph>
                      </View>
                    </Surface>
                  );
                })}
              </View>
            </Card.Content>
          </Card>
        </>
      )}

      {selectedPeriod === "month" && (
        <Card style={[styles.card, shadows.medium]}>
          <Card.Content>
            <Title style={styles.cardTitle}>Monthly Bills</Title>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <BarChart
                data={monthlyChartData}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
                yAxisLabel="₹"
                style={styles.chart}
              />
            </ScrollView>

            <DataTable style={styles.dataTable}>
              <DataTable.Header>
                <DataTable.Title>Month</DataTable.Title>
                <DataTable.Title numeric>Usage</DataTable.Title>
                <DataTable.Title numeric>Cost</DataTable.Title>
              </DataTable.Header>

              {monthlyBills.slice(-3).map((bill) => (
                <DataTable.Row key={`${bill.month}-${bill.year}`}>
                  <DataTable.Cell>
                    {bill.month} {bill.year}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {formatUsage(bill.totalUsage)}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {formatCurrency(bill.totalCost)}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>
      )}

      {selectedPeriod === "devices" && (
        <>
          <Card style={[styles.card, shadows.medium]}>
            <Card.Content>
              <Title style={styles.cardTitle}>Device Usage Breakdown</Title>
              <PieChart
                data={devicePieData}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
                accessor="usage"
                backgroundColor="transparent"
                paddingLeft="15"
              />
            </Card.Content>
          </Card>

          <Card style={[styles.card, shadows.medium]}>
            <Card.Content>
              <Title style={styles.cardTitle}>Device Efficiency</Title>
              {deviceUsage.map((device, index) => (
                <Surface key={device.device} style={styles.deviceItem}>
                  <View style={styles.deviceHeader}>
                    <Paragraph style={styles.deviceName}>
                      {device.device}
                    </Paragraph>
                    <Chip style={styles.deviceChip}>{device.percentage}%</Chip>
                  </View>
                  <View style={styles.deviceStats}>
                    <Paragraph style={styles.deviceUsage}>
                      {formatUsage(device.usage)}
                    </Paragraph>
                    <Paragraph style={styles.deviceCost}>
                      {formatCurrency(device.cost)}
                    </Paragraph>
                  </View>
                </Surface>
              ))}
            </Card.Content>
          </Card>
        </>
      )}

      {/* Optimization Tips */}
      <Card style={[styles.card, shadows.medium]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title style={styles.cardTitle}>Optimization Tips</Title>
            <Icon
              name="lightbulb-outline"
              size={24}
              color={theme.colors.warning}
            />
          </View>

          <Surface style={styles.tipCard}>
            <Icon name="ac-unit" size={20} color={theme.colors.info} />
            <View style={styles.tipContent}>
              <Paragraph style={styles.tipTitle}>Air Conditioner</Paragraph>
              <Paragraph style={styles.tipDescription}>
                Set to 25°C to save ₹180/month. Use timer during sleep hours.
              </Paragraph>
            </View>
          </Surface>

          <Surface style={styles.tipCard}>
            <Icon
              name="local-laundry-service"
              size={20}
              color={theme.colors.success}
            />
            <View style={styles.tipContent}>
              <Paragraph style={styles.tipTitle}>Washing Machine</Paragraph>
              <Paragraph style={styles.tipDescription}>
                Use cold water and run during off-peak hours to save ₹45/month.
              </Paragraph>
            </View>
          </Surface>

          <Surface style={styles.tipCard}>
            <Icon name="wb-sunny" size={20} color={theme.colors.warning} />
            <View style={styles.tipContent}>
              <Paragraph style={styles.tipTitle}>Water Heater</Paragraph>
              <Paragraph style={styles.tipDescription}>
                Heat water during off-peak hours (10 PM - 6 AM) for maximum
                savings.
              </Paragraph>
            </View>
          </Surface>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: spacing.md,
  },
  summaryContainer: {
    flexDirection: "row",
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  summaryContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  summaryLabel: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  card: {
    marginBottom: spacing.md,
    backgroundColor: theme.colors.surface,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  chart: {
    marginVertical: spacing.sm,
    borderRadius: 16,
  },
  tariffLegend: {
    marginTop: spacing.md,
  },
  tariffItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.sm,
    marginBottom: spacing.xs,
    borderRadius: 8,
    backgroundColor: "#f9fafb",
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.sm,
  },
  tariffInfo: {
    flex: 1,
  },
  tariffName: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.text,
  },
  tariffDetails: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  dataTable: {
    marginTop: spacing.md,
  },
  deviceItem: {
    padding: spacing.sm,
    marginBottom: spacing.sm,
    borderRadius: 8,
    backgroundColor: "#f9fafb",
  },
  deviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  deviceName: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.text,
  },
  deviceChip: {
    backgroundColor: theme.colors.primary,
  },
  deviceStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deviceUsage: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  deviceCost: {
    fontSize: 12,
    fontWeight: "500",
    color: theme.colors.success,
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: spacing.sm,
    marginBottom: spacing.sm,
    borderRadius: 8,
    backgroundColor: "#f0f9ff",
  },
  tipContent: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.text,
  },
  tipDescription: {
    fontSize: 12,
    color: theme.colors.placeholder,
    lineHeight: 16,
  },
});

export default AnalyticsScreen;
