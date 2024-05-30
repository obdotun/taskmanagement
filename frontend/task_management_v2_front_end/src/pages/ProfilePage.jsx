import React, { useState, useEffect } from "react";
import { Flex, Card, Tooltip, Typography, Tag, Divider, Button, Form, Input, Image, Space, Spin, App, Modal } from 'antd';
import {LockOutlined,UserOutlined, ContactsOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AppURL from "../api/AppURL";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingChangePassword, setLoadingChangePassword] = useState(false);
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/authentication/login');
          return;
        }
        const response = await axios.get(AppURL.UserData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate('/authentication/login');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) {
    return <Spin />;
  }
  
  const handleChangePassword = async (values) =>{
    setLoadingChangePassword(true);
    try {
      const response = await axios.put(AppURL.ChangePassword(user.id), values);
      const message = response.data.message
      showSuccessNotification(message)
        
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoadingChangePassword(false);
      form.resetFields();
    }
  }

  const onReset = () => {
    form.resetFields();
  };

  const { notification } = App.useApp();

  const showSuccessNotification = (message) => {
    notification.success({
      message: `Success`,
      description: message,
      placement: 'topRight',
    });
  };

  const handleSave = async () => {
    try {
        const value = await formEdit.validateFields();
        const response = await axios.put(AppURL.UpdateUser(user.id), value);
        console.log(response.data.message);
        const message = response.data.message
        const data = response.data.user;
        refreshPage()
        setUser(data)        
        showSuccessNotification(message)
        setOpen(false);
        formEdit.resetFields()
        localStorage.setItem('user', JSON.stringify(data));
        
        
    } catch (error) {
        console.error('Validation failed:', error);
    }
};

const refreshPage = () => {
  window.location.reload();
};

const handleCancel = async () => {
  formEdit.resetFields();
  setOpen(false);
};

const handleEditingProfile = (user) => {
  setOpen(true);
  //setEditingRole(role);
  formEdit.setFieldsValue(user);
};

  return (
    <>
    <Flex gap="large">
      <div>
        <Flex vertical gap="2.3rem" style={{ width: 450 }}>
          <Card>
            <Flex align='center' justify='center' vertical gap="small">
              <Tooltip placement='top'>
                <Image
                  src="https://img.freepik.com/photos-gratuite/homme-affaires-moustache-lunettes-rendu-3d_1142-41586.jpg?size=626&ext=jpg"
                  style={{ maxWidth: "200px" }}
                />
              </Tooltip>

              <Typography.Text type='secondary' style={{ fontSize: '1.5rem' }}>{user.name.toUpperCase() || 'GUest'}</Typography.Text>
              <Tag color='default'> {user.roles[0].toUpperCase()} </Tag>
            </Flex>
            <Divider />
            <Flex vertical gap="small">
              <Typography.Text type='secondary'>Details</Typography.Text>
              <span>Username: {user.name}</span>
              <span>Email: {user.email}</span>
              <Flex gap="large" align='center' justify='center'>
                <Button type='primary' onClick={()=>handleEditingProfile(user)}>Edit</Button>  <Button>Suspended</Button>
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </div>
      <div style={{ flex: 1 }}>
        <Flex vertical gap="2.3rem">
          <Card>
            <Typography.Title level={3}>Change password</Typography.Title>
            <Flex style={{ width: '100%' }} vertical>
              <Form
                name="basic"                
                autoComplete="off"
                onFinish={handleChangePassword}
                form={form}
              >
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your new password!' }]}
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
                    placeholder="Please Confirm the new password"
                    prefix={<LockOutlined />}
                    />
                </Form.Item>
                <Space gap="large">
                  <Button type="primary" htmlType="submit" loading={loadingChangePassword}>
                    Submit
                  </Button>
                  <Button htmlType="button" onClick={onReset} style={{ marginLeft: '10px' }}>
                    Cancel
                  </Button>
                </Space>
              </Form>
            </Flex>
          </Card>
        </Flex>
      </div>
    </Flex>

    <Modal
        title="Edit profile"
        centered
        open={open}
        onOk={handleSave}
        onCancel={handleCancel}
        
      >
        <Form
                name="Edit form"
                initialValues={{ remember: true }}
                autoComplete="off"
                form={formEdit}
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
                    <Input placeholder="Email"  prefix={<ContactsOutlined />}/>
                </Form.Item>                
                
            </Form>
      </Modal>
    </>
  );
};

export default Profile;
