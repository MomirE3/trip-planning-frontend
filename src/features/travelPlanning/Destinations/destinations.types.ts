export interface DestinationDto {
  id: number
  name: string
  country: string
  travelPlanId: number
}

export interface UpdateDestinationRequest {
  id: number
  body: DestinationDto
}

export interface DestinationFormValues {
  country: string
  name: string
}

export interface DestinationFilters {
  country: string
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
