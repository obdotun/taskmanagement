import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Typography, Layout, Menu } from 'antd';
const { Sider } = Layout;

const appName = { name: 'EMP MANAGT', symbole: 'EM' };

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<Link to="/">Dashboard</Link>, '1', <PieChartOutlined />),
  getItem(<Link to="/user">User</Link>, '2', <UserOutlined />),
  getItem('Employé', 'sub2', <TeamOutlined />, [
    getItem(<Link to="/">Ajouter</Link>, '3'),
    getItem(<Link to="/">Liste</Link>, '4'),
  ]),
];

function CustomSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme="light"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="demo-logo-vertical" style={{ borderRadius: '10px', textAlign: 'center' }}>
        <Typography.Title level={3}>{!collapsed ? appName.name : appName.symbole}</Typography.Title>
      </div>
      <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} items={items} />
    </Sider>
  );
}

export default CustomSidebar;