import { createStore } from "vuex";
import createSailsIOPlugin from "./plugins/sailsio.plugin";
import createPersistedState from "vuex-persistedstate";
import io from "@/utils/sails.io";
import loadingModule from "./modules/loading";
import dataModule from "./modules/data";
import roomModule from "./modules/room";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    data: dataModule,
    room: roomModule,
    loading: loadingModule,
  },
  plugins: [createPersistedState(), createSailsIOPlugin(io)],
  strict: debug,
});
