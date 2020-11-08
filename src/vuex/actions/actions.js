import axios from "axios";

export default {
    GET_USERS({commit}) {
        return axios('http://localhost:3000/users', {
            method: "GET"
        })
            .then((users) => {
                commit('SET_USERS', users.data);
                return users;
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },
    AUTH({commit}, val) {
        commit('AUTH', val)
    }
}