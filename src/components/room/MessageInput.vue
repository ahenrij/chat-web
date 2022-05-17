<template>
  <div class="message-input">
    <textarea
      class="w-full"
      ref="messageInput"
      placeholder="message..."
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
