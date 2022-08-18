const state = {
  isConnected: false,
};

const getters = {
  isConnected: (state) => () => {
    return state.isConnected;
  },
};

const actions = {
  joinRoom: async function ({ commit, dispatch }, payload) {
    commit("loading/request", null, { root: true });
    const res = await this.$io.socket.postAsync("/room/join", payload);
    if (!res.data) {
      commit(
        "loading/error",
        { errorCode: 404, errorMessage: res },
        { root: true }
      );
      return false;
    }
    commit("loading/success", null, { root: true });
    commit("mutate", { property: "isConnected", with: true });
    dispatch("data/addRoom", res.data, { root: true });
    return res.data;
  },
};

const mutations = {
  mutate(state, payload) {
    state[payload.property] = payload.with;
  },
};

export const room = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default room;
