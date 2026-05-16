export interface ChecklistItemDto {
  id: number
  content: string
  isCompleted: boolean
  travelPlanId: number
}

export interface CreateChecklistItemRequest {
  content: string
  travelPlanId: number
}

export interface UpdateChecklistItemRequest {
  id: number
  body: ChecklistItemDto
}

export interface ChecklistPanelProps {
  items: ChecklistItemDto[]
  travelPlanId: number
}
