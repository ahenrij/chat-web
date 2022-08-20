import helpers from "@/helpers/func";
import form from "@/helpers/form";

export default {
  // eslint-disable-next-line no-unused-vars
  install: (app, _options) => {
    // toast function
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
    // toastError shortcut function
    app.config.globalProperties.$toastError = (
      title,
      message,
      duration = 2000
    ) => {
      app.config.globalProperties.$notify(
        {
          group: "error",
          title: title,
          text: message ? message : "Oops ! Something wrong happened",
        },
        duration
      );
    };
    // add helpers functions
    app.config.globalProperties.$helpers = helpers;
    app.config.globalProperties.$form = form;
  },
};
