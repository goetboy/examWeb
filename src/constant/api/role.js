import {apiBase} from './apiBase';

export const ROLE_URL = apiBase() + '';

export default {
    //获取角色信息列表
    userManagerPermissionGetAllRoles: ROLE_URL + "?methodName=USER_MANAGER_PERMISSION_GET_ALL_ROLES",
    //添加角色信息
    userManagerPermissionManagerAddRole:ROLE_URL + "?methodName=USER_MANAGER_PERMISSION_MANAGER_ADD_ROLE",
    //更新角色信息
    userManagerPermissionManagerUpdateRole: ROLE_URL + "?methodName=USER_MANAGER_PERMISSION_MANAGER_UPDATE_ROLE",

}