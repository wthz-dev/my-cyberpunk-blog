<template>
  <button 
    :class="[
      'neon-button font-orbitron relative overflow-hidden transition-all duration-300',
      `neon-${color}`,
      size === 'sm' ? 'text-sm px-3 py-1' : '',
      size === 'md' ? 'text-md px-4 py-2' : '',
      size === 'lg' ? 'text-lg px-6 py-3' : '',
      fullWidth ? 'w-full' : '',
      className
    ]"
    @click="$emit('click')"
  >
    <span class="relative z-10 flex items-center justify-center">
      <slot></slot>
    </span>
  </button>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'pink', 'yellow', 'green'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: ''
  }
})

defineEmits(['click'])
</script>

<style scoped>
.neon-button {
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid;
  box-shadow: 0 0 5px;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  transition: all 0.3s ease;
}

.neon-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: currentColor;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.neon-button:hover::before {
  opacity: 0.1;
}

.neon-button:active {
  transform: scale(0.98);
}

.neon-blue {
  color: #00FFFF;
  border-color: #00FFFF;
  box-shadow: 0 0 5px #00FFFF, 0 0 10px rgba(0, 255, 255, 0.5);
}

.neon-blue:hover {
  box-shadow: 0 0 10px #00FFFF, 0 0 20px rgba(0, 255, 255, 0.5);
}

.neon-pink {
  color: #FF00FF;
  border-color: #FF00FF;
  box-shadow: 0 0 5px #FF00FF, 0 0 10px rgba(255, 0, 255, 0.5);
}

.neon-pink:hover {
  box-shadow: 0 0 10px #FF00FF, 0 0 20px rgba(255, 0, 255, 0.5);
}

.neon-yellow {
  color: #FFFF00;
  border-color: #FFFF00;
  box-shadow: 0 0 5px #FFFF00, 0 0 10px rgba(255, 255, 0, 0.5);
}

.neon-yellow:hover {
  box-shadow: 0 0 10px #FFFF00, 0 0 20px rgba(255, 255, 0, 0.5);
}

.neon-green {
  color: #00FF00;
  border-color: #00FF00;
  box-shadow: 0 0 5px #00FF00, 0 0 10px rgba(0, 255, 0, 0.5);
}

.neon-green:hover {
  box-shadow: 0 0 10px #00FF00, 0 0 20px rgba(0, 255, 0, 0.5);
}
</style>
