import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import Worker from '@/components/worker'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }, {
      path: '/worker',
      name: 'Worker',
      component: Worker
    }
  ]
})
