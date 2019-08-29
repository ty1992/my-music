/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-10 18:02:28
 * @LastEditTime: 2019-08-29 11:27:15
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/Recommend/Recommend'
import Singer from '@/components/Singer/Singer'
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
      component: Singer,
      children: [
        {
          path: ':singerId',
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
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/base/test')
    }
  ]
})
