import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
// import About from './views/About.vue'
import UserInformation from '@/views/userCenter/UserInformation.vue'
import ResetPassword from '@/views/userCenter/ResetPassword.vue'
import ResetPasswordForm from '@/components/userCenter/ResetPasswordForm.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'

import Main from '@/views/Main.vue'
import UserList from '@/views/system/manage/user/list.vue'
import MenuList from '@/views/system/manage/menu/list.vue'
import RoleList from '@/views/system/manage/role/list.vue'
import {getCookie} from './utils/cookie'
Vue.use(Router)
const router= new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: Main,
        meta: {requiresAuth: true},
        redirect: '/userInformation',
        children: [{
            path: 'userInformation',
            component: UserInformation,
        },
            {
                path: 'resetPassword',
                component: ResetPassword,
                children: [{
                    name: 'resetPasswordForMobile',
                    path: 'mobile',
                    component: ResetPasswordForm,
                    props: true
                },
                    {
                        name: 'resetPasswordForEmail',
                        path: 'email',
                        component: ResetPasswordForm,
                        props: true
                    }
                ]
            },
            {
                path: "/user/list",
                component: UserList,
                children: []
            },
            {
                path: "/menu/list",
                component: MenuList,

                children: []
            },

            {
                path: "/role/list",
                component: RoleList,
                children: []
            },
        ]
    },

        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        }
    ]
})


const SESSION_ID = "token";
router.beforeEach((to,from,next)=>{
 if(to.matched.some(record=>record.meta.requiresAuth)){
        if(getCookie(SESSION_ID))
            next()
        else
            next({
                path:"/login",
                query:{
                    redirect:to.fullPath
                }
            })
    }else {
        next();
    }
next();
})
export default router;