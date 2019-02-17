import {apiBase} from './apiBase';
import {ROLE_URL} from "./role";

export const MENU_URL = apiBase() + '/menu';

export default {
    //获取菜单信息列表
    LIST: MENU_URL + "/list",
    //添加菜单信息
    SAVE: MENU_URL + "/save",
    //更新菜单信息
    UPDATE: MENU_URL + "/update",
    //删除菜单
    DELETE: MENU_URL + "/delete",
    //更新菜单状态
    UPDATE_STATE: MENU_URL + "/update/state",
}