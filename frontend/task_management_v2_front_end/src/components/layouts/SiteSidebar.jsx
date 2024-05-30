import React from 'react';
import {
  UserOutlined,
  ControlOutlined,
  DashboardOutlined,
  SolutionOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { Typography, Menu } from 'antd';
import { Link } from 'react-router-dom';

const appName = { name: 'TASK MGNT', symbole: 'TM' };

const SiteSidebar = ({ collapsed, user }) => {
  // Define menu items with their associated roles
  const menuItems = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
      roles: ['admin', 'user', 'employee'], // Adjust roles as needed
    },
    {
      key: '2',
      icon: <ToolOutlined />,
      label: <Link to="/task">Tasks</Link>,
      roles: ['admin', 'employee'], // Adjust roles as needed
    },
    {
      key: '3',
      icon: <UserOutlined />,
      label: <Link to="/user">Users</Link>,
      roles: ['admin'], // Adjust roles as needed
    },
    {
      key: '4',
      icon: <SolutionOutlined />,
      label: <Link to="/role">Roles</Link>,
      roles: ['admin'], // Adjust roles as needed
    },
    {
      key: '5',
      icon: <ControlOutlined />,
      label: <Link to="/permission">Permissions</Link>,
      roles: ['admin'], // Adjust roles as needed
    },
  ];

  // Filter menu items based on user's roles
  const filteredMenuItems = user ? menuItems.filter((item) =>
    item.roles.some((role) => user.roles.includes(role))
  ) : [];

  return (
    <div style={{ height: '100vh' }}>
      <div className="demo-logo-vertical" style={{ borderRadius: '10px', textAlign: 'center' }}>
        <Typography.Title level={3}>
          {!collapsed ? appName.name : appName.symbole}
        </Typography.Title>
      </div>
      <Menu mode="inline" defaultSelectedKeys={['1']} items={filteredMenuItems} />
    </div>
  );
};

export default SiteSidebar;
