// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'common/less/index.less'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
//图片懒加载
Vue.use(VueLazyload, {
  loading: require('./assets/default.png')
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
