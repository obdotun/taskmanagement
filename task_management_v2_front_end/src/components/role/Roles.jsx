import React, { useEffect, useState } from 'react';
import { Breadcrumb, Flex, Button, Card, Table, Space, theme, App, Modal, Form, Input } from 'antd';
import axios from 'axios';
import { PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import AppURL from '../../api/AppURL';

function Roles() {
    const [roleList, setRoleList] = useState([]);
    const [error, setError] = useState(null);
    const [editingRole, setEditingRole] = useState(null);
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [form] = Form.useForm();
    const { modal, notification } = App.useApp();

    const showModalConfirm = (onConfirm) => {
        modal.confirm({
            title: 'Confirmer suppression',
            content: 'Voulez-vous vraiment supprimer cette ligne?',
            onOk: onConfirm,
        });
    };

    const openSuccessNotification = (message) => {
        notification.success({
            message: `Success`,
            description: message,
            placement: 'topRight',
        });
    };

    const openErrorNotification = (message) => {
        notification.error({
            message: `Error`,
            description: message,
            placement: 'topRight',
        });
    };
    
    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get(AppURL.RoleList);
            setRoleList(response.data.roles);
        } catch (e) {
            setError(e.message);
        }
    };

    const dataSource = Array.isArray(roleList) ? roleList.map(role => ({
        ...role,
        key: role.id
    })) : [];

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
        setEditingRole(null);
        setIsEdit(false);
    };

    const handleSaveRole = async (values) => {
        try {
            if (isEdit) {
                await axios.put(AppURL.UpdateRole(editingRole.id), values);
                openSuccessNotification("Rôle modifié avec succès");
            } else {
                await axios.post(AppURL.AddRole, values);
                openSuccessNotification("Rôle ajouté avec succès");
            }
            fetchRoles();
            handleCancel();
        } catch (e) {
            setError(e.message);
            openErrorNotification(error);
        }
    };

    const handleDeleteRole = async (roleId) => {
        try {
            showModalConfirm(() => {
                axios.delete(AppURL.RemoveRole(roleId))
                    .then(() => {
                        const filteredRoleList = roleList.filter(role => role.id !== roleId);
                        setRoleList(filteredRoleList);
                        openSuccessNotification("Rôle supprimé avec succès");
                    })
                    .catch(e => {
                        setError(e.message);
                        openErrorNotification(error);
                    });
            });
        } catch (e) {
            setError(e.message);
            openErrorNotification(error);
        }
    };

    const handleEditingRoleDrawer = (role) => {
        setIsEdit(true);
        setOpen(true);
        setEditingRole(role);
        form.setFieldsValue(role);
    };

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEditingRoleDrawer(record)}><EditOutlined /> Edit</Button>
                    <Button onClick={() => handleDeleteRole(record.id)}> <DeleteOutlined /> Delete</Button>
                </Space>
            ),
        },
    ];

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // Function to handle search
    const handleSearch = (value) => {
        setSearchQuery(value); // Update search query state
    };

    // Filtered data source based on search query
    const filteredDataSource = dataSource.filter(role => role.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0', }} >
                <Breadcrumb.Item>Role</Breadcrumb.Item>
                <Breadcrumb.Item>Gérer</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ padding: '10 10' }}>
                <Card>
                    <Flex justify="space-between" align="center" style={{ margin: '0px 0px 20px 0px', background: colorBgContainer }}>
                        <span>Liste des rôles</span>
                        <Input.Search
                            placeholder="Rechercher un rôle"
                            onSearch={handleSearch}
                            style={{ width: 200 }}
                        />
                        <Button type="primary" onClick={() => setOpen(true)}> <PlusOutlined /> Ajouter </Button>
                    </Flex>
                    <Table columns={columns} dataSource={filteredDataSource} />
                </Card>
            </div>

            <Modal
                title={isEdit ? "Edit Role" : "Add Role"}
                centered
                open={open}
                onOk={form.submit}
                onCancel={handleCancel}
            >
                <Form
                    name="Role form"
                    initialValues={{ remember: true }}
                    onFinish={handleSaveRole}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input role name!' }]}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Roles;
