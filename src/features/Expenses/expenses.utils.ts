import { includesSearchValue } from '../../shared/utils/filter'
import { parseOptionalNumber } from '../../shared/utils/number'
import type {
  ExpenseDto,
  ExpenseFilters,
  ExpenseFormValues,
  ExpenseRequestDto,
} from './expenses.types'

export const emptyExpenseFilters: ExpenseFilters = {
  category: '',
  date: '',
  maxAmount: '',
  minAmount: '',
  name: '',
}

export function filterExpenses(expenses: ExpenseDto[], filters: ExpenseFilters) {
  return expenses.filter((expense) => {
    const minAmount = parseOptionalNumber(filters.minAmount)
    const maxAmount = parseOptionalNumber(filters.maxAmount)
    const matchesName = includesSearchValue(expense.name, filters.name)
    const matchesCategory = !filters.category || expense.category === filters.category
    const matchesDate = !filters.date || expense.date.slice(0, 10) === filters.date
    const matchesMinAmount = minAmount === undefined || expense.amount >= minAmount
    const matchesMaxAmount = maxAmount === undefined || expense.amount <= maxAmount

    return matchesName && matchesCategory && matchesDate && matchesMinAmount && matchesMaxAmount
  })
}

export function sumExpenses(expenses: ExpenseDto[]) {
  return expenses.reduce((total, expense) => total + expense.amount, 0)
}

export function buildExpenseDto(
  values: ExpenseFormValues,
  travelPlanId: number,
): ExpenseRequestDto {
  return {
    travelPlanId,
    ...values,
  }
}
