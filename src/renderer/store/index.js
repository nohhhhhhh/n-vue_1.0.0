import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex)

const state = {
  menuList: []
}
// sync
const mutations = {
  updateMenuList(state,list){
    console.log("updateMenuListsss")
    state.menuList = list
  }
}
// Async
const actions = {
  updateMenuList ({ commit }, list) {
    console.log("updateMenuListupdateMenuListupdateMenuList")
    commit('updateMenuList', list)
  }
}
export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
