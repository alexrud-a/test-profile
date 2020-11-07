import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/home/Home";
import Login from "../components/profile/Login";
import Profile from "../components/profile/Profile";
import EditProfile from "../components/profile/EditProfile";

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/login/',
            name: 'Login',
            component: Login
        },
        {
            path: '/profile/:id',
            name: 'Profile',
            component: Profile,
            props: true,
        },
        {
            path: '/edit-profile/:id',
            name: 'EditProfile',
            component: EditProfile,
            props: true,
        }
    ]
});

export default router;