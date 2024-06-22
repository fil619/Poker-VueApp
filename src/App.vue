<template>
  <StartGame v-if="gameName.length === 0" />
  <SetUsername v-else-if="userName.length === 0" />
  <Poker v-else />
  <Emote />
</template>

<script setup lang="ts">
import { useGameData } from "./composables/gameData";
import Poker from "./components/Poker.vue";
import StartGame from "./components/StartGame.vue";
import SetUsername from "./components/SetUsername.vue";
import Emote from "./components/Emote.vue";
const { gameName, userName, roomValue } = useGameData();
import { useSocket } from "./composables/useSocket";
const { emitEvent } = useSocket();

useSocket("connect", () => {
  let params = new URL(document.location.toString()).searchParams;
  roomValue.value = params.get("room");
  if (roomValue.value) {
    emitEvent("checkRoom", roomValue.value);
  } else {
    roomValue.value = generateRandomString(7);
  }
});

function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

useSocket("onRoomCheck", (isValidRoom) => {
  if (isValidRoom) {
    gameName.value = "Valid Room"
  }
});
</script>

<style scoped>
/* Your component styles */
</style>
