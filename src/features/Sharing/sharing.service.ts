import { sharingApi } from '../../shared/services/sharingApi'
import type {
  CreateShareTokenRequest,
  ShareTokenDto,
  ValidateShareTokenResponse,
} from './sharing.types'

export const sharingService = sharingApi.injectEndpoints({
  endpoints: (builder) => ({
    createShareToken: builder.mutation<ShareTokenDto, CreateShareTokenRequest>({
      query: (body) => ({
        url: '/sharing/tokens',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ShareToken'],
    }),

    getShareTokens: builder.query<ShareTokenDto[], number>({
      query: (travelPlanId) => ({
        url: `/sharing/tokens/${travelPlanId}`,
        method: 'GET',
      }),
      providesTags: ['ShareToken'],
    }),

    revokeShareToken: builder.mutation<void, string>({
      query: (tokenId) => ({
        url: `/sharing/tokens/${tokenId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ShareToken'],
    }),

    validateShareToken: builder.query<ValidateShareTokenResponse, string>({
      query: (token) => ({
        url: `/sharing/validate/${token}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useCreateShareTokenMutation,
  useGetShareTokensQuery,
  useRevokeShareTokenMutation,
  useValidateShareTokenQuery,
} = sharingService
