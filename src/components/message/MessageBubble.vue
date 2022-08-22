<template>
  <div class="grid grid-cols-1">
    <div class="message-bubble" :class="{ me: isMe }">
      <span class="from" :class="{ me: isMe }">{{ sender.name }}</span>
      <span class="message-text" :class="{ me: isMe }">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["me", "sender", "text"],

  computed: {
    isMe() {
      // Render the message bubble on the right side if it is from this client
      return this.me.id == this.sender.id;
    },
  },
};
</script>

<style lang="postcss" scoped>
.from {
  @apply block text-sm mb-1;
}
.message-text {
  @apply block bg-white w-fit shadow-sm pr-6 pl-3 py-1 rounded-lg rounded-tl-none;
}
.message-bubble {
  @apply my-2 ml-0 mr-16 sm:mr-32;
}

.from.me {
  @apply text-right;
}
.message-text.me {
  @apply bg-blue-500 text-white rounded-lg rounded-tr-none right-0;
}
.message-bubble.me {
  @apply place-self-end mr-0 ml-16 sm:ml-32;
}
</style>
