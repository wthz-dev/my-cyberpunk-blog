<template>
  <div>
    <div v-if="settings && settings.enableBanner" class="cyber-banner " :style="{background: settings.themeColor || '#00ffff'}">
      <span class="font-bold">{{ settings.bannerText || '🚀 ยินดีต้อนรับสู่เว็บไซต์ของเรา!' }}</span>
    </div>
    <Navbar :isMobileMenuOpen="isMobileMenuOpen" @toggleMobileMenu="toggleMobileMenu"/>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Footer />
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import NeonButton from './components/NeonButton.vue'
import { ref, watch, onMounted, provide, computed } from 'vue'
import { Menu, X, ChevronRight } from 'lucide-vue-next'
import { useSettingsStore } from '@/stores/settings'

const isMobileMenuOpen = ref(false)
const settingsStore = useSettingsStore()

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => {
  if (!settingsStore.data) settingsStore.loadSettings()
})

provide('settings', settingsStore.data)

const settings = computed(() => settingsStore.data || {})

// --- Meta Tag/SEO & Theme Color ---
watch(settings, (val) => {
  if (!val) return
  document.title = val.metaTitle || val.siteName || "Cyberpunk Blog"
  updateMeta('description', val.metaDescription || val.siteDescription || '')
  updateMeta('keywords', val.metaKeywords || '')
  updateMeta('og:title', val.metaTitle || val.siteName || '')
  updateMeta('og:description', val.metaDescription || val.siteDescription || '')
  updateMeta('og:image', val.ogImageUrl || val.logoUrl || '')
  updateMeta('theme-color', val.themeColor || '#00ffff')
}, { immediate: true })

// --- Google Analytics 4 ---
let gaScript = null
let gaInline = null
watch(() => settings.value.analyticsId, (id, oldId) => {
  // ลบ script เดิมถ้ามีและ id เปลี่ยน
  if (oldId && gaScript) {
    gaScript.remove()
    gaScript = null
  }
  if (oldId && gaInline) {
    gaInline.remove()
    gaInline = null
  }
  if (!id) return
  // ฝัง GA4 script
  gaScript = document.createElement('script')
  gaScript.id = 'analytics-script'
  gaScript.async = true
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(gaScript)
  // ฝัง inline config
  gaInline = document.createElement('script')
  gaInline.innerHTML = `\n    window.dataLayer = window.dataLayer || [];\n    function gtag(){dataLayer.push(arguments);}\n    gtag('js', new Date());\n    gtag('config', '${id}');\n  `
  document.head.appendChild(gaInline)
}, { immediate: true })

function updateMeta(name, content) {
  if (!content) return
  let tag = document.querySelector(`meta[name='${name}']`) || document.querySelector(`meta[property='${name}']`)
  if (!tag) {
    tag = document.createElement('meta')
    if (name.startsWith('og:')) tag.setAttribute('property', name)
    else tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.cyber-banner {
  width: 100%;
  min-height: 2.5rem;
  padding: 0.7rem 0;
  text-align: center;
  color: #181c24;
  font-size: 1.08rem;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px #00fff799;
  z-index: 100;
}
</style>
