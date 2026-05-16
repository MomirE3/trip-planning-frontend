import { includesSearchValue } from '../../shared/utils/filter'
import { sumExpenses } from '../Expenses/expenses.utils'
import type { ExpenseDto } from '../Expenses/expenses.types'
import type { TravelPlanDto, TravelPlanFilters } from './travelPlan.types'

export function getBudgetSummary(budget: number, expenses: ExpenseDto[]) {
  const spent = sumExpenses(expenses)
  const remaining = budget - spent

  return { remaining, spent }
}

export const emptyTravelPlanFilters: TravelPlanFilters = {
  endDate: '',
  name: '',
  startDate: '',
}

export function filterTravelPlans(travelPlans: TravelPlanDto[], filters: TravelPlanFilters) {
  return travelPlans.filter((plan) => {
    const matchesName = includesSearchValue(plan.name, filters.name)
    const matchesStartDate = !filters.startDate || plan.startDate.slice(0, 10) >= filters.startDate
    const matchesEndDate = !filters.endDate || plan.endDate.slice(0, 10) <= filters.endDate

    return matchesName && matchesStartDate && matchesEndDate
  })
}

export function countUpcomingTravelPlans(travelPlans: TravelPlanDto[]) {
  const today = new Date().toISOString().slice(0, 10)

  return travelPlans.filter((plan) => plan.startDate.slice(0, 10) >= today).length
}
