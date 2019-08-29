/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-10 18:02:28
 * @LastEditTime: 2019-08-29 17:38:52
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import { playMode } from '@/common/js/config.js'

Vue.use(Vuex);

var state = {
  singer: {},
  player: {
    playing: false,
    full: false,
    songList: [],
    index: -1,
    mode: playMode[0]
  }
};


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
