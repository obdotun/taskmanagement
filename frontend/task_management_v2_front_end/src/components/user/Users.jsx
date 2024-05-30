import React, { useEffect, useState } from 'react';
import { Breadcrumb, Flex, Button, Card, Table, Space, theme, App } from 'antd';
import axios from 'axios';
import { PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import EditUserDrawer from './EditUserDrawer';
import CreateUserDrawer from './CreateUserDrawer';
import ViewUserDrawer from './ViewUserDrawer';
import AppURL from '../../api/AppURL';

function Users() {
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [viewUser, setViewUser] = useState(null);
    const [openEditUserDrawer, setOpenEditUserDrawer] = useState(false);
    const [openCreateUserDrawer, setOpenCreateUserDrawer] = useState(false);
    const [openViewUserDrawer, setOpenViewUserDrawer] = useState(false);

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
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(AppURL.UserList);
            setUserList(response.data.data);
        } catch (e) {
            setError(e.message);
        }
    };

    const dataSource = Array.isArray(userList) ? userList.map(user => ({
        ...user,
        key: user.id
    })) : [];

    const handleDeleteUser = async (userId) => {
        try {
            showModalConfirm(() => {
                axios.delete(AppURL.RemoveUser(userId))
                    .then(() => {
                        const filteredUserList = userList.filter(user => user.id !== userId);
                        setUserList(filteredUserList);
                        openSuccessNotification("Utilisateur supprimé avec succès");
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

    const handleSaveEditUserDrawer = async (editedUser) => {
        try {
            await axios.put(AppURL.UpdateUser(editingUser.id), { name: editedUser.name, email: editedUser.email });
            const updatedUserList = userList.map(user => {
                if (user.id === editingUser.id) {
                    return { ...user, name: editedUser.name, email: editedUser.email };
                }
                return user;
            });
            setUserList(updatedUserList);
            setEditingUser(null);
            setOpenEditUserDrawer(false);
            openSuccessNotification("Utilisateur modifié avec succès");
        } catch (e) {
            setError(e.message);
            openErrorNotification(error);
        }
    };

    const handleEditingUserDrawer = (user) => {
        setOpenEditUserDrawer(true);
        setEditingUser(user);
    };

    const handleViewUserDrawer = (user) => {
        setOpenViewUserDrawer(true);
        setViewUser(user);
    };

    const handleCancelEditUserDrawer = () => {
        setOpenEditUserDrawer(false);
        setEditingUser(null);
    };

    const handleSaveCreateUserDrawer = async () => {
        await fetchUsers();
    };

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleViewUserDrawer(record)}><EyeOutlined /> View</Button>
                    <Button onClick={() => handleEditingUserDrawer(record)}><EditOutlined /> Edit</Button>
                    <Button onClick={() => handleDeleteUser(record.id)}><DeleteOutlined /> Delete</Button>
                </Space>
            ),
        },
    ];

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Add</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ padding: '10 10' }}>
                <Card>
                    <Flex justify="space-between" align="center" style={{ margin: '0px 0px 20px 0px', background: colorBgContainer }}>
                        <span>Liste des utilisateurs</span>
                        <Button type="primary" onClick={() => setOpenCreateUserDrawer(true)} icon={<PlusOutlined />}> Ajouter </Button>
                    </Flex>

                    <Table columns={columns} dataSource={dataSource} />
                </Card>
            </div>

            <EditUserDrawer
                open={openEditUserDrawer}
                onCancel={handleCancelEditUserDrawer}
                onSave={handleSaveEditUserDrawer}
                initialValue={editingUser ? editingUser : null}
            />

            <CreateUserDrawer
                open={openCreateUserDrawer}
                onCancel={() => setOpenCreateUserDrawer(false)}
                onSave={handleSaveCreateUserDrawer}
            />

            <ViewUserDrawer
                open={openViewUserDrawer}
                onCancel={() => setOpenViewUserDrawer(false)}
                user={viewUser ? viewUser : null}
            />
        </div>
    );
}

export default Users;
