'use client'

import { useMemo } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import { groupByMonth, groupByYear } from '@/lib/transactionUtils'
import { transactions as mockTransactions } from '@/lib/mockData'
import { TrendingUp, TrendingDown, Zap, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function Insights() {
  const monthlyData = useMemo(() => groupByMonth(mockTransactions), [])
  const yearlyData = useMemo(() => groupByYear(mockTransactions), [])

  const insights = useMemo(() => {
    const income = mockTransactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0)

    const expenses = mockTransactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0)

    const categoryExpenses = mockTransactions
      .filter((t) => t.type === 'expense')
      .reduce((acc: Record<string, number>, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      }, {})

    const highestCategory = Object.entries(categoryExpenses).reduce(
      (max, [cat, amt]) => (amt > max.amount ? { category: cat, amount: amt } : max),
      { category: '', amount: 0 }
    )

    return {
      income,
      expenses,
      highestCategory
    }
  }, [])

  const formatMonthLabel = (label: string) => {
    const [year, month] = label.split('-')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthIndex = Number(month) - 1
    if (monthIndex < 0 || monthIndex > 11 || Number.isNaN(monthIndex)) return label
    return `${monthNames[monthIndex]} ${year}`
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Navbar title="Insights" />
        <main className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Financial Insights</h2>
              <p className="text-gray-600 mt-2">Track your financial health and spending patterns</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-xl shadow-sm border border-green-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/20">
                    <ArrowUpRight className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs font-bold text-green-600 bg-green-100/80 px-2.5 py-1 rounded-full">+12.5%</div>
                </div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-widest mb-1">Total Income</h3>
                <p className="text-3xl font-bold text-green-700 mb-2">₹{insights.income.toLocaleString()}</p>
                <p className="text-xs text-gray-600">From all sources this month</p>
              </div>

              {/* Total Expenses Card */}
              <div className="bg-gradient-to-br from-red-50 to-red-100/50 p-6 rounded-xl shadow-sm border border-red-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-500/20">
                    <ArrowDownRight className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs font-bold text-red-600 bg-red-100/80 px-2.5 py-1 rounded-full">-5.3%</div>
                </div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-widest mb-1">Total Expenses</h3>
                <p className="text-3xl font-bold text-red-700 mb-2">₹{insights.expenses.toLocaleString()}</p>
                <p className="text-xs text-gray-600">Spending across all categories</p>
              </div>

              {/* Net Savings Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-xl shadow-sm border border-blue-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs font-bold text-blue-600 bg-blue-100/80 px-2.5 py-1 rounded-full">Goal</div>
                </div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-widest mb-1">Net Savings</h3>
                <p className="text-3xl font-bold text-blue-700 mb-2">₹{(insights.income - insights.expenses).toLocaleString()}</p>
                <p className="text-xs text-gray-600">{Math.round(((insights.income - insights.expenses) / insights.income) * 100)}% of income saved</p>
              </div>

              {/* Top Category Card */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-6 rounded-xl shadow-sm border border-amber-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-amber-500/20">
                    <PieChart className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs font-bold text-amber-600 bg-amber-100/80 px-2.5 py-1 rounded-full">Top</div>
                </div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-widest mb-1">Top Category</h3>
                <p className="text-2xl font-bold text-amber-700 mb-1">{insights.highestCategory.category || 'N/A'}</p>
                <p className="text-sm font-semibold text-amber-600">₹{insights.highestCategory.amount.toLocaleString()}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Yearly Totals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {yearlyData.map((yearItem) => {
                  const yearSavings = yearItem.income - yearItem.expense
                  return (
                    <div key={yearItem.label} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-600">{yearItem.label}</p>
                        <span className="text-xs font-medium text-gray-500">Year</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Income</span>
                          <span className="font-bold text-green-600">₹{yearItem.income.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Expenses</span>
                          <span className="font-bold text-red-600">₹{yearItem.expense.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                          <span className="text-gray-700 font-semibold">Savings</span>
                          <span className={`${yearSavings >= 0 ? 'text-teal-700' : 'text-rose-600'} font-bold`}>₹{yearSavings.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Expense Ratio</h3>
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-red-600" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <p className="text-4xl font-bold text-gray-900">{insights.expenses > 0 ? Math.round((insights.expenses / (insights.income || 1)) * 100) : 0}%</p>
                  <span className="text-sm text-gray-600">of income</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((insights.expenses / (insights.income || 1)) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-3">Recommended: Keep below 70%</p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Savings Rate</h3>
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <p className="text-4xl font-bold text-gray-900">{insights.income > 0 ? Math.round(((insights.income - insights.expenses) / insights.income) * 100) : 0}%</p>
                  <span className="text-sm text-gray-600">of income</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(Math.min(((insights.income - insights.expenses) / (insights.income || 1)) * 100, 100), 0)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-3">Target: Aim for 30%+ savings</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Monthly Trends</h3>
                  <p className="text-sm text-gray-500">Income and expenses by month</p>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <BarChart data={monthlyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="label"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }}
                      tickFormatter={formatMonthLabel}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                        padding: '12px 16px'
                      }}
                      formatter={(value) => `₹${(value as number).toLocaleString()}`}
                      cursor={{ stroke: '#93c5fd', strokeWidth: 1, opacity: 0.2 }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Bar dataKey="income" fill="#16a34a" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="expense" fill="#dc2626" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50/30 p-8 rounded-xl border border-blue-200/40">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-gray-600">Average Monthly Income</p>
                    <p className="text-xl font-bold text-gray-900">₹{insights.income > 0 ? Math.round(insights.income).toLocaleString() : 0}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-gray-600">Average Monthly Expenses</p>
                    <p className="text-xl font-bold text-gray-900">₹{insights.expenses > 0 ? Math.round(insights.expenses).toLocaleString() : 0}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-gray-600">Monthly Net Savings</p>
                    <p className="text-xl font-bold text-gray-900">₹{(insights.income - insights.expenses) > 0 ? Math.round(insights.income - insights.expenses).toLocaleString() : 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}