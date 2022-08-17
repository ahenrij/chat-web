<template>
  <div class="message-input flex items-center">
    <textarea
      class="form-input text-input"
      ref="messageInput"
      rows="1"
      placeholder="Type a message"
      maxlength="20000"
      v-model="message"
      @keydown.enter.exact.prevent
      @keyup.enter.exact="sendMessage"
      @keydown.enter.shift.exact="newLine"
    ></textarea>
    <div class="ml-4">
      <span class="cursor-pointer" @click="sendMessage">
        <svg
          width="24px"
          class="fill-gray-500"
          height="24px"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Send</title>
          <path d="M16,464,496,256,16,48V208l320,48L16,304Z" />
        </svg>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "",
    };
  },

  methods: {
    newLine(event) {
      event.preventDefault();
      this.message = `${this.message}\n`;
    },

    sendMessage() {
      // If the message body is empty, do not submit
      if (this.message.length === 0) {
        return;
      }

      // TODO: Make send message request

      this.message = "";
    },
  },
};
</script>

<style lang="postcss" scoped>
.text-input {
  @apply py-2 bg-white !border-white resize-none text-sm placeholder:text-slate-400;
}

.form-input {
  @apply !min-w-max w-full;
}

.message-input {
  @apply pl-8 pr-5 py-2 bg-gray-200;
}
</style>
