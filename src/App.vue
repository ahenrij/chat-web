<template>
  <nav class="text-center">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>
<script>
import { uuid } from "@/utils/func";
import { mapGetters, mapActions } from "vuex";

export default {
  created() {
    var me = this.get("me");
    console.log(me);
    console.log("uuid" in me);
    if (!("uuid" in me)) {
      me = { uuid: uuid(10) }; // 10 characters identifier.
    }
    this.setData({ stateProperty: "me", value: me });
  },

  computed: {
    ...mapGetters("data", ["get"]),
  },

  methods: {
    ...mapActions("data", ["setData"]),
  },
};
</script>
<style>
nav {
  padding: 30px;
  align-content: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  @apply text-blue-500;
}
</style>
