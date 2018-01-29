import Vue from 'vue'
import Router from 'vue-router'
import LogIn from '@/components/LogIn'
import Admin from '@/components/Admin'
import AddFacility from '@/components/AddFacility'
import EditFacility from '@/components/EditFacility'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/addFacility',
      name: "AddFacility",
      component: AddFacility
    },
    {
      path: '/editFacility/:id',
      name: "EditFacility",
      component: EditFacility
    }
  ]
})
