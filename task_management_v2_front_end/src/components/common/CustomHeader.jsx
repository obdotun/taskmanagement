import { Layout, theme } from 'antd';
const { Header } = Layout;
import { Flex, Input, Space, Badge, Avatar, Tooltip, } from 'antd';


import { LogoutOutlined, LoginOutlined, SolutionOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
const { Search } = Input;
import { Link } from 'react-router-dom';

function CustomHeader() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  /*  const items = [
     {
       type: 'divider',
     },
     {
       label: <Link to="/user/profile">My Profile</Link>,
       key: '1',
     },
     {
       label: <Link to="">1st menu item</Link>,
       key: '2',
     },
     {
       type: 'divider',
     },
     {
       icon: isLoggedIn ? <LogoutOutlined /> : <LoginOutlined />,
        label: isLoggedIn ? <Link onClick={handleLogout}> Logout </Link> : <Link to="/authentication/login"> Login </Link>,
        key: isLoggedIn ? '3' : '4',
     },
   ];*/

  const logout = () => {
    localStorage.clear();
  };

  const buttons = !localStorage.getItem('token') ? (
    <div>
      <Link to={'/login'} > <LoginOutlined /> Connexion </Link>
      <Link to={'/register'}> Inscription </Link>

      
    </div>
  ) : (
    <div>
      <Link to={'/'} onClick={logout}> <LogoutOutlined /> Déconnexion </Link> |
      <Link to={'/profile'} >  Profile </Link>
    </div>
  );


  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <Flex justify='space-between' align='center' style={{ marginRight: '20px' }}>
        <Flex >

          <Search placeholder="input search text" allowClear />
        </Flex>
        <Flex justify='space-between' align='center'>



          <Space size="middle">

            {buttons}


          </Space>



          {/*<Dropdown
            menu={{ items }}
            placement="bottomRight"
          >
            <Link onClick={(e) => e.preventDefault()}>
              <Flex gap="small" align='center' justify='space-between'>
                <Tooltip placement='top' title="Daniel Oyeunde">
                  <Avatar src="https://img.freepik.com/photos-gratuite/homme-affaires-moustache-lunettes-rendu-3d_1142-41586.jpg?size=626&ext=jpg" />
                </Tooltip>
                <Flex vertical>
                  <Typography.Text type='secondary' strong>
                    Daniel Oyeunde
                  </Typography.Text>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography.Text type='secondary'>
                      Admin
                    </Typography.Text>
                    
                  </div>
                </Flex>
              </Flex>
            </Link>
    </Dropdown>*/}



        </Flex>

      </Flex>
    </Header>
  )
}

export default CustomHeader