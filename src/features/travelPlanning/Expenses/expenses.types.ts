export interface ExpenseDto {
  id: number
  amount: number
  description: string
  travelPlanId: number
}

export interface GetExpensesParams {
  travelPlanId?: number
}

export interface UpdateExpenseRequest {
  id: number
  body: ExpenseDto
}

export interface ExpenseFormValues {
  amount: number
  description: string
}

export interface ExpenseFilters {
  description: string
  maxAmount: string
  minAmount: string
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
