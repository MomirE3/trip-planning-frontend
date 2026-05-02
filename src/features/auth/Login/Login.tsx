import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { routes } from '../../../config/routes'
import {
  BaseButton,
  BaseCard,
  BaseForm,
  BaseFormPasswordInput,
  BaseFormTextInput,
  BaseText,
  BaseTitle,
} from '../../../shared/ui'
import { useLogin } from './useLogin'
import type { LoginFormValues } from './login.types'

export function Login() {
  const { t } = useTranslation()
  const { isSubmitting, submitLogin } = useLogin()

  return (
    <BaseCard className="auth-card">
      <div className="auth-heading">
        <BaseTitle level={2}>{t('auth.login.title')}</BaseTitle>
        <BaseText type="secondary">{t('auth.login.description')}</BaseText>
      </div>

      <BaseForm<LoginFormValues> layout="vertical" requiredMark={false} onFinish={submitLogin}>
        <BaseFormTextInput
          autoComplete="email"
          label={t('auth.login.email')}
          name="email"
          placeholder={t('auth.login.emailPlaceholder')}
          rules={[
            { required: true, message: t('auth.login.validation.emailRequired') },
            { type: 'email', message: t('auth.login.validation.emailInvalid') },
          ]}
        />

        <BaseFormPasswordInput
          autoComplete="current-password"
          label={t('auth.login.password')}
          name="password"
          placeholder={t('auth.login.passwordPlaceholder')}
          rules={[
            { required: true, message: t('auth.login.validation.passwordRequired') },
            { min: 6, message: t('auth.login.validation.passwordMin') },
          ]}
        />

        <BaseButton block htmlType="submit" loading={isSubmitting} type="primary">
          {t('auth.login.submit')}
        </BaseButton>
      </BaseForm>

      <BaseText className="auth-footer" type="secondary">
        {t('auth.login.noAccount')} <Link to={routes.register}>{t('auth.login.registerLink')}</Link>
      </BaseText>
    </BaseCard>
  )
}
