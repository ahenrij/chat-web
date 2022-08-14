module.exports = {
  /**
   * Trigger a notification toast.
   *
   * The notification view is defined in components/utils/NotificationsView.vue file.
   * This method is based on specs of the package `notiwind`.
   *
   * @param {string} type can be : generic, error, or else to be defined in comp file.
   * @param {string} title null if none wanted.
   * @param {string} message.
   * @param {integer} duration in milliseconds.
   */
  toast: function (type, title = null, message, duration = 2000) {
    this.$notify({ group: type, title: title, text: message }, duration);
  },
};
