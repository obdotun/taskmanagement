import {  Flex,  Layout } from 'antd';
import ResetPassword from '../components/common/ResetPassword';

const ResetPasswordPage = () => {
  return (
    <Layout>
      <Flex gap="middle" align="center" justify='center' vertical style={{ height:'100vh', width:'100%'}}>                
        <ResetPassword/>
      </Flex>  
    </Layout>
  )
    
}

export default ResetPasswordPage