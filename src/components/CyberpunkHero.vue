<template>
  <section class="py-12 md:py-20 relative overflow-hidden cyberpunk-bg">
    <!-- Scanline Overlay -->
    <div class="scanlines"></div>
    <!-- Radial Gradient Background -->
    <div class="radial-bg"></div>
    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-3xl mx-auto text-center">
        <div class="cyber-logo-container mb-6" @mouseenter="playHoverSound">
          <NeonExplosion />
          <div class="cyber-circuit"></div>
        </div>
        <p class="font-share-tech-mono text-xl md:text-2xl mb-8 cyber-text">
          // Exploring the digital frontier of tomorrow
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import NeonExplosion from './NeonExplosion.vue'

function playHoverSound() {
  // ถ้ามีเสียง effect ให้ใส่ logic ที่นี่ (หรือปล่อยว่างไว้ถ้ายังไม่ใช้)
}
</script>

<!-- คุณสามารถย้าย style ที่เกี่ยวข้องกับ Hero Section มาที่นี่ได้ถ้าต้องการ -->
