import { DataService, DataError } from "@/services/data.service";
import { remove } from "@/helpers/func";

const state = {
  histories: {}, // of roomId: messages[]
  rooms: [], // of { id, title }
  me: {},
};

const getters = {
  get: (state) => (property) => {
    return state[property];
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
    commit("loading/request", null, { root: true });
    try {
      const response = await DataService.makeRequest(payload.requestData);
      commit("loading/success", null, { root: true });
      if (payload.commit) {
        commit("mutate", {
          property: payload.stateProperty,
          with: response.data,
        });
      }
      return response.data;
    } catch (e) {
      if (e instanceof DataError) {
        commit(
          "loading/error",
          {
            errorCode: e.errorCode,
            errorMessage: e.message,
          },
          { root: true }
        );
      } else {
        commit(
          "loading/error",
          {
            errorCode: 501,
            errorMessage: "Connexion au serveur impossible",
          },
          { root: true }
        );
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

  setProp({ commit }, { obj, prop, val }) {
    commit("setProp", { obj, prop, val });
  },
};

const mutations = {
  mutate(state, payload) {
    state[payload.property] = payload.with;
  },

  setProp(state, payload) {
    state[payload.obj][payload.prop] = payload.val;
  },

  append(state, payload) {
    state[payload.property].push(payload.value);
  },

  removeById(state, payload) {
    remove(state[payload.property], (r) => r.id === payload.id);
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
