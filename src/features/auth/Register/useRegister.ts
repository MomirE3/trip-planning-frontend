import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { routes } from '../../../config/routes'
import { getApiErrorMessage } from '../../../shared/utils/getApiErrorMessage'
import { useRegisterMutation } from './register.service'
import type { RegisterFormValues } from './register.types'

export function useRegister() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [register, { isLoading }] = useRegisterMutation()

  const submitRegister = async (values: RegisterFormValues) => {
    try {
      await register(values).unwrap()
      message.success(t('auth.register.messages.success'))
      navigate(routes.login, { replace: true })
    } catch (error) {
      message.error(getApiErrorMessage(error, t('auth.register.messages.error')))
    }
  }

  return {
    isSubmitting: isLoading,
    submitRegister,
  }
}
