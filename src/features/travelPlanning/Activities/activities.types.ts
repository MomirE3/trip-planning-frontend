export interface ActivityDto {
  id: number
  name: string
  date: string
  travelPlanId: number
}

export interface UpdateActivityRequest {
  id: number
  body: ActivityDto
}

export interface ActivityFormValues {
  date: string
  name: string
}

export interface ActivityFilters {
  date: string
  name: string
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
