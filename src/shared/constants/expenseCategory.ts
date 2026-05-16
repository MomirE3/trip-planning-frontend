export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Accommodation',
  'Entertainment',
  'Shopping',
  'Health',
  'Insurance',
  'Flights',
  'Taxi',
  'PublicTransport',
  'Fuel',
  'Parking',
  'Tours',
  'Activities',
  'Souvenirs',
  'Other',
] as const

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number]
