import { message } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../../app/storeHooks'
import { routes } from '../../../config/routes'
import type { ApiErrorResponse } from '../../../shared/types/api.types'
import { setToken } from './login.slice'
import { loginService } from './login.service'
import type { LoginFormValues } from './login.types'

export function useLogin() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitLogin = async (values: LoginFormValues) => {
    try {
      setIsSubmitting(true)
      const response = await loginService.login(values)

      dispatch(setToken(response.token))
      message.success('Uspesno ste se ulogovali.')
      navigate(routes.trips, { replace: true })
    } catch (error) {
      const apiError = error as ApiErrorResponse

      message.error(apiError.message || 'Login nije uspeo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    submitLogin,
  }
}
