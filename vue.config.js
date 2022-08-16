const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      // proxy ws calls to sails.io
      "^/socket.io": {
        target: "http://localhost:1337/",
        ws: true,
        // changeOrigin: true
      },
    },
  },
});
