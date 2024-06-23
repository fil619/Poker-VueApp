// In a Vue component file, e.g., ConfettiComponent.vue

<template>
  <div>
    <canvas ref="confettiCanvas"></canvas>
  </div>
</template>

<script>
import { ref } from 'vue';
import confetti from 'canvas-confetti';

export default {
  name: 'ConfettiComponent',
  setup() {
    const confettiCanvas = ref(null);

    const shootConfetti = () => {
      if (confettiCanvas.value) {
        confetti.create(confettiCanvas.value, {
          resize: true, // will fit all screen sizes
          useWorker: true // to boost performance
        })({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    };

    return {
      confettiCanvas,
      shootConfetti
    };
  }
};
</script>

<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* to allow interactions through the canvas */
}
</style>
