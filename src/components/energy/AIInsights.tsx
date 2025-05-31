import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  TrendingUp,
  Lightbulb,
  AlertTriangle,
  Clock,
  DollarSign,
} from "lucide-react";
import { AIInsight } from "@/types/energy";
import { generateAIInsights } from "@/lib/energy-data";
import { useState } from "react";

export function AIInsightsWidget() {
  const [insights] = useState<AIInsight[]>(generateAIInsights());

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "prediction":
        return TrendingUp;
      case "recommendation":
        return Lightbulb;
      case "alert":
        return AlertTriangle;
      default:
        return Brain;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <span>AI Insights</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.slice(0, 3).map((insight) => {
          const Icon = getInsightIcon(insight.type);

          return (
            <div
              key={insight.id}
              className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-shrink-0">
                <Icon className="h-5 w-5 text-gray-600 mt-0.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {insight.title}
                  </h4>
                  <Badge variant={getPriorityColor(insight.priority)}>
                    {insight.priority}
                  </Badge>
                  {insight.savings && (
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-200"
                    >
                      <DollarSign className="h-3 w-3 mr-1" />₹{insight.savings}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">{insight.description}</p>
                <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{insight.timestamp.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          );
        })}

        <Button variant="outline" className="w-full mt-4">
          View All Insights
        </Button>
      </CardContent>
    </Card>
  );
}

export function QuickRecommendations() {
  const recommendations = [
    {
      title: "Switch to Off-Peak",
      description: "Run dishwasher after 10 PM",
      savings: "₹25/month",
      icon: Clock,
    },
    {
      title: "AC Temperature",
      description: "Increase AC to 25°C",
      savings: "₹180/month",
      icon: TrendingUp,
    },
    {
      title: "Load Balancing",
      description: "Avoid using multiple high-power appliances together",
      savings: "₹50/month",
      icon: Lightbulb,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-yellow-600" />
          <span>Quick Tips</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;

          return (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200"
            >
              <Icon className="h-4 w-4 text-yellow-600 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {rec.title}
                </div>
                <div className="text-xs text-gray-600">{rec.description}</div>
              </div>
              <div className="text-xs font-medium text-green-600">
                {rec.savings}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
