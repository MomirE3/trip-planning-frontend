import { Button, Card, Form, Input, Typography } from 'antd'
import { Link } from 'react-router'
import { routes } from '../../../config/routes'
import { useLogin } from './useLogin'

const { Text, Title } = Typography

export function Login() {
  const { isSubmitting, submitLogin } = useLogin()

  return (
    <Card className="auth-card">
      <div className="auth-heading">
        <Title level={2}>Prijava</Title>
        <Text type="secondary">Unesite email i lozinku za pristup aplikaciji.</Text>
      </div>

      <Form layout="vertical" requiredMark={false} onFinish={submitLogin}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email je obavezan.' },
            { type: 'email', message: 'Unesite validan email.' },
          ]}
        >
          <Input autoComplete="email" placeholder="acamomir1@gmail.com" />
        </Form.Item>

        <Form.Item
          label="Lozinka"
          name="password"
          rules={[
            { required: true, message: 'Lozinka je obavezna.' },
            { min: 6, message: 'Lozinka mora imati najmanje 6 karaktera.' },
          ]}
        >
          <Input.Password autoComplete="current-password" placeholder="Lozinka" />
        </Form.Item>

        <Button block htmlType="submit" loading={isSubmitting} type="primary">
          Prijavi se
        </Button>
      </Form>

      <Text className="auth-footer" type="secondary">
        Nemate nalog? <Link to={routes.register}>Registrujte se</Link>
      </Text>
    </Card>
  )
}
