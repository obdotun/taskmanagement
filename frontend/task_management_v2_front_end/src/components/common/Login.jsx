import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Typography, Flex } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppURL from '../../api/AppURL';

const Login = ({ setUser }) => {

  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
        const response = await axios.post(AppURL.Login, values);
        console.log(response.data)
        localStorage.setItem('token', response.data.token);
        
        setUser(response.data.user);
        setLoggedIn(true);
        //navigate('/user/profile') 
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };
/*
  if (loggedIn || localStorage.getItem('token')) {
    return <Redirect to={'/profile'} />;
 }
*/
  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <Card>
        <Flex vertical gap="30px">
          <Flex vertical align='flex-start'>
            <Typography.Title level={2} strong style={{ marginTop: 0 }}>
              Login
            </Typography.Title>
            <Typography.Text type='secondary' strong>
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
              <Flex justify='space-between' align='center'>
                <Link to="/authentication/forgotpwd">Forgot password?</Link>
                <Link to="/register">Register now!</Link>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Card>
    </div>
  );
};

export default Login;
