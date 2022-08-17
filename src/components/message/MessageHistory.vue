<template>
  <div class="chat-history !bg-stone-100 p-4 px-20 !w-full">
    <message-bubble
      v-for="msg in history"
      :key="msg.id"
      :me="me"
      :sender="msg.sender"
      :text="msg.message"
    />
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

  components: {
    MessageBubble,
  },
};
</script>
