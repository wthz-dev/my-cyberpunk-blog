<template>
  <div class="relative w-full h-48 md:h-64">
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full z-0" />
    <div
      class="cyber-banner text-center text-4xl md:text-6xl font-orbitron font-bold text-cyber-neon cursor-pointer relative z-10"
      @mouseenter="triggerExplosion"
      @click="triggerExplosion"
    >
      <span class="glitch-text" data-text="WHITE'S">WHITE'S</span>
      <span class="glitch-text" data-text="CYBERPUNK">CYBERPUNK</span>
      <span class="glitch-text" data-text="BLOG"> BLOG</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref(null)
let ctx = null
let particles = []
let animationId = null

const colors = ["#00fff7", "#f6019d", "#fffb00", "#fff", "#0ff", "#f0f"]

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

function createExplosion(x, y, count = 40) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * 2 * Math.PI
    const speed = randomBetween(3, 8)
    particles.push({
      x,
      y,
      radius: randomBetween(2, 6),
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      decay: randomBetween(0.01, 0.025)
    })
  }
}

function drawParticles() {
  if (!ctx) return
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  particles.forEach(p => {
    ctx.save()
    ctx.globalAlpha = p.alpha
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI)
    ctx.fillStyle = p.color
    ctx.shadowColor = p.color
    ctx.shadowBlur = 16
    ctx.fill()
    ctx.restore()
    // update
    p.x += p.dx
    p.y += p.dy
    p.alpha -= p.decay
  })
  particles = particles.filter(p => p.alpha > 0)
  animationId = requestAnimationFrame(drawParticles)
}

function triggerExplosion(e) {
  let x, y
  const rect = canvasRef.value.getBoundingClientRect()
  if (e && e.clientX && e.clientY) {
    x = e.clientX - rect.left
    y = e.clientY - rect.top
  } else {
    x = rect.width / 2
    y = rect.height / 2
  }
  createExplosion(x, y)
}

onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  // Set canvas size
  function resize() {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)
  drawParticles()
  // Initial explosion
  setTimeout(() => triggerExplosion(), 600)
})

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resize)
})
</script>

<style scoped>
.cyber-banner {
  user-select: none;
  letter-spacing: 0.1em;
  text-shadow: 0 0 8px #0ff, 0 0 16px #f6019d, 0 0 32px #00fff7;
}
canvas {
  display: block;
  pointer-events: none;
}
</style>
  
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
  