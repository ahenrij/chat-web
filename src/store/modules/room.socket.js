const state = {
  isConnected: false,
};

const getters = {
  isConnected: (state) => {
    return state.isConnected;
  },
};

const actions = {
  joinRoom: async function ({ commit, dispatch }, payload) {
    commit("loading/request", null, { root: true });
    const res = await this.$io.socket.postAsync("/room/join", payload);
    if (!res.data) {
      dispatch("handleError", res);
      return false;
    }
    commit("loading/success", null, { root: true });
    commit("mutate", { property: "isConnected", with: true });
    commit(
      "data/append",
      { property: "rooms", value: res.data },
      { root: true }
    );
    return res.data;
  },

  leaveRoom: async function ({ commit, dispatch }, payload) {
    commit("loading/request", null, { root: true });
    const res = await this.$io.socket.postAsync("/room/leave", payload);
    if (!res.data) {
      dispatch("handleError", res);
      return false;
    }
    commit("loading/success", null, { root: true });
    commit("mutate", { property: "isConnected", with: false });
    commit(
      "data/removeById",
      { property: "rooms", id: res.data.id },
      { root: true }
    );
  },

  handleError({ commit }, res) {
    commit(
      "loading/error",
      { errorCode: 404, errorMessage: res },
      { root: true }
    );
  },
};

const mutations = {
  mutate(state, payload) {
    state[payload.property] = payload.with;
  },
};

export const roomSocket = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default roomSocket;
