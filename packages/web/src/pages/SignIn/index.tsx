import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, notification } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import logoImg from '../../assets/logo.svg';

import {
  Container,
  Content,
  AnimationContainer,
  Background,
  SignInButton,
} from './styles';

import { useAuth } from '../../hooks/auth';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async values => {
      try {
        await signIn({
          email: values.email,
          password: values.password,
        });
        history.push('/');
        notification.success({
          message: 'User logged in!',
          description: 'Welcome to the PetStore dashboard!',
          duration: 3,
        });
      } catch {
        notification.error({
          message: 'Wrong credentials!',
          description: 'There was a problem with your credentials, try again!',
          duration: 3,
        });
      }
    },
    [history, signIn],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="PetStore" />

          <Form
            name="normal_login"
            className="login-form"
            onFinish={handleSubmit}
          >
            <h1>Sign In</h1>

            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <SignInButton
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
              >
                Log in
              </SignInButton>
              <Link to="signup">Register now!</Link>
            </Form.Item>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
