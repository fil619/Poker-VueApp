<script lang="ts" setup>
import { useGameData } from "../composables/gameData";
const { fibonacci, gameName, currentScore } = useGameData();
import { useSocket } from '../composables/useSocket';
const { emitEvent } = useSocket();

function setScore(score: number){
  currentScore.value = score
  emitEvent('setScore', {room:  gameName.value, msg: score});
}
</script>

<template>
  <div class="flex mb-8 font-bold">
    <button
        @click="setScore(score)"
      v-for="score in fibonacci"
      :key="score"
      class="flex justify-center items-center border-2 border-blue-500/100 mx-4 h-20 w-12 rounded"
      :class="{'bg-sky-200': currentScore === score}"
    >
      {{ score }}
    </button>
  </div>
</template>
