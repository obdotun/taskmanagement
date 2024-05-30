import React, { useEffect, useState } from 'react';
import { Breadcrumb, Flex, Button, Card, Table, Space, Input, Form, App, Modal } from 'antd';
import axios from 'axios';
import { PlusOutlined, DeleteOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import AppURL from '../../api/AppURL';

function Permissions() {
    const [permissionList, setPermissionList] = useState([]);
    const [error, setError] = useState(null);
    const [editingPermissionId, setEditingPermissionId] = useState(null);
    const [open, setOpen] = useState(false);

    const [form] = Form.useForm();
    const { modal, notification } = App.useApp();

    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchPermissions = async () => {
        try {
            const response = await axios.get(AppURL.PermissionList);
            setPermissionList(response.data.permissions);
        } catch (e) {
            setError(e.message);
        }
    };

    const handleSavePermission = async (values) => {
        try {
            if (editingPermissionId) {
                await axios.put(AppURL.UpdatePermission(editingPermissionId), { name: values.name });
                openSuccessNotification("Permission modifiée avec succès");
            } else {
                await axios.post(AppURL.AddPermission, { name: values.name });
                openSuccessNotification("Permission ajoutée avec succès");
            }
            fetchPermissions();
            setEditingPermissionId(null);
            setOpen(false);
            form.resetFields();
        } catch (e) {
            setError(e.message);
            openErrorNotification(e.message);
        }
    };

    const showModalConfirm = (onConfirm) => {
        modal.confirm({
            title: 'Confirmer suppression',
            content: 'Voulez-vous vraiment supprimer cette permission?',
            onOk: onConfirm,
        });
    };

    const handleDeletePermission = async (permissionId) => {
        try {       
            showModalConfirm(() => {
                axios.delete(AppURL.RemovePermission(permissionId))
                    .then(() => {
                        const filteredPermissionList = permissionList.filter(permission => permission.id !== permissionId);
                    setPermissionList(filteredPermissionList);
                    openSuccessNotification("Permission supprimée avec succès");
                    })
                    .catch(e => {
                        setError(e.message);
                        openErrorNotification(error);
                    });
            });
        } catch (e) {
            setError(e.message);
            openErrorNotification(e.message);
        }
    };

    const handleEditPermission = (permission) => {
        setEditingPermissionId(permission.id);
        form.setFieldsValue({ name: permission.name });
    };

    const handleCancelEdit = () => {
        setEditingPermissionId(null);
        form.resetFields();
    };

    const openSuccessNotification = (message) => {
        notification.success({
            message: 'Succès',
            description: message,
            placement: 'topRight',
        });
    };

    const openErrorNotification = (message) => {
        notification.error({
            message: 'Erreur',
            description: message,
            placement: 'topRight',
        });
    };

    const handleCancel = () => {
        setOpen(false);
        form.resetFields();
    };

    const columns = [
        {
            title: 'Nom',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                editingPermissionId === record.id ? (
                    <Form.Item
                        name="name"
                        style={{ margin: 0 }}
                        rules={[{ required: true, message: 'Veuillez entrer le nom de la permission!' }]}
                    >
                        <Input placeholder="Nom" />
                    </Form.Item>
                ) : (
                    text
                )
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {editingPermissionId === record.id ? (
                        <>
                            <Button onClick={() => form.submit()} icon={<SaveOutlined />} />
                            <Button onClick={handleCancelEdit} icon={<CloseOutlined />} />
                        </>
                    ) : (
                        <>
                            <Button onClick={() => handleEditPermission(record)} icon={<EditOutlined />} />
                            <Button onClick={() => handleDeletePermission(record.id)} icon={<DeleteOutlined />} />
                        </>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Permission</Breadcrumb.Item>
                <Breadcrumb.Item>Gérer</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ padding: '10px 10px' }}>
                <Card>
                    <Flex justify="space-between" align="center" style={{ margin: '0px 0px 20px 0px' }}>
                        <span>Liste des permissions</span>
                        <Button type="primary" onClick={() => setOpen(true)}> <PlusOutlined /> Ajouter </Button>
                    </Flex>
                    <Form form={form} onFinish={handleSavePermission}>
                        <Table columns={columns} dataSource={permissionList} rowKey="id" />
                    </Form>
                </Card>
            </div>

            <Modal
                title={editingPermissionId ? "Modifier Permission" : "Ajouter Permission"}
                centered
                open={open}
                onOk={form.submit}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={handleSavePermission}
                    autoComplete="off"
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Veuillez entrer le nom de la permission!' }]}
                    >
                        <Input placeholder="Nom" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Permissions;
