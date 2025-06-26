<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-cyber-dark text-white">
    <h1 class="text-cyber-pink font-orbitron text-7xl mb-6 glitch-text" data-text="404">404</h1>
    <h2 class="text-cyber-blue font-orbitron text-2xl mb-4">Page Not Found</h2>
    <p class="font-share-tech-mono text-cyber-gray mb-8">The page you are looking for does not exist or has been moved.</p>
    <router-link to="/">
      <button class="cyber-button px-6 py-2 font-orbitron text-lg">Go Home</button>
    </router-link>
  </div>
</template>

<style scoped>
.glitch-text {
  position: relative;
  color: #ff00ea;
  animation: glitch 1.5s infinite linear alternate-reverse;
}
@keyframes glitch {
  0% { text-shadow: 2px 0 #00fff7, -2px 0 #ff00ea; }
  20% { text-shadow: -2px 0 #00fff7, 2px 0 #ff00ea; }
  40% { text-shadow: 2px 2px #00fff7, -2px -2px #ff00ea; }
  60% { text-shadow: -2px 2px #00fff7, 2px -2px #ff00ea; }
  80% { text-shadow: 2px -2px #00fff7, -2px 2px #ff00ea; }
  100% { text-shadow: 0 0 #00fff7, 0 0 #ff00ea; }
}
</style>
