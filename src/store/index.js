import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import mutations from './mutations'
import * as actions from './actions'
Vue.use(Vuex);

var state = {
  singer: {}
};


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
