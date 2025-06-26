<template>
  <div>
    <!-- Hero Section with Cyberpunk Effects -->
    <section class="py-12 md:py-20 relative overflow-hidden cyberpunk-bg flex items-center min-h-[320px] md:min-h-[480px]">
      <!-- Scanline Overlay -->
      <div class="scanlines"></div>
      
      <!-- Radial Gradient Background -->
      <div class="radial-bg"></div>
      
      <div class="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center h-full">
        <div class="max-w-3xl w-full text-center">
          <div class="cyber-logo-container mb-6 flex justify-center items-center" @mouseenter="playHoverSound">
            <BannerText />
            <div class="cyber-circuit"></div>
          </div>
          <!-- Animated Logo -->
          <!-- <div class="cyber-logo-container mb-6" @mouseenter="playHoverSound">
            <h1 class="cyber-logo font-orbitron text-4xl md:text-6xl font-bold">
              <span class="text-cyber-blue glitch-text" data-text="WHITE'S">WHITE'S</span>
              <span class="text-cyber-pink glitch-text" data-text="CYBERPUNK">CYBERPUNK</span>
              <span class="text-white glitch-text" data-text="BLOG"> BLOG</span>
            </h1>
            <div class="cyber-circuit"></div>
          </div> -->
          
          <!-- <p class="font-share-tech-mono text-xl md:text-2xl mb-8 cyber-text">// Exploring the digital frontier of tomorrow</p> -->
         
          <!-- <div class="pulse-container">
            <NeonButton color="blue" size="lg" class="pulse-button">
              <span class="flex items-center">
                <Terminal class="mr-2 h-5 w-5 terminal-icon" />
                JACK IN
              </span>
            </NeonButton>
          </div> -->
        </div>
      </div>
      
      <!-- Decorative elements with animation -->
      <div class="absolute top-0 left-0 w-full h-full opacity-10">
        <div class="absolute top-10 left-10 w-20 h-20 border border-cyber-blue animate-pulse-slow"></div>
        <div class="absolute bottom-10 right-10 w-40 h-40 border border-cyber-pink animate-float"></div>
        <div class="absolute top-1/2 left-1/4 w-32 h-32 border border-cyber-yellow animate-spin-slow"></div>
      </div>
      
      <!-- Futuristic Pattern Elements -->
      <div class="cyber-grid"></div>
    </section>

    <!-- Game Section -->
    <section class="py-12 bg-cyber-dark">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-8">
          <h2 class="font-orbitron text-2xl md:text-3xl font-bold">
            <span class="text-cyber-pink">#</span>
            <span class="text-white">GAME</span>
          </h2>
          <router-link to="/tags/game">
            <NeonButton color="pink" size="sm">VIEW_ALL</NeonButton>
          </router-link>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PostCard v-for="post in gamePosts" :key="post.slug" :post="post" />
        </div>
      </div>
    </section>

    <!-- Code Section -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-8">
          <h2 class="font-orbitron text-2xl md:text-3xl font-bold">
            <span class="text-cyber-blue">#</span>
            <span class="text-white">CODE</span>
          </h2>
          <router-link to="/tags/code">
            <NeonButton color="blue" size="sm">VIEW_ALL</NeonButton>
          </router-link>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PostCard v-for="post in codePosts" :key="post.slug" :post="post" />
        </div>
      </div>
    </section>

    <!-- Life Section -->
    <section class="py-12 bg-cyber-dark">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-8">
          <h2 class="font-orbitron text-2xl md:text-3xl font-bold">
            <span class="text-cyber-yellow">#</span>
            <span class="text-white">LIFE</span>
          </h2>
          <router-link to="/tags/life">
            <NeonButton color="yellow" size="sm">VIEW_ALL</NeonButton>
          </router-link>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PostCard v-for="post in lifePosts" :key="post.slug" :post="post" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Terminal } from 'lucide-vue-next'
import NeonButton from '@/components/NeonButton.vue'
import PostCard from '@/components/PostCard.vue'
// import posts from '@/data/posts.json'
import { getPosts } from '@/services/postService'
// หรือถ้าไม่มี postService.js ให้ใช้ axios
// import axios from 'axios'
// import NeonExplosion from '@/components/NeonExplosion.vue'
import BannerText from '@/components/BannerText.vue'


