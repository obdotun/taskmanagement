const BASE_URL = "http://127.0.0.1:8000/api";

const AppURL = {
    // Auth endpoints
    Login: `${BASE_URL}/login`,
    Register: `${BASE_URL}/register`,
    ForgetPassword: `${BASE_URL}/forgetpassword`,
    ResetPassword: `${BASE_URL}/resetpassword`,

    // User endpoints
    UserData: `${BASE_URL}/user`,
    UserList: `${BASE_URL}/users`,
    AddUser: `${BASE_URL}/users`,
    ChangePassword: (userId) => `${BASE_URL}/users/${userId}/updatepassword`,
    UpdateUser: (userId) => `${BASE_URL}/users/${userId}`,
    RemoveUser: (userId) => `${BASE_URL}/users/${userId}`,

    // Role endpoints
    RoleList: `${BASE_URL}/roles`,
    AddRole: `${BASE_URL}/roles`,
    UpdateRole: (roleId) => `${BASE_URL}/roles/${roleId}`,
    RemoveRole: (roleId) => `${BASE_URL}/roles/${roleId}`,

    // Permission endpoints
    PermissionList: `${BASE_URL}/permissions`,
    AddPermission: `${BASE_URL}/permissions`,
    UpdatePermission: (permissionId) => `${BASE_URL}/permissions/${permissionId}`,
    RemovePermission: (permissionId) => `${BASE_URL}/permissions/${permissionId}`,

    // Task endpoints
    TaskList: `${BASE_URL}/tasks`,
    AddTask: `${BASE_URL}/tasks`,
    UpdateTask: (taskId) => `${BASE_URL}/tasks/${taskId}`,
    RemoveTask: (taskId) => `${BASE_URL}/tasks/${taskId}`,
    UserTasks: (userId) => `${BASE_URL}/users/${userId}/tasks`,    
};

export default AppURL;
