import { travelApi } from '../../shared/services/travelApi'
import type {
  DestinationDto,
  DestinationRequestDto,
  UpdateDestinationRequest,
} from './destinations.types'

export const destinationsService = travelApi.injectEndpoints({
  endpoints: (builder) => ({
    createDestination: builder.mutation<DestinationDto, DestinationRequestDto>({
      query: (body) => ({
        url: '/Destinations',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Destination', 'TravelPlanFull'],
    }),

    updateDestination: builder.mutation<void, UpdateDestinationRequest>({
      query: ({ id, body }) => ({
        url: `/Destinations/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Destination', 'TravelPlanFull'],
    }),

    deleteDestination: builder.mutation<void, number>({
      query: (id) => ({
        url: `/Destinations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Destination', 'TravelPlanFull'],
    }),
  }),
})

export const {
  useCreateDestinationMutation,
  useUpdateDestinationMutation,
  useDeleteDestinationMutation,
} = destinationsService
