<template>
  <div class="py-20">
    <div class="container mx-auto px-4 text-center">
      <div class="glitch-container mb-8">
        <h1 class="font-orbitron text-6xl md:text-8xl font-bold glitch" data-text="404">404</h1>
      </div>
      
      <h2 class="font-orbitron text-2xl md:text-3xl text-cyber-pink mb-6">SYSTEM_ERROR</h2>
      
      <div class="cyber-card max-w-2xl mx-auto p-6 mb-8">
        <div class="font-share-tech-mono text-cyber-gray mb-6">
          <p class="mb-4 terminal-text">
            <span class="text-cyber-blue">></span> <span class="typing-text">ERROR: Page not found in the neural network</span>
          </p>
          <p class="mb-4 terminal-text">
            <span class="text-cyber-blue">></span> <span class="typing-text">SCANNING for alternative pathways...</span>
          </p>
          <p class="mb-4 terminal-text">
            <span class="text-cyber-blue">></span> <span class="typing-text">RECOMMENDATION: Return to main interface</span>
          </p>
        </div>
        
        <div class="flex justify-center">
          <router-link to="/">
            <NeonButton color="blue">RETURN_HOME</NeonButton>
          </router-link>
        </div>
      </div>
      
      <p class="font-share-tech-mono text-cyber-gray">
        <span class="text-cyber-pink">[SYSTEM_LOG]</span> The requested neural pathway does not exist or has been corrupted.
      </p>
    </div>
  </div>
</template>

<script setup>
import NeonButton from '@/components/NeonButton.vue'
</script>

<style scoped>
.glitch-container {
  position: relative;
}

.glitch {
  color: #fff;
  position: relative;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch::before {
  left: 2px;
  text-shadow: -2px 0 #ff00ff;
  animation: glitch-animation 3s infinite linear alternate-reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: 2px 0 #00ffff;
  animation: glitch-animation 2s infinite linear alternate-reverse;
}

@keyframes glitch-animation {
  0% {
    clip-path: inset(29% 0 25% 0);
  }
  5% {
    clip-path: inset(9% 0 38% 0);
  }
  10% {
    clip-path: inset(96% 0 1% 0);
  }
  15% {
    clip-path: inset(75% 0 23% 0);
  }
  20% {
    clip-path: inset(46% 0 50% 0);
  }
  25% {
    clip-path: inset(3% 0 46% 0);
  }
  30% {
    clip-path: inset(82% 0 2% 0);
  }
  35% {
    clip-path: inset(88% 0 1% 0);
  }
  40% {
    clip-path: inset(91% 0 8% 0);
  }
  45% {
    clip-path: inset(96% 0 2% 0);
  }
  50% {
    clip-path: inset(59% 0 38% 0);
  }
  55% {
    clip-path: inset(41% 0 53% 0);
  }
  60% {
    clip-path: inset(21% 0 47% 0);
  }
  65% {
    clip-path: inset(89% 0 6% 0);
  }
  70% {
    clip-path: inset(83% 0 17% 0);
  }
  75% {
    clip-path: inset(17% 0 72% 0);
  }
  80% {
    clip-path: inset(24% 0 89% 0);
  }
  85% {
    clip-path: inset(47% 0 46% 0);
  }
  90% {
    clip-path: inset(60% 0 8% 0);
  }
  95% {
    clip-path: inset(44% 0 16% 0);
  }
  100% {
    clip-path: inset(91% 0 8% 0);
  }
}

.terminal-text {
  opacity: 0;
  animation: fade-in 0.5s forwards;
}

.terminal-text:nth-child(1) {
  animation-delay: 0.5s;
}

.terminal-text:nth-child(2) {
  animation-delay: 1.5s;
}

.terminal-text:nth-child(3) {
  animation-delay: 2.5s;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.typing-text {
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  position: relative;
  animation: typing 2s steps(40, end) forwards;
  width: 0;
}

.terminal-text:nth-child(1) .typing-text {
  animation-delay: 0.5s;
}

.terminal-text:nth-child(2) .typing-text {
  animation-delay: 1.5s;
}

.terminal-text:nth-child(3) .typing-text {
  animation-delay: 2.5s;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
