import { includesSearchValue } from '../../shared/utils/filter'
import type {
  DestinationDto,
  DestinationFilters,
  DestinationFormValues,
  DestinationRequestDto,
} from './destinations.types'

export const emptyDestinationFilters: DestinationFilters = {
  location: '',
  name: '',
}

export function filterDestinations(destinations: DestinationDto[], filters: DestinationFilters) {
  return destinations.filter((destination) => {
    const matchesName = includesSearchValue(destination.name, filters.name)
    const matchesLocation = includesSearchValue(destination.location, filters.location)

    return matchesName && matchesLocation
  })
}

export function buildDestinationDto(
  values: DestinationFormValues,
  travelPlanId: number,
): DestinationRequestDto {
  return {
    travelPlanId,
    ...values,
  }
}
