module.exports = {
  resetErrors: function (formData) {
    // eslint-disable-next-line no-unused-vars
    for (const [index, value] of Object.entries(formData)) {
      value.error = "";
    }
  },

  setFormData: function (formData, data) {
    for (const [index, value] of Object.entries(formData)) {
      value.value = data ? data[index] : "";
    }
  },

  getFormData: function (formData) {
    let data = new Object();
    for (const [index, value] of Object.entries(formData)) {
      data[index] = value.value;
    }
    return data;
  },
};
