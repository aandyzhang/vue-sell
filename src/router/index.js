import Vue from 'vue'
import Router from 'vue-router'
import vueResource from 'vue-resource'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'
Vue.use(Router)
Vue.use(vueResource)
export default new Router({
	linkActiveClass:'active',
  mode:"history",
 routes: [
   {
      path: '/',
      redirect: '/goods',
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    },
  ],
})
