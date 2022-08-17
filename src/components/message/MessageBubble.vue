<template>
  <div class="grid grid-cols-1">
    <div class="message-bubble" :class="classMe">
      <span class="from" :class="classMe">{{ sender.name }}</span>
      <span class="message-text" :class="classMe">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["me", "sender", "text"],

  computed: {
    classMe() {
      // Render the message bubble on the right side if it is from this client
      return this.me.id === this.sender.id ? "me" : "";
    },
  },
};
</script>

<style lang="postcss" scoped>
.from {
  @apply block text-sm mb-1;
}
.message-text {
  @apply block bg-blue-300 text-white w-fit pr-6 pl-3 py-1 rounded-lg rounded-tl-none;
}
.message-bubble {
  @apply my-3;
}

.from.me {
  @apply text-right;
}
.message-text.me {
  @apply bg-blue-500 rounded-lg rounded-tr-none right-0;
}
.message-bubble.me {
  @apply place-self-end;
}
</style>
