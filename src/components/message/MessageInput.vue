<template>
  <div class="message-input">
    <textarea
      class="form-input text-input w-full"
      ref="messageInput"
      rows="1"
      placeholder="Type a message"
      maxlength="20000"
      @keydown.enter="sendMessage"
    ></textarea>
  </div>
</template>
<script>
export default {
  methods: {
    submitMessage(event) {
      if (!event.shiftKey) {
        event.preventDefault();
      } else {
        return;
      }
      // If the message body is empty, do not submit
      if (event.target.value.length === 0) {
        return;
      }

      // TODO: Make send message request

      event.target.value = "";
    },
  },
};
</script>

<style lang="postcss" scoped>
.text-input {
  @apply py-2 bg-white !border-white resize-none text-sm placeholder:text-slate-400;
}

.message-input {
  @apply px-8 py-2 bg-gray-200;
}
</style>
