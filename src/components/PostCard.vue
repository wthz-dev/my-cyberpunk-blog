<template>
  <div class="cyber-card overflow-hidden flex flex-col h-full transition-transform duration-300 hover:translate-y-[-5px]">
    <div class="h-48 overflow-hidden relative">
      <img 
        :src="post.image" 
        :alt="post.title" 
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
      />
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-cyber-dark opacity-50"></div>
      <div class="absolute top-2 right-2">
        <span class="bg-cyber-dark px-2 py-1 text-xs font-share-tech-mono text-cyber-blue border border-cyber-blue">
          {{ post.date }}
        </span>
      </div>
    </div>
    <div class="p-6 flex-1 flex flex-col">
      <div class="flex flex-wrap gap-2 mb-3">
        <router-link 
          v-for="tag in post.tags" 
          :key="tag" 
          :to="`/tags/${tag}`" 
          class="text-xs font-share-tech-mono text-cyber-pink hover:text-cyber-blue transition-colors"
        >
          #{{ tag }}
        </router-link>
      </div>
      <h3 class="font-orbitron text-xl mb-3 line-clamp-2">{{ post.title }}</h3>
      <p class="font-share-tech-mono text-cyber-gray mb-4 flex-1 line-clamp-3">{{ post.excerpt }}</p>
      <div class="mt-auto">
        <router-link :to="`/blog/${post.slug}`">
          <NeonButton color="blue" size="sm">READ_MORE</NeonButton>
        </router-link>
      </div>
    </div>
    <div class="cyber-card-border"></div>
  </div>
</template>

<script setup>
import NeonButton from './NeonButton.vue'

defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.cyber-card {
  background: rgba(13, 17, 23, 0.8);
  border: 1px solid #00FFFF;
  position: relative;
}

.cyber-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00FFFF, transparent);
  box-shadow: 0 0 15px #00FFFF;
  z-index: 1;
}

.cyber-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00FFFF, transparent);
  box-shadow: 0 0 15px #00FFFF;
  z-index: 1;
}

.cyber-card-border::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 1px;
  background: linear-gradient(180deg, transparent, #00FFFF, transparent);
  box-shadow: 0 0 15px #00FFFF;
  z-index: 1;
}

.cyber-card-border::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 1px;
  background: linear-gradient(180deg, transparent, #00FFFF, transparent);
  box-shadow: 0 0 15px #00FFFF;
  z-index: 1;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
