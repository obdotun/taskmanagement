import { useEffect, useState } from 'react';
import { Drawer, Form, Input, Button, Space, Select } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';

const { Option } = Select;

const ViewUserDrawer = ({ open, onCancel, onSave, initialValue }) => {
    const [form] = Form.useForm();

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            onSave(values);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    useEffect(() => {
        form.setFieldsValue({
            name: initialValue?.name,
            email: initialValue?.email,
            role: initialValue?.role,
            permissions: initialValue?.permissions,
        });
    }, [initialValue]);

    const handleClose = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Drawer
            title="Edit user"
            width={720}
            onClose={handleClose}
            visible={open}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
            extra={
                <Space>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} type="primary">
                        Submit
                    </Button>
                </Space>
            }
        >
            <Form
                name="registerForm"
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input type='email' prefix={<MailOutlined />} />
                </Form.Item>

                <Form.Item
                    name="role"
                    label="Role"
                    rules={[{ required: true, message: 'Please select a role!' }]}
                >
                    <Select placeholder="Select a role">
                        <Option value="admin">Admin</Option>
                        <Option value="user">User</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="permissions"
                    label="Permissions"
                    rules={[{ required: true, message: 'Please input permissions!' }]}
                >
                    <Input placeholder="Permissions" />
                </Form.Item>

            </Form>
        </Drawer>



    );
};

export default ViewUserDrawer;
