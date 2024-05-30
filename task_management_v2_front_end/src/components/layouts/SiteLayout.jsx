import React, { useState, useEffect } from 'react';
import SiteSidebar from './SiteSidebar';
import SiteHeader from './SiteHeader';
import { Layout, theme } from 'antd';
import '../../App.css';
import { Outlet, useNavigate } from "react-router-dom";
const { Footer, Header, Sider, Content } = Layout;
import axios from 'axios';
import AppURL from '../../api/AppURL';

const SiteLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    } else {
      fetchUserDataFromAPI();
    }
  }, []);

  const fetchUserDataFromAPI = async () => {
    try {
      const token = localStorage.getItem('token');
        if (!token) {
          navigate('/authentication/login');
          return;
        }
        const response = await axios.get(AppURL.UserData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data.data;        
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };

  const handleCollapsed = (HeaderCollapsed) => {
    setCollapsed(HeaderCollapsed);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} theme='light'>
        <SiteSidebar collapsed={collapsed} user={user}/>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <SiteHeader onCollapse={handleCollapsed} user={user} />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Copyright ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SiteLayout;
