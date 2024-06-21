<script setup>
import { ref } from "vue";
import { useGameData } from "../composables/gameData";
const { gameName } = useGameData()

const name = ref("Test")

function setName(){
  gameName.value = name.value
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="relative text-center h-10 w-full">
      <h1 class="text-3xl font-bold">Scrum Poker for agile teams</h1>
      <div class="flex justify-center" >
        <div class="flex w-1/4" >
          <input
          v-model="name"
          type="email"
          x-model="email"
          class="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Sprint 100"
          />
          <button
          @click="setName"
          class="middle mt-2 ml-3 none center rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
          Start Game
        </button>
      </div>
    </div>
    </div>
  </div>
</template>
