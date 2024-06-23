<script lang="ts" setup>
import { computed, ref, watch  } from 'vue';
import { useGameData } from "../composables/gameData";
const { userList } = useGameData()
import Confetti from "./Confetti.vue";
const confettiComponent = ref(null);

const scoreArray = computed(() => {
    return userList.value.map(user => user.score);
});

function calculateAgreementPercentage(estimates:any) {
    estimates.sort((a, b) => a - b);
    const maxEstimate = estimates[estimates.length - 1];
    const threshold = 1; // This can be adjusted based on the desired tolerance
    const withinRange = estimates.filter(estimate => maxEstimate - estimate <= threshold).length;
    const agreementPercentage = (withinRange / estimates.length) * 100;

    return agreementPercentage;
}

const agreement = computed(() => {
    const val =  calculateAgreementPercentage(scoreArray.value);
    if (val === 100) {
    if (confettiComponent.value) {
        confettiComponent.value.shootConfetti();
      }
    }
    return val.toFixed(2)
});


const progressStyle = computed(() => ({
  '--progress': agreement.value,
}));

</script>

<template>
<svg width="50" height="50" viewBox="0 0 50 50" class="circular-progress" :style="progressStyle">
  <circle class="bg"></circle>
  <circle class="fg"></circle>
</svg>
<Confetti ref="confettiComponent"/>
</template>

<style scoped>
.circular-progress {
  --size: 50px;
  --half-size: calc(var(--size) / 2);
  --stroke-width: 5px;
  --radius: calc((var(--size) - var(--stroke-width)) / 2);
  --circumference: calc(var(--radius) * pi * 2);
  --dash: calc((var(--progress) * var(--circumference)) / 100);
}

.circular-progress circle {
  cx: var(--half-size);
  cy: var(--half-size);
  r: var(--radius);
  stroke-width: var(--stroke-width);
  fill: none;
  stroke-linecap: round;
}

.circular-progress circle.bg {
  stroke: #ddd;
}

.circular-progress circle.fg {
  transform: rotate(-90deg);
  transform-origin: var(--half-size) var(--half-size);
  stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
  transition: stroke-dasharray 0.3s linear 0s;
  stroke: #5394fd;
}

@keyframes progress-animation {
  from {
    --progress: 0;
  }
  to {
    --progress: var(--progress);
  }
}
</style>