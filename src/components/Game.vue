<script lang="ts" setup>
import { computed } from "vue";
import { useGameData } from "../composables/gameData";
import { useSocket } from '../composables/useSocket';
import FlipCard from "./FlipCard.vue";
const { positioning, revealScore, roomValue , userList, currentScore} = useGameData();
const { emitEvent } = useSocket("",()=>{});

function revealScoreFunction(){
  if (!revealScore.value) {
    emitEvent('action', {room: roomValue.value , action:'revealScore'});
  } else {
    emitEvent('action', {room: roomValue.value , action:'newGame'});
    currentScore.value = null
    userList.value.forEach(element => {
      element.score = 0
    });
  }
  revealScore.value = !revealScore.value
}

const buttonText =computed(()=>{
  return revealScore.value ? "New Game" : "Reveal Score"
})
</script>

<template>
  <div class="game-container" >
    <div class="top-row grid grid-flow-col auto-cols-max gap-4 justify-center">
      <div
        class="flex flex-col items-center"
        v-for="(user, index) in positioning[0]"
        :key="index"
      >
        <FlipCard :user="user"/>
        {{ user.username }}
      </div>
    </div>
    <div class="middle-row flex justify-between items-center my-6">
      <div class="user-left text-center">
        <div v-if="positioning[1][0]">
          <FlipCard :user="positioning[1][0]"/>
          {{ positioning[1][0].username }}
        </div>
      </div>
      <div class="user-table">
        <div
          class="bg-sky-300 w-48 h-24 rounded-md flex justify-center items-center"
        >
          <button
            @click="revealScoreFunction"
            class="middle none center rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
      <div class="user-right text-center">
        <div v-if="positioning[1][1]">
          <FlipCard :user="positioning[1][1]"/>
          {{ positioning[1][1].username }}
        </div>
      </div>
    </div>
    <div
      class="bottom-row grid grid-flow-col auto-cols-max gap-4 justify-center"
    >
      <div
        class="flex flex-col items-center"
        v-for="(user, index) in positioning[2]"
        :key="index"
      >
        <FlipCard :user="user"/>
        {{ user.username }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-container{
  min-width: 500px;
}
</style>
