import {apiBase}  from './apiBase';
export const USER_URL=apiBase()+'/user';

export default {
    //获取角色信息列表
   LIST:USER_URL+"/list",
   UPDATE_STATE:USER_URL+"/update/state",
}