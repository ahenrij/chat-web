<template>
  <div class="room-view md:mx-16 lg:mx-96">
    <div class="w-full">
      <room-header :me="me" :room="currentRoom"></room-header>
      <message-history :me="me" :room="currentRoom"></message-history>
      <room-footer :me="me" :room="currentRoom"></room-footer>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RoomHeader from "@/components/room/RoomHeader";
import MessageHistory from "@/components/message/MessageHistory";
import RoomFooter from "@/components/room/RoomFooter.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      title: "Chat Room",
      currentRoom: { id: null, name: "" },
      rooms: [],
    };
  },

  mounted() {
    this.rooms = this.get("rooms");
    this.currentRoom = this.rooms[0];

    const payload = {
      roomId: this.currentRoom.id,
      user: this.me,
    };
    this.$store.dispatch("roomSocket/init", payload, { root: true });
  },

  unmounted() {
    this.$store.dispatch("roomSocket/removeListeners", null, { root: true });
  },

  computed: {
    ...mapGetters("data", ["loading", "get"]),

    me() {
      return this.$store.state.data.me;
    },
  },

  components: {
    RoomHeader,
    MessageHistory,
    RoomFooter,
  },
};
</script>

<style lang="postcss" scoped>
.room-view {
  @apply bg-white shadow-lg h-max;
}
</style>
