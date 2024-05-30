
import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Typography, Flex, App  } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons'
import axios from 'axios';


const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //const [message, setMessage] = useState('');
  const { message, modal, notification } = App.useApp();
  const [form] = Form.useForm();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/user/profile');
    }
  }, [navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
        const response = await axios.post('/forgotpassword', values);
        //localStorage.setItem('token', response.data.token);
        form.resetFields()
        console.log(response.data)
        //message.success(response.data.message);
        /*modal.success({
            //title: 'This is a warning message',
            title: response.data.message,
        });*/

        notification.info({
            message:  response.data.message,
            placement: 'topRight',
        });
        //showMessage(response.data.message)
        //setLoggedIn(true);
        //navigate('/user/profile')

    } catch (error) {
      //console.error('Login error:', error);
      message.warning(error)
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (successMessage) => {
    message.success(successMessage && successMessage || 'Success');
   // setMessage(successMessage)
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <Card>
        <Flex vertical gap="30px">
          <Flex vertical align='flex-start'>
              <Typography.Title level={2} strong style={{marginTop:0}}>
              Forgot password
              </Typography.Title>
              <Typography.Text type='secondary' strong>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.  consectetur adipisicing elit.
              </Typography.Text>
              <Typography.Text type='danger'>
                {/*message*/}
              </Typography.Text>
          </Flex>
          <Form
            form={form}
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

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                Login
              </Button>
            </Form.Item>
            <Form.Item>
              <Flex justify='space-between' align='center'>
                <Link to="/authentication/login">Login Here</Link>
                <Link to="/authentication/register">Register now!</Link>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
