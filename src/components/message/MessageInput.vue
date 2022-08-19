<template>
  <textarea
    ref="input"
    class="form-input text-input"
    rows="1"
    placeholder="Type a message"
    maxlength="20000"
    :value="value"
    @input="$emit('update:value', $event.target.value)"
    @keydown.enter.exact.prevent
    @keyup.enter.exact="enterPressed"
    @keydown.enter.shift.exact="newLine"
  ></textarea>
</template>
<script>
export default {
  props: {
    value: String,
  },
  data() {
    return {};
  },
  methods: {
    newLine(event) {
      event.preventDefault();
      const updatedValue = `${event.target.value}\n`;
      this.$refs.input.value = updatedValue;
      this.$emit("update:value", updatedValue);
    },
    enterPressed() {
      this.$emit("enter");
    },
  },
};
</script>

<style lang="postcss" scoped>
.text-input {
  @apply py-2 rounded-full !shadow-sm bg-white !border-white resize-none text-sm placeholder:text-slate-400;
}

.form-input {
  @apply !min-w-max w-full;
}
</style>
