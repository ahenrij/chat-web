module.exports = {
  /**
   * Generate a uuid of a given size.
   *
   * @param {int} size of the unique identifier.
   * @returns
   */
  uuid: function (size) {
    const possible = "abcdef0123456789";
    let text = "";
    for (let i = 0; i < size; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },

  /**
   * Copy string to the clipboard
   * @param {string} str to copy
   * @returns Promise
   */
  copyToClipboard: function (str) {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(str);
    }
    return Promise.reject("The Clipboard API is not available.");
  },
};
