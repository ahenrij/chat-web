<template>
  <div class="chat-history">
    <message-bubble
      v-for="msg in history"
      v-bind:key="msg.id"
      v-bind:uuid="msg.sender"
      v-bind:text="msg.message"
    >
    </message-bubble>
  </div>
</template>
<script>
import MessageBubble from "@components/room/MessageBubble.vue";
// import { mapGetters } from "vuex";

function scrollBottom() {
  this.$el.scrollTo(0, this.$el.scrollHeight);
}

export default {
  data() {
    return {
      history: [],
    };
  },

  mounted() {
    this.history = []; //make request to get history
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
