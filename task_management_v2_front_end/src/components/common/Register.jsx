import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Flex, Typography, Card } from 'antd';
import { LockOutlined, UserOutlined, LeftOutlined } from '@ant-design/icons';
import {  Link  } from "react-router-dom";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
   // const navigate = useNavigate()
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('/register', values);
            localStorage.setItem('token', response.data.token);
           // navigate('/user/profile')
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);            
        }
    };

    return (        
        <div style={{ maxWidth: 500, margin: 'auto' }}>
        <Card style={{ }}>
        <Flex vertical gap="30px">
            <Flex vertical align='flex-start'>
                <Typography.Title level={2} strong style={{marginTop:0}}>
                Register
                </Typography.Title>
                <Typography.Text type='secondary' strong>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.  consectetur adipisicing elit.                     
                </Typography.Text>
            </Flex>
            <Form
                name="registerForm"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input placeholder="Name" prefix={<UserOutlined />}/>
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input placeholder="Email"  prefix={<UserOutlined />}/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                    placeholder="Password"
                    prefix={<LockOutlined />}
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                      {
                        required: true,
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                      }),
                    ]}
                >
                    <Input.Password
                    placeholder="Confirm password"
                    prefix={<LockOutlined />}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} style={{width:'100%'}}>
                        Register
                    </Button>              
                </Form.Item>
                
            </Form>
            <Form.Item>
              <Flex justify='space-between' align='center'>
                <Link to="/authentication/login">Login here</Link>
                <Link to="/authentication/forgotpwd">Forgot password?</Link>
              </Flex>
            </Form.Item>
        </Flex>

            

        </Card>
        
    </div>
    );
};

export default Register;
