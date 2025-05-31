import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                <Zap className="h-10 w-10 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">
                  Smart Energy Meter
                </span>
              </div>
            </div>

            {/* Error Icon */}
            <div className="flex justify-center">
              <div className="rounded-full bg-red-100 p-3">
                <AlertTriangle className="h-12 w-12 text-red-600" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">404</h1>
              <h2 className="text-xl font-semibold text-gray-700">
                Page Not Found
              </h2>
              <p className="text-gray-600">
                The energy monitoring page you're looking for doesn't exist or
                has been moved.
              </p>
            </div>

            {/* Suggestions */}
            <div className="text-left space-y-2 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900">You might want to:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Check your energy dashboard</li>
                <li>• View your usage analytics</li>
                <li>• Review billing information</li>
                <li>• Update your settings</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go to Dashboard
                </Link>
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" asChild>
                  <Link to="/analytics">Analytics</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/billing">Billing</Link>
                </Button>
              </div>
            </div>

            {/* Help Text */}
            <p className="text-xs text-gray-500">
              Need help? Contact our energy support team for assistance with
              your smart meter.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
