import type { ActivityStatus } from '../../shared/constants/activityStatus'

export interface ActivityDto {
  id: number
  description: string
  estimatedCost: number
  location: string
  name: string
  status: ActivityStatus
  time: string
  travelPlanId: number
}

export interface ActivityFormValues {
  description: string
  estimatedCost: number
  location: string
  name: string
  status: ActivityStatus
  time: string
}

export interface ActivityRequestDto extends ActivityFormValues {
  travelPlanId: number
}

export interface UpdateActivityRequest {
  id: number
  body: ActivityRequestDto
}

export interface ActivityFilters {
  date: string
  location: string
  name: string
  status: string
}

export interface ActivityFormModalProps {
  initialValues?: ActivityDto | null
  isSubmitting?: boolean
  onCancel: () => void
  onSubmit: (values: ActivityFormValues) => void
  open: boolean
  title: string
}

export interface ActivitiesTableProps {
  activities: ActivityDto[]
  travelPlanId: number
}
