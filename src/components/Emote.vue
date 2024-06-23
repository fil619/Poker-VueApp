<script setup lang="ts">
import { useSocket } from "../composables/useSocket";
const { emitEvent } = useSocket("",()=>{});
import { useGameData } from "../composables/gameData";
const { roomValue } = useGameData();

function emote(emotion : string) {
  emitEvent("emote", {room: roomValue.value , emote:emotion});
}
</script>

<template>
  <div
    class="bg-gray-200 absolute right-5 top-3 p-2 rounded-full flex hover-container"
  >
    <button @click="emote('happy')" class="on-hover text-2xl">😊</button>
    <button @click="emote('angry')" class="on-hover text-2xl">🤬</button>
    <button @click="emote('thumbsup')" class="on-hover text-2xl">
      👍
    </button>
    <button @click="emote('thumbsdown')" class="on-hover text-2xl">
      👎
    </button>
    <button @click="emote('clap')" class="text-2xl">👏</button>
  </div>
</template>

<style scoped>
.on-hover {
  display: none;
  opacity: 0;
}
.hover-container:hover .on-hover {
  display: inline-block;
  transition: opacity 0.3s ease-in-out;
  opacity: 1;
}
</style>
