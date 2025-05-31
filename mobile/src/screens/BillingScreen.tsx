import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Button,
  Chip,
  Divider,
  Surface,
  List,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

import { generateMonthlyBills } from "../utils/energyData";
import { TARIFF_RATES, formatCurrency } from "../utils/pricing";
import { theme, spacing, shadows } from "../theme/theme";

const BillingScreen = () => {
  const [monthlyBills] = useState(generateMonthlyBills());
  const [selectedBill, setSelectedBill] = useState<number | null>(null);

  const currentBill = monthlyBills[monthlyBills.length - 1];
  const pendingBills = monthlyBills.slice(-2, -1);
  const paidBills = monthlyBills.slice(0, -2);

  const handlePayBill = () => {
    Alert.alert("Payment", "Redirecting to payment gateway...", [
      { text: "Cancel", style: "cancel" },
      { text: "Continue", onPress: () => console.log("Payment initiated") },
    ]);
  };

  const handleDownloadBill = () => {
    Alert.alert("Download", "Bill downloaded successfully!");
  };

  const handleSetAutoPay = () => {
    Alert.alert("Auto-Pay", "Auto-pay setup completed!");
  };

  const calculateTotalBill = (bill: typeof currentBill) => {
    const fixedCharges = 150;
    const meterRent = 25;
    const electricityDuty = bill.totalCost * 0.06;
    return bill.totalCost + fixedCharges + meterRent + electricityDuty;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Current Bill Summary */}
      <Card style={[styles.card, shadows.medium]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title style={styles.cardTitle}>
              Current Bill - {currentBill.month} {currentBill.year}
            </Title>
            <Chip mode="outlined" textStyle={{ color: theme.colors.primary }}>
              Current
            </Chip>
          </View>

          <View style={styles.billSummary}>
            <Surface style={styles.summaryItem}>
              <Paragraph style={styles.summaryValue}>
                {currentBill.totalUsage.toFixed(0)}
              </Paragraph>
              <Paragraph style={styles.summaryLabel}>kWh Used</Paragraph>
            </Surface>

            <Surface style={styles.summaryItem}>
              <Paragraph
                style={[styles.summaryValue, { color: theme.colors.primary }]}
              >
                {formatCurrency(currentBill.totalCost)}
              </Paragraph>
              <Paragraph style={styles.summaryLabel}>Energy Cost</Paragraph>
            </Surface>

            <Surface style={styles.summaryItem}>
              <Paragraph
                style={[styles.summaryValue, { color: theme.colors.success }]}
              >
                {formatCurrency(calculateTotalBill(currentBill))}
              </Paragraph>
              <Paragraph style={styles.summaryLabel}>Total Amount</Paragraph>
            </Surface>
          </View>
        </Card.Content>
      </Card>

      {/* Tariff Breakdown */}
      <Card style={[styles.card, shadows.medium]}>
        <Card.Content>
          <Title style={styles.cardTitle}>Usage Breakdown by Tariff</Title>

          {TARIFF_RATES.map((tariff) => {
            let units, cost;
            if (tariff.type === "peak") {
              units = currentBill.breakdown.peakUnits;
              cost = currentBill.peakCost;
            } else if (tariff.type === "normal") {
              units = currentBill.breakdown.normalUnits;
              cost = currentBill.normalCost;
            } else {
              units = currentBill.breakdown.offPeakUnits;
              cost = currentBill.offPeakCost;
            }

            return (
              <Surface key={tariff.type} style={styles.tariffItem}>
                <View style={styles.tariffHeader}>
                  <View style={styles.tariffInfo}>
                    <View
                      style={[
                        styles.colorDot,
                        { backgroundColor: tariff.color },
                      ]}
                    />
                    <View>
                      <Paragraph style={styles.tariffName}>
                        {tariff.type.charAt(0).toUpperCase() +
                          tariff.type.slice(1)}{" "}
                        Hours
                      </Paragraph>
                      <Paragraph style={styles.tariffTime}>
                        {tariff.timeRange} • ₹{tariff.rate}/kWh
                      </Paragraph>
                    </View>
                  </View>
                  <View style={styles.tariffValues}>
                    <Paragraph style={styles.tariffCost}>
                      {formatCurrency(cost)}
                    </Paragraph>
                    <Paragraph style={styles.tariffUnits}>
                      {units.toFixed(0)} kWh
                    </Paragraph>
                  </View>
                </View>
              </Surface>
            );
          })}
        </Card.Content>
      </Card>

      {/* Bill Details */}
      <Card style={[styles.card, shadows.medium]}>
        <Card.Content>
          <Title style={styles.cardTitle}>Bill Details</Title>

          <View style={styles.billDetail}>
            <Paragraph>Energy Charges</Paragraph>
            <Paragraph>{formatCurrency(currentBill.totalCost)}</Paragraph>
          </View>

          <View style={styles.billDetail}>
            <Paragraph>Fixed Charges</Paragraph>
            <Paragraph>₹150</Paragraph>
          </View>

          <View style={styles.billDetail}>
            <Paragraph>Meter Rent</Paragraph>
            <Paragraph>₹25</Paragraph>
          </View>

          <View style={styles.billDetail}>
            <Paragraph>Electricity Duty (6%)</Paragraph>
            <Paragraph>
              {formatCurrency(currentBill.totalCost * 0.06)}
            </Paragraph>
          </View>

          <Divider style={styles.divider} />

          <View style={[styles.billDetail, styles.totalAmount]}>
            <Paragraph style={styles.totalLabel}>Total Amount</Paragraph>
            <Paragraph style={styles.totalValue}>
              {formatCurrency(calculateTotalBill(currentBill))}
            </Paragraph>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <Card style={[styles.card, shadows.medium]}>
        <Card.Content>
          <Title style={styles.cardTitle}>Quick Actions</Title>

          <Button
            mode="contained"
            onPress={handlePayBill}
            style={styles.actionButton}
            icon="credit-card"
          >
            Pay Current Bill
          </Button>

          <Button
            mode="outlined"
            onPress={handleDownloadBill}
            style={styles.actionButton}
            icon="download"
          >
            Download Bill
          </Button>

          <Button
            mode="outlined"
            onPress={handleSetAutoPay}
            style={styles.actionButton}
            icon="schedule"
          >
            Set Auto-Pay
          </Button>
        </Card.Content>
      </Card>

      {/* Payment History */}
      <Card style={[styles.card, shadows.medium]}>
        <Card.Content>
          <Title style={styles.cardTitle}>Payment History</Title>

          {/* Pending Payment */}
          {pendingBills.map((bill) => (
            <List.Item
              key={`${bill.month}-${bill.year}-pending`}
              title={`${bill.month} ${bill.year}`}
              description="Due Date: 15th of next month"
              left={() => (
                <Icon name="schedule" size={24} color={theme.colors.error} />
              )}
              right={() => (
                <View style={styles.paymentInfo}>
                  <Paragraph style={styles.pendingAmount}>
                    {formatCurrency(bill.totalCost)}
                  </Paragraph>
                  <Chip
                    style={styles.pendingChip}
                    textStyle={{ color: theme.colors.error }}
                  >
                    Pending
                  </Chip>
                </View>
              )}
              style={styles.pendingItem}
            />
          ))}

          {/* Paid Bills */}
          {paidBills.slice(-3).map((bill, index) => (
            <List.Item
              key={`${bill.month}-${bill.year}-paid`}
              title={`${bill.month} ${bill.year}`}
              description={`Paid on ${new Date(2024, 11 - index, 15).toLocaleDateString()}`}
              left={() => (
                <Icon
                  name="check-circle"
                  size={24}
                  color={theme.colors.success}
                />
              )}
              right={() => (
                <View style={styles.paymentInfo}>
                  <Paragraph style={styles.paidAmount}>
                    {formatCurrency(bill.totalCost)}
                  </Paragraph>
                  <Chip
                    style={styles.paidChip}
                    textStyle={{ color: theme.colors.success }}
                  >
                    Paid
                  </Chip>
                </View>
              )}
            />
          ))}
        </Card.Content>
      </Card>

      {/* Payment Methods */}
      <Card style={[styles.card, shadows.medium]}>
        <Card.Content>
          <Title style={styles.cardTitle}>Payment Methods</Title>

          <List.Item
            title="Credit/Debit Card"
            description="Instant payment"
            left={() => (
              <Icon name="credit-card" size={24} color={theme.colors.primary} />
            )}
            style={styles.paymentMethod}
          />

          <List.Item
            title="UPI Payment"
            description="PhonePe, GPay, Paytm"
            left={() => (
              <Icon
                name="account-balance-wallet"
                size={24}
                color={theme.colors.success}
              />
            )}
            style={styles.paymentMethod}
          />

          <List.Item
            title="Net Banking"
            description="All major banks supported"
            left={() => (
              <Icon
                name="account-balance"
                size={24}
                color={theme.colors.info}
              />
            )}
            style={styles.paymentMethod}
          />

          <List.Item
            title="Auto-Pay"
            description="Never miss a payment"
            left={() => (
              <Icon name="schedule" size={24} color={theme.colors.warning} />
            )}
            style={styles.paymentMethod}
          />
        </Card.Content>
      </Card>

      {/* Billing Alert */}
      <Card style={[styles.card, styles.alertCard, shadows.medium]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title style={[styles.cardTitle, { color: theme.colors.info }]}>
              Billing Alerts
            </Title>
            <Icon name="info" size={24} color={theme.colors.info} />
          </View>

          <View style={styles.alertContent}>
            <Paragraph style={styles.alertText}>
              💡 Your current bill is 12% higher than last month
            </Paragraph>
            <Paragraph style={styles.alertText}>
              ⏰ Payment due in 5 days
            </Paragraph>
            <Paragraph style={styles.alertText}>
              💰 Save ₹45/month by shifting usage to off-peak hours
            </Paragraph>
          </View>
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
    backgroundColor: "#eff6ff",
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.info,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text,
    flex: 1,
  },
  billSummary: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: spacing.md,
  },
  summaryItem: {
    alignItems: "center",
    padding: spacing.sm,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    minWidth: 80,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  summaryLabel: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginTop: spacing.xs,
  },
  tariffItem: {
    marginBottom: spacing.sm,
    padding: spacing.sm,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
  },
  tariffHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tariffInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.sm,
  },
  tariffName: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.text,
  },
  tariffTime: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  tariffValues: {
    alignItems: "flex-end",
  },
  tariffCost: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  tariffUnits: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  billDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.xs,
  },
  divider: {
    marginVertical: spacing.sm,
  },
  totalAmount: {
    paddingTop: spacing.sm,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.success,
  },
  actionButton: {
    marginBottom: spacing.sm,
  },
  paymentInfo: {
    alignItems: "flex-end",
  },
  pendingAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.error,
  },
  paidAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  pendingChip: {
    backgroundColor: "#fee2e2",
    marginTop: spacing.xs,
  },
  paidChip: {
    backgroundColor: "#d1fae5",
    marginTop: spacing.xs,
  },
  pendingItem: {
    backgroundColor: "#fef2f2",
    borderRadius: 8,
    marginBottom: spacing.xs,
  },
  paymentMethod: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    marginBottom: spacing.xs,
  },
  alertContent: {
    paddingVertical: spacing.sm,
  },
  alertText: {
    color: theme.colors.info,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
});

export default BillingScreen;
