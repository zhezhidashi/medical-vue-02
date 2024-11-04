import Cookie from 'js-cookie'
export default {
    state: {
        token: "",
        username: "",
        userType: "",
        projectDoi: "",
    },
    mutations: {
        setToken(state, val) {
            state.token = val
            Cookie.set('token', val)
        },
        clearToken(state) {
            state.token = ''
            Cookie.remove('token')
        },
        getToken(state) {
            state.token = state.token || Cookie.get("token")
        },
        setUsername(state, val) {
            state.username = val
            Cookie.set('username', val)
        },
        clearUsername(state) {
            state.username = ''
            Cookie.remove('username')
        },
        getUsername(state) {
            state.username = state.username || Cookie.get("username")
        },
        setUserType(state, val) {
            state.userType = val
            Cookie.set('userType', val)
        },
        clearUserType(state) {
            state.userType = ''
            Cookie.remove('userType')
        },
        getUserType(state) {
            state.userType = state.userType || Cookie.get("userType")
        },
        setProjectDoi(state, val) {
            state.projectDoi = val
            Cookie.set('projectDoi', val)
        },
        clearProjectDoi(state) {
            state.projectDoi = ''
            Cookie.remove('projectDoi')
        },
        getProjectDoi(state) {
            state.projectDoi = state.projectDoi || Cookie.get("projectDoi")
        },
    }
}