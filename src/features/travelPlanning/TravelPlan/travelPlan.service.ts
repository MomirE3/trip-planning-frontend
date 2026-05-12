import { baseApi } from '../../../shared/services/baseApi'
import type {
  CreateTravelPlanDto,
  TravelPlanDto,
  TravelPlanFullDto,
  UpdateTravelPlanRequest,
} from './travelPlan.types'

export const travelPlanService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTravelPlan: builder.mutation<TravelPlanDto, CreateTravelPlanDto>({
      query: (body) => ({
        url: '/TravelPlan',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TravelPlan'],
    }),

    getTravelPlans: builder.query<TravelPlanDto[], void>({
      query: () => ({
        url: '/TravelPlan',
        method: 'GET',
      }),
      providesTags: ['TravelPlan'],
    }),

    getTravelPlan: builder.query<TravelPlanDto, number>({
      query: (id) => ({
        url: `/TravelPlan/${id}`,
        method: 'GET',
      }),
      providesTags: ['TravelPlan'],
    }),

    getTravelPlanFull: builder.query<TravelPlanFullDto, number>({
      query: (id) => ({
        url: `/TravelPlan/${id}/full`,
        method: 'GET',
      }),
      providesTags: ['TravelPlanFull', 'Destination', 'Activity', 'Expense'],
    }),

    updateTravelPlan: builder.mutation<void, UpdateTravelPlanRequest>({
      query: ({ id, body }) => ({
        url: `/TravelPlan/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['TravelPlan', 'TravelPlanFull'],
    }),

    deleteTravelPlan: builder.mutation<void, number>({
      query: (id) => ({
        url: `/TravelPlan/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TravelPlan', 'TravelPlanFull', 'Destination', 'Activity', 'Expense'],
    }),
  }),
})

export const {
  useCreateTravelPlanMutation,
  useGetTravelPlansQuery,
  useGetTravelPlanQuery,
  useGetTravelPlanFullQuery,
  useUpdateTravelPlanMutation,
  useDeleteTravelPlanMutation,
} = travelPlanService
