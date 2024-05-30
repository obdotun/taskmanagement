import { useState, useEffect, Fragment } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';
import NoPage from '../pages/NoPage';
import UserPage from '../pages/UserPage';
import RolePage from '../pages/RolePage';
import PermissionPage from '../pages/PermissionPage';
import TaskPage from '../pages/TaskPage';

import SiteLayout from '../components/layouts/SiteLayout';
import AuthLayout from '../components/layouts/AuthLayout';


const AppRoute = () => {
      
     return (
          <BrowserRouter>
               <Routes>
                    <Route path="/" element={<SiteLayout />}>
                         <Route index element={<HomePage />} />
                         <Route path="user" element={<UserPage />} />
                         <Route path="role" element={<RolePage />} />
                         <Route path="permission" element={<PermissionPage />} />
                         <Route path="task" element={<TaskPage />} />
                         <Route path="user/profile" element={<ProfilePage />} />
                         <Route path="*" element={<NoPage />} />
                    </Route>
                    <Route path="/authentication" element={<AuthLayout />}>
                         <Route path="login" element={<LoginPage />} />
                         {/*<Route path="forgotpwd" element={<ForgotPassword />} />*/}
                         <Route path="resetpwd/:id" element={<ResetPasswordPage />} />
                         <Route path="register" element={<RegisterPage />} />
                    </Route>


               </Routes>

          </BrowserRouter>
     );
};

export default AppRoute;
