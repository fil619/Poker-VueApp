<template>
  <StartGame v-if="gameName.length === 0" />
  <SetUsername v-else-if="userName.length === 0" />
  <Poker v-else />
</template>

<script setup lang="ts">
import { useGameData } from "./composables/gameData";
import Poker from "./components/Poker.vue";
import StartGame from "./components/StartGame.vue";
import SetUsername from "./components/SetUsername.vue";
const { gameName , userName } = useGameData();
import { useSocket } from './composables/useSocket';
    useSocket('connect', () => {
      console.log("Connected");
    });
</script>

<style scoped>
/* Your component styles */
</style>
