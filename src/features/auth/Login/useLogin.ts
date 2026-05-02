import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../../app/storeHooks'
import { routes } from '../../../config/routes'
import { tokenStorage } from '../../../shared/services/tokenStorage'
import { getApiErrorMessage } from '../../../shared/utils/getApiErrorMessage'
import { setToken } from './login.slice'
import { useLoginMutation } from './login.service'
import type { LoginFormValues } from './login.types'

export function useLogin() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  const submitLogin = async (values: LoginFormValues) => {
    try {
      const response = await login(values).unwrap()

      tokenStorage.setAccessToken(response.token)
      dispatch(setToken(response.token))
      message.success(t('auth.login.messages.success'))
      navigate(routes.trips, { replace: true })
    } catch (error) {
      message.error(getApiErrorMessage(error, t('auth.login.messages.error')))
    }
  }

  return {
    isSubmitting: isLoading,
    submitLogin,
  }
}
