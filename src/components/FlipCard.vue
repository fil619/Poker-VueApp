<script lang="ts" setup>
  import { useGameData } from "../composables/gameData";
  const {revealScore} = useGameData()
  const props = defineProps(['user'])

</script>

<template>
  <div class="flip-card rounded" :class="{'reveal' : revealScore}">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <div class="bg-gradient-to-tr from-pink-600 to-pink-400 h-full w-full"></div>
      </div>
      <div class="flip-card-back bg-sky-300 border-2 border-indigo-500/100">
        <h1>{{user.score}}</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flip-card {
  background-color: transparent;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 40px;
  height: 50px;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.flip-card.reveal .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-back {
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotateY(180deg);
}
</style>
