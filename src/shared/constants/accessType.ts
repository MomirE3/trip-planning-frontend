export const ACCESS_TYPES = ['View', 'Edit'] as const

export type AccessType = (typeof ACCESS_TYPES)[number]
