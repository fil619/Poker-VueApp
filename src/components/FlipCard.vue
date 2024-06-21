<script lang="ts" setup>
  import { useGameData } from "../composables/gameData";
  const {revealScore} = useGameData()
  const props = defineProps(['user'])

</script>

<template>
  <div class="flip-card rounded" :class="{'reveal' : revealScore}">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <div class="h-full w-full"  :class="user.score === 0 ? 'bg-gray-300' : 'bg-pattern'"  ></div>
      </div>
      <div class="flip-card-back  border-2 border-sky-500">
        <h1 class="font-extrabold text-lg" >{{user.score}}</h1>
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
  width: 50px;
  height: 80px;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
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

.bg-pattern {
  background-color: #000000;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='20' viewBox='0 0 24 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 18c0-1.105.887-2 1.998-2 1.104 0 2-.895 2.002-1.994V14v6h-4v-2zM0 13.998C0 12.895.888 12 2 12c1.105 0 2 .888 2 2 0 1.105.888 2 2 2 1.105 0 2 .888 2 2v2H0v-6.002zm16 4.004A1.994 1.994 0 0 1 14 20c-1.105 0-2-.887-2-1.998v-4.004A1.994 1.994 0 0 0 10 12c-1.105 0-2-.888-2-2 0-1.105-.888-2-2-2-1.105 0-2-.887-2-1.998V1.998A1.994 1.994 0 0 0 2 0a2 2 0 0 0-2 2V0h8v2c0 1.105.888 2 2 2 1.105 0 2 .888 2 2 0 1.105.888 2 2 2 1.105 0 2-.888 2-2 0-1.105.888-2 2-2 1.105 0 2-.888 2-2V0h4v6.002A1.994 1.994 0 0 1 22 8c-1.105 0-2 .888-2 2 0 1.105-.888 2-2 2-1.105 0-2 .887-2 1.998v4.004z' fill='%23ff0056' fill-opacity='0.64' fill-rule='evenodd'/%3E%3C/svg%3E");
}

.flip-card-back {
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotateY(180deg);
}
</style>
