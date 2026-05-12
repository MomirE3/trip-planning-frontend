import { EntityTableSection } from '../shared'
import { ExpenseFormModal } from './ExpenseFormModal'
import { useExpensesTable } from './useExpensesTable'
import type { ExpenseDto, ExpenseFilters, ExpensesTableProps } from './expenses.types'

export function ExpensesTable({ expenses, travelPlanId }: ExpensesTableProps) {
  const {
    closeForm,
    columns,
    editingExpense,
    filteredExpenses,
    filterFields,
    filters,
    isFormOpen,
    isSubmitting,
    openCreateForm,
    resetFilters,
    submitExpense,
    summary,
    t,
    updateFilter,
  } = useExpensesTable(expenses, travelPlanId)

  return (
    <>
      <EntityTableSection<ExpenseDto, ExpenseFilters>
        addButtonLabel={t('travelPlanning.expenses.new')}
        columns={columns}
        dataSource={filteredExpenses}
        filterFields={filterFields}
        filters={filters}
        onAdd={openCreateForm}
        onFilterChange={updateFilter}
        onResetFilters={resetFilters}
        resetFiltersLabel={t('travelPlanning.common.resetFilters')}
        rowKey="id"
        summary={summary}
      />

      <ExpenseFormModal
        initialValues={editingExpense}
        isSubmitting={isSubmitting}
        onCancel={closeForm}
        onSubmit={submitExpense}
        open={isFormOpen}
        title={
          editingExpense
            ? t('travelPlanning.expenses.editTitle')
            : t('travelPlanning.expenses.createTitle')
        }
      />
    </>
  )
}
