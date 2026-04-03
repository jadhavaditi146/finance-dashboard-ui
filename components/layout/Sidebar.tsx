'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Home, CreditCard, BarChart3 } from 'lucide-react'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/transactions', label: 'Transactions', icon: CreditCard },
    { href: '/insights', label: 'Insights', icon: BarChart3 },
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white text-gray-700 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out shadow-lg md:shadow-none`}
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Finance Dashboard</h2>
        </div>
        <nav className="mt-6 px-3">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center px-3 py-3 mb-1 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 group"
              onClick={() => setIsOpen(false)}
            >
              <Icon size={18} className="mr-3 text-gray-500 group-hover:text-gray-700" />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  )
}

export default Sidebar