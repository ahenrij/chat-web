import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import dataModule from "./data.module";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    dataModule,
  },
  plugins: [createPersistedState()],
  strict: debug,
});
