import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/Recommend/Recommend'
import Singer from '@/components/Singer/Singer'
import Rank from '@/components/Rank/Rank'
import Search from '@/components/Search/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend',
      name: 'recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})
