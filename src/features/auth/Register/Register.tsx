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
import { useRegister } from './useRegister'
import type { RegisterFormValues } from './register.types'

export function Register() {
  const { t } = useTranslation()
  const { isSubmitting, submitRegister } = useRegister()

  return (
    <BaseCard className="auth-card">
      <div className="auth-heading">
        <BaseTitle level={2}>{t('auth.register.title')}</BaseTitle>
        <BaseText type="secondary">{t('auth.register.description')}</BaseText>
      </div>

      <BaseForm<RegisterFormValues> layout="vertical" requiredMark={false} onFinish={submitRegister}>
        <BaseFormTextInput
          autoComplete="given-name"
          label={t('auth.register.firstName')}
          name="name"
          placeholder={t('auth.register.firstNamePlaceholder')}
          rules={[{ required: true, message: t('auth.register.validation.firstNameRequired') }]}
        />

        <BaseFormTextInput
          autoComplete="family-name"
          label={t('auth.register.lastName')}
          name="lastname"
          placeholder={t('auth.register.lastNamePlaceholder')}
          rules={[{ required: true, message: t('auth.register.validation.lastNameRequired') }]}
        />

        <BaseFormTextInput
          autoComplete="email"
          label={t('auth.register.email')}
          name="email"
          placeholder={t('auth.register.emailPlaceholder')}
          rules={[
            { required: true, message: t('auth.register.validation.emailRequired') },
            { type: 'email', message: t('auth.register.validation.emailInvalid') },
          ]}
        />

        <BaseFormPasswordInput
          autoComplete="new-password"
          label={t('auth.register.password')}
          name="password"
          placeholder={t('auth.register.passwordPlaceholder')}
          rules={[
            { required: true, message: t('auth.register.validation.passwordRequired') },
            { min: 6, message: t('auth.register.validation.passwordMin') },
          ]}
        />

        <BaseButton block htmlType="submit" loading={isSubmitting} type="primary">
          {t('auth.register.submit')}
        </BaseButton>
      </BaseForm>

      <BaseText className="auth-footer" type="secondary">
        {t('auth.register.hasAccount')} <Link to={routes.login}>{t('auth.register.loginLink')}</Link>
      </BaseText>
    </BaseCard>
  )
}
