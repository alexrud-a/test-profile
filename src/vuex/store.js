import Vue from 'vue'
import Vuex from 'vuex'

import actions from "./actions/actions"
import mutations from "./mutations/mutations"
import getters from "./getters/getters"

Vue.use(Vuex)

let isAuth = '';

if (localStorage.getItem("isAuth") !== null) {
    isAuth = JSON.parse(localStorage.getItem("isAuth"));
}

if (isAuth.length < 0) {
    isAuth = '';
    localStorage.setItem("isAuth", JSON.stringify(isAuth));
}

let store = new Vuex.Store({
    state: {
        users: [],
        isAuth: isAuth,
    },
    mutations,
    actions,
    getters,
});

export default store;