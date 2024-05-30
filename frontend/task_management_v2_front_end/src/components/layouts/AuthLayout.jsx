import React from 'react'
import {  Flex, Card, Layout } from 'antd';
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Layout>
      <Flex gap="middle" align="center" justify='center' vertical style={{ height:'100vh', width:'100%'}}>                
        <Outlet/>
      </Flex>  
    </Layout>
  )
    
}

export default AuthLayout