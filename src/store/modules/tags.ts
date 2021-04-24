import { ActionProps, Tag } from '@/interface/store'
import router from '@/router/index'
import { setSession, getSession } from '@/utils/storage'

interface TagInfo {
  index: number
  tag?: Tag
}

const state = {
  activeTag: getSession('activeTag') || {},
  tagsList: getSession('tagsList') || [],
  keepArray: getSession('keepArray') || []
}
const getters = {
  activeTag: (state: { activeTag: Tag }) => state.activeTag,
  tagsList: (state: { tagsList: Tag[] }) => state.tagsList,
  keepArray: (state: { keepArray: string[] }) => state.keepArray
}
const actions = {
  addTag({ commit, state }: ActionProps, tag: Tag) {
    // 是否需要添加到tag列表中
    // 判断title跟path是否相同，不同则添加
    if (
      tag.meta.tabFlag &&
      !state.tagsList.some((route: Tag) => {
        return tag.meta.title === route.meta.title && tag.path === route.path
      })
    ) {
      commit('ADD_TAG', tag)

      // 有keepAliveFlag的标识则缓存,否则为空
      if (tag.meta.keepAliveFlag) {
        commit('ADD_KEEP', tag.name)
      } else {
        commit('ADD_KEEP', '')
      }
    }
    commit('SET_ACTIVE_TAG', tag)
  },
  // tag-删除单个tag（tags跟缓存都需要删除）
  delTag({ commit, state }: ActionProps, tagMsg: { index: number; tag?: object }) {
    const { index = 0 } = tagMsg
    commit('DEL_TAG', index)
    commit('DEL_KEEP', index)
    // 删除的tag是激活的tag，则进行activeTag的重现选择
    if (
      !state.tagsList.some((item: Tag) => {
        return item.meta.title === state.activeTag.meta.title && item.path === state.activeTag.path
      })
    ) {
      let curActiveTag = {
        title: '',
        path: '',
        query: ''
      }
      let curPath = {}
      // 如果tagList还有选项，那么需要在里面选择
      // 否则跳转到首页
      if (state.tagsList.length) {
        // 如果删除的是第一项，那么激活剩余的第一项未激活activeTag
        // 否则选择删除的前一项作为激活tag
        if (index === 0) {
          curActiveTag = state.tagsList[0]
        } else {
          curActiveTag = state.tagsList[index - 1]
        }
        curPath = {
          path: curActiveTag.path,
          query: curActiveTag.query
        }
      } else {
        curPath = '/'
      }
      commit('SET_ACTIVE_TAG', curActiveTag)

      router.push(curPath)
    }
  },
  // 清空其他
  clearOtherTags({ commit, state }: ActionProps) {
    let tagInfo: TagInfo = {
      index: -1
    }

    state.tagsList.forEach((item: Tag, index: number) => {
      if (item.name === state.activeTag.name) {
        tagInfo = {
          index,
          tag: item
        }
      }
    })

    commit('CLEAR_OTHER_TAGS', tagInfo)
    commit('DEL_OTHER_KEEP', tagInfo)
  },
  // 清空所有tags
  clearAllTags({ commit }: ActionProps) {
    commit('CLEAR_ALL_TAGS')
    commit('DEL_ALL_KEEP')
    commit('DEL_ACTIVE_TAG')
    router.push('/')
  }
}
const mutations = {
  // tag-设置被激活的tag
  SET_ACTIVE_TAG(state: any, item: object) {
    state.activeTag = item
    setSession('activeTag', state.activeTag)
  },
  // tag-设置被激活的tag
  DEL_ACTIVE_TAG(state: any) {
    state.activeTag = {}
    setSession('activeTag', state.activeTag)
  },
  // tag-添加tag（tags跟缓存都需要添加）
  ADD_TAG(state: any, item: object) {
    state.tagsList.push(item)
    setSession('tagsList', state.tagsList)
  },
  // tag-删除单个tag（tags跟缓存都需要删除）
  DEL_TAG(state: any, index: number) {
    state.tagsList.splice(index, 1)
    setSession('tagsList', state.tagsList)
  },
  // tag-删除其他tag
  CLEAR_OTHER_TAGS(state: any, tagInfo: TagInfo) {
    if (tagInfo.index === -1) {
      state.tagsList = []
    } else {
      state.tagsList = [state.tagsList[tagInfo.index]]
    }
    setSession('tagsList', state.tagsList)
  },
  // tag-删除所有tag
  CLEAR_ALL_TAGS(state: any) {
    state.tagsList = []
    setSession('tagsList', state.tagsList)
  },
  // 缓存-添加单个缓存
  ADD_KEEP(state: any, keep: string) {
    if (state.keepArray.includes(keep) && keep !== '') {
      return
    }
    state.keepArray.push(keep)
    setSession('keepArray', state.keepArray)
  },
  // 缓存-删除单个缓存
  DEL_KEEP(state: any, index: number) {
    state.keepArray = state.keepArray.filter((item: any, i: number) => {
      return index !== i
    })
    setSession('keepArray', state.keepArray)
  },
  // 缓存-删除其他缓存
  DEL_OTHER_KEEP(state: any, tagInfo: TagInfo) {
    if (tagInfo.index === -1) {
      state.keepArray = []
    } else {
      state.keepArray = [state.keepArray[tagInfo.index]]
    }
    setSession('keepArray', state.keepArray)
  },
  // 缓存-删除所有缓存
  DEL_ALL_KEEP(state: any) {
    state.keepArray = []
    setSession('keepArray', state.keepArray)
  }
}

export default {
  namespaced: false,
  state,
  actions,
  mutations,
  getters
}
