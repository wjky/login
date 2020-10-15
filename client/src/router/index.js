import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

import home from '@/components/Home.vue'
import login from '@/components/Login.vue'
import register from '@/components/Register.vue'

const router = new VueRouter({
    mode:'history',
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/login',component:login},
        {path:'/register',component:register},
    ]
});

export default router;