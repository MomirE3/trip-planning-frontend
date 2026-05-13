import type { ActivityDto } from '../Activities/activities.types'
import type { DestinationDto } from '../Destinations/destinations.types'
import type { ExpenseDto } from '../Expenses/expenses.types'

export interface CreateTravelPlanDto {
  budget: number
  description: string
  endDate: string
  name: string
  startDate: string
}

export interface UpdateTravelPlanDto {
  budget: number
  description: string
  endDate: string
  name: string
  startDate: string
}

export interface TravelPlanDto {
  id: number
  budget: number
  description: string
  endDate: string
  name: string
  startDate: string
  userId: string
}

export interface TravelPlanFullDto extends TravelPlanDto {
  activities: ActivityDto[]
  destinations: DestinationDto[]
  expenses: ExpenseDto[]
}

export interface UpdateTravelPlanRequest {
  id: number
  body: UpdateTravelPlanDto
}

export interface TravelPlanFilters {
  endDate: string
  name: string
  startDate: string
}

export interface TravelPlanFormModalProps {
  initialValues?: TravelPlanDto | null
  isSubmitting?: boolean
  onCancel: () => void
  onSubmit: (values: CreateTravelPlanDto) => void
  open: boolean
  title: string
}
