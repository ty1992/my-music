/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-10 18:02:28
 * @LastEditTime: 2019-08-29 15:45:20
 * @LastEditors: Please set LastEditors
 */
import * as types from './mutation-types'


const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAY_STATE](state, flag){
    state.player.playing = flag;
  },
  [types.SET_PLAY_FULL](state, flag){
    state.player.full = flag;
  },
  [types.SET_PLAY_MODE](state, mode){
    state.player.mode = mode;
  },
  [types.SET_PLAY_INDEX](state, index){
    state.player.index = index;
  },
  [types.SET_PLAY_SONGLIST](state, list){
    state.player.songList = list;
  }
}

export default mutations
