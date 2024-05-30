import React, { useEffect } from 'react';
import { Drawer, Form, Input, Button, DatePicker, Select, Space } from 'antd';
import moment from 'moment';

const { Option } = Select;

const TaskDrawer = ({ open, onCancel, onSave, initialValue }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            title: initialValue?.title,
            description: initialValue?.description,
            due_date: initialValue?.due_date ? moment(initialValue.due_date) : null
        });
    }, [initialValue]);

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            onSave({ ...values, due_date: values.due_date.format('YYYY-MM-DD')});
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const handleClose = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Drawer
            title="Manage Task"
            width={720}
            onClose={handleClose}
            open={open}
            extra={
                <Space>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} type="primary">
                        Save
                    </Button>
                </Space>
            }
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please input the task title!' }]}
                >
                    <Input placeholder="Title" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please input the task description!' }]}
                >
                    <Input.TextArea rows={4} placeholder="Description" />
                </Form.Item>

                <Form.Item
                    name="due_date"
                    label="Due Date"
                    rules={[{ required: true, message: 'Please select a due date!' }]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>

            </Form>
        </Drawer>
    );
};

export default TaskDrawer;