// ดึงข้อมูลโพสต์จาก API
const posts = ref([])

const gamePosts = computed(() => {
  return posts.value.filter(post => post.tags && post.tags.map(t => t.name).includes('game')).slice(0, 3)
})

const codePosts = computed(() => {
  return posts.value.filter(post => post.tags && post.tags.map(t => t.name).includes('code')).slice(0, 3)
})

const lifePosts = computed(() => {
  return posts.value.filter(post => post.tags && post.tags.map(t => t.name).includes('life')).slice(0, 3)
})

// Audio for hover effect
let hoverSound = null

onMounted(async () => {
  // ดึงโพสต์จาก API
  try {
    // ถ้ามี postService.js
    const res = await getPosts()
    posts.value = Array.isArray(res.data) ? res.data : res.data.posts || []
    // ถ้าใช้ axios ตรง ๆ
    // const res = await axios.get('/api/posts')
    // posts.value = res.data
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ไม่สามารถโหลดโพสต์:', e)
  }

  // Create audio element for hover sound
  hoverSound = new Audio()
  hoverSound.src = 'src/assets/cyberpunk-2077-sandevistan-start-made-with-Voicemod.mp3'
  hoverSound.volume = 0.2
  
  // Initialize the cyber grid pattern
  initCyberGrid()

})

// Play hover sound effect
const playHoverSound = async () => {
  if (hoverSound) {
    hoverSound.currentTime = 0
    try {
      await hoverSound.play()
    } catch (e) {
      // ป้องกัน error เด้งใน console ถ้า browser block
      // สามารถ log ได้ถ้าต้องการ debug
      // console.warn('Play hover sound failed:', e)
    }
  }
}

// Create cyber grid pattern
const initCyberGrid = () => {
  const grid = document.querySelector('.cyber-grid')
  if (!grid) return
  
  // Create grid cells
  for (let i = 0; i < 20; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cyber-grid-cell')
    cell.style.left = `${Math.random() * 100}%`
    cell.style.top = `${Math.random() * 100}%`
    cell.style.animationDelay = `${Math.random() * 5}s`
    grid.appendChild(cell)
  }
}
</script>

<style scoped>
.text-cyber-neon {
  color: #00fff7;
  text-shadow: 0 0 5px #00fff7, 0 0 10px #00fff7;
}

/* Cyberpunk Background */
.cyberpunk-bg {
  position: relative;
  background-color: #0a0a0f;
  overflow: hidden;
}

/* Radial Gradient Background */
.radial-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.05) 30%, rgba(0, 0, 0, 0) 70%);
  z-index: 1;
}

/* Scanlines Effect */
.scanlines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.3) 51%);
  background-size: 100% 4px;
  z-index: 2;
  pointer-events: none;
  opacity: 0.15;
}

/* Cyber Logo Container */
.cyber-logo-container {
  position: relative;
  display: inline-block;
  padding: 10px;
  cursor: pointer;
}

/* Cyber Logo Animation */
.cyber-logo {
  position: relative;
  z-index: 3;
  text-shadow: 0 0 10px currentColor;
  transition: all 0.3s ease;
}

.cyber-logo-container:hover .cyber-logo {
  letter-spacing: 2px;
}

