"use client";

import { useMemo } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'
import { useApp } from '@/context/AppContext'
import { Transaction } from '@/lib/types'
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const { transactions } = useApp()

  const dashboardData = useMemo(() => {
    const income = transactions
      .filter((t: Transaction) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0)

    const expenses = transactions
      .filter((t: Transaction) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0)

    const balance = income - expenses

    const categoryData = Object.values(
      transactions
        .filter((t: Transaction) => t.type === 'expense')
        .reduce((acc: any, curr) => {
          if (!acc[curr.category]) {
            acc[curr.category] = { name: curr.category, value: 0 }
          }
          acc[curr.category].value += curr.amount
          return acc
        }, {})
    )

    // Calculate monthly balance data
    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    const monthlyBalance = {}
    let runningBalance = 0
    sortedTransactions.forEach(t => {
      const date = new Date(t.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      const monthLabel = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
      if (!monthlyBalance[monthKey]) {
        monthlyBalance[monthKey] = { month: monthLabel, balance: 0 }
      }
      runningBalance += t.type === 'income' ? t.amount : -t.amount
      monthlyBalance[monthKey].balance = runningBalance
    })
    const monthlyBalanceData = Object.values(monthlyBalance)

    return { income, expenses, balance, categoryData, monthlyBalanceData }
  }, [transactions])

  const COLORS = [
    "#22c55e", "#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6", "#06b6d4", 
    "#f97316", "#84cc16", "#ec4899", "#6b7280", "#10b981", "#f59e0b"
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Navbar title="Dashboard" />
        <main className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100/50 p-8 rounded-2xl border border-blue-200/50 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-blue-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">Live</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wider">Total Balance</h3>
                  <p className="text-4xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors">
                    ₹{dashboardData.balance.toLocaleString()}
                  </p>
                  <p className="text-sm text-blue-600 font-medium">
                    {dashboardData.balance >= 0 ? 'Positive balance' : 'Negative balance'}
                  </p>
                </div>
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Wallet className="w-16 h-16 text-blue-500" />
                </div>
              </div>

              {/* Income Card */}
              <div className="group relative bg-gradient-to-br from-green-50 to-green-100/50 p-8 rounded-2xl border border-green-200/50 hover:shadow-xl hover:shadow-green-100/50 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-green-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs font-medium text-green-600 uppercase tracking-wider">Income</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wider">Total Income</h3>
                  <p className="text-4xl font-bold text-green-600 group-hover:text-green-700 transition-colors">
                    ₹{dashboardData.income.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 font-medium">
                    +{((dashboardData.income / (dashboardData.income + dashboardData.expenses || 1)) * 100).toFixed(1)}% of total
                  </p>
                </div>
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <TrendingUp className="w-16 h-16 text-green-500" />
                </div>
              </div>

              {/* Expenses Card */}
              <div className="group relative bg-gradient-to-br from-red-50 to-red-100/50 p-8 rounded-2xl border border-red-200/50 hover:shadow-xl hover:shadow-red-100/50 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-red-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <TrendingDown className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-xs font-medium text-red-600 uppercase tracking-wider">Expense</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-red-700 uppercase tracking-wider">Total Expenses</h3>
                  <p className="text-4xl font-bold text-red-600 group-hover:text-red-700 transition-colors">
                    ₹{dashboardData.expenses.toLocaleString()}
                  </p>
                  <p className="text-sm text-red-600 font-medium">
                    {((dashboardData.expenses / (dashboardData.income + dashboardData.expenses || 1)) * 100).toFixed(1)}% of total
                  </p>
                </div>
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <TrendingDown className="w-16 h-16 text-red-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10">
              <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Balance Trend</h3>
                    <p className="text-sm text-gray-600">Track your financial journey over time</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">Live Data</span>
                  </div>
                </div>
                <div className="h-80 bg-gradient-to-br from-blue-50/30 to-transparent rounded-xl p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dashboardData.monthlyBalanceData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }}
                        dx={-10}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                          fontSize: '14px',
                          fontWeight: 500
                        }}
                        labelStyle={{ color: '#374151', fontWeight: 600 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="balance"
                        stroke="#3b82f6"
                        strokeWidth={4}
                        dot={{ fill: '#3b82f6', strokeWidth: 3, r: 6, stroke: 'white' }}
                        activeDot={{
                          r: 8,
                          stroke: '#3b82f6',
                          strokeWidth: 3,
                          fill: 'white'
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total months: {dashboardData.monthlyBalanceData.length}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Balance</span>
                  </div>
                </div>
              </div>

              {/* Spending Breakdown Pie Chart */}
              <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Spending Breakdown</h3>
                    <p className="text-sm text-gray-600">Where your money goes</p>
                  </div>
                  <div className="flex space-x-2">
                    {dashboardData.categoryData.map((_, index) => (
                      <div
                        key={index}
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="h-80 bg-gradient-to-br from-gray-50/50 to-transparent rounded-xl p-6 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dashboardData.categoryData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        innerRadius={40}
                        fill="#8884d8"
                        stroke="none"
                        strokeWidth={2}
                      >
                        {dashboardData.categoryData.map((_, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                            stroke={COLORS[index % COLORS.length]}
                            strokeWidth={0}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                          fontSize: '14px',
                          fontWeight: 500
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {dashboardData.categoryData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div
                        className="w-4 h-4 rounded-full shadow-sm flex-shrink-0"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <div className="min-w-0 flex-1">
                        <span className="text-sm font-medium text-gray-900 truncate block">{(item as any).name}</span>
                        <span className="text-xs text-gray-500">₹{((item as any).value).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}