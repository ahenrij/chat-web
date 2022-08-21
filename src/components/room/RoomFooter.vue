<template>
  <div class="room-footer flex items-center">
    <message-input
      :room="room"
      v-model:value="message"
      @enter="send"
    ></message-input>
    <div class="ml-4">
      <send-action @click="send" />
    </div>
  </div>
</template>

<script>
import MessageInput from "@/components/message/MessageInput.vue";
import SendAction from "@/components/utils/SendAction.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    me: Object,
    room: Object,
  },

  data() {
    return {
      message: "",
    };
  },

  computed: {
    ...mapGetters("data", ["get"]),
  },

  methods: {
    ...mapActions("roomSocket", ["sendMessage"]),

    send: async function () {
      // If the message body is empty, do not submit
      if (this.message.length === 0) {
        return;
      }
      // Make send message request
      const payload = {
        client: this.$client,
        room: this.room.id,
        sender: this.me,
        message: this.message,
      };
      const sentMessage = await this.sendMessage(payload);
      if (!sentMessage) {
        this.$toastError(this.title, this.get("loadingError"));
        return;
      }
      // Clear input
      this.message = "";
    },
  },
  components: {
    MessageInput,
    SendAction,
  },
};
</script>

<style lang="postcss" scoped>
.room-footer {
  @apply pl-8 pr-5 py-2 bg-gray-200;
}
</style>
