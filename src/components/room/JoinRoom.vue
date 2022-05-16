<template>
  <div class="grid place-items-center px-10 py-10">
    <h2 class="text-3xl mt-20 mb-8 text-center">Join a chat room</h2>

    <div class="space-y-5">
      <div>
        <input
          class="form-input !border-slate-400 rounded-md p-3 md:p-4"
          placeholder="Username"
          type="text"
          name="name"
          id="name"
        />
      </div>
      <div>
        <input
          class="form-input !border-slate-400 rounded-md p-3 md:p-4"
          placeholder="Room ID"
          type="text"
          name="name"
          id="name"
        />
      </div>
      <div>
        <button
          type="button"
          class="bg-blue-500 hover:bg-blue-600 text-white w-full rounded-md p-3 md:p-4"
        >
          Join now
        </button>
      </div>
      <p class="text-center">or</p>
      <p class="text-center">
        <router-link to="/">Create a room</router-link>
      </p>
    </div>
  </div>
</template>
