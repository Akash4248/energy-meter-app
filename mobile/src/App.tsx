import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "react-query";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StatusBar } from "react-native";

// Screens
import DashboardScreen from "./screens/DashboardScreen";
import AnalyticsScreen from "./screens/AnalyticsScreen";
import BillingScreen from "./screens/BillingScreen";
import SettingsScreen from "./screens/SettingsScreen";

// Services
import notificationService from "./services/notificationService";

// Theme
import { theme } from "./theme/theme";

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize notifications
    notificationService.scheduleEnergyReminders();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Dashboard") {
                  iconName = "dashboard";
                } else if (route.name === "Analytics") {
                  iconName = "analytics";
                } else if (route.name === "Billing") {
                  iconName = "receipt";
                } else if (route.name === "Settings") {
                  iconName = "settings";
                }

                return (
                  <Icon
                    name={iconName || "dashboard"}
                    size={size}
                    color={color}
                  />
                );
              },
              tabBarActiveTintColor: "#2563eb",
              tabBarInactiveTintColor: "#6b7280",
              tabBarStyle: {
                backgroundColor: "#ffffff",
                borderTopWidth: 1,
                borderTopColor: "#e5e7eb",
                paddingBottom: 5,
                height: 60,
              },
              headerStyle: {
                backgroundColor: "#ffffff",
                borderBottomWidth: 1,
                borderBottomColor: "#e5e7eb",
              },
              headerTitleStyle: {
                fontWeight: "bold",
                color: "#111827",
              },
            })}
          >
            <Tab.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{
                title: "Energy Dashboard",
                headerLeft: () => (
                  <Icon
                    name="bolt"
                    size={24}
                    color="#2563eb"
                    style={{ marginLeft: 15 }}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Analytics"
              component={AnalyticsScreen}
              options={{ title: "Energy Analytics" }}
            />
            <Tab.Screen
              name="Billing"
              component={BillingScreen}
              options={{ title: "Bills & Payments" }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ title: "Settings" }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
};

export default App;
