import { ActionProps } from '@/interface/store'
import { setSession, getSession } from '@/utils/storage'
import sessionMenu from '@/mock/menu'

const state = {
  collapse: false,
  menu: getSession('menu') || []
}
const getters = {
  menu: (state: { menu: object[] }) => state.menu,
  collapse: (state: { collapse: boolean }) => state.collapse
}

const actions = {
  // 获取menu数据
  getMenu({ commit }: ActionProps) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('SET_MENU', sessionMenu)
        resolve(true)
      }, 1000)
    })
  },
  clearMenu({ commit }: ActionProps) {
    commit('CLEAR_MENU')
  }
}

const mutations = {
  // 设置左侧菜单
  SET_MENU(state: { menu: object[] }, menu: string | any[]) {
    if (Array.isArray(menu) && menu.length) {
      state.menu = menu
    } else {
      state.menu = []
    }
    setSession('menu', state.menu)
  },
  // 删除左侧菜单
  CLEAR_MENU() {
    state.menu = []
    setSession('menu', [])
  },
  // 左侧菜单的显隐
  SET_COLLAPSE(state: { collapse: boolean }, status: boolean) {
    state.collapse = status
  }
}

export default {
  namespaced: false,
  state,
  actions,
  mutations,
  getters
}
