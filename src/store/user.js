import Cookie from 'js-cookie'
export default {
    state: {
        token: "",
        username: "",
        userType: "",
        proid: "",
        officeid: "",
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
        setProid(state, val) {
            state.proid = val
            Cookie.set('proid', val)
        },
        clearProid(state) {
            state.proid = ''
            Cookie.remove('proid')
        },
        getProid(state) {
            state.proid = state.proid || Cookie.get("proid")
        },
        setOfficeid(state, val) {
            state.officeid = val
            Cookie.set('officeid', val)
        },
        clearOfficeid(state) {
            state.officeid = ''
            Cookie.remove('officeid')
        },
        getOfficeid(state) {
            state.officeid = state.officeid || Cookie.get("officeid")
        },
    }
}