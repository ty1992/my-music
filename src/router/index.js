import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/Recommend/Recommend'
import Singer from '@/views/Singer/Singer'
import Rank from '@/components/Rank/Rank'
import Search from '@/components/Search/Search'
import singerDetail from '@/components/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: singerDetail
        }
      ]
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
