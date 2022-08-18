<template>
  <div class="room-view md:mx-16 lg:mx-96 my-8">
    <div class="w-full">
      <room-header :me="me" :room="room"></room-header>
      <message-history :me="me"></message-history>
      <message-input></message-input>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RoomHeader from "@/components/room/RoomHeader";
import MessageHistory from "@/components/message/MessageHistory";
import MessageInput from "@/components/message/MessageInput";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showDropdown: false,
      title: "Chat Room",
      me: { id: 0, name: "..." },
      room: { id: "", name: "" },
    };
  },

  mounted() {
    if (!this.isConnected) {
      this.$router.push({ name: "join" });
    }
    this.me = this.get("me");
    this.room = this.get("rooms")[0];
  },

  computed: {
    ...mapGetters("data", ["loading", "get"]),
    ...mapGetters("roomSocket", ["isConnected"]),
  },

  components: {
    RoomHeader,
    MessageHistory,
    MessageInput,
  },
};
</script>

<style lang="postcss" scoped>
.room-view {
  @apply bg-white shadow-lg h-max;
}
</style>
