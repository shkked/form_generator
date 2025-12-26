import type { RootState } from '@/types/store.types.ts'
import { createStore } from 'vuex'
export default createStore<RootState>({
  state: {
    version: '1.0.0',
  },
  mutations: {
    setVersion(state: unknown, version: string) {
      state.version = version
    },
  },
  actions: {
    updateVersion({ commit }, version: string) {
      commit('setVersion', version)
    },
  },
  getters: {
    appVersion: (state) => state.version,
  },
})
