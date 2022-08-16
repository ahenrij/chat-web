const state = {
  loading: false,
  loadingErrorCode: "",
  loadingError: "",
};

const getters = {
  loading: (state) => {
    return state.loading;
  },
  loadingError: (state) => {
    return state.loadingError;
  },
};

const actions = {};

const mutations = {
  request(state) {
    state.loading = true;
    state.loadingError = "";
    state.loadingError = 0;
  },

  success(state) {
    state.loading = false;
  },

  error(state, { errorCode, errorMessage }) {
    state.loading = false;
    state.loadingErrorCode = errorCode;
    state.loadingError = errorMessage;
  },
};

export const loading = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default loading;
