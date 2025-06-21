<template>
  <transition name="cyberpunk-fade">
    <div v-if="visible" class="cyberpunk-modal-overlay">
      <div :class="['cyberpunk-alert', type, 'confirm']">
        <span class="icon" v-if="type === 'warning'">⚠️</span>
        <span class="icon" v-else-if="type === 'error'">✖</span>
        <span class="icon" v-else-if="type === 'success'">✔</span>
        <span class="icon" v-else-if="type === 'info'">ℹ️</span>
        <span class="alert-msg">{{ message }}</span>
        <div class="confirm-actions">
          <button class="confirm-btn" @click="onConfirm">{{ confirmText }}</button>
          <button class="cancel-btn" @click="onCancel">{{ cancelText }}</button>
        </div>
        <button class="close-btn" @click="onCancel">✕</button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
  message: { type: String, required: true },
  visible: { type: Boolean, required: true },
  type: { type: String, default: 'warning' }, // warning | error | success | info
  confirmText: { type: String, default: 'ตกลง' },
  cancelText: { type: String, default: 'ยกเลิก' },
});
const emit = defineEmits(['confirm', 'cancel', 'close']);

function onConfirm() {
  emit('confirm');
  emit('close');
}
function onCancel() {
  emit('cancel');
  emit('close');
}
</script>

<style scoped>
.cyberpunk-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(10, 20, 40, 0.72);
  backdrop-filter: blur(2px) brightness(0.9);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  animation: cyberpunk-fadein 0.22s;
}
.cyberpunk-alert.confirm {
  position: fixed;
  top: 8vh;
  left: 50%;
  transform: translateX(-50%);
  min-width: 320px;
  max-width: 400px;
  background: linear-gradient(135deg, #181828 90%, #00fff7 100%);
  border: 2px solid #00fff7cc;
  border-radius: 14px;
  box-shadow: 0 0 32px #00fff799, 0 0 2px #ff00ff88;
  padding: 2.1rem 2rem 1.6rem 2rem;
  flex-direction: column;
  align-items: flex-start;
  z-index: 10000;
  animation: cyberpunk-modal-pop 0.22s cubic-bezier(.47,1.64,.41,.8);
}
.cyberpunk-alert .alert-msg {
  margin: 0.7rem 0 1.2rem 0;
  font-size: 1.08rem;
}
.confirm-actions {
  display: flex;
  gap: 1.1rem;
}
.confirm-btn {
  background: #00fff7;
  color: #181828;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  font-size: 1.08rem;
  cursor: pointer;
  box-shadow: 0 0 10px #00fff7bb;
  transition: background 0.18s, color 0.18s;
}
.confirm-btn:hover {
  background: #ff00ff;
  color: #fff;
}
.cancel-btn {
  background: #ff00ff;
  color: #fff;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  font-size: 1.08rem;
  cursor: pointer;
  box-shadow: 0 0 10px #ff00ff99;
  transition: background 0.18s, color 0.18s;
}
.cancel-btn:hover {
  background: #222244;
  color: #00fff7;
}

@keyframes cyberpunk-fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes cyberpunk-modal-pop {
  from {
    opacity: 0;
    transform: translateX(-50%) scale(0.92) translateY(-18px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) scale(1) translateY(0);
  }
}

/* ปรับปุ่มปิดให้ลอยขวาบนของ modal */
.close-btn {
  position: absolute;
  top: 0.7rem;
  right: 1.1rem;
  background: transparent;
  border: none;
  color: #ff00ff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.18s;
  z-index: 10;
}
.close-btn:hover {
  color: #00fff7;
}

.cyberpunk-alert.confirm {
  position: fixed;
  top: 8vh;
  left: 50%;
  transform: translateX(-50%);
  min-width: 320px;
  max-width: 400px;
  background: linear-gradient(135deg, #181828 90%, #00fff7 100%);
  border: 2px solid #00fff7cc;
  border-radius: 14px;
  box-shadow: 0 0 32px #00fff799, 0 0 2px #ff00ff88;
  padding: 2.1rem 2rem 1.6rem 2rem;
  flex-direction: column;
  align-items: flex-start;
  z-index: 10000;
  animation: cyberpunk-modal-pop 0.22s cubic-bezier(.47,1.64,.41,.8);
}

.cyberpunk-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(10, 20, 40, 0.72);
  backdrop-filter: blur(2px) brightness(0.9);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  animation: cyberpunk-fadein 0.22s;
}

</style>
