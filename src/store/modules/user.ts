import store from '../index'
// import { ActionProps } from '@/interface/store';
// import { setSession, getSession } from '@/utils/storage';
// import sessionMenu from '@/mock/menu';

const state = {}
const getters = {}

const actions = {
  outlogin() {
    store.dispatch('clearMenu')
    store.dispatch('clearAllTags')
  }
}

const mutations = {}

export default {
  namespaced: false,
  state,
  actions,
  mutations,
  getters
}
