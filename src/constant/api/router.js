import {apiBase} from './apiBase';

export const ROLE_URL = apiBase() + '';

export default {
    //获取所有权限
    userManagerPermissionGetAllRouters: ROLE_URL + "?methodName=USER_MANAGER_PERMISSION_GET_ALL_ROUTERS",
    //查询用户所有权限
    userManagerPermissionGetRoutersByRoleId:ROLE_URL+"?methodName=USER_MANAGER_PERMISSION_GET_ROUTERS_BY_ROLE_ID",
}