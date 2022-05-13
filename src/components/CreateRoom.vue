<template>
  <div class="px-10 py-10">
    <h2 class="text-3xl mt-20 text-center">Create a new chat room</h2>
    <div class="flex justify-center mt-10">
      <input
        class="!border-slate-400 text-center p-4"
        placeholder="Room name"
        type="text"
        name="name"
        id="name"
      />
      <input
        class="bg-blue-500 hover:bg-blue-600 text-white ml-7 px-10 rounded-md cursor-pointer"
        type="button"
        value="Create"
      />
    </div>
  </div>
</template>
