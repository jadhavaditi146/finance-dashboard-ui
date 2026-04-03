'use client'

import { useState, useMemo } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'
import { useApp } from '@/context/AppContext'
import { Transaction } from '@/lib/types'
import { Search, Filter, TrendingUp, TrendingDown } from 'lucide-react'

export default function Transactions() {
  const { transactions, addTransaction } = useApp()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [role, setRole] = useState('admin')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: '',
    type: 'income' as 'income' | 'expense'
  })

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions.filter((t: Transaction) =>
      t.category.toLowerCase().includes(search.toLowerCase())
    )

    if (filter !== 'all') {
      filtered = filtered.filter((t: Transaction) => t.type === filter)
    }

    filtered.sort((a: Transaction, b: Transaction) => {
      if (sortOrder === 'asc') {
        return a.amount - b.amount
      } else {
        return b.amount - a.amount
      }
    })

    return filtered
  }, [transactions, search, filter, sortOrder])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.amount || !formData.category) return

    addTransaction({
      date: formData.date,
      description: `${formData.type} - ${formData.category}`,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type
    })

    setIsModalOpen(false)
    setFormData({
      date: new Date().toISOString().split('T')[0],
      amount: '',
      category: '',
      type: 'income'
    })
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Navbar title="Transactions" />
        <main className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Transactions</h2>
                  <p className="text-gray-600 mt-2">Track and manage all your financial activities</p>
                </div>
                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer"
                  >
                    <option value="admin">Admin</option>
                    <option value="viewer">Viewer</option>
                  </select>
                  {role === 'admin' && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                    >
                      <TrendingUp className="w-4 h-4" />
                      Add Transaction
                    </button>
                  )}
                </div>
              </div>

            <div className="mb-10 bg-gradient-to-r from-gray-50 to-blue-50/30 p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Filters & Search</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2.5">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="By category or date..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white placeholder-gray-400 text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2.5">Type</label>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer font-medium"
                  >
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2.5">Sort By Amount</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer font-medium"
                  >
                    <option value="desc">High to Low</option>
                    <option value="asc">Low to High</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {filteredAndSortedTransactions.length === 0 ? (
                <div className="text-center py-20 px-6">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-lg font-semibold mb-1">No transactions found</p>
                  <p className="text-gray-500 text-sm">Try adjusting your filters or add a new transaction to get started</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-widest">Date</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-widest">Amount</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-widest">Category</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-widest">Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredAndSortedTransactions.map((transaction: Transaction, index: number) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0 ? 'bg-white' : 'bg-gradient-to-r from-blue-50/30 to-transparent'
                          } hover:bg-blue-50/50 transition-all duration-150 group border-l-4 ${
                            transaction.type === 'income' ? 'border-l-green-500' : 'border-l-red-500'
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-gray-950">
                            {transaction.date}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${
                            transaction.type === 'income' ? 'text-green-600 group-hover:text-green-700' : 'text-red-600 group-hover:text-red-700'
                          }`}>
                            {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium group-hover:text-gray-900">
                            <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold group-hover:bg-gray-200 transition-colors">
                              {transaction.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {transaction.type === 'income' ? (
                                <TrendingUp className="w-4 h-4 text-green-500" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-red-500" />
                              )}
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                                transaction.type === 'income'
                                  ? 'bg-green-100/80 text-green-700'
                                  : 'bg-red-100/80 text-red-700'
                              }`}>
                                {transaction.type === 'income' ? 'Income' : 'Expense'}
                              </span>
                            </div>
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
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Add New Transaction</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., Food, Salary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}