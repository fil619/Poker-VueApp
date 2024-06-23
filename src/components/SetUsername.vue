<script lang="ts" setup>
import { ref } from "vue";
import { useGameData } from "../composables/gameData";
import { useSocket } from '../composables/useSocket';
const { gameName, userName, roomValue } = useGameData();

const { emitEvent } = useSocket("",()=>{});
const name = ref("");

function setName() {
  emitEvent('joinRoom',  roomValue.value, name.value);
  userName.value = name.value;
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="relative text-center h-10 w-full">
      <h1 class="text-3xl font-bold">Scrum Poker for agile teams</h1>
      <div class="flex justify-center">
        <div class="flex w-1/4">
          <input
            v-model="name"
            type="name"
            x-model="name"
            class="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Username"
          />
          <button
            :disabled="name.length === 0"
            @click="setName"
            class="middle mt-2 ml-3 none center rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
