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
    // ensure socket is connected
    if (!this.$io.socket.isConnected()) {
      dispatch("handleError", {
        code: 500,
        message: "Connection to server lost!",
      });
      return false;
    }
    const res = await this.$io.socket.postAsync("/room/join", payload);
    // ensure no error occured
    if (!res.data) {
      dispatch("handleError", { code: 404, message: res });
      return false;
    }
    const room = res.data;
    commit("loading/success", null, { root: true });
    commit("mutate", { property: "isConnected", with: true });
    commit("data/append", { property: "rooms", value: room }, { root: true });
    return room;
  },

  leaveRoom: async function ({ commit, dispatch }, payload) {
    commit("loading/request", null, { root: true });
    // ensure socket is connected
    if (!this.$io.socket.isConnected()) {
      dispatch("handleError", {
        code: 500,
        message: "Connection to server lost!",
      });
      return false;
    }
    const res = await this.$io.socket.postAsync("/room/leave", payload);
    // ensure no error occured
    if (!res.data) {
      dispatch("handleError", { code: 404, message: res });
      return false;
    }
    const room = res.data;
    commit("loading/success", null, { root: true });
    commit("mutate", { property: "isConnected", with: false });
    commit(
      "data/removeById",
      { property: "rooms", id: room.id },
      { root: true }
    );
    return true;
  },

  handleError({ commit }, { code, message }) {
    commit(
      "loading/error",
      { errorCode: code, errorMessage: message },
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
