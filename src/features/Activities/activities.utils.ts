import { includesSearchValue } from '../../shared/utils/filter'
import type { ActivityDto, ActivityFilters, ActivityFormValues } from './activities.types'

export const emptyActivityFilters: ActivityFilters = {
  date: '',
  name: '',
}

export function filterActivities(activities: ActivityDto[], filters: ActivityFilters) {
  return activities.filter((activity) => {
    const matchesName = includesSearchValue(activity.name, filters.name)
    const matchesDate = !filters.date || activity.date.slice(0, 10) === filters.date

    return matchesName && matchesDate
  })
}

export function buildActivityDto(
  values: ActivityFormValues,
  travelPlanId: number,
  activityId = 0,
): ActivityDto {
  return {
    id: activityId,
    travelPlanId,
    ...values,
  }
}
