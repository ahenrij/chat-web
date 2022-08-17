import router from "@/router";

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
  joinRoom: function ({ commit, dispatch }, payload) {
    commit("loading/request", null, { root: true });
    this.$io.socket.post("/room/join", payload, function (res, jwres) {
      if (jwres.error) {
        console.log(jwres);
      } else {
        commit("loading/success", null, { root: true });
        dispatch("data/addRoom", res.data, { root: true });
        router.push({ name: "room" });
      }
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
