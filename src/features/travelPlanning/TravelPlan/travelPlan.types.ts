import type { ActivityDto } from '../Activities/activities.types'
import type { DestinationDto } from '../Destinations/destinations.types'
import type { ExpenseDto } from '../Expenses/expenses.types'

export interface CreateTravelPlanDto {
  name: string
  startDate: string
  endDate: string
}

export interface UpdateTravelPlanDto {
  name: string
  startDate: string
  endDate: string
}

export interface TravelPlanDto {
  id: number
  name: string
  startDate: string
  endDate: string
  userId: string
}

export interface TravelPlanFullDto {
  travelPlan: TravelPlanDto
  destinations: DestinationDto[]
  activities: ActivityDto[]
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
