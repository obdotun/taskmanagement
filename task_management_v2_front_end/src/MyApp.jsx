import  { Component, Fragment } from 'react'
import AppRoute from './routes/AppRoute';
import { App } from 'antd';

export class MyApp extends Component {
  render() {
    return (
      <App>
          <AppRoute />         
      </App>
    )
  }
}

export default MyApp