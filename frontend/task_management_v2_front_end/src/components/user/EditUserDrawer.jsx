import { useEffect, useState } from 'react';
import { Drawer, Form, Input, Button, Space, Select } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';

const { Option } = Select;

const EditUserDrawer = ({ open, onCancel, onSave, initialValue }) => {
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
        form.setFieldValue('name', initialValue?.name)
        form.setFieldValue('email', initialValue?.email)
    }, [initialValue])

    const handleClose = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Drawer
            title="Edit user"
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
                    <Button onClick={handleSave} type="primary">
                        Submit
                    </Button>
                </Space>
            }
        >
            <Form
                name="registerForm"
                initialValues={{ remember: true }}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input placeholder="Name" prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input placeholder="Email" type='email' prefix={<MailOutlined />} />
                </Form.Item>

                <Form.Item
                    name="roles"
                    //rules={[{ required: true, message: 'Please select at least one role!' }]}
                >
                    <Select mode="multiple" placeholder="Select roles">
                        <Option value="admin">Admin</Option>
                        <Option value="user">User</Option>
                        <Option value="employee">Employee</Option>
                        
                    </Select>
                </Form.Item>

            </Form>
        </Drawer>
    );
};

export default EditUserDrawer;
