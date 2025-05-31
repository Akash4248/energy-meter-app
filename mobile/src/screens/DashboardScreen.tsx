import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Alert,
} from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Chip,
  ProgressBar,
  Button,
  Badge,
  Surface,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

import {
  getCurrentUsageStats,
  generateAIInsights,
  generateDailyData,
} from "../utils/energyData";
import {
  getCurrentTariff,
  getOptimalUsageTime,
  formatCurrency,
  formatUsage,
} from "../utils/pricing";
import { theme, spacing, shadows } from "../theme/theme";

const screenWidth = Dimensions.get("window").width;

const DashboardScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [currentStats, setCurrentStats] = useState(getCurrentUsageStats());
  const [currentTariff, setCurrentTariff] = useState(getCurrentTariff());
  const [optimalTime, setOptimalTime] = useState(getOptimalUsageTime());
  const [aiInsights] = useState(generateAIInsights().slice(0, 3));
  const [hourlyData, setHourlyData] = useState(() => {
    const readings = generateDailyData(new Date());
    return readings.slice(0, new Date().getHours() + 1);
  });

  const updateData = () => {
    setCurrentStats(getCurrentUsageStats());
    setCurrentTariff(getCurrentTariff());
    setOptimalTime(getOptimalUsageTime());

    const readings = generateDailyData(new Date());
    setHourlyData(readings.slice(0, new Date().getHours() + 1));
  };

  const onRefresh = () => {
    setRefreshing(true);
    updateData();
    setTimeout(() => setRefreshing(false), 1000);
  };

  useEffect(() => {
    const interval = setInterval(updateData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

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
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#2563eb",
    },
  };

  const chartData = {
    labels: hourlyData.map((reading) => `${reading.timestamp.getHours()}h`),
    datasets: [
      {
        data: hourlyData.map((reading) => reading.usage),
        color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Current Usage Card */}
      <Card style={[styles.card, shadows.medium]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title style={styles.cardTitle}>Current Usage</Title>
            <Icon name="bolt" size={24} color={theme.colors.primary} />
          </View>

          <View style={styles.usageDisplay}>
            <Paragraph style={styles.usageValue}>
              {currentStats.current.currentPower} kW
            </Paragraph>
            <Paragraph style={styles.usageCost}>
              {formatCurrency(currentStats.current.currentCost)}/hour
            </Paragraph>
          </View>

          <View style={styles.tariffInfo}>
            <Chip
              icon="schedule"
              style={[
                styles.tariffChip,
                { backgroundColor: `${currentTariff.color}20` },
              ]}
              textStyle={{ color: currentTariff.color }}
            >
              {currentTariff.type.toUpperCase()} - ₹{currentTariff.rate}/kWh
            </Chip>
          </View>

          <Surface style={styles.optimizationTip}>
            <Icon
              name="lightbulb-outline"
              size={16}
              color={theme.colors.info}
            />
            <Paragraph style={styles.tipText}>{optimalTime}</Paragraph>
          </Surface>
        </Card.Content>
      </Card>

      {/* Today's Progress Card */}
      <Card style={[styles.card, shadows.medium]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title style={styles.cardTitle}>Today's Usage</Title>
            <Icon name="trending-up" size={24} color={theme.colors.success} />
          </View>

          <View style={styles.progressInfo}>
            <Paragraph style={styles.progressText}>
              {formatUsage(currentStats.today.usageUpToNow)} of{" "}
              {formatUsage(currentStats.today.totalUsage)} projected
            </Paragraph>
            <Paragraph style={styles.progressCost}>
              {formatCurrency(currentStats.today.totalCost)} estimated today
            </Paragraph>
          </View>

          <ProgressBar
            progress={currentStats.today.progressPercent / 100}
            color={theme.colors.primary}
            style={styles.progressBar}
          />

          <Paragraph style={styles.progressPercentage}>
            {currentStats.today.progressPercent}% of day completed
          </Paragraph>
        </Card.Content>
      </Card>

      {/* Hourly Usage Chart */}
      <Card style={[styles.card, shadows.medium]}>
        <Card.Content>
          <Title style={styles.cardTitle}>Today's Hourly Usage</Title>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={chartData}
              width={Math.max(screenWidth - 60, hourlyData.length * 40)}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </ScrollView>
        </Card.Content>
      </Card>

      {/* AI Insights */}
      <Card style={[styles.card, shadows.medium]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title style={styles.cardTitle}>AI Insights</Title>
            <Icon name="psychology" size={24} color={theme.colors.accent} />
          </View>

          {aiInsights.map((insight) => (
            <Surface key={insight.id} style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <View style={styles.insightTitleRow}>
                  <Paragraph style={styles.insightTitle}>
                    {insight.title}
                  </Paragraph>
                  <Badge
                    style={[
                      styles.priorityBadge,
                      {
                        backgroundColor:
                          insight.priority === "high"
                            ? theme.colors.error
                            : insight.priority === "medium"
                              ? theme.colors.warning
                              : theme.colors.info,
                      },
                    ]}
                  >
                    {insight.priority}
                  </Badge>
                </View>
                {insight.savings && (
                  <Chip icon="savings" style={styles.savingsChip}>
                    Save ₹{insight.savings}
                  </Chip>
                )}
              </View>
              <Paragraph style={styles.insightDescription}>
                {insight.description}
              </Paragraph>
            </Surface>
          ))}

          <Button
            mode="outlined"
            onPress={() =>
              Alert.alert(
                "Coming Soon",
                "View all insights feature coming soon!",
              )
            }
            style={styles.viewAllButton}
          >
            View All Insights
          </Button>
        </Card.Content>
      </Card>

      {/* Usage Alert */}
      <Card style={[styles.card, styles.alertCard, shadows.medium]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title style={[styles.cardTitle, { color: theme.colors.warning }]}>
              Usage Alert
            </Title>
            <Icon name="warning" size={24} color={theme.colors.warning} />
          </View>
          <Paragraph style={styles.alertText}>
            High energy usage detected at 2 PM yesterday (8.5 kWh vs normal 3.2
            kWh). Check for appliances left running.
          </Paragraph>
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
  card: {
    marginBottom: spacing.md,
    backgroundColor: theme.colors.surface,
  },
  alertCard: {
    backgroundColor: "#fef3c7", // Yellow 100
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.warning,
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
  usageDisplay: {
    alignItems: "center",
    marginVertical: spacing.md,
  },
  usageValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  usageCost: {
    fontSize: 16,
    color: theme.colors.success,
    marginTop: spacing.xs,
  },
  tariffInfo: {
    alignItems: "center",
    marginVertical: spacing.sm,
  },
  tariffChip: {
    marginVertical: spacing.xs,
  },
  optimizationTip: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.sm,
    backgroundColor: "#eff6ff", // Blue 50
    borderRadius: 8,
    marginTop: spacing.sm,
  },
  tipText: {
    flex: 1,
    marginLeft: spacing.xs,
    color: theme.colors.info,
    fontSize: 12,
  },
  progressInfo: {
    marginBottom: spacing.md,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.text,
  },
  progressCost: {
    fontSize: 14,
    color: theme.colors.success,
    marginTop: spacing.xs,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginVertical: spacing.sm,
  },
  progressPercentage: {
    fontSize: 12,
    color: theme.colors.placeholder,
    textAlign: "center",
  },
  chart: {
    marginVertical: spacing.sm,
    borderRadius: 16,
  },
  insightCard: {
    padding: spacing.sm,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  insightHeader: {
    marginBottom: spacing.xs,
  },
  insightTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.text,
    flex: 1,
  },
  priorityBadge: {
    marginLeft: spacing.xs,
  },
  savingsChip: {
    alignSelf: "flex-start",
    backgroundColor: "#d1fae5", // Green 100
  },
  insightDescription: {
    fontSize: 12,
    color: theme.colors.placeholder,
    lineHeight: 18,
  },
  viewAllButton: {
    marginTop: spacing.sm,
  },
  alertText: {
    color: theme.colors.warning,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default DashboardScreen;
