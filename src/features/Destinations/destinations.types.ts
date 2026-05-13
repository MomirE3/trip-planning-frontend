export interface DestinationDto {
  id: number
  arrivalDate: string
  departureDate: string
  description: string
  location: string
  name: string
  notes: string
  travelPlanId: number
}

export interface DestinationFormValues {
  arrivalDate: string
  departureDate: string
  description: string
  location: string
  name: string
  notes: string
}

export interface DestinationRequestDto extends DestinationFormValues {
  travelPlanId: number
}

export interface UpdateDestinationRequest {
  id: number
  body: DestinationRequestDto
}

export interface DestinationFilters {
  location: string
  name: string
}

export interface DestinationFormModalProps {
  initialValues?: DestinationDto | null
  isSubmitting?: boolean
  onCancel: () => void
  onSubmit: (values: DestinationFormValues) => void
  open: boolean
  title: string
}

export interface DestinationsTableProps {
  destinations: DestinationDto[]
  travelPlanId: number
}
