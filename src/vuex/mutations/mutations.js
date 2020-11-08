export default {
    SET_USERS: (state, users) => {
        state.users = users;
    },
    AUTH: (state, val) => {
        state.isAuth = val
    }
}