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

  remove: function (array, iteratee) {
    // in order to not mutate the original array until the very end
    // we want to cache the indexes to remove while preparing the result to return
    const toRemove = [];
    const result = array.filter(
      (item, i) => iteratee(item) && toRemove.push(i)
    );

    // just before returning, we can then remove the items, making sure we start
    // from the higher indexes: otherwise they would shift at each removal
    toRemove.reverse().forEach((i) => array.splice(i, 1));
    return result;
  },
};
