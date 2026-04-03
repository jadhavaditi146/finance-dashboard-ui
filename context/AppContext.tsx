'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { transactions } from '../lib/mockData'
import { Transaction } from '../lib/types'

interface AppContextType {
  transactions: Transaction[]
  insights: any[]
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  // Add more state and functions as needed
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [transactionsState, setTransactionsState] = useState(transactions)
  const [insights] = useState([])

  const addTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const id = transactionsState.length > 0 ? Math.max(...transactionsState.map(t => t.id)) + 1 : 1
    setTransactionsState([...transactionsState, { ...newTransaction, id }])
  }

  return (
    <AppContext.Provider value={{ transactions: transactionsState, insights, addTransaction }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}