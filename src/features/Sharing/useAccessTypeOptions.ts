import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ACCESS_TYPES } from '../../shared/constants/accessType'
import { createEnumOptions } from '../../shared/utils/enumOptions'

export function useAccessTypeOptions() {
  const { t } = useTranslation()

  return useMemo(
    () =>
      createEnumOptions(ACCESS_TYPES, (value) =>
        t(`travelPlanning.enums.accessType.${value}`),
      ),
    [t],
  )
}

export function useAccessTypeLabel() {
  const { t } = useTranslation()

  return (accessType: string) => t(`travelPlanning.enums.accessType.${accessType}`, accessType)
}
