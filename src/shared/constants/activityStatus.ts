export const ACTIVITY_STATUSES = ['Planned', 'Reserved', 'Done', 'Cancelled'] as const

export type ActivityStatus = (typeof ACTIVITY_STATUSES)[number]

export const DEFAULT_ACTIVITY_STATUS: ActivityStatus = 'Planned'
