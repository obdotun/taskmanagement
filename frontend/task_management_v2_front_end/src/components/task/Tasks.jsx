import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Card, Table, Space, theme, App } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import TaskDrawer from './TaskDrawer';
import AppURL from '../../api/AppURL';

function Tasks() {
    const [taskList, setTaskList] = useState([]);
    const [error, setError] = useState(null);
    const [openTaskDrawer, setOpenTaskDrawer] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const { modal, notification } = App.useApp();

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

    const showModalConfirm = (onConfirm) => {
        modal.confirm({
            title: 'Confirmer suppression',
            content: 'Voulez-vous vraiment supprimer cette task?',
            onOk: onConfirm,
        });
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(AppURL.TaskList);
            setTaskList(response.data.tasks);
        } catch (e) {
            setError(e.message);
        }
    };

    
    const handleDeleteTask = async (taskId) => {
        try {            
            showModalConfirm(() => {
                axios.delete(AppURL.RemoveTask(taskId))
                    .then(() => {
                        const filteredTaskList = taskList.filter(task => task.id !== taskId);
                        setTaskList(filteredTaskList);
                        openSuccessNotification("Task deleted successfully");
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

    const handleSaveTaskDrawer = async (task) => {
        try {
            
            if (editingTask) {
                await axios.put(AppURL.UpdateTask(editingTask.id), task);
            } else {
                const userData = JSON.parse(localStorage.getItem('user'));
                task = userData? {...task,user_id:userData.id}:task;  
                console.log(task)              
                await axios.post(AppURL.AddTask, task);
            }
            fetchTasks();
            setOpenTaskDrawer(false);
            setEditingTask(null);
            openSuccessNotification("Task saved successfully");
        } catch (e) {
            setError(e.message);
            openErrorNotification(error);
        }
    };

    const handleAddTask = () => {
        setOpenTaskDrawer(true);
        setEditingTask(null);
    };

    const handleEditTask = (task) => {
        setOpenTaskDrawer(true);
        setEditingTask(task);
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Author',
            dataIndex: 'author_name',
            key: 'author_name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Due Date',
            dataIndex: 'due_date',
            key: 'due_date',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEditTask(record)}><EditOutlined /> Edit</Button>
                    <Button onClick={() => handleDeleteTask(record.id)}><DeleteOutlined /> Delete</Button>
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
                <Breadcrumb.Item>Task Management</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ padding: '10 10' }}>
                <Card>
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={handleAddTask} icon={<PlusOutlined />}> Add Task </Button>
                    </div>
                    <Table columns={columns} dataSource={taskList} rowKey="id" />
                </Card>
            </div>

            <TaskDrawer
                open={openTaskDrawer}
                onCancel={() => setOpenTaskDrawer(false)}
                onSave={handleSaveTaskDrawer}
                initialValue={editingTask ? editingTask : null}
            />
        </div>
    );
}

export default Tasks;