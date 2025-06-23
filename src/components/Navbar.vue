<template>
  <header class="border-b border-cyber-blue bg-cyber-dark">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <router-link to="/" class="cyber-glitch font-orbitron text-2xl md:text-3xl font-bold flex items-center" :data-text="siteName">
        <img v-if="logoUrl" :src="logoUrl" alt="logo" class="h-9 w-9 mr-2 rounded-full object-contain" />
        {{ siteName }}
      </router-link>
      
      <!-- Desktop Navigation -->
      <nav class="hidden md:flex space-x-6">
        <router-link to="/" class="font-share-tech-mono hover:text-cyber-pink">HOME</router-link>
        <router-link to="/tags/code" class="font-share-tech-mono hover:text-cyber-pink">CODE</router-link>
        <router-link to="/tags/game" class="font-share-tech-mono hover:text-cyber-pink">GAME</router-link>
        <router-link to="/tags/life" class="font-share-tech-mono hover:text-cyber-pink">LIFE</router-link>
        <router-link to="/about" class="font-share-tech-mono hover:text-cyber-pink">ABOUT</router-link>
      </nav>
      
      <!-- Mobile Menu Button -->
      <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden cyber-button p-2">
        <Menu v-if="!isMobileMenuOpen" class="h-6 w-6" />
        <X v-else class="h-6 w-6" />
      </button>
    </div>
    
    <!-- Mobile Navigation -->
    <div v-if="isMobileMenuOpen" class="md:hidden border-t border-cyber-blue bg-cyber-dark">
      <div class="container mx-auto px-4 py-2">
        <nav class="flex flex-col space-y-3 py-3">
          <router-link to="/" class="font-share-tech-mono hover:text-cyber-pink flex items-center">
            <ChevronRight class="h-4 w-4 mr-2" /> HOME
          </router-link>
          <router-link to="/tags/code" class="font-share-tech-mono hover:text-cyber-pink flex items-center">
            <ChevronRight class="h-4 w-4 mr-2" /> CODE
          </router-link>
          <router-link to="/tags/game" class="font-share-tech-mono hover:text-cyber-pink flex items-center">
            <ChevronRight class="h-4 w-4 mr-2" /> GAME
          </router-link>
          <router-link to="/tags/life" class="font-share-tech-mono hover:text-cyber-pink flex items-center">
            <ChevronRight class="h-4 w-4 mr-2" /> LIFE
          </router-link>
          <router-link to="/about" class="font-share-tech-mono hover:text-cyber-pink flex items-center">
            <ChevronRight class="h-4 w-4 mr-2" /> ABOUT
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { Menu, X, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  settings: { type: Object, default: null }
})
const injectedSettings = inject('settings', null)
const useSettings = computed(() => props.settings || injectedSettings || {})

const siteName = computed(() => useSettings.value.siteName || "WHITE'S CYBERPUNK BLOG")
const logoUrl = computed(() => useSettings.value.logoUrl || "")
const themeColor = computed(() => useSettings.value.themeColor || "#00ffff")
const darkMode = computed(() => useSettings.value.darkMode || false)

const isMobileMenuOpen = ref(false)
</script>

<style scoped>
.cyber-glitch {
  position: relative;
  text-shadow: 0.05em 0 0 rgba(255, 0, 255, 0.75),
              -0.025em -0.05em 0 rgba(0, 255, 255, 0.75),
              0.025em 0.05em 0 rgba(0, 255, 0, 0.75);
  animation: glitch 500ms infinite;
}

.cyber-glitch::before,
.cyber-glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.cyber-glitch::before {
  left: 0.05em;
  text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75);
  animation: glitch-anim 650ms infinite alternate-reverse;
}

.cyber-glitch::after {
  left: -0.05em;
  text-shadow: -0.025em 0 0 rgba(0, 255, 255, 0.75);
  animation: glitch-anim2 375ms infinite alternate-reverse;
}

@keyframes glitch {
  0% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 255, 0.75),
                -0.025em -0.05em 0 rgba(0, 255, 255, 0.75),
                0.025em 0.05em 0 rgba(0, 255, 0, 0.75);
  }
  14% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 255, 0.75),
                -0.025em -0.05em 0 rgba(0, 255, 255, 0.75),
                0.025em 0.05em 0 rgba(0, 255, 0, 0.75);
  }
  15% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 255, 0.75),
                0.025em 0.025em 0 rgba(0, 255, 255, 0.75),
                -0.05em -0.05em 0 rgba(0, 255, 0, 0.75);
  }
  49% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 255, 0.75),
                0.025em 0.025em 0 rgba(0, 255, 255, 0.75),
                -0.05em -0.05em 0 rgba(0, 255, 0, 0.75);
  }
  50% {
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 255, 0.75),
                0.05em 0 0 rgba(0, 255, 255, 0.75),
                0 -0.05em 0 rgba(0, 255, 0, 0.75);
  }
  99% {
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 255, 0.75),
                0.05em 0 0 rgba(0, 255, 255, 0.75),
                0 -0.05em 0 rgba(0, 255, 0, 0.75);
  }
  100% {
    text-shadow: -0.025em 0 0 rgba(255, 0, 255, 0.75),
                -0.025em -0.025em 0 rgba(0, 255, 255, 0.75),
                -0.025em -0.05em 0 rgba(0, 255, 0, 0.75);
  }
}

@keyframes glitch-anim {
  0% {
    clip: rect(1px, 9999px, 1px, 0);
  }
  4% {
    clip: rect(65px, 9999px, 100px, 0);
  }
  8% {
    clip: rect(51px, 9999px, 80px, 0);
  }
  12% {
    clip: rect(46px, 9999px, 14px, 0);
  }
  16% {
    clip: rect(31px, 9999px, 35px, 0);
  }
  20% {
    clip: rect(94px, 9999px, 99px, 0);
  }
  24% {
    clip: rect(200px, 9999px, 76px, 0);
  }
  28% {
    clip: rect(210px, 9999px, 34px, 0);
  }
  32% {
    clip: rect(67px, 9999px, 71px, 0);
  }
  36% {
    clip: rect(20px, 9999px, 26px, 0);
  }
  40% {
    clip: rect(22px, 9999px, 67px, 0);
  }
}

@keyframes glitch-anim2 {
  0% {
    clip: rect(1px, 9999px, 1px, 0);
  }
  4% {
    clip: rect(24px, 9999px, 50px, 0);
  }
  8% {
    clip: rect(33px, 9999px, 92px, 0);
  }
  12% {
    clip: rect(54px, 9999px, 61px, 0);
  }
  16% {
    clip: rect(31px, 9999px, 86px, 0);
  }
  20% {
    clip: rect(28px, 9999px, 13px, 0);
  }
  24% {
    clip: rect(10px, 9999px, 85px, 0);
  }
  28% {
    clip: rect(47px, 9999px, 96px, 0);
  }
  32% {
    clip: rect(53px, 9999px, 27px, 0);
  }
  36% {
    clip: rect(67px, 9999px, 34px, 0);
  }
  40% {
    clip: rect(89px, 9999px, 80px, 0);
  }
}
</style>
