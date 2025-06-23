<template>
  <footer class="border-t border-cyber-blue bg-cyber-dark py-8">
    <div class="container mx-auto px-4">
      <!-- ใช้ settings จาก props/inject -->
      <!-- Desktop Footer Layout -->
      <div class="hidden md:flex md:flex-row justify-between items-start mb-8">
        <div class="mb-6 md:mb-0">
          <h2 class="font-orbitron text-xl font-bold text-cyber-blue mb-4">{{ siteName }}</h2>
          <p class="font-share-tech-mono text-sm text-cyber-gray max-w-xs">{{ description }}</p>
        </div>
        
        <div class="grid grid-cols-2 gap-x-12 gap-y-6">
          <div>
            <h3 class="font-orbitron text-cyber-pink mb-3 text-sm">NAVIGATE</h3>
            <ul class="space-y-2">
              <li><router-link to="/" class="font-share-tech-mono text-cyber-gray hover:text-cyber-blue transition-colors text-sm">HOME</router-link></li>
              <li><router-link to="/blog" class="font-share-tech-mono text-cyber-gray hover:text-cyber-blue transition-colors text-sm">BLOG</router-link></li>
              <li><router-link to="/about" class="font-share-tech-mono text-cyber-gray hover:text-cyber-blue transition-colors text-sm">ABOUT</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="font-orbitron text-cyber-pink mb-3 text-sm">CATEGORIES</h3>
            <ul class="space-y-2">
              <li><router-link to="/tags/code" class="font-share-tech-mono text-cyber-gray hover:text-cyber-blue transition-colors text-sm">CODE</router-link></li>
              <li><router-link to="/tags/game" class="font-share-tech-mono text-cyber-gray hover:text-cyber-blue transition-colors text-sm">GAME</router-link></li>
              <li><router-link to="/tags/life" class="font-share-tech-mono text-cyber-gray hover:text-cyber-blue transition-colors text-sm">LIFE</router-link></li>
            </ul>
          </div>
        </div>
        
        <div>
          <h3 class="font-orbitron text-cyber-pink mb-3 text-sm">CONNECT</h3>
          <div class="flex space-x-3">
            <a href="#" class="cyber-button p-2" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="#" class="cyber-button p-2" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" class="cyber-button p-2" aria-label="Discord">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 9a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v7a5 5 0 0 0 5 5h4"></path><circle cx="15" cy="12" r="1"></circle><circle cx="9" cy="12" r="1"></circle></svg>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Mobile Footer Layout -->
      <div class="md:hidden">
        <div class="flex justify-between items-center mb-6">
          <h2 class="font-orbitron text-lg font-bold text-cyber-blue">WTHZ_BLOG</h2>
          <button @click="toggleFooterMenu" class="cyber-button p-2">
            <ChevronDown v-if="!isFooterMenuOpen" class="h-5 w-5 text-cyber-blue" />
            <ChevronUp v-else class="h-5 w-5 text-cyber-pink" />
          </button>
        </div>
        
        <div v-if="isFooterMenuOpen" class="mb-6 space-y-6 border-t border-cyber-gray pt-4">
          <div>
            <h3 class="font-orbitron text-cyber-pink mb-2 text-sm">NAVIGATE</h3>
            <ul class="space-y-2">
              <li><router-link to="/" class="font-share-tech-mono text-cyber-gray hover:text-cyber-blue transition-colors text-sm">HOME</router-link></li>
              <li><router-link to="/blog" class="font-share-tech-mono text-cyber-gray hover:text-cyber-blue transition-colors text-sm">BLOG</router-link></li>
              <li><router-link to="/about" class="font-share-tech-mono text-cyber-gray hover:text-cyber-blue transition-colors text-sm">ABOUT</router-link></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-orbitron text-cyber-pink mb-2 text-sm">CATEGORIES</h3>
            <ul class="space-y-2">
              <li><router-link to="/tags/code" class="font-share-tech-mono text-cyber-gray hover:text-cyber-blue transition-colors text-sm">CODE</router-link></li>
              <li><router-link to="/tags/game" class="font-share-tech-mono text-cyber-gray hover:text-cyber-blue transition-colors text-sm">GAME</router-link></li>
              <li><router-link to="/tags/life" class="font-share-tech-mono text-cyber-gray hover:text-cyber-blue transition-colors text-sm">LIFE</router-link></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-orbitron text-cyber-pink mb-2 text-sm">CONNECT</h3>
            <div class="flex space-x-3">
              <a href="#" class="cyber-button p-2" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="#" class="cyber-button p-2" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" class="cyber-button p-2" aria-label="Discord">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 9a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v7a5 5 0 0 0 5 5h4"></path><circle cx="15" cy="12" r="1"></circle><circle cx="9" cy="12" r="1"></circle></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Copyright Section - Both Mobile and Desktop -->
      <div class="border-t border-cyber-gray pt-6 mt-6 text-center">
        <p class="font-share-tech-mono text-sm text-cyber-gray">&copy; {{ new Date().getFullYear() }} {{ siteName }}. {{ copyrightText }}</p>
        <div class="mt-2 text-xs font-share-tech-mono text-cyber-gray flex justify-center items-center">
          <span class="inline-block h-2 w-2 rounded-full bg-cyber-blue mr-2 relative">
            <span class="absolute inset-0 h-full w-full rounded-full bg-cyber-blue animate-ping opacity-75"></span>
          </span>
          SYSTEM_ONLINE
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'

const props = defineProps({
  settings: { type: Object, default: null }
})
const injectedSettings = inject('settings', null)
const useSettings = computed(() => props.settings || injectedSettings || {})

const siteName = computed(() => useSettings.value.siteName || 'WTHZ_BLOG')
const description = computed(() => useSettings.value.siteDescription || '// Exploring the digital frontier of tomorrow with the latest in cybernetic enhancements and neural interfaces.')
const facebookUrl = computed(() => useSettings.value.facebookUrl || '')
const twitterUrl = computed(() => useSettings.value.twitterUrl || '')
const lineUrl = computed(() => useSettings.value.lineUrl || '')
const copyrightText = computed(() => useSettings.value.copyrightText || 'All rights reserved.')

const isFooterMenuOpen = ref(false)

const toggleFooterMenu = () => {
  isFooterMenuOpen.value = !isFooterMenuOpen.value
}
</script>

<style scoped>
.cyber-button {
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid #00FFFF;
  box-shadow: 0 0 5px #00FFFF;
  transition: all 0.3s ease;
}

.cyber-button:hover {
  box-shadow: 0 0 10px #00FFFF;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}


</style>