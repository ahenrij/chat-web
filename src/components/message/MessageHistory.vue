<template>
  <div class="chat-history" :class="{ empty: historyIsEmpty }">
    <div v-if="!historyIsEmpty" class="w-full !min-h-full grid content-end">
      <message-bubble
        v-for="msg in history"
        :key="msg.id"
        :me="me"
        :sender="msg.sender"
        :text="msg.message"
      />
      <div
        v-if="loadingError"
        class="bg-red-500 text-white mt-2 py-1 text-xs text-center rounded-full"
      >
        Loading failed!
        <!--TODO: show error content on error page-->
      </div>
    </div>
    <div v-else class="w-full">
      <p class="text-center">No messages</p>
    </div>
  </div>
</template>
<script>
import MessageBubble from "@/components/message/MessageBubble.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["me", "room"],

  data() {
    return {
      title: "Room",
    };
  },

  computed: {
    ...mapGetters("loading", ["loadingError"]),

    history: function () {
      return this.$store.state.data.histories[this.room.id];
    },

    historyIsEmpty() {
      return this.history ? this.history.length === 0 : true;
    },
  },

  mounted() {
    //make request to get history
    this.getHistory();
  },

  updated() {
    this.scrollToBottom();
  },

  methods: {
    ...mapActions("data", ["makeRequest", "setProp"]),

    getHistory: async function () {
      if (!this.room.id) {
        return;
      }
      const payload = {
        requestData: { method: "get", url: `/room/${this.room.id}/history` },
        commit: false,
      };
      const res = await this.makeRequest(payload);
      if (!res || !res.data) {
        // this.$toastError(this.title, this.loadingError);
        return;
      }
      this.setProp({ obj: "histories", prop: this.room.id, val: res.data });
    },

    scrollToBottom() {
      this.$el.scrollTop = this.$el.scrollHeight + 10;
    },
  },

  components: {
    MessageBubble,
  },
};
</script>

<style lang="postcss" scoped>
.chat-history {
  @apply bg-stone-100 p-4 sm:px-16 w-full h-full;
  @apply overflow-y-auto;
}
.chat-history.empty {
  @apply flex !items-center;
}
</style>
