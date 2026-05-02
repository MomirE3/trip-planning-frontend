import { Button, Card, Form, Input, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { routes } from '../../../config/routes'
import { useLogin } from './useLogin'

const { Text, Title } = Typography

export function Login() {
  const { t } = useTranslation()
  const { isSubmitting, submitLogin } = useLogin()

  return (
    <Card className="auth-card">
      <div className="auth-heading">
        <Title level={2}>{t('auth.login.title')}</Title>
        <Text type="secondary">{t('auth.login.description')}</Text>
      </div>

      <Form layout="vertical" requiredMark={false} onFinish={submitLogin}>
        <Form.Item
          label={t('auth.login.email')}
          name="email"
          rules={[
            { required: true, message: t('auth.login.validation.emailRequired') },
            { type: 'email', message: t('auth.login.validation.emailInvalid') },
          ]}
        >
          <Input autoComplete="email" placeholder={t('auth.login.emailPlaceholder')} />
        </Form.Item>

        <Form.Item
          label={t('auth.login.password')}
          name="password"
          rules={[
            { required: true, message: t('auth.login.validation.passwordRequired') },
            { min: 6, message: t('auth.login.validation.passwordMin') },
          ]}
        >
          <Input.Password
            autoComplete="current-password"
            placeholder={t('auth.login.passwordPlaceholder')}
          />
        </Form.Item>

        <Button block htmlType="submit" loading={isSubmitting} type="primary">
          {t('auth.login.submit')}
        </Button>
      </Form>

      <Text className="auth-footer" type="secondary">
        {t('auth.login.noAccount')} <Link to={routes.register}>{t('auth.login.registerLink')}</Link>
      </Text>
    </Card>
  )
}
