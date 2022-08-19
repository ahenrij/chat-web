<template>
  <div class="room-footer flex items-center">
    <message-input v-model:value="message" @enter="send"></message-input>
    <div class="ml-4">
      <send-action @click="send" />
    </div>
  </div>
</template>

<script>
import MessageInput from "@/components/message/MessageInput.vue";
import SendAction from "@/components/utils/SendAction.vue";

export default {
  data() {
    return {
      message: "",
    };
  },
  methods: {
    send() {
      // If the message body is empty, do not submit
      if (this.message.length === 0) {
        return;
      }
      // TODO: Make send message request
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
