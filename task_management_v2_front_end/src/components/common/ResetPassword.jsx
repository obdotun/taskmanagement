import React, { useState } from 'react';
import { Button, Typography, Form, Input, Flex, Card } from 'antd';
import { LeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true);
            try {
               const response = await axios.post('/resetPassword', values);
                //localStorage.setItem('token', response.data.token);
                console.log(response.data)
                form.resetFields()
                showMessage(response.data.message)
                //setLoggedIn(true);
                //navigate('/user/profile')

            } catch (error) {
              console.error('Login error:', error);
            } finally {
              setLoading(false);
            }
        };
        const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        };

    const showMessage = (successMessage) => {
        //message.success(successMessage && successMessage || 'Success');
        setMessage(successMessage)
    };

  return (
    <>
        <Card style={{ minWidth: 500, margin: 'auto' }}>
            <Flex vertical gap="30px">
                <Flex vertical align='flex-start'>
                    <Typography.Title level={2} strong style={{marginTop:0}}>
                    Reset password
                    </Typography.Title>
                    <Typography.Text type='secondary' strong>
                        {message}
                    </Typography.Text>
                </Flex>

                <Flex style={{width:'100%'}} vertical>
                    <Form
                        name="basic"                    
                        initialValues={{
                        remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        form={form}
                        >
                            <Form.Item
                              name="token"
                              rules={[{ required: true, message: 'Please input your pin code!' }]}
                            >
                                  <Input placeholder="Pin Code" />
                            </Form.Item>
                            <Form.Item
                              name="email"
                              rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                  <Input placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                            name="new_password"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your password!',
                                },
                            ]}
                            >
                            <Input.Password placeholder="New password"/>
                            </Form.Item>
                            <Form.Item
                            name="confirm_password"
                            rules={[
                                {
                                required: true,
                                message: 'Please confirm your password!',
                                },
                            ]}
                            >
                            <Input.Password placeholder="Confirm password"/>
                            </Form.Item>

                            <Button type="primary" htmlType="submit" style={{width:'100%'}} loading={loading}>
                                Submit
                            </Button>                          
                    </Form>
                </Flex>

                <Form.Item>
                  <Flex justify='space-between' align='center'>
                    <Link to="/authentication/login">Login here</Link>
                    <Link to="/authentication/forgotpwd">Forgot password?</Link>
                  </Flex>
                </Form.Item>
            </Flex>
        </Card>
        
        
    </>
    
  )
}

export default ResetPassword