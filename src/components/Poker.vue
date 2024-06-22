<script setup>
import Game from "./Game.vue";
import Score from "./Score.vue";

import { useGameData } from "../composables/gameData";
const { gameName, userList, positionUser, positioning , revealScore, currentScore } = useGameData();

import { useSocket } from '../composables/useSocket';

useSocket('joined', (users) => {
  positioning.value = [[],[],[]]
  userList.value = []
  addUsers(users)
});

useSocket('userList', (users) => {
  positioning.value = [[],[],[]]
  userList.value = []
  addUsers(users)
});

useSocket('userScore', (user) => {
  let userScore = userList.value.find(el => el.id === user.user)
  userScore.score = user.score
});

useSocket('userAction', (action) => {
  if (action ==="revealScore") {
    revealScore.value = true
  } else if(action ==="newGame"){
    revealScore.value = false
    currentScore.value = 0
    userList.value.forEach(element => {
      element.score = 0
    });
  }
});

function addUsers(users){
  Object.entries(users).forEach(([key, value]) => {
    const user = { id: key, username: value, score: 0 }
    userList.value.push(user)
    positionUser(user);
});
}

</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="grow flex justify-center items-center">
      <Game />
    </div>
    <div class="flex justify-center items-center">
      <Score />
    </div>
  </div>
</template>
