export default {
    SET_USERS: (state, users) => {
        state.users = users;
    },
    AUTH: (state, val) => {
        state.isAuth = val
        let temp = state.isAuth;
        localStorage.setItem("isAuth", JSON.stringify(state.isAuth));
        return temp
    }
}