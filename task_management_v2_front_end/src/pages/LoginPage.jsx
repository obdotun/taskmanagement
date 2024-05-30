import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Typography, Flex, App } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppURL from '../api/AppURL';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { notification } = App.useApp();

  const openErrorNotification = (message) => {
    notification.error({
      message: 'Error',
      description: message,
      placement: 'topRight',
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/user/profile');
    }
  }, [navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(AppURL.Login, values);
      localStorage.setItem('token', response.data.data.token);
      window.location.href = '/user/profile';
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            openErrorNotification('Invalid request. Please check your input.');
            break;
          case 401:
            openErrorNotification('Email or password incorrect.');
            break;
          case 500:
            openErrorNotification('Server error. Please try again later.');
            break;
          default:
            openErrorNotification('An unexpected error occurred.');
        }
      } else {
        openErrorNotification('Network error. Please check your connection.');
      }
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <Card>
        <Flex vertical gap="30px">
          <Flex vertical align="flex-start">
            <Typography.Title level={2} strong style={{ marginTop: 0 }}>
              Login
            </Typography.Title>
            <Typography.Text type="secondary" strong>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. consectetur adipisicing elit.
            </Typography.Text>
          </Flex>
          <Form
            name="loginForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                Login
              </Button>
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Link to="/authentication/forgotpwd">Forgot password?</Link>
                <Link to="/authentication/register">Register now!</Link>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Card>
    </div>
  );
};

export default LoginPage;
