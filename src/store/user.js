import Cookie from 'js-cookie'
export default {
    state: {
        token: "",
        username: "",
        userType: "",
        proid: "",
        officeid: "",
        userid: "",
        insName: "",
        // 用于展示的普通用户的用户名
        normalUsername: "",
        normalUid: "",
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
        setUserid(state, val) {
            state.userid = val
            Cookie.set('userid', val)
        },
        clearUserid(state) {
            state.userid = ''
            Cookie.remove('userid')
        },
        getUserid(state) {
            state.userid = state.userid || Cookie.get("userid")
        },
        setInsName(state, val) {
            state.insName = val
            Cookie.set('insName', val)
        },
        clearInsName(state) {
            state.insName = ''
            Cookie.remove('insName')
        },
        getInsName(state) {
            state.insName = state.insName || Cookie.get("insName")
        },
        setNormalUsername(state, val) {
            state.normalUsername = val
            Cookie.set('normalUsername', val)
        },
        clearNormalUsername(state) {
            state.normalUsername = ''
            Cookie.remove('normalUsername')
        },
        getNormalUsername(state) {
            state.normalUsername = state.normalUsername || Cookie.get("normalUsername")
        },
        setNormalUid(state, val) {
            state.normalUid = val
            Cookie.set('normalUid', val)
        },
        clearNormalUid(state) {
            state.normalUid = ''
            Cookie.remove('normalUid')
        },
        getNormalUid(state) {
            state.normalUid = state.normalUid || Cookie.get("normalUid")
        },
    }
}