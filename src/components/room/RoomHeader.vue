<template>
  <div class="heading grid grid-cols-2 bg-blue-500 p-4">
    <h1 class="text-md text-white font-bold">Room #{{ room.name }}</h1>
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
      console.log(res);
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
