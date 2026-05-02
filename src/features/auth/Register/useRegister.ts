import { message } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { routes } from '../../../config/routes'
import type { ApiErrorResponse } from '../../../shared/types/api.types'
import { registerService } from './register.service'
import type { RegisterFormValues } from './register.types'

export function useRegister() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitRegister = async (values: RegisterFormValues) => {
    try {
      setIsSubmitting(true)

      await registerService.register(values)
      message.success('Nalog je uspesno kreiran. Sada se mozete prijaviti.')
      navigate(routes.login, { replace: true })
    } catch (error) {
      const apiError = error as ApiErrorResponse

      message.error(apiError.message || 'Registracija nije uspela.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    submitRegister,
  }
}
