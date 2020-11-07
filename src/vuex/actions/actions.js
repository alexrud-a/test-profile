import axios from "axios";

export default {
    GET_USERS({commit}) {
        return axios('https://next.json-generator.com/api/json/get/4ybQxUytF', {
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
}