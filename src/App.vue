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
    if (!("uuid" in me)) {
      me = { uuid: uuid(10) }; // 10 characters identifier.
    }
    this.set({ property: "me", value: me });
  },

  computed: {
    ...mapGetters("data", ["get"]),
  },

  methods: {
    ...mapActions("data", ["set"]),
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
