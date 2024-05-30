import React from 'react';
import { Drawer, Descriptions, List, Tag, Button } from 'antd';

const ViewUserDrawer = ({ open, onCancel, user }) => {
    return (
        <Drawer
            title="User Details"
            placement="right"
            closable={true}
            onClose={onCancel}
            visible={open}
            width={400}
        >
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Name">
                    {user && user.name}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                    {user && user.email}
                </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: '20px' }}>
                <h3>Roles</h3>
                <List
                    dataSource={user ? user.roles : []}
                    renderItem={role => (
                        <List.Item>
                            <Tag color="blue">{role}</Tag>
                        </List.Item>
                    )}
                />
            </div>

            <div style={{ marginTop: '20px' }}>
                <h3>Permissions</h3>
                <List
                    dataSource={user ? user['roles.permission'] : []}
                    renderItem={permission => (
                        <List.Item>
                            <Tag color="green">{permission}</Tag>
                        </List.Item>
                    )}
                />
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <Button onClick={onCancel}>Close</Button>
            </div>
        </Drawer>
    );
};

export default ViewUserDrawer;
