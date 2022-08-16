import { createStore } from "vuex";
import createSailsIOPlugin from "./plugins/sailsio.plugin";
import createPersistedState from "vuex-persistedstate";
import io from "@/utils/sails.io";
import dataModule from "./modules/data.module";
import roomModule from "./modules/room.module";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    data: dataModule,
    room: roomModule,
  },
  plugins: [createPersistedState(), createSailsIOPlugin(io)],
  strict: debug,
});
