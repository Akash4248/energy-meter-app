import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Switch,
  TextInput,
  Button,
  List,
  Divider,
  Surface,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

import { theme, spacing, shadows } from "../theme/theme";

const SettingsScreen = () => {
  const [notifications, setNotifications] = useState({
    billReminder: true,
    usageAlerts: true,
    peakHourWarning: true,
    monthlyReport: true,
    energySavingTips: false,
    systemMaintenance: true,
    pushNotifications: true,
    emailNotifications: true,
  });

  const [thresholds, setThresholds] = useState({
    dailyUsage: "50",
    monthlyBudget: "3000",
    peakUsageAlert: "5",
  });

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    address: "123 Energy Street, Mumbai, Maharashtra",
  });

  const handleNotificationChange = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const handleSaveSettings = () => {
    Alert.alert(
      "Settings Saved",
      "Your preferences have been updated successfully!",
    );
  };

  const handleExportData = () => {
    Alert.alert(
      "Export Data",
      "Your data export will be emailed to you within 24 hours.",
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => console.log("Account deleted"),
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Settings */}
      <Card style={[styles.card, shadows.medium]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title style={styles.cardTitle}>Profile Settings</Title>
            <Icon name="person" size={24} color={theme.colors.primary} />
          </View>

          <TextInput
            label="Full Name"
            value={profile.name}
            onChangeText={(text) =>
              setProfile((prev) => ({ ...prev, name: text }))
            }
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="Email Address"
            value={profile.email}
            onChangeText={(text) =>
              setProfile((prev) => ({ ...prev, email: text }))
            }
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
          />

          <TextInput
            label="Phone Number"
            value={profile.phone}
            onChangeText={(text) =>
              setProfile((prev) => ({ ...prev, phone: text }))
            }
            style={styles.input}
            mode="outlined"
            keyboardType="phone-pad"
          />

          <TextInput
            label="Service Address"
            value={profile.address}
            onChangeText={(text) =>
              setProfile((prev) => ({ ...prev, address: text }))
            }
            style={styles.input}
            mode="outlined"
            multiline
          />
        </Card.Content>
      </Card>

      {/* Notification Preferences */}
      <Card style={[styles.card, shadows.medium]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title style={styles.cardTitle}>Notification Preferences</Title>
            <Icon name="notifications" size={24} color={theme.colors.accent} />
          </View>

          <List.Item
            title="Bill Reminders"
            description="Get notified when your bill is due"
            left={() => (
              <Icon name="receipt" size={24} color={theme.colors.placeholder} />
            )}
            right={() => (
              <Switch
                value={notifications.billReminder}
                onValueChange={() => handleNotificationChange("billReminder")}
              />
            )}
          />

          <List.Item
            title="Usage Alerts"
            description="Alerts for unusual energy consumption"
            left={() => (
              <Icon name="bolt" size={24} color={theme.colors.placeholder} />
            )}
            right={() => (
              <Switch
                value={notifications.usageAlerts}
                onValueChange={() => handleNotificationChange("usageAlerts")}
              />
            )}
          />

          <List.Item
            title="Peak Hour Warnings"
            description="Notify before peak pricing periods"
            left={() => (
              <Icon
                name="schedule"
                size={24}
                color={theme.colors.placeholder}
              />
            )}
            right={() => (
              <Switch
                value={notifications.peakHourWarning}
                onValueChange={() =>
                  handleNotificationChange("peakHourWarning")
                }
              />
            )}
          />

          <List.Item
            title="Monthly Reports"
            description="Monthly energy usage summary"
            left={() => (
              <Icon
                name="bar-chart"
                size={24}
                color={theme.colors.placeholder}
              />
            )}
            right={() => (
              <Switch
                value={notifications.monthlyReport}
                onValueChange={() => handleNotificationChange("monthlyReport")}
              />
            )}
          />

          <List.Item
            title="Energy Saving Tips"
            description="Weekly tips to reduce consumption"
            left={() => (
              <Icon
                name="lightbulb-outline"
                size={24}
                color={theme.colors.placeholder}
              />
            )}
            right={() => (
              <Switch
                value={notifications.energySavingTips}
                onValueChange={() =>
                  handleNotificationChange("energySavingTips")
                }
              />
            )}
          />

          <List.Item
            title="System Maintenance"
            description="Updates about system maintenance"
            left={() => (
              <Icon name="build" size={24} color={theme.colors.placeholder} />
            )}
            right={() => (
              <Switch
                value={notifications.systemMaintenance}
                onValueChange={() =>
                  handleNotificationChange("systemMaintenance")
                }
              />
            )}
          />

          <Divider style={styles.divider} />

          <Paragraph style={styles.sectionTitle}>
            Notification Channels
          </Paragraph>

          <List.Item
            title="Push Notifications"
            left={() => (
              <Icon
                name="phone-android"
                size={24}
                color={theme.colors.placeholder}
              />
            )}
            right={() => (
              <Switch
                value={notifications.pushNotifications}
                onValueChange={() =>
                  handleNotificationChange("pushNotifications")
                }
              />
            )}
          />

          <List.Item
            title="Email Notifications"
            left={() => (
              <Icon name="email" size={24} color={theme.colors.placeholder} />
            )}
            right={() => (
              <Switch
                value={notifications.emailNotifications}
                onValueChange={() =>
                  handleNotificationChange("emailNotifications")
                }
              />
            )}
          />
        </Card.Content>
      </Card>

      {/* Usage Thresholds */}
      <Card style={[styles.card, shadows.medium]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title style={styles.cardTitle}>Usage Thresholds & Alerts</Title>
            <Icon name="tune" size={24} color={theme.colors.warning} />
          </View>

          <TextInput
            label="Daily Usage Alert (kWh)"
            value={thresholds.dailyUsage}
            onChangeText={(text) =>
              setThresholds((prev) => ({ ...prev, dailyUsage: text }))
            }
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
            right={<TextInput.Affix text="kWh" />}
          />
          <Paragraph style={styles.inputHelper}>
            Alert when daily usage exceeds this limit
          </Paragraph>

          <TextInput
            label="Monthly Budget (₹)"
            value={thresholds.monthlyBudget}
            onChangeText={(text) =>
              setThresholds((prev) => ({ ...prev, monthlyBudget: text }))
            }
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
            left={<TextInput.Affix text="₹" />}
          />
          <Paragraph style={styles.inputHelper}>
            Alert when approaching budget limit
          </Paragraph>

          <TextInput
            label="Peak Usage Alert (kW)"
            value={thresholds.peakUsageAlert}
            onChangeText={(text) =>
              setThresholds((prev) => ({ ...prev, peakUsageAlert: text }))
            }
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
            right={<TextInput.Affix text="kW" />}
          />
          <Paragraph style={styles.inputHelper}>
            Alert for high instantaneous usage
          </Paragraph>
        </Card.Content>
      </Card>

      {/* App Preferences */}
      <Card style={[styles.card, shadows.medium]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title style={styles.cardTitle}>App Preferences</Title>
            <Icon name="settings" size={24} color={theme.colors.info} />
          </View>

          <List.Item
            title="Language"
            description="English"
            left={() => (
              <Icon
                name="language"
                size={24}
                color={theme.colors.placeholder}
              />
            )}
            right={() => (
              <Icon
                name="chevron-right"
                size={24}
                color={theme.colors.placeholder}
              />
            )}
            onPress={() =>
              Alert.alert("Coming Soon", "Multi-language support coming soon!")
            }
          />

          <List.Item
            title="Currency"
            description="₹ Indian Rupee"
            left={() => (
              <Icon
                name="currency-rupee"
                size={24}
                color={theme.colors.placeholder}
              />
            )}
            right={() => (
              <Icon
                name="chevron-right"
                size={24}
                color={theme.colors.placeholder}
              />
            )}
            onPress={() =>
              Alert.alert("Coming Soon", "Multi-currency support coming soon!")
            }
          />

          <List.Item
            title="Theme"
            description="Light"
            left={() => (
              <Icon name="palette" size={24} color={theme.colors.placeholder} />
            )}
            right={() => (
              <Icon
                name="chevron-right"
                size={24}
                color={theme.colors.placeholder}
              />
            )}
            onPress={() =>
              Alert.alert("Coming Soon", "Dark theme coming soon!")
            }
          />

          <List.Item
            title="Date Format"
            description="DD/MM/YYYY"
            left={() => (
              <Icon
                name="date-range"
                size={24}
                color={theme.colors.placeholder}
              />
            )}
            right={() => (
              <Icon
                name="chevron-right"
                size={24}
                color={theme.colors.placeholder}
              />
            )}
            onPress={() =>
              Alert.alert("Coming Soon", "Date format options coming soon!")
            }
          />
        </Card.Content>
      </Card>

      {/* Data & Privacy */}
      <Card style={[styles.card, shadows.medium]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title style={styles.cardTitle}>Data & Privacy</Title>
            <Icon name="security" size={24} color={theme.colors.success} />
          </View>

          <List.Item
            title="Share Usage Data for Analytics"
            description="Help improve energy efficiency recommendations"
            left={() => (
              <Icon
                name="analytics"
                size={24}
                color={theme.colors.placeholder}
              />
            )}
            right={() => <Switch value={true} onValueChange={() => {}} />}
          />

          <List.Item
            title="Location-based Services"
            description="For weather-based energy insights"
            left={() => (
              <Icon
                name="location-on"
                size={24}
                color={theme.colors.placeholder}
              />
            )}
            right={() => <Switch value={true} onValueChange={() => {}} />}
          />

          <Divider style={styles.divider} />

          <Button
            mode="outlined"
            onPress={handleExportData}
            style={styles.dataButton}
            icon="download"
          >
            Export My Data
          </Button>

          <Button
            mode="outlined"
            onPress={handleDeleteAccount}
            style={[styles.dataButton, styles.deleteButton]}
            icon="delete"
            textColor={theme.colors.error}
          >
            Delete Account
          </Button>
        </Card.Content>
      </Card>

      {/* About & Support */}
      <Card style={[styles.card, shadows.medium]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title style={styles.cardTitle}>About & Support</Title>
            <Icon name="help" size={24} color={theme.colors.primary} />
          </View>

          <List.Item
            title="App Version"
            description="1.0.0"
            left={() => (
              <Icon name="info" size={24} color={theme.colors.placeholder} />
            )}
          />

          <List.Item
            title="Privacy Policy"
            left={() => (
              <Icon
                name="privacy-tip"
                size={24}
                color={theme.colors.placeholder}
              />
            )}
            right={() => (
              <Icon
                name="chevron-right"
                size={24}
                color={theme.colors.placeholder}
              />
            )}
            onPress={() =>
              Alert.alert("Privacy Policy", "Opening privacy policy...")
            }
          />

          <List.Item
            title="Terms of Service"
            left={() => (
              <Icon
                name="description"
                size={24}
                color={theme.colors.placeholder}
              />
            )}
            right={() => (
              <Icon
                name="chevron-right"
                size={24}
                color={theme.colors.placeholder}
              />
            )}
            onPress={() =>
              Alert.alert("Terms of Service", "Opening terms of service...")
            }
          />

          <List.Item
            title="Contact Support"
            left={() => (
              <Icon name="support" size={24} color={theme.colors.placeholder} />
            )}
            right={() => (
              <Icon
                name="chevron-right"
                size={24}
                color={theme.colors.placeholder}
              />
            )}
            onPress={() => Alert.alert("Support", "Opening support chat...")}
          />
        </Card.Content>
      </Card>

      {/* Save Button */}
      <Button
        mode="contained"
        onPress={handleSaveSettings}
        style={styles.saveButton}
        icon="save"
      >
        Save Changes
      </Button>
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
  input: {
    marginBottom: spacing.sm,
  },
  inputHelper: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginBottom: spacing.md,
    marginTop: -spacing.xs,
  },
  divider: {
    marginVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.text,
    marginBottom: spacing.sm,
  },
  dataButton: {
    marginBottom: spacing.sm,
  },
  deleteButton: {
    borderColor: theme.colors.error,
  },
  saveButton: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
});

export default SettingsScreen;
