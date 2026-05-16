import { travelApi } from '../../shared/services/travelApi'
import type {
  ChecklistItemDto,
  CreateChecklistItemRequest,
  UpdateChecklistItemRequest,
} from './checklist.types'

export const checklistService = travelApi.injectEndpoints({
  endpoints: (builder) => ({
    createChecklistItem: builder.mutation<ChecklistItemDto, CreateChecklistItemRequest>({
      query: (body) => ({
        url: '/ChecklistItems',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Checklist', 'TravelPlanFull'],
    }),

    getChecklistItems: builder.query<ChecklistItemDto[], number>({
      query: (travelPlanId) => ({
        url: '/ChecklistItems',
        method: 'GET',
        params: { travelPlanId },
      }),
      providesTags: ['Checklist'],
    }),

    updateChecklistItem: builder.mutation<void, UpdateChecklistItemRequest>({
      query: ({ id, body }) => ({
        url: `/ChecklistItems/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Checklist', 'TravelPlanFull'],
    }),

    deleteChecklistItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `/ChecklistItems/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Checklist', 'TravelPlanFull'],
    }),
  }),
})

export const {
  useCreateChecklistItemMutation,
  useDeleteChecklistItemMutation,
  useUpdateChecklistItemMutation,
} = checklistService
