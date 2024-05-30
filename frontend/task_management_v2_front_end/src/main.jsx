import React from 'react'

import ReactDOM from 'react-dom/client'
import MyApp from './MyApp.jsx'

import './App.css';
import axios from 'axios'  

//axios.defaults.headers.common['Authorization']='Bearer '+localStorage.getItem('token');
//window.axios = axios;
//window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//window.axios.defaults.baseURL = 'http://localhost:8000/api/';
/*const token = localStorage.getItem('token');
if (token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}*/

const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>,
)
