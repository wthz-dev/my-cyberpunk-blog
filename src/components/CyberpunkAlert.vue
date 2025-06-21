<template>
  <transition name="cyberpunk-fade">
    <div v-if="visible" :class="['cyberpunk-alert', type]">
      <span class="icon" v-if="type === 'success'">✔</span>
      <span class="icon" v-else-if="type === 'error'">✖</span>
      <span class="alert-msg">{{ message }}</span>
      <button class="close-btn" @click="close">✕</button>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
const props = defineProps({
  message: String,
  type: {
    type: String,
    default: 'success', // 'success' | 'error' | 'info'
  },
  visible: Boolean,
  duration: {
    type: Number,
    default: 2500,
  },
});
const emit = defineEmits(['close']);

const timer = ref(null);

watch(() => props.visible, (val) => {
  if (val) {
    if (timer.value) clearTimeout(timer.value);
    timer.value = setTimeout(() => {
      close();
    }, props.duration);
  } else {
    if (timer.value) clearTimeout(timer.value);
  }
});

function close() {
  emit('close');
}
</script>

<style scoped>
.cyberpunk-alert {
  position: fixed;
  top: 40px;
  right: 40px;
  min-width: 260px;
  max-width: 350px;
  background: linear-gradient(90deg, #181828 80%, #00ffff44 100%);
  color: #fff;
  border: 2px solid #00fff7;
  box-shadow: 0 0 18px #00fff7, 0 0 30px #ff00ff55;
  border-radius: 10px;
  padding: 1.2rem 2.2rem 1.2rem 1.2rem;
  font-size: 1.1rem;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: cyberpunk-glow 1.2s infinite alternate;
}
.cyberpunk-alert.success {
  border-color: #00fff7;
  box-shadow: 0 0 20px #00fff7, 0 0 40px #00fff799;
}
.cyberpunk-alert.error {
  border-color: #ff0055;
  box-shadow: 0 0 20px #ff0055, 0 0 40px #ff005599;
}
.icon {
  font-size: 1.4rem;
  filter: drop-shadow(0 0 3px #00fff7);
}
.cyberpunk-alert .close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: auto;
  filter: drop-shadow(0 0 3px #ff00ff);
  transition: color 0.18s;
}
.cyberpunk-alert .close-btn:hover {
  color: #00fff7;
}
@keyframes cyberpunk-glow {
  from {
    box-shadow: 0 0 18px #00fff7, 0 0 30px #ff00ff55;
  }
  to {
    box-shadow: 0 0 28px #00fff7, 0 0 50px #ff00ff99;
  }
}
.cyberpunk-fade-enter-active, .cyberpunk-fade-leave-active {
  transition: opacity 0.4s;
}
.cyberpunk-fade-enter-from, .cyberpunk-fade-leave-to {
  opacity: 0;
}
</style>
