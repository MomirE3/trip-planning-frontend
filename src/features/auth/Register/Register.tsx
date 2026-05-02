import { Button, Card, Form, Input, Typography } from 'antd'
import { Link } from 'react-router'
import { routes } from '../../../config/routes'
import { useRegister } from './useRegister'

const { Text, Title } = Typography

export function Register() {
  const { isSubmitting, submitRegister } = useRegister()

  return (
    <Card className="auth-card">
      <div className="auth-heading">
        <Title level={2}>Registracija</Title>
        <Text type="secondary">Kreirajte nalog za planiranje putovanja.</Text>
      </div>

      <Form layout="vertical" requiredMark={false} onFinish={submitRegister}>
        <Form.Item
          label="Ime"
          name="name"
          rules={[{ required: true, message: 'Ime je obavezno.' }]}
        >
          <Input autoComplete="given-name" placeholder="Momir" />
        </Form.Item>

        <Form.Item
          label="Prezime"
          name="lastname"
          rules={[{ required: true, message: 'Prezime je obavezno.' }]}
        >
          <Input autoComplete="family-name" placeholder="Momirovic" />
        </Form.Item>

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
          <Input.Password autoComplete="new-password" placeholder="Lozinka" />
        </Form.Item>

        <Button block htmlType="submit" loading={isSubmitting} type="primary">
          Registruj se
        </Button>
      </Form>

      <Text className="auth-footer" type="secondary">
        Vec imate nalog? <Link to={routes.login}>Prijavite se</Link>
      </Text>
    </Card>
  )
}
