import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Download,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { generateMonthlyBills } from "@/lib/energy-data";
import { TARIFF_RATES } from "@/lib/pricing";
import { useState } from "react";

export default function Billing() {
  const [monthlyBills] = useState(generateMonthlyBills());

  const currentBill = monthlyBills[monthlyBills.length - 1];
  const pendingPayments = monthlyBills.slice(-2, -1); // Previous month as pending
  const paidBills = monthlyBills.slice(0, -2);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Billing & Payments
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your energy bills and payment history
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Bill */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>
                      Current Bill - {currentBill.month} {currentBill.year}
                    </span>
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="text-blue-600 border-blue-200"
                  >
                    Current Period
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Bill Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {currentBill.totalUsage.toFixed(0)}
                      </div>
                      <div className="text-sm text-gray-600">kWh Used</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        ₹{currentBill.totalCost.toFixed(0)}
                      </div>
                      <div className="text-sm text-gray-600">Total Amount</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        ₹
                        {(
                          currentBill.totalCost / currentBill.totalUsage
                        ).toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-600">Avg Rate/kWh</div>
                    </div>
                  </div>

                  <Separator />

                  {/* Tariff Breakdown */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Usage Breakdown by Tariff
                    </h3>
                    <div className="space-y-3">
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
                          <div
                            key={tariff.type}
                            className="flex items-center justify-between p-3 bg-white rounded-lg border"
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className="w-3 h-3 rounded"
                                style={{ backgroundColor: tariff.color }}
                              />
                              <div>
                                <div className="font-medium capitalize">
                                  {tariff.type} Hours
                                </div>
                                <div className="text-sm text-gray-600">
                                  {tariff.timeRange} • ₹{tariff.rate}/kWh
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                ₹{cost.toFixed(0)}
                              </div>
                              <div className="text-sm text-gray-600">
                                {units.toFixed(0)} kWh
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <Separator />

                  {/* Additional Charges */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Additional Charges
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Fixed Charges</span>
                        <span>₹150</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Meter Rent</span>
                        <span>₹25</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Electricity Duty (6%)</span>
                        <span>
                          ₹{(currentBill.totalCost * 0.06).toFixed(0)}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Amount</span>
                        <span>
                          ₹
                          {(
                            currentBill.totalCost +
                            175 +
                            currentBill.totalCost * 0.06
                          ).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Pending Payment */}
                  {pendingPayments.map((bill) => (
                    <div
                      key={`${bill.month}-${bill.year}`}
                      className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200"
                    >
                      <div className="flex items-center space-x-3">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <div>
                          <div className="font-medium">
                            {bill.month} {bill.year}
                          </div>
                          <div className="text-sm text-gray-600">
                            Due Date: 15th of next month
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-red-600">
                          ₹{bill.totalCost.toFixed(0)}
                        </div>
                        <Badge variant="destructive">Pending</Badge>
                      </div>
                    </div>
                  ))}

                  {/* Paid Bills */}
                  {paidBills.map((bill, index) => (
                    <div
                      key={`${bill.month}-${bill.year}`}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <div className="font-medium">
                            {bill.month} {bill.year}
                          </div>
                          <div className="text-sm text-gray-600">
                            Paid on{" "}
                            {new Date(
                              2024,
                              11 - index,
                              15,
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          ₹{bill.totalCost.toFixed(0)}
                        </div>
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-200"
                        >
                          Paid
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" size="lg">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay Current Bill
                </Button>

                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Bill
                </Button>

                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Set Auto-Pay
                </Button>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="font-medium">
                      ₹{currentBill.totalCost.toFixed(0)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Month</span>
                    <span className="font-medium">
                      ₹
                      {monthlyBills[monthlyBills.length - 2].totalCost.toFixed(
                        0,
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      6-Month Average
                    </span>
                    <span className="font-medium">
                      ₹
                      {(
                        monthlyBills.reduce(
                          (sum, bill) => sum + bill.totalCost,
                          0,
                        ) / monthlyBills.length
                      ).toFixed(0)}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Total Paid (6 months)
                    </span>
                    <span className="font-bold">
                      ₹
                      {monthlyBills
                        .slice(0, -1)
                        .reduce((sum, bill) => sum + bill.totalCost, 0)
                        .toFixed(0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <div>
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-gray-600">
                        Instant payment
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-gray-600" />
                    <div>
                      <div className="font-medium">UPI Payment</div>
                      <div className="text-sm text-gray-600">
                        PhonePe, GPay, Paytm
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 text-gray-600" />
                    <div>
                      <div className="font-medium">Auto-Pay</div>
                      <div className="text-sm text-gray-600">
                        Never miss a payment
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing Alerts */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800">Billing Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-blue-700">
                  <div>💡 Your current bill is 12% higher than last month</div>
                  <div>⏰ Payment due in 5 days</div>
                  <div>
                    💰 Save ₹45/month by shifting usage to off-peak hours
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
