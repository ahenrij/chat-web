<template>
  <div class="room-view">
    <div class="heading">
      <h1>{{ title + " - " + me.name }}</h1>
    </div>
    <div class="body">
      <div class="table">
        <message-history></message-history>
        <message-input></message-input>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MessageHistory from "@/components/room/MessageHistory";
import MessageInput from "@/components/room/MessageInput";
import { mapGetters } from "vuex";

export default {
  name: "room-view",

  data() {
    return {
      title: "Chat Web",
      me: { uuid: 0, name: "..." },
    };
  },

  mounted() {
    this.me = this.get("me");
    // make join request?
  },

  computed: {
    ...mapGetters("data", ["loading", "get"]),
  },

  components: {
    MessageHistory,
    MessageInput,
  },
};
</script>
