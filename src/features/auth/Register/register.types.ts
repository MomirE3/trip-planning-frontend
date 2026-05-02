export interface RegisterFormValues {
  email: string
  password: string
  name: string
  lastname: string
}

export interface RegisterRequestDto {
  email: string
  password: string
  name: string
  lastname: string
}

export interface RegisterResponseDto {
  id: string
  email: string
  name: string
  lastname: string
  role: 'User' | 'Admin'
  isActive: boolean
  createdAt: string
}
