import { includesSearchValue } from '../../shared/utils/filter'
import type { DestinationDto, DestinationFilters, DestinationFormValues } from './destinations.types'

export const emptyDestinationFilters: DestinationFilters = {
  country: '',
  name: '',
}

export function filterDestinations(destinations: DestinationDto[], filters: DestinationFilters) {
  return destinations.filter((destination) => {
    const matchesName = includesSearchValue(destination.name, filters.name)
    const matchesCountry = includesSearchValue(destination.country, filters.country)

    return matchesName && matchesCountry
  })
}

export function buildDestinationDto(
  values: DestinationFormValues,
  travelPlanId: number,
  destinationId = 0,
): DestinationDto {
  return {
    id: destinationId,
    travelPlanId,
    ...values,
  }
}
