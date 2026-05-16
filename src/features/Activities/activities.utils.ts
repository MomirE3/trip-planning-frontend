import { includesSearchValue } from '../../shared/utils/filter'
import { toDateTimeApiValue } from '../../shared/utils/date'
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
    const matchesDate = !filters.date || activity.time.slice(0, 10) === filters.date
    const matchesLocation = includesSearchValue(activity.location, filters.location)
    const matchesStatus = !filters.status || activity.status === filters.status

    return matchesName && matchesDate && matchesLocation && matchesStatus
  })
}

export function buildActivityDto(
  values: ActivityFormValues,
  travelPlanId: number,
): ActivityRequestDto {
  return {
    travelPlanId,
    description: values.description,
    estimatedCost: values.estimatedCost,
    location: values.location,
    name: values.name,
    status: values.status,
    time: toDateTimeApiValue(values.time),
  }
}
