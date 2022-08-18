import { createStore } from "vuex";
import createSailsIOPlugin from "./plugins/sailsio.plugin";
import createPersistedState from "vuex-persistedstate";
import io from "@/utils/sails.io";
import loadingModule from "./modules/loading";
import dataModule from "./modules/data";
import roomSocketModule from "./modules/room.socket";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    data: dataModule,
    roomSocket: roomSocketModule,
    loading: loadingModule,
  },
  plugins: [createPersistedState(), createSailsIOPlugin(io)],
  strict: debug,
});
