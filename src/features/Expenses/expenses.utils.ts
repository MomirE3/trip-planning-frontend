import { includesSearchValue } from '../../shared/utils/filter'
import { parseOptionalNumber } from '../../shared/utils/number'
import type { ExpenseDto, ExpenseFilters, ExpenseFormValues } from './expenses.types'

export const emptyExpenseFilters: ExpenseFilters = {
  description: '',
  maxAmount: '',
  minAmount: '',
}

export function filterExpenses(expenses: ExpenseDto[], filters: ExpenseFilters) {
  return expenses.filter((expense) => {
    const minAmount = parseOptionalNumber(filters.minAmount)
    const maxAmount = parseOptionalNumber(filters.maxAmount)
    const matchesDescription = includesSearchValue(expense.description, filters.description)
    const matchesMinAmount = minAmount === undefined || expense.amount >= minAmount
    const matchesMaxAmount = maxAmount === undefined || expense.amount <= maxAmount

    return matchesDescription && matchesMinAmount && matchesMaxAmount
  })
}

export function sumExpenses(expenses: ExpenseDto[]) {
  return expenses.reduce((total, expense) => total + expense.amount, 0)
}

export function buildExpenseDto(
  values: ExpenseFormValues,
  travelPlanId: number,
  expenseId = 0,
): ExpenseDto {
  return {
    id: expenseId,
    travelPlanId,
    ...values,
  }
}
