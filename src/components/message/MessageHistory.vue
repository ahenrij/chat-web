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
import { mapGetters, mapActions } from "vuex";

function scrollBottom() {
  this.$el.scrollTo(0, this.$el.scrollHeight);
}

export default {
  props: ["me", "room"],

  data() {
    return {};
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

  watch: {
    history: function () {
      this.$nextTick(scrollBottom);
    },
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
        this.$toastError(this.title, this.get("loadingError"));
        return;
      }
      this.setProp({ obj: "histories", prop: this.room.id, val: res.data });
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
