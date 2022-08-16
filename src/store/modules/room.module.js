const state = {
  connected: false,
};

const getters = {
  isConnected: (state) => () => {
    return state.connected;
  },
};

const actions = {
  join: function ({ commit }) {
    commit("loadingRequest");
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
