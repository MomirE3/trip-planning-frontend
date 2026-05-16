import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ACTIVITY_STATUSES } from '../../shared/constants/activityStatus'
import { createEnumOptions } from '../../shared/utils/enumOptions'

export function useActivityStatusOptions() {
  const { t } = useTranslation()

  return useMemo(
    () =>
      createEnumOptions(ACTIVITY_STATUSES, (value) =>
        t(`travelPlanning.enums.activityStatus.${value}`),
      ),
    [t],
  )
}

export function useActivityStatusLabel() {
  const { t } = useTranslation()

  return (status: string) => t(`travelPlanning.enums.activityStatus.${status}`, status)
}
