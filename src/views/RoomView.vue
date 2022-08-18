<template>
  <div class="room-view md:mx-16 lg:mx-96 my-8">
    <div class="heading grid grid-cols-2 bg-blue-500 p-4">
      <h1 class="text-md text-white font-bold">Room #{{ room.name }}</h1>
      <h3 class="text-sm text-slate-200 text-right">@{{ me.name }}</h3>
    </div>
    <div class="w-full">
      <message-history :me="me"></message-history>
      <message-input></message-input>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MessageHistory from "@/components/message/MessageHistory";
import MessageInput from "@/components/message/MessageInput";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
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
    // make join request
  },

  computed: {
    ...mapGetters("data", ["loading", "get"]),
    ...mapGetters("roomSocket", ["isConnected"]),
  },

  components: {
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
