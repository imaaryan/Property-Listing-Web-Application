import React, { useState, useMemo, useEffect } from "react";
import { RiCloseLine } from "@remixicon/react";

// Helper function to format numbers as Indian currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace("₹", "₹ ");
};

// Donut Chart Component
const DonutChart = ({ principal, interest, size = 200, strokeWidth = 25 }) => {
  const total = principal + interest;
  if (total === 0) return null;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const principalPercent = principal / total;
  const principalArcLength = principalPercent * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="-rotate-90"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#f39c12" // Interest color (orange)
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#1244e3" // Principal color (teal)
        strokeWidth={strokeWidth}
        strokeDasharray={`${principalArcLength} ${circumference}`}
      />
    </svg>
  );
};

const EMICalculator = ({
  isOpen,
  onClose,
  defaultPrice = 1000000,
  inline = false,
}) => {
  if (!isOpen && !inline) return null;

  // State for user inputs
  const [totalCost, setTotalCost] = useState(defaultPrice);
  const [interestRate, setInterestRate] = useState(10);
  const [downPayment, setDownPayment] = useState(defaultPrice * 0.2);
  const [tenure, setTenure] = useState(5); // in years
  const [view, setView] = useState("graph"); // 'graph' or 'schedule'

  // Constants for slider ranges
  const MIN_COST = 50000;
  const MAX_COST = 50000000; // Increased max cost for real estate
  const MIN_INTEREST = 5;
  const MAX_INTEREST = 20;
  const MIN_TENURE = 1;
  const MAX_TENURE = 30; // Increased tenure for home loans

  // Derived min/max for down payment (10% to 90% of total cost)
  const minDownPayment = totalCost * 0.1;
  const maxDownPayment = totalCost * 0.9;

  // Adjust down payment if total cost changes and makes it invalid
  useEffect(() => {
    if (downPayment < minDownPayment) {
      setDownPayment(minDownPayment);
    }
    if (downPayment > maxDownPayment) {
      setDownPayment(maxDownPayment);
    }
  }, [totalCost, minDownPayment, maxDownPayment]); // Removed downPayment from dependency to avoid loop

  // Memoized calculation for EMI and schedule
  const {
    emi,
    loanAmount,
    totalInterestPayable,
    totalAmountPayable,
    schedule,
  } = useMemo(() => {
    const principal = totalCost - downPayment;
    const monthlyInterestRate = interestRate / 12 / 100;
    const numberOfMonths = tenure * 12;

    if (principal <= 0 || monthlyInterestRate <= 0 || numberOfMonths <= 0) {
      return {
        emi: 0,
        loanAmount: 0,
        totalInterestPayable: 0,
        totalAmountPayable: 0,
        schedule: [],
      };
    }

    const emiValue =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
      (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);
    const totalAmount = emiValue * numberOfMonths;
    const totalInterest = totalAmount - principal;

    // Generate amortization schedule for yearly view
    const yearlySchedule = [];
    let balance = principal;
    let yearlyPrincipalPaid = 0;
    let yearlyInterestPaid = 0;

    for (let i = 1; i <= numberOfMonths; i++) {
      const interestPayment = balance * monthlyInterestRate;
      const principalPayment = emiValue - interestPayment;
      balance -= principalPayment;

      yearlyPrincipalPaid += principalPayment;
      yearlyInterestPaid += interestPayment;

      if (i % 12 === 0 || i === numberOfMonths) {
        yearlySchedule.push({
          year: Math.ceil(i / 12),
          principal: yearlyPrincipalPaid,
          interest: yearlyInterestPaid,
          balance: balance > 0 ? balance : 0,
        });
        yearlyPrincipalPaid = 0;
        yearlyInterestPaid = 0;
      }
    }

    return {
      emi: emiValue,
      loanAmount: principal,
      totalInterestPayable: totalInterest,
      totalAmountPayable: totalAmount,
      schedule: yearlySchedule,
    };
  }, [totalCost, downPayment, interestRate, tenure]);

  const content = (
    <div
      className={`bg-white rounded-2xl w-full  relative flex flex-col ${
        inline ? "h-auto border-2 border-secondary" : "max-w-5xl max-h-[90vh]"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">EMI Calculator</h2>
        {!inline && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <RiCloseLine size={24} />
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row overflow-auto">
        {/* Left Panel: Inputs */}
        <div className="flex-1 p-6 lg:p-8 space-y-8 border-r border-gray-100">
          {/* Total Cost */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-gray-600 font-medium">
                Total Cost of Asset
              </label>
              <span className="text-xl font-semibold text-primary bg-primary/10 px-3 py-1 rounded-lg">
                {formatCurrency(totalCost)}
              </span>
            </div>
            <input
              type="range"
              min={MIN_COST}
              max={MAX_COST}
              step="10000"
              value={totalCost}
              onChange={(e) => setTotalCost(Number(e.target.value))}
              className="range range-primary range-sm w-full"
            />
          </div>

          {/* Down Payment */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-gray-600 font-medium">Down Payment</label>
              <span className="text-xl font-semibold text-primary bg-primary/10 px-3 py-1 rounded-lg">
                {formatCurrency(downPayment)}
              </span>
            </div>
            <input
              type="range"
              min={minDownPayment}
              max={maxDownPayment}
              step="1000"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="range range-primary range-sm w-full"
            />
            <div className="flex justify-between text-xs text-gray-400 font-medium">
              <span>{formatCurrency(minDownPayment)} (10%)</span>
              <span>{formatCurrency(maxDownPayment)} (90%)</span>
            </div>
            <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
              Loan Amount:{" "}
              <span className="font-semibold text-gray-800">
                {formatCurrency(loanAmount)}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tenure */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-gray-600 font-medium">Tenure</label>
                <span className="font-semi text-gray-800">{tenure} Years</span>
              </div>
              <input
                type="range"
                min={MIN_TENURE}
                max={MAX_TENURE}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="range range-primary range-sm w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 font-medium">
                <span>{MIN_TENURE} Year</span>
                <span>{MAX_TENURE} Years</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-gray-600 font-medium">
                  Interest Rate
                </label>
                <span className="font-semibold text-gray-800">
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                min={MIN_INTEREST}
                max={MAX_INTEREST}
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="range range-primary range-sm w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 font-medium">
                <span>{MIN_INTEREST}%</span>
                <span>{MAX_INTEREST}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Results */}
        <div className="flex-1 p-6 lg:p-8 bg-gray-50/50 flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-semibold text-gray-800 mb-2">
              {formatCurrency(emi)}
            </h2>
            <p className="text-gray-500 font-medium">Monthly EMI</p>
          </div>

          <div className="flex justify-center mb-8 bg-white p-1 rounded-xl shadow-sm border border-gray-100 w-fit mx-auto">
            <button
              onClick={() => setView("graph")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                view === "graph"
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Graph View
            </button>
            <button
              onClick={() => setView("schedule")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                view === "schedule"
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Schedule
            </button>
          </div>

          {view === "graph" ? (
            <div className="flex flex-col items-center flex-1 justify-center space-y-8">
              <div className="relative">
                <DonutChart
                  principal={loanAmount}
                  interest={totalInterestPayable}
                />
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    Total Payable
                  </span>
                  <span className="text-lg font-semibold text-gray-800">
                    {formatCurrency(totalAmountPayable)}
                  </span>
                </div>
              </div>
              <div className="w-full space-y-3 max-w-xs">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#1244e3]"></span>
                    <span className="text-sm text-gray-600">
                      Principal Amount
                    </span>
                  </div>
                  <span className="font-semibold text-gray-800">
                    {formatCurrency(loanAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#f39c12]"></span>
                    <span className="text-sm text-gray-600">
                      Total Interest
                    </span>
                  </div>
                  <span className="font-semibold text-gray-800">
                    {formatCurrency(totalInterestPayable)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-auto bg-white rounded-xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium sticky top-0">
                  <tr>
                    <th className="p-3">Year</th>
                    <th className="p-3">Principal</th>
                    <th className="p-3">Interest</th>
                    <th className="p-3">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {schedule.map((row) => (
                    <tr key={row.year} className="hover:bg-gray-50/50">
                      <td className="p-3 font-medium text-gray-800">
                        {row.year}
                      </td>
                      <td className="p-3 text-gray-600">
                        {formatCurrency(row.principal)}
                      </td>
                      <td className="p-3 text-gray-600">
                        {formatCurrency(row.interest)}
                      </td>
                      <td className="p-3 text-gray-600">
                        {formatCurrency(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (inline) {
    return <div className="w-full my-6">{content}</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      {content}
    </div>
  );
};

export default EMICalculator;
