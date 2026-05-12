import { baseApi } from '../../../shared/services/baseApi'
import type { ActivityDto, UpdateActivityRequest } from './activities.types'

export const activitiesService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createActivity: builder.mutation<ActivityDto, ActivityDto>({
      query: (body) => ({
        url: '/Activities',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Activity', 'TravelPlanFull'],
    }),

    updateActivity: builder.mutation<void, UpdateActivityRequest>({
      query: ({ id, body }) => ({
        url: `/Activities/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Activity', 'TravelPlanFull'],
    }),

    deleteActivity: builder.mutation<void, number>({
      query: (id) => ({
        url: `/Activities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Activity', 'TravelPlanFull'],
    }),
  }),
})

export const {
  useCreateActivityMutation,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
} = activitiesService
