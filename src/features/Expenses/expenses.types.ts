import type { ExpenseCategory } from '../../shared/constants/expenseCategory'

export interface ExpenseDto {
  id: number
  amount: number
  category: ExpenseCategory
  date: string
  name: string
  travelPlanId: number
}

export interface GetExpensesParams {
  travelPlanId?: number
}

export interface UpdateExpenseRequest {
  id: number
  body: ExpenseRequestDto
}

export interface ExpenseFormValues {
  amount: number
  category: ExpenseCategory
  date: string
  name: string
}

export interface ExpenseRequestDto extends ExpenseFormValues {
  travelPlanId: number
}

export interface ExpenseFilters {
  category: string
  date: string
  maxAmount: string
  minAmount: string
  name: string
}

export interface ExpenseFormModalProps {
  initialValues?: ExpenseDto | null
  isSubmitting?: boolean
  onCancel: () => void
  onSubmit: (values: ExpenseFormValues) => void
  open: boolean
  title: string
}

export interface ExpensesTableProps {
  expenses: ExpenseDto[]
  travelPlanId: number
}
