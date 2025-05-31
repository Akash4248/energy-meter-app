import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Smartphone,
  Mail,
  Shield,
  Zap,
  User,
  Home,
  DollarSign,
  Clock,
  BarChart3,
  Save,
} from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    billReminder: true,
    usageAlerts: true,
    peakHourWarning: true,
    monthlyReport: true,
    energySavingTips: false,
    systemMaintenance: true,
  });

  const [preferences, setPreferences] = useState({
    language: "english",
    currency: "inr",
    dateFormat: "dd/mm/yyyy",
    theme: "light",
  });

  const [thresholds, setThresholds] = useState({
    dailyUsage: "50",
    monthlyBudget: "3000",
    peakUsageAlert: "5",
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const handleThresholdChange = (key: string, value: string) => {
    setThresholds((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">
            Customize your energy monitoring experience and notification
            preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="John Doe" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+91 98765 43210" />
                </div>
                <div>
                  <Label htmlFor="address">Service Address</Label>
                  <Input
                    id="address"
                    defaultValue="123 Energy Street, Mumbai, Maharashtra"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-4 w-4 text-gray-600" />
                    <div>
                      <div className="font-medium">Bill Reminders</div>
                      <div className="text-sm text-gray-600">
                        Get notified when your bill is due
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.billReminder}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("billReminder", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-4 w-4 text-gray-600" />
                    <div>
                      <div className="font-medium">Usage Alerts</div>
                      <div className="text-sm text-gray-600">
                        Alerts for unusual energy consumption
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.usageAlerts}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("usageAlerts", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <div>
                      <div className="font-medium">Peak Hour Warnings</div>
                      <div className="text-sm text-gray-600">
                        Notify before peak pricing periods
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.peakHourWarning}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("peakHourWarning", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="h-4 w-4 text-gray-600" />
                    <div>
                      <div className="font-medium">Monthly Reports</div>
                      <div className="text-sm text-gray-600">
                        Monthly energy usage summary
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.monthlyReport}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("monthlyReport", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Home className="h-4 w-4 text-gray-600" />
                    <div>
                      <div className="font-medium">Energy Saving Tips</div>
                      <div className="text-sm text-gray-600">
                        Weekly tips to reduce consumption
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.energySavingTips}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("energySavingTips", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-4 w-4 text-gray-600" />
                    <div>
                      <div className="font-medium">System Maintenance</div>
                      <div className="text-sm text-gray-600">
                        Updates about system maintenance
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.systemMaintenance}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("systemMaintenance", checked)
                    }
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3">Notification Channels</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-4 w-4 text-gray-600" />
                    <span className="flex-1">Push Notifications</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-600" />
                    <span className="flex-1">Email Notifications</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Thresholds */}
          <Card>
            <CardHeader>
              <CardTitle>Usage Thresholds & Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="dailyUsage">Daily Usage Alert (kWh)</Label>
                  <Input
                    id="dailyUsage"
                    type="number"
                    value={thresholds.dailyUsage}
                    onChange={(e) =>
                      handleThresholdChange("dailyUsage", e.target.value)
                    }
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    Alert when daily usage exceeds this limit
                  </div>
                </div>

                <div>
                  <Label htmlFor="monthlyBudget">Monthly Budget (₹)</Label>
                  <Input
                    id="monthlyBudget"
                    type="number"
                    value={thresholds.monthlyBudget}
                    onChange={(e) =>
                      handleThresholdChange("monthlyBudget", e.target.value)
                    }
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    Alert when approaching budget limit
                  </div>
                </div>

                <div>
                  <Label htmlFor="peakUsageAlert">Peak Usage Alert (kW)</Label>
                  <Input
                    id="peakUsageAlert"
                    type="number"
                    value={thresholds.peakUsageAlert}
                    onChange={(e) =>
                      handleThresholdChange("peakUsageAlert", e.target.value)
                    }
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    Alert for high instantaneous usage
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>App Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) =>
                      setPreferences((prev) => ({ ...prev, language: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                      <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                      <SelectItem value="gujarati">
                        ગુજરાતી (Gujarati)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={preferences.currency}
                    onValueChange={(value) =>
                      setPreferences((prev) => ({ ...prev, currency: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inr">₹ Indian Rupee</SelectItem>
                      <SelectItem value="usd">$ US Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={preferences.dateFormat}
                    onValueChange={(value) =>
                      setPreferences((prev) => ({ ...prev, dateFormat: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={preferences.theme}
                    onValueChange={(value) =>
                      setPreferences((prev) => ({ ...prev, theme: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data & Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Data & Privacy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      Share Usage Data for Analytics
                    </div>
                    <div className="text-sm text-gray-600">
                      Help improve energy efficiency recommendations
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Location-based Services</div>
                    <div className="text-sm text-gray-600">
                      For weather-based energy insights
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Export My Data
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-red-600 hover:text-red-700"
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Changes */}
          <div className="flex justify-end">
            <Button size="lg" className="min-w-32">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
