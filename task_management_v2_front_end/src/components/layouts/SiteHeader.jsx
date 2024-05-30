import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  LogoutOutlined,
  LoginOutlined
} from '@ant-design/icons';
import { Button, Flex, Input, Typography, Dropdown, Avatar, Tooltip } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Search } = Input;

function SiteHeader({ onCollapse, user }) {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = (collapsed) => {
    setCollapsed(!collapsed);
    onCollapse(!collapsed);
  };

  const onSearch = () => { };

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate('/authentication/login');
    }
  }, [isLoggedIn, navigate, loading]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const items = [
    {
      type: 'divider',
    },
    {
      label: <Link to="/user/profile">My Profile</Link>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      icon: isLoggedIn ? <LogoutOutlined /> : <LoginOutlined />,
      label: isLoggedIn ? <Link onClick={handleLogout}> Logout </Link> : <Link to="/authentication/login"> Login </Link>,
      key: isLoggedIn ? '3' : '4',
    },
  ];

  return (
    <Flex justify='space-between' align='center' style={{ marginRight: '20px' }}>
      <Flex align='center' justify='space-between'>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => handleCollapse(collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        <Typography.Title level={3} type="secondary" style={{ margin: '0px' }}>
          Welcome back, {user ? user.name : 'Guest'}
        </Typography.Title>
      </Flex>

      <Flex style={{ width: '600px' }}>
        <Search placeholder="input search text" onSearch={onSearch} allowClear />
      </Flex>

      <Dropdown menu={{ items }} placement="bottomRight">
        <Link onClick={(e) => e.preventDefault()}>
          <Flex gap="small" align='center' justify='space-between'>
            <Tooltip placement='top' title={user ? user.name : 'Guest'}>
              <Avatar src={user ? user.avatar : "https://img.freepik.com/photos-gratuite/homme-affaires-moustache-lunettes-rendu-3d_1142-41586.jpg?size=626&ext=jpg"} />
            </Tooltip>
            <Flex vertical>
              <Typography.Text type='secondary' strong>
                {user ? user.name : 'Guest'}
              </Typography.Text>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography.Text type='secondary'>
                  {user ? user.roles[0] : 'Guest'}
                </Typography.Text>
                <Typography.Text type='secondary'>
                  <DownOutlined />
                </Typography.Text>
              </div>
            </Flex>
          </Flex>
        </Link>
      </Dropdown>
    </Flex>
  );
}

export default SiteHeader;
