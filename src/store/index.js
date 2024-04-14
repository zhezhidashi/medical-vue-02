import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";
import user from './user.js'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.sessionStorage,
  });

export default new Vuex.Store({
    modules: {
        user
    },
    plugins: [vuexLocal.plugin]
})