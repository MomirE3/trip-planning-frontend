import { Button, Card, Form, Input, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { routes } from '../../../config/routes'
import { useRegister } from './useRegister'

const { Text, Title } = Typography

export function Register() {
  const { t } = useTranslation()
  const { isSubmitting, submitRegister } = useRegister()

  return (
    <Card className="auth-card">
      <div className="auth-heading">
        <Title level={2}>{t('auth.register.title')}</Title>
        <Text type="secondary">{t('auth.register.description')}</Text>
      </div>

      <Form layout="vertical" requiredMark={false} onFinish={submitRegister}>
        <Form.Item
          label={t('auth.register.firstName')}
          name="name"
          rules={[{ required: true, message: t('auth.register.validation.firstNameRequired') }]}
        >
          <Input
            autoComplete="given-name"
            placeholder={t('auth.register.firstNamePlaceholder')}
          />
        </Form.Item>

        <Form.Item
          label={t('auth.register.lastName')}
          name="lastname"
          rules={[{ required: true, message: t('auth.register.validation.lastNameRequired') }]}
        >
          <Input
            autoComplete="family-name"
            placeholder={t('auth.register.lastNamePlaceholder')}
          />
        </Form.Item>

        <Form.Item
          label={t('auth.register.email')}
          name="email"
          rules={[
            { required: true, message: t('auth.register.validation.emailRequired') },
            { type: 'email', message: t('auth.register.validation.emailInvalid') },
          ]}
        >
          <Input autoComplete="email" placeholder={t('auth.register.emailPlaceholder')} />
        </Form.Item>

        <Form.Item
          label={t('auth.register.password')}
          name="password"
          rules={[
            { required: true, message: t('auth.register.validation.passwordRequired') },
            { min: 6, message: t('auth.register.validation.passwordMin') },
          ]}
        >
          <Input.Password
            autoComplete="new-password"
            placeholder={t('auth.register.passwordPlaceholder')}
          />
        </Form.Item>

        <Button block htmlType="submit" loading={isSubmitting} type="primary">
          {t('auth.register.submit')}
        </Button>
      </Form>

      <Text className="auth-footer" type="secondary">
        {t('auth.register.hasAccount')} <Link to={routes.login}>{t('auth.register.loginLink')}</Link>
      </Text>
    </Card>
  )
}
