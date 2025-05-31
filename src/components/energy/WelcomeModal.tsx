import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  BarChart3,
  DollarSign,
  Brain,
  Clock,
  Bell,
  CheckCircle,
} from "lucide-react";

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if user has seen welcome modal before
    const hasSeenWelcome = localStorage.getItem("energy-app-welcome-seen");
    if (!hasSeenWelcome) {
      setIsOpen(true);
    }
  }, []);

  const steps = [
    {
      icon: Zap,
      title: "Welcome to Smart Energy Meter",
      description:
        "Monitor your electricity usage in real-time and optimize your energy consumption with AI-powered insights.",
      features: [
        "Real-time energy monitoring",
        "India-specific time-based pricing",
        "AI-powered consumption insights",
        "Bill predictions and alerts",
      ],
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description:
        "Get comprehensive insights into your energy usage patterns with interactive charts and reports.",
      features: [
        "Daily, weekly, and monthly trends",
        "Device-wise consumption breakdown",
        "Peak vs off-peak usage analysis",
        "Cost optimization recommendations",
      ],
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description:
        "Our intelligent system analyzes your usage patterns to provide personalized recommendations.",
      features: [
        "Bill prediction based on current usage",
        "Optimal timing for appliance usage",
        "Abnormal usage spike detection",
        "Monthly savings recommendations",
      ],
    },
    {
      icon: Clock,
      title: "Time-Based Pricing",
      description:
        "Understand India-specific electricity tariffs and optimize your usage for maximum savings.",
      features: [
        "🔺 Peak Hours: 6-10 AM & 6-10 PM (₹8-10/unit)",
        "⚖ Normal Hours: 10 AM-2 PM (₹5-6/unit)",
        "🔻 Off-Peak: 10 PM-6 AM (₹3-4/unit)",
        "Smart scheduling recommendations",
      ],
    },
  ];

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem("energy-app-welcome-seen", "true");
    setIsOpen(false);
  };

  const handleSkip = () => {
    handleComplete();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Icon className="h-6 w-6 text-blue-600" />
            <span>{currentStepData.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded ${
                  index <= currentStep ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="space-y-4">
            <p className="text-gray-600">{currentStepData.description}</p>

            <div className="space-y-2">
              {currentStepData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Demo data notice */}
          {currentStep === 0 && (
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">
                  Demo Mode
                </span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">
                This app uses simulated data for demonstration. In a real
                implementation, this would connect to your smart meter or energy
                provider's API.
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-between">
            <div className="flex space-x-2">
              {currentStep > 0 && (
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              <Button variant="ghost" onClick={handleSkip}>
                Skip Tour
              </Button>
            </div>

            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? "Get Started" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
