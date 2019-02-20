import {apiBase} from './apiBase';

export const EXAM_URL = apiBase() + '/menu';

export default {
    //获取考试信息列表
    LIST: EXAM_URL + "/list",
    //添加考试信息
    SAVE: EXAM_URL + "/save",
    //更新考试信息
    UPDATE: EXAM_URL + "/update",
    //删除考试
    DELETE: EXAM_URL + "/delete",
    //更新考试状态
    UPDATE_STATE: EXAM_URL + "/update/state",
}