export interface LoginFormValues {
  email: string
  password: string
}

export interface LoginRequestDto {
  email: string
  password: string
}

export interface LoginResponseDto {
  token: string
}

export interface AuthState {
  token: string | null
}
