<template>
  <div
    class="chat-history !bg-stone-100 p-4 px-20 !w-full"
    :class="{ empty: historyIsEmpty }"
  >
    <div v-if="!historyIsEmpty" class="w-full">
      <message-bubble
        v-for="msg in history"
        :key="msg.id"
        :me="me"
        :sender="msg.sender"
        :text="msg.message"
      />
    </div>
    <div v-else class="w-full">
      <p class="text-center">No messages</p>
    </div>
  </div>
</template>
<script>
import MessageBubble from "@/components/message/MessageBubble.vue";

function scrollBottom() {
  this.$el.scrollTo(0, this.$el.scrollHeight);
}

export default {
  props: ["me"],

  data() {
    return {
      history: [],
    };
  },

  mounted() {
    this.history = [
      {
        id: "1",
        sender: {
          id: "1456ZBDJH",
          name: "Henri",
        },
        message: "Hi there!",
      },
      {
        id: "2",
        sender: {
          id: "e22a003344",
          name: "ahenrij",
        },
        message: "Yo!",
      },
    ]; //make request to get history
  },

  watch: {
    history: function () {
      this.$nextTick(scrollBottom);
    },
  },

  computed: {
    historyIsEmpty() {
      return this.history.length === 0;
    },
  },

  components: {
    MessageBubble,
  },
};
</script>

<style lang="postcss" scoped>
.chat-history {
  min-height: 400px !important;
}
.chat-history {
  @apply flex items-end;
}
.chat-history.empty {
  @apply flex !items-center;
}
</style>
