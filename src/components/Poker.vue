<script setup>
import Game from "./Game.vue";
import Score from "./Score.vue";
import Chart from "./Chart.vue";
import Emote from "./Emote.vue";

import { useGameData } from "../composables/gameData";
const {
  gameName,
  userList,
  positionUser,
  positioning,
  revealScore,
  currentScore,
} = useGameData();

import { useSocket } from "../composables/useSocket";

useSocket("joined", (users) => {
  console.log(users);
  positioning.value = [[], [], []];
  userList.value = [];
  addUsers(users);
});

useSocket("userList", (users) => {
  positioning.value = [[], [], []];
  userList.value = [];
  addUsers(users);
});

useSocket("userScore", (user) => {
  let userScore = userList.value.find((el) => el.id === user.user);
  userScore.score = user.score;
});

useSocket("setPersonalScore", (user) => {
  let userScore = userList.value.find((el) => el.id === user.user);
  userScore.score = user.score;
});

useSocket("userEmote", (emote) => {
  const emoteMap = {
    happy: "😊",
    angry: "🤬",
    thumbsup: "👍",
    thumbsdown: "👎",
    clap: "👏",
  };
  const newElement = document.createElement("div");
  newElement.textContent = emoteMap[emote];
  newElement.setAttribute("class", "emoji");
  const parentElement = document.getElementById("emoji-container");
  parentElement.appendChild(newElement);
});

useSocket("userAction", (action) => {
  if (action === "revealScore") {
    revealScore.value = true;
  } else if (action === "newGame") {
    revealScore.value = false;
    currentScore.value = null;
    userList.value.forEach((element) => {
      element.score = 0;
    });
  }
});

function addUsers(users) {
  users.forEach((user) => {
    userList.value.push(user);
    positionUser(user);
  });
}
</script>

<template>
  <div class="flex flex-col h-screen poker-container">
    <div class="grow flex justify-center items-center">
      <Emote />
      <Game />
    </div>
    <div class="flex justify-center items-center m-2" v-if="revealScore" >
        <Chart />
    </div>
    <div class="flex justify-center items-center">
      <Score />
    </div>
    <div id="emoji-container">
    </div>
  </div>
</template>

<style>
.poker-container{
  height: 100vh;
  overflow: hidden;
}
.emoji {
  font-size: 50px; /* Adjust size as needed */
  animation: float 2s ease-in-out 1;
  opacity: 0;
  position: absolute;
  bottom: 80px;
  right: 50%;
}

@keyframes float {
  0% {
    transform: translateY(100%);
    opacity: 0.5;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 0.80;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
}
</style>
