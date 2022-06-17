const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("../views/login/login.vue"), //这里是路由懒加载，使访问更加高效
  },
  {
    path: '/home',
    name: 'home',
    component: () => import("../views/home/home.vue"), //这里是路由懒加载，使访问更加高效
    meta: {
      needLogin: true // 需要加校检判断的路由
    }
  },
  // {
  //   path: '/addOrder',
  //   name: 'addOrder',
  //   component: () => import("../views/order/addOrder.vue"), //这里是路由懒加载，使访问更加高效
  //   meta: {
  //     needLogin: true // 需要加校检判断的路由
  //   }
  // },
  // {
  //   path: '/showOrders',
  //   name: 'showOrders',
  //   component: () => import("../views/order/showOrders.vue"), //这里是路由懒加载，使访问更加高效
  //   meta: {
  //     needLogin: true // 需要加校检判断的路由
  //   }
  // },

]
export default routes
