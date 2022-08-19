<template>
  <div x-data="{ open: false }" class="relative inline-block text-left">
    <!--Dots icon-->
    <svg
      x-on:click="open = !open"
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 cursor-pointer stroke-white"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
      />
    </svg>

    <!--Dropdown Menu Options-->
    <div
      x-show.transition="open"
      x-on:click.away="open = false"
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <div class="py-1" role="none">
        <a
          href="#!"
          @click="optionClicked($event, 'leave')"
          class="text-gray-700 block px-4 py-2 text-sm"
          role="menuitem"
          tabindex="-1"
          id="menu-item-0"
          >Leave</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import Alpine from "alpinejs";
Alpine.start();

export default {
  methods: {
    optionClicked: function (event, itemId) {
      event.preventDefault();
      this.$emit("optionClicked", itemId);
    },
  },
};
</script>
