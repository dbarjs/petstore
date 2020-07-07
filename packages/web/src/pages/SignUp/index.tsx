import React, { useCallback } from 'react';
import { Form, Input, Button, notification } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background, AnimationContainer } from './styles';
import api from '../../services/api';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const handleSubmit = useCallback(
    async value => {
      await api.post('/users', value);
      history.push('/');
      notification.success({
        message: 'Account created successfully!',
        description:
          'You can now access the dashboard using your email and password.',
        duration: 3,
      });
    },
    [history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="PetStore" />
          <Form
            form={form}
            name="register"
            onFinish={handleSubmit}
            scrollToFirstError
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please insert your name!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="E-mail"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  min: 6,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Register
              </Button>
            </Form.Item>
          </Form>

          <Link to="/">
            <ArrowLeftOutlined />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
