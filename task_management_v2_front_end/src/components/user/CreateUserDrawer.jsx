import React, { useState } from 'react';
import { Button, Form, Input, notification, Drawer, Space } from 'antd';
import axios from 'axios';
import AppURL from '../../api/AppURL';

const CreateUserDrawer = ({ open, onCancel, onSave }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const response = await axios.post(AppURL.AddUser, values);
      notification.success({
        message: 'Success',
        description: response.data.message,
      });
      onSave(response.data.user); // Call onSave to update the parent component      
      form.resetFields();
      onCancel()

    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((key) => {
          form.setFields([
            {
              name: key,
              errors: errors[key],
            },
          ]);
        });
      } else {
        notification.error({
          message: 'Error',
          description: 'An error occurred while creating the user.',
        });
      }
    } finally {
      setLoading(false);

    }
  };

  const handleClose = () => {
    onCancel();
    form.resetFields();
    //endProcessing();
  };

  return (
    <Drawer
      title="Create a new account"
      width={720}
      onClose={handleClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} type="primary" loading={loading}>
            Submit
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 8, message: 'Password must be at least 8 characters long!' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
            placeholder=""
            label="Confirm password"
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
          />
        </Form.Item>

      </Form>
    </Drawer>
  );
};

export default CreateUserDrawer;
