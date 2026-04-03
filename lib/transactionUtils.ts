import { Transaction } from '@/lib/types'

export interface GroupedSummary {
  label: string
  income: number
  expense: number
}

function normalizeDateSegments(date: string) {
  const normalized = date.trim().slice(0, 10)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    throw new Error(`Invalid date format: ${date}. Expected YYYY-MM-DD.`)
  }
  const [year, month] = normalized.split('-')
  return { year, month }
}

function aggregateByKey(transactions: Transaction[], keyFn: (tx: Transaction) => string): GroupedSummary[] {
  const aggregate = transactions.reduce<Record<string, GroupedSummary>>((acc, tx) => {
    const label = keyFn(tx)
    if (!acc[label]) {
      acc[label] = { label, income: 0, expense: 0 }
    }

    if (tx.type === 'income') {
      acc[label].income += tx.amount
    } else {
      acc[label].expense += tx.amount
    }

    return acc
  }, {})

  return Object.values(aggregate).sort((a, b) => a.label.localeCompare(b.label))
}

export function groupByMonth(transactions: Transaction[]): GroupedSummary[] {
  return aggregateByKey(transactions, (tx) => {
    const { year, month } = normalizeDateSegments(tx.date)
    return `${year}-${month}`
  })
}

export function groupByYear(transactions: Transaction[]): GroupedSummary[] {
  return aggregateByKey(transactions, (tx) => {
    const { year } = normalizeDateSegments(tx.date)
    return year
  })
}
