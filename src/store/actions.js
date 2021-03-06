/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-10 18:02:28
 * @LastEditTime: 2019-08-30 13:26:34
 * @LastEditors: Please set LastEditors
 */
import * as types from './mutation-types'

export const selectPlay = function({commit, state}, {list, index}){
    commit(types.SET_PLAY_INDEX, index);
    commit(types.SET_PLAY_SONGLIST, list);
    commit(types.SET_PLAY_STATE, true);
    commit(types.SET_PLAY_FULL, true);
}