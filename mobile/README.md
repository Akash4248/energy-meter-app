# Smart Energy Meter - React Native Mobile App

A comprehensive cross-platform mobile application for monitoring energy consumption with AI-powered insights and India-specific time-based pricing.

## 🎯 Features

### 📊 Real-time Dashboard

- **Live energy monitoring** with current power draw (kW) and cost estimates
- **India-specific tariff rates** with color-coded peak/normal/off-peak indicators
- **Daily usage tracking** with progress indicators and projections
- **Smart alerts** for unusual consumption patterns

### 🧠 AI-Powered Insights

- **Bill predictions** based on current usage trends
- **Cost-saving recommendations** with potential savings calculations
- **Abnormal usage detection** with immediate alerts
- **Device-specific optimization** suggestions

### ⏰ Time-Based Pricing (India)

- **Peak Hours**: 6-10 AM & 6-10 PM → ₹8-10/kWh (Red)
- **Normal Hours**: 10 AM-2 PM → ₹5-6/kWh (Amber)
- **Off-Peak Hours**: 10 PM-6 AM → ₹3-4/kWh (Green)
- **Optimal timing alerts** for appliance usage

### 📈 Visual Analytics

- **Interactive charts** showing daily, weekly, and monthly trends
- **Device usage breakdown** with pie charts and cost analysis
- **Tariff distribution analysis** comparing peak vs off-peak usage
- **Monthly bill history** with detailed breakdowns

### 🔔 Smart Notifications

- **Push notifications** for peak hour warnings
- **Usage alerts** when exceeding thresholds
- **Bill payment reminders** with due date notifications
- **Energy-saving tips** delivered weekly
- **Real-time abnormal usage alerts**

### 💳 Billing & Payments

- **Detailed bill breakdown** by tariff categories
- **Payment history** tracking with status indicators
- **Quick payment integration** (ready for Razorpay/Stripe/UPI)
- **Auto-pay setup** for convenience
- **Bill download** functionality

## 🛠️ Tech Stack

- **React Native 0.72.7** - Cross-platform mobile framework
- **React Navigation 6** - Navigation library
- **React Native Paper** - Material Design components
- **React Native Chart Kit** - Data visualization
- **React Native Push Notification** - Local and push notifications
- **React Query** - Data fetching and state management
- **TypeScript** - Type safety
- **React Native Vector Icons** - Icon library

## 🚀 Getting Started

### Prerequisites

- Node.js (16.x or later)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mobile
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)

   ```bash
   cd ios && pod install && cd ..
   ```

4. **Android Setup**
   - Open Android Studio
   - Open the `android` folder
   - Sync Gradle files

### Running the App

#### Android

```bash
npm run android
```

#### iOS (macOS only)

```bash
npm run ios
```

#### Start Metro Bundler

```bash
npm start
```

## 📱 App Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Main app screens
│   ├── DashboardScreen.tsx
│   ├── AnalyticsScreen.tsx
│   ├── BillingScreen.tsx
│   └── SettingsScreen.tsx
├── services/           # Business logic and API calls
│   └── notificationService.ts
├── utils/              # Utility functions
│   ├── energyData.ts
│   └── pricing.ts
├── types/              # TypeScript type definitions
│   └── energy.ts
├── theme/              # App theming
│   └── theme.ts
└── App.tsx             # Main app component
```

## 🔔 Notification Features

### Local Notifications

- **Peak hour warnings** (30 minutes before peak times)
- **Off-peak hour alerts** (when rates drop to ₹3.5/kWh)
- **Daily energy tips** (9 AM daily)
- **Monthly bill reminders** (25th of each month)
- **Usage threshold alerts** (customizable limits)

### Notification Channels (Android)

- **Energy Alerts** - High priority for usage warnings
- **Energy Tips** - Medium priority for optimization suggestions

## 📊 Data Simulation

The app includes realistic data simulation for demonstration:

- **Hourly usage patterns** based on typical Indian household consumption
- **Seasonal variations** and peak/off-peak distribution
- **Device-wise consumption** breakdown
- **Monthly billing** with tariff-based calculations
- **AI insights** with actionable recommendations

## 🎨 UI/UX Features

- **Material Design** components with React Native Paper
- **Responsive layouts** for various screen sizes
- **Dark/Light theme** support (configurable)
- **Intuitive navigation** with bottom tabs
- **Pull-to-refresh** functionality
- **Loading states** and error handling
- **Accessibility** support with proper labels

## 🔧 Configuration

### Notification Settings

The app automatically schedules notifications based on:

- Peak hour timings (6-10 AM, 6-10 PM)
- Off-peak hour start (10 PM)
- Daily tip delivery (9 AM)
- Monthly bill reminders (25th of each month)

### Customizable Thresholds

Users can set personal limits for:

- Daily usage alerts (default: 50 kWh)
- Monthly budget alerts (default: ₹3000)
- Peak usage warnings (default: 5 kW)

## 🚀 Production Deployment

### Android APK Build

```bash
cd android
./gradlew assembleRelease
```

### iOS App Store Build

```bash
cd ios
xcodebuild -workspace SmartEnergyMeter.xcworkspace -scheme SmartEnergyMeter archive
```

## 🔮 Future Enhancements

- **Real smart meter integration** via WiFi/Bluetooth
- **Weather-based insights** using location services
- **Social features** for community energy challenges
- **Machine learning** models for better predictions
- **Voice commands** using speech recognition
- **Augmented reality** for device identification
- **Integration with smart home** platforms

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions:

- Email: support@smartenergymeter.com
- Phone: +91 98765 43210
- Website: https://smartenergymeter.com

---

**Smart Energy Meter** - Empowering users to make informed energy decisions with AI-powered insights and real-time monitoring.
