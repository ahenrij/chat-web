export default {
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
};
