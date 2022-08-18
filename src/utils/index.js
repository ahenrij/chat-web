import helpers from "@/utils/func";
import form from "@/utils/form";

export default {
  // eslint-disable-next-line no-unused-vars
  install: (app, _options) => {
    app.config.globalProperties.$toast = (
      type,
      title,
      message,
      duration = 2000
    ) => {
      app.config.globalProperties.$notify(
        { group: type, title: title, text: message },
        duration
      );
    };
    app.config.globalProperties.$helpers = helpers;
    app.config.globalProperties.$form = form;
  },
};
