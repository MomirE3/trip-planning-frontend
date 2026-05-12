import { baseApi } from '../../../shared/services/baseApi'
import type { DestinationDto, UpdateDestinationRequest } from './destinations.types'

export const destinationsService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDestination: builder.mutation<DestinationDto, DestinationDto>({
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
