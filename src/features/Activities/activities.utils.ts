import { includesSearchValue } from '../../shared/utils/filter'
import type {
  ActivityDto,
  ActivityFilters,
  ActivityFormValues,
  ActivityRequestDto,
} from './activities.types'

export const emptyActivityFilters: ActivityFilters = {
  date: '',
  location: '',
  name: '',
  status: '',
}

export function filterActivities(activities: ActivityDto[], filters: ActivityFilters) {
  return activities.filter((activity) => {
    const matchesName = includesSearchValue(activity.name, filters.name)
    const matchesDate = !filters.date || activity.date.slice(0, 10) === filters.date
    const matchesLocation = includesSearchValue(activity.location, filters.location)
    const matchesStatus = includesSearchValue(activity.status, filters.status)

    return matchesName && matchesDate && matchesLocation && matchesStatus
  })
}

export function buildActivityDto(
  values: ActivityFormValues,
  travelPlanId: number,
): ActivityRequestDto {
  return {
    travelPlanId,
    ...values,
  }
}
