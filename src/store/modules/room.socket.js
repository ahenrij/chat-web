const state = {
  typing: {}, // roomId: (user) { id, name }
};

const getters = {
  typing: (state) => (roomId) => {
    return state.typing[roomId];
  },
};

const actions = {
  /**
   * Join a room request
   * @param {*} payload request body
   * @returns room if successful, false otherwise.
   */
  joinRoom: async function ({ commit, dispatch }, payload) {
    commit("loading/request", null, { root: true });
    // ensure socket is connected
    if (!(await dispatch("isSocketConnected"))) {
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
    commit("data/append", { property: "rooms", value: room }, { root: true });
    return room;
  },

  /**
   * Leave room request
   * @param {*} payload request body
   * @returns {boolean} whether succeded or not
   */
  leaveRoom: async function ({ commit, dispatch }, payload) {
    commit("loading/request", null, { root: true });
    // ensure socket is connected
    if (!(await dispatch("isSocketConnected"))) {
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
    commit(
      "data/removeById",
      { property: "rooms", id: room.id },
      { root: true }
    );
    return true;
  },

  /**
   * Send typing event to room
   * @param {*} payload request body
   * @returns
   */
  typing: async function ({ dispatch }, payload) {
    // ensure socket is connected
    if (!(await dispatch("isSocketConnected"))) {
      return false;
    }
    await this.$io.socket.putAsync("/room/typing", payload);
  },

  /**
   * Send stopped typing event to room
   * @param {*} roomId the room id
   * @returns
   */
  stoppedTyping: async function ({ dispatch }, roomId) {
    // ensure socket is connected
    if (!(await dispatch("isSocketConnected"))) {
      return false;
    }
    await this.$io.socket.putAsync(`/room/${roomId}/stoppedTyping`);
  },

  /**
   * Send message to room
   * @param {*} payload send request body
   * @returns {Object} sent message
   */
  sendMessage: async function ({ commit, dispatch }, payload) {
    // ensure socket is connected
    if (!(await dispatch("isSocketConnected"))) {
      return false;
    }
    const res = await this.$io.socket.postAsync("/message/send", payload);
    // ensure no error occured
    if (!res.data || !res.history) {
      dispatch("handleError", { code: 500, message: res });
      return false;
    }
    const roomId = payload.room;
    const history = res.history;
    commit("loading/success", null, { root: true });
    commit(
      "data/setProp",
      { obj: "histories", prop: roomId, val: history },
      { root: true }
    );
    return res.data;
  },

  handleError({ commit }, { code, message }) {
    commit(
      "loading/error",
      { errorCode: code, errorMessage: message },
      { root: true }
    );
  },

  isSocketConnected({ dispatch }) {
    if (!this.$io.socket.isConnected()) {
      dispatch("handleError", {
        code: 500,
        message: "Connection to server lost!",
      });
      return false;
    }
    return true;
  },

  /**
   * Socket io message listeners
   * @param {*} param0
   * @param {Object} payload join request body
   */
  init: async function ({ commit }, payload) {
    // Ensure that socket subscribed to room
    await this.$io.socket.postAsync("/room/join", payload);

    this.$io.socket.on("typing", (data) => {
      commit("setTyping", data);
    });

    this.$io.socket.on("stoppedTyping", (roomId) => {
      commit("removeTyping", roomId);
    });

    this.$io.socket.on("message", (payload) => {
      const roomId = payload.data.room;
      const history = payload.history;
      commit(
        "data/setProp",
        { obj: "histories", prop: roomId, val: history },
        { root: true }
      );
    });
  },

  removeListeners() {
    this.$io.socket.removeAllListeners();
  },
};

const mutations = {
  mutate(state, payload) {
    state[payload.property] = payload.with;
  },

  setTyping(state, payload) {
    state.typing[payload.roomId] = payload.user;
  },

  removeTyping(state, roomId) {
    delete state.typing[roomId];
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
