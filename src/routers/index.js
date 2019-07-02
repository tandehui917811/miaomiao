import Vue from 'vue'
import Router from 'vue-router'
import Movie from './Movie'
import Cinema from './Cinema'
import Mine from './Mine'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    Movie,
    Cinema,
    Mine
  ]
})