/* Glitch Text Effect */
.glitch-text {
  position: relative;
  display: inline-block;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

.glitch-text::before {
  animation: glitch-anim-1 2s infinite linear alternate-reverse;
  clip: rect(44px, 450px, 56px, 0);
  left: 1px;
  text-shadow: -1px 0 #00ffff;
}

.glitch-text::after {
  animation: glitch-anim-2 3s infinite linear alternate-reverse;
  clip: rect(44px, 450px, 56px, 0);
  left: -1px;
  text-shadow: 1px 0 #ff00ff;
}

/* Cyber Text Animation */
.cyber-text {
  position: relative;
  display: inline-block;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
  animation: cyber-text-flicker 4s infinite;
}

/* Pulse Button Animation */
.pulse-container {
  position: relative;
  display: inline-block;
}

.pulse-button {
  position: relative;
  z-index: 2;
}

.pulse-container::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: rgba(0, 255, 255, 0.2);
  border-radius: 4px;
  z-index: 1;
  animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

/* Terminal Icon Animation */
.terminal-icon {
  animation: blink 1.5s ease-in-out infinite;
}

/* Cyber Circuit Animation */
.cyber-circuit {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 5px;
  z-index: 1;
  opacity: 0;
  transition: all 0.3s ease;
}

.cyber-logo-container:hover .cyber-circuit {
  opacity: 1;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-color: rgba(0, 255, 255, 0.6);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
}

/* Cyber Grid */
.cyber-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.cyber-grid-cell {
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: rgba(0, 255, 255, 0.5);
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.8);
  animation: grid-pulse 3s infinite;
}

/* Custom Animations */
@keyframes pulse-ring {
  0% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(0.8);
  }
  80%, 100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.5);
  }
}

@keyframes cyber-text-flicker {
  0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
    opacity: 1;
  }
  20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
    opacity: 0.8;
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes grid-pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.4;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

@keyframes glitch-anim-1 {
  0% { clip: rect(36px, 9999px, 9px, 0); }
  5% { clip: rect(85px, 9999px, 66px, 0); }
  10% { clip: rect(112px, 9999px, 76px, 0); }
  15% { clip: rect(54px, 9999px, 98px, 0); }
  20% { clip: rect(59px, 9999px, 98px, 0); }
  25% { clip: rect(24px, 9999px, 44px, 0); }
  30% { clip: rect(80px, 9999px, 118px, 0); }
  35% { clip: rect(15px, 9999px, 46px, 0); }
  40% { clip: rect(20px, 9999px, 23px, 0); }
  45% { clip: rect(70px, 9999px, 61px, 0); }
  50% { clip: rect(26px, 9999px, 67px, 0); }
  55% { clip: rect(46px, 9999px, 21px, 0); }
  60% { clip: rect(84px, 9999px, 74px, 0); }
  65% { clip: rect(38px, 9999px, 3px, 0); }
  70% { clip: rect(63px, 9999px, 79px, 0); }
  75% { clip: rect(36px, 9999px, 32px, 0); }
  80% { clip: rect(17px, 9999px, 22px, 0); }
  85% { clip: rect(87px, 9999px, 92px, 0); }
  90% { clip: rect(83px, 9999px, 32px, 0); }
  95% { clip: rect(96px, 9999px, 2px, 0); }
  100% { clip: rect(58px, 9999px, 96px, 0); }
}

@keyframes glitch-anim-2 {
  0% { clip: rect(18px, 9999px, 30px, 0); }
  5% { clip: rect(97px, 9999px, 59px, 0); }
  10% { clip: rect(100px, 9999px, 86px, 0); }
  15% { clip: rect(84px, 9999px, 52px, 0); }
  20% { clip: rect(91px, 9999px, 90px, 0); }
  25% { clip: rect(15px, 9999px, 68px, 0); }
  30% { clip: rect(99px, 9999px, 8px, 0); }
  35% { clip: rect(37px, 9999px, 110px, 0); }
  40% { clip: rect(96px, 9999px, 27px, 0); }
  45% { clip: rect(16px, 9999px, 57px, 0); }
  50% { clip: rect(60px, 9999px, 16px, 0); }
  55% { clip: rect(2px, 9999px, 20px, 0); }
  60% { clip: rect(31px, 9999px, 57px, 0); }
  65% { clip: rect(15px, 9999px, 34px, 0); }
  70% { clip: rect(61px, 9999px, 72px, 0); }
  75% { clip: rect(5px, 9999px, 51px, 0); }
  80% { clip: rect(48px, 9999px, 27px, 0); }
  85% { clip: rect(47px, 9999px, 69px, 0); }
  90% { clip: rect(82px, 9999px, 32px, 0); }
  95% { clip: rect(99px, 9999px, 61px, 0); }
  100% { clip: rect(73px, 9999px, 69px, 0); }
}

/* Custom Animation Classes */
.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin 15s linear infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
