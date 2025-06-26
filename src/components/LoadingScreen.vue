<template>
  <div class="loading-screen flex flex-col justify-center items-center min-h-[300px]">
    <div class="cyber-loader mb-6">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
    </div>
    <div class="font-orbitron text-cyber-blue text-2xl cyber-glitch">Loading...</div>
  </div>
</template>

<script setup>
// No script needed for simple loader
</script>

<style scoped>
.loading-screen {
  background: transparent;
}
.cyber-loader {
  display: flex;
  gap: 0.5em;
}
.cyber-loader .dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00fff7 40%, #ff00ea 100%);
  box-shadow: 0 0 12px #00fff7, 0 0 24px #ff00ea;
  animation: cyber-bounce 1s infinite alternate;
}
.cyber-loader .dot:nth-child(2) {
  animation-delay: 0.2s;
}
.cyber-loader .dot:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes cyber-bounce {
  0% { transform: translateY(0); filter: brightness(1); }
  100% { transform: translateY(-18px); filter: brightness(1.5); }
}
</style>
