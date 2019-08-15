import Vue from 'vue'
import Router from 'vue-router'
import MovieRouter from '../routers/movie';
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/movie'
    },
    MovieRouter
  ]
})
