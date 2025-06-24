<template>
    <div class="relative">
      <!-- Banner -->
      <div 
        class="cyber-banner text-center text-4xl md:text-6xl font-orbitron font-bold text-cyber-neon cursor-pointer"
        @mouseenter="triggerExplosion"
      >
        <span class="glitch-text" data-text="WHITE'S">WHITE'S</span>
        <span class="glitch-text" data-text="CYBERPUNK">CYBERPUNK</span>
        <span class="glitch-text" data-text="BLOG"> BLOG</span>
      </div>
      
      <!-- tsParticles container -->
      <div id="particles-container" class="absolute inset-0 pointer-events-none z-0"></div>
    </div>
  </template>
  
  <script setup>
import { onMounted, ref } from 'vue'

// ใช้การนำเข้าแบบ dynamic import เพื่อหลีกเลี่ยงปัญหา SSR และ version mismatch
const isParticlesLoaded = ref(false)

onMounted(async () => {
  try {
    // นำเข้าทั้งสองโมดูลพร้อมกัน
    const [particles, { loadFull }] = await Promise.all([
      import('tsparticles-engine'),
      import('tsparticles')
    ])
    
    const tsParticles = particles.tsParticles
    await loadFull(tsParticles)
    isParticlesLoaded.value = true
    
    await tsParticles.load("particles-container", {
      particles: {
        number: { value: 0 },
        color: { value: ["#00fff7", "#f6019d", "#fffb00"] },
        shape: { type: "circle" },
        opacity: { value: 1 },
        size: { value: 4 },
        move: {
          enable: true,
          speed: 10,
          direction: "none",
          outModes: { default: "destroy" }
        }
      }
    })
  } catch (error) {
    console.error('ไม่สามารถโหลด particles:', error)
  }
})

const triggerExplosion = async () => {
  try {
    if (!isParticlesLoaded.value) return
    
    const { tsParticles } = await import('tsparticles-engine')
    const particlesInstance = tsParticles.domItem(0)
    
    if (particlesInstance) {
      particlesInstance.particles.push(50, {
        position: {
          x: window.innerWidth / 2,
          y: 100
        }
      })
    }
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการสร้าง explosion:', error)
  }
}
  </script>
  
  <style scoped>
  .cyber-banner {
    position: relative;
    z-index: 1;
    text-shadow: 0 0 10px #00fff7, 0 0 20px #00fff7;
  }
  
  .glitch-text {
    position: relative;
    display: inline-block;
  }
  
  .glitch-text::before,
  .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    overflow: hidden;
    opacity: 0.8;
  }
  
  .glitch-text::before {
    left: 2px;
    text-shadow: -2px 0 #00fff7;
    clip: rect(0, 900px, 0, 0);
    animation: glitch-anim-1 2s infinite linear alternate-reverse;
  }
  
  .glitch-text::after {
    left: -2px;
    text-shadow: 2px 0 #f6019d;
    clip: rect(0, 900px, 0, 0);
    animation: glitch-anim-2 3s infinite linear alternate-reverse;
  }
  
  @keyframes glitch-anim-1 {
    0% { clip: rect(0, 9999px, 0, 0); }
    10% { clip: rect(10px, 9999px, 30px, 0); }
    20% { clip: rect(20px, 9999px, 40px, 0); }
    30% { clip: rect(30px, 9999px, 50px, 0); }
    40% { clip: rect(40px, 9999px, 60px, 0); }
    50% { clip: rect(50px, 9999px, 70px, 0); }
    60% { clip: rect(60px, 9999px, 80px, 0); }
    70% { clip: rect(70px, 9999px, 90px, 0); }
    80% { clip: rect(80px, 9999px, 100px, 0); }
    90% { clip: rect(90px, 9999px, 110px, 0); }
    100% { clip: rect(100px, 9999px, 120px, 0); }
  }
  
  @keyframes glitch-anim-2 {
    0% { clip: rect(0, 9999px, 0, 0); }
    10% { clip: rect(5px, 9999px, 25px, 0); }
    20% { clip: rect(15px, 9999px, 35px, 0); }
    30% { clip: rect(25px, 9999px, 45px, 0); }
    40% { clip: rect(35px, 9999px, 55px, 0); }
    50% { clip: rect(45px, 9999px, 65px, 0); }
    60% { clip: rect(55px, 9999px, 75px, 0); }
    70% { clip: rect(65px, 9999px, 85px, 0); }
    80% { clip: rect(75px, 9999px, 95px, 0); }
    90% { clip: rect(85px, 9999px, 105px, 0); }
    100% { clip: rect(95px, 9999px, 115px, 0); }
  }
  
  .text-cyber-neon {
    color: #00fff7;
  }
  </style>
  