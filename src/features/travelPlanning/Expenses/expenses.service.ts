import { baseApi } from '../../../shared/services/baseApi'
import type { ExpenseDto, GetExpensesParams, UpdateExpenseRequest } from './expenses.types'

export const expensesService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExpense: builder.mutation<ExpenseDto, ExpenseDto>({
      query: (body) => ({
        url: '/Expenses',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Expense', 'TravelPlanFull'],
    }),

    getExpenses: builder.query<ExpenseDto[], GetExpensesParams | void>({
      query: (params) => ({
        url: '/Expenses',
        method: 'GET',
        params: params ?? undefined,
      }),
      providesTags: ['Expense'],
    }),

    updateExpense: builder.mutation<void, UpdateExpenseRequest>({
      query: ({ id, body }) => ({
        url: `/Expenses/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Expense', 'TravelPlanFull'],
    }),

    deleteExpense: builder.mutation<void, number>({
      query: (id) => ({
        url: `/Expenses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Expense', 'TravelPlanFull'],
    }),
  }),
})

export const {
  useCreateExpenseMutation,
  useGetExpensesQuery,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expensesService
