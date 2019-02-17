import {apiBase} from './apiBase';

export const ROLE_URL = apiBase() + '/role';

export default {
    //获取角色信息列表
    LIST: ROLE_URL + "/list",
    //添加角色信息
    SAVE: ROLE_URL + "/save",
    //更新角色信息
    UPDATE: ROLE_URL + "/update",
    //更新角色状态
    UPDATE_STATE: ROLE_URL + "/update/state",
    //删除角色
    DELETE: ROLE_URL + "/delete",

}