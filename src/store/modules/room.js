const state = {
  isConnected: false,
};

const getters = {
  isConnected: (state) => () => {
    return state.isConnected;
  },

  getChatHistory: (_state, _getters, rootState) => (roomId) => {
    return rootState.histories[roomId];
  },
};

const actions = {
  join: async function ({ commit }, payload) {
    commit("loading/request", null, { root: true });
    this.$io.socket.post("/room/join", payload, async function (res, jwres) {
      console.log(jwres);
      if (res.error) {
        console.log(res.error);
        commit("loading/success", null, { root: true });
      }
      console.log(res);
    });
  },

  setChatHistory({ commit }, { roomId, chatHistory }) {
    commit(
      "data/setProperty",
      {
        obj: "histories",
        property: roomId,
        value: chatHistory,
      },
      { root: true }
    );
  },
};

const mutations = {};

export const room = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default room;
