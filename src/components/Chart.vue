<script setup>
import { computed, ref } from "vue";
import ProgressBar from "./ProgressBar.vue";
import VueBarGraph from "vue-bar-graph";
import { useGameData } from "../composables/gameData";
const { userList, fibonacci, revealScore } = useGameData();
const dataPointObjects = computed(() => {
  let dataPoints = [];
  userList.value.forEach((element) => {
    let labelExists = dataPoints.find(
      (el) => Number(el.label) === element.score
    );
    if (labelExists) {
      labelExists.value++;
    } else {
      dataPoints.push({ label: element.score.toString(), value: 1 });
    }
  });
  return dataPoints;
});

const averageScore = computed(() => {
  let sum = 0;
  userList.value.forEach((element) => {
    sum += element.score;
  });
  return (sum / userList.value.length).toFixed(0);
});

const chartWidth = computed(() => {
  return dataPointObjects.value.length * 30;
});

const chartHeight = ref(200);
</script>
<template>
    <div class="flex" v-if="revealScore">
        <vue-bar-graph
        v-if="false"
        :show-y-axis="false"
        :show-x-axis="true"
        :points="dataPointObjects"
        :width="chartWidth"
        :height="chartHeight"
        :show-values="true"
        />
        <div class="flex flex-col justify-center ml-2 text-center">
          <p class="text-lg text-gray-800/75" >Average: </p>
          <div class="text-2xl font-bold" >{{averageScore}}</div>
          <p class="text-lg text-gray-800/75" >Agreement: </p>
          <div class="flex justify-center" >
            <ProgressBar />
          </div>
        </div>
    </div>
</template>
