import { createApp } from "vue";
import App from "./App.vue";
import Notifications from "notiwind";
import ApiService from "./services/api.service";
import router from "./router";
import store from "./store";
import utils from "./utils";
import "./assets/css/main.css";
import "./assets/css/style.css";

// Set the base url of the API
ApiService.init(process.env.VUE_APP_ROOT_API);

createApp(App)
  .use(store)
  .use(router)
  .use(Notifications)
  .use(utils)
  .mount("#app");
