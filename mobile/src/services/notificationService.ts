import PushNotification from "react-native-push-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotificationData } from "../types/energy";

class NotificationService {
  constructor() {
    this.configure();
  }

  configure() {
    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },

      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });

    // Create notification channels for Android
    PushNotification.createChannel(
      {
        channelId: "energy-alerts",
        channelName: "Energy Alerts",
        channelDescription: "Notifications for energy usage alerts",
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`),
    );

    PushNotification.createChannel(
      {
        channelId: "energy-tips",
        channelName: "Energy Tips",
        channelDescription: "Energy saving tips and recommendations",
        importance: 3,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`),
    );
  }

  async scheduleEnergyReminders() {
    // Schedule peak hour warnings
    this.schedulePeakHourReminders();

    // Schedule daily energy tips
    this.scheduleDailyTips();

    // Schedule monthly bill reminders
    this.scheduleMonthlyReminders();
  }

  schedulePeakHourReminders() {
    // Morning peak warning (5:30 AM)
    PushNotification.localNotificationSchedule({
      channelId: "energy-alerts",
      title: "Peak Hours Starting Soon",
      message:
        "Peak pricing (₹9/kWh) starts in 30 minutes. Complete high-power tasks now!",
      date: this.getNextOccurrence(5, 30),
      repeatType: "day",
    });

    // Evening peak warning (5:30 PM)
    PushNotification.localNotificationSchedule({
      channelId: "energy-alerts",
      title: "Evening Peak Hours Starting",
      message:
        "Peak pricing starts in 30 minutes. Consider postponing heavy appliance usage.",
      date: this.getNextOccurrence(17, 30),
      repeatType: "day",
    });

    // Off-peak notification (10 PM)
    PushNotification.localNotificationSchedule({
      channelId: "energy-tips",
      title: "Off-Peak Hours Started!",
      message:
        "Great time to run washing machine, dishwasher, and charge devices at ₹3.5/kWh",
      date: this.getNextOccurrence(22, 0),
      repeatType: "day",
    });
  }

  scheduleDailyTips() {
    const tips = [
      "Set your AC to 25°C to save ₹180/month",
      "Use cold water for washing to reduce energy consumption",
      "Unplug electronics when not in use",
      "Use LED bulbs to save up to 80% on lighting costs",
      "Run dishwasher only with full loads during off-peak hours",
      "Regular AC maintenance can improve efficiency by 15%",
      "Use ceiling fans to feel 3°C cooler without lowering AC temperature",
    ];

    // Schedule daily tip at 9 AM
    PushNotification.localNotificationSchedule({
      channelId: "energy-tips",
      title: "Daily Energy Tip",
      message: tips[Math.floor(Math.random() * tips.length)],
      date: this.getNextOccurrence(9, 0),
      repeatType: "day",
    });
  }

  scheduleMonthlyReminders() {
    // Monthly bill reminder (25th of each month)
    const today = new Date();
    const reminderDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      25,
      10,
      0,
    );
    if (reminderDate <= today) {
      reminderDate.setMonth(reminderDate.getMonth() + 1);
    }

    PushNotification.localNotificationSchedule({
      channelId: "energy-alerts",
      title: "Bill Payment Reminder",
      message: "Your energy bill is due soon. Pay online to avoid late fees.",
      date: reminderDate,
      repeatType: "month",
    });
  }

  getNextOccurrence(hour: number, minute: number): Date {
    const now = new Date();
    const next = new Date();
    next.setHours(hour, minute, 0, 0);

    if (next <= now) {
      next.setDate(next.getDate() + 1);
    }

    return next;
  }

  async showUsageAlert(usage: number, threshold: number) {
    PushNotification.localNotification({
      channelId: "energy-alerts",
      title: "High Energy Usage Alert",
      message: `Current usage (${usage.toFixed(1)} kWh) exceeds your threshold (${threshold} kWh)`,
      bigText: `Your energy usage is higher than normal. Check if any appliances are running unnecessarily.`,
    });
  }

  async showBillPrediction(predictedAmount: number, previousAmount: number) {
    const change = (
      ((predictedAmount - previousAmount) / previousAmount) *
      100
    ).toFixed(1);
    const isIncrease = predictedAmount > previousAmount;

    PushNotification.localNotification({
      channelId: "energy-tips",
      title: "Monthly Bill Prediction",
      message: `Predicted bill: ₹${predictedAmount.toFixed(0)} (${isIncrease ? "+" : ""}${change}% vs last month)`,
      bigText: isIncrease
        ? "Your bill is trending higher. Check our recommendations to reduce consumption."
        : "Great job! Your energy usage is improving compared to last month.",
    });
  }

  async saveNotification(notification: NotificationData) {
    try {
      const existingNotifications = await this.getStoredNotifications();
      const updatedNotifications = [
        notification,
        ...existingNotifications.slice(0, 49),
      ]; // Keep last 50
      await AsyncStorage.setItem(
        "energy_notifications",
        JSON.stringify(updatedNotifications),
      );
    } catch (error) {
      console.error("Error saving notification:", error);
    }
  }

  async getStoredNotifications(): Promise<NotificationData[]> {
    try {
      const stored = await AsyncStorage.getItem("energy_notifications");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error getting notifications:", error);
      return [];
    }
  }

  async markNotificationAsRead(notificationId: string) {
    try {
      const notifications = await this.getStoredNotifications();
      const updated = notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n,
      );
      await AsyncStorage.setItem(
        "energy_notifications",
        JSON.stringify(updated),
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }

  async clearAllNotifications() {
    try {
      await AsyncStorage.removeItem("energy_notifications");
      PushNotification.cancelAllLocalNotifications();
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  }
}

export default new NotificationService();
