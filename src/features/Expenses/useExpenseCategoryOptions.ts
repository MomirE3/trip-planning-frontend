import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { EXPENSE_CATEGORIES } from '../../shared/constants/expenseCategory'
import { createEnumOptions } from '../../shared/utils/enumOptions'

export function useExpenseCategoryOptions() {
  const { t } = useTranslation()

  return useMemo(
    () =>
      createEnumOptions(EXPENSE_CATEGORIES, (value) =>
        t(`travelPlanning.enums.expenseCategory.${value}`),
      ),
    [t],
  )
}

export function useExpenseCategoryLabel() {
  const { t } = useTranslation()

  return (category: string) => t(`travelPlanning.enums.expenseCategory.${category}`, category)
}
