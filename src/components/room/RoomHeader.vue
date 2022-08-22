<template>
  <div class="heading grid grid-cols-2 bg-blue-500 px-4 py-2">
    <div class="flex items-center">
      <div>
        <h1 class="text-md text-white font-bold">{{ room.name }}</h1>
        <h2 v-if="typingUser" class="text-xs text-slate-200">
          {{ typingUser.name }} is typing...
        </h2>
      </div>
    </div>
    <div class="flex items-center place-content-end">
      <!-- Dropdown block -->
      <menu-action @optionClicked="onMenuOptionsClicked"></menu-action>
    </div>
  </div>
</template>
<script>
import MenuAction from "@/components/utils/MenuAction.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["me", "room"],

  computed: {
    ...mapGetters("loading", ["loadingError"]),
    typingUser: function () {
      return this.$store.state.roomSocket.typing[this.room.id];
    },
  },

  methods: {
    ...mapActions("roomSocket", ["leaveRoom"]),

    onMenuOptionsClicked(itemId) {
      switch (itemId) {
        case "leave":
          this.leave();
          break;
        default:
          break;
      }
    },

    leave: async function () {
      const payload = {
        roomId: this.room.id,
        user: this.me,
      };
      const res = await this.leaveRoom(payload);
      if (!res) {
        this.$toast(
          "error",
          this.title,
          this.loadingError
            ? this.loadingError
            : "Oops ! Something wrong happened"
        );
        return;
      }
      // room successfully leaved
      this.$router.push({ name: "join" });
    },
  },

  components: {
    MenuAction,
  },
};
</script>

<style scoped>
.heading {
  height: 60px !important;
}
</style>
