<template>
  <nav class="text-center">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>
<script>
import { uuid } from "@/utils/func";
import { mapActions } from "vuex";

export default {
  created() {
    const me = {
      uuid: uuid(10), // identifiers of 10 chars
    };
    this.setData({ stateProperty: "me", value: me });
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
