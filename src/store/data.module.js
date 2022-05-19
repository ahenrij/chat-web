import { DataService, DataError } from "../services/data.service";

const state = {
  loading: false,
  loadingErrorCode: "",
  loadingError: "",
  histories: {}, // of roomId: messages[]
  rooms: [], // of { id, title }
  me: {},
};

const getters = {
  get: (state) => (property) => {
    return state[property];
  },

  getHistory: (state) => (roomId) => {
    return state.histories[roomId];
  },

  loading: (state) => {
    return state.loading;
  },
};

const actions = {
  /**
   * fetchData from api
   *
   * @returns api response
   * @throws DataError
   **/
  async makeRequest({ commit }, payload) {
    commit("loadingRequest");
    try {
      const response = await DataService.makeRequest(payload.requestData);
      //console.log(response);
      commit("loadingSuccess");
      if (payload.commit) {
        commit("mutate", {
          property: payload.stateProperty,
          with: response.data.data,
        });
      }
      return response.data;
    } catch (e) {
      if (e instanceof DataError) {
        commit("loadingError", {
          errorCode: e.errorCode,
          errorMessage: e.message,
        });
      } else {
        commit("loadingError", {
          errorCode: 501,
          errorMessage: "Connexion au serveur impossible",
        });
      }
      return false;
    }
  },

  set({ commit }, { property, value }) {
    commit("mutate", {
      property: property,
      with: value,
    });
  },

  setProperty({ commit }, { obj, property, value }) {
    commit("setProperty", { obj, property, value });
  },

  addRoom({ commit }, room) {
    commit("append", {
      obj: "rooms",
      value: room,
    });
  },

  addHistory({ commit }, { roomId, history }) {
    commit("setProperty", {
      obj: "histories",
      property: roomId,
      value: history,
    });
  },
};

const mutations = {
  loadingRequest(state) {
    state.loading = true;
    state.loadingError = "";
    state.loadingError = 0;
  },

  loadingSuccess(state) {
    state.loading = false;
  },

  loadingError(state, { errorCode, errorMessage }) {
    state.loading = false;
    state.loadingErrorCode = errorCode;
    state.loadingError = errorMessage;
  },

  mutate(state, payload) {
    state[payload.property] = payload.with;
  },

  setProperty(state, payload) {
    state[payload.obj][payload.property] = payload.value;
  },

  append(state, payload) {
    state[payload.obj].push(payload.value);
  },
};

export const data = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default data;
