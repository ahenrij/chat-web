<template>
  <nav class="text-center">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <div>
    <notifications-view />
    <router-view />
  </div>
</template>

<script>
import NotificationsView from "./components/utils/NotificationsView.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  created() {
    const me = this.get("me");
    if (!("id" in me)) {
      // create user with a 10 characters identifier.
      this.setProp({ obj: "me", prop: "id", val: this.$helpers.uuid(10) });
    }
  },

  computed: {
    ...mapGetters("data", ["get"]),
  },

  methods: {
    ...mapActions("data", ["setProp"]),
  },

  components: {
    NotificationsView,
  },
};
</script>

<style lang="postcss">
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
